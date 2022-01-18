# Dashboards

[[toc]]

There comes a point in your app's life when you need to display the data in an aggregated form like a metric or chart. That's what Avo's dashboards are all about. Making it easy for you to aggrgate the data.


```ruby
class Dashy < Avo::Dashboards::BaseDashboard
  self.id = 'dashy'
  self.name = 'Dashy'
  self.description = 'The first dashbaord'
  self.grid_cols = 3

  card UsersMetric
  card UserSignups
  card CustomPartial
end
```

## Settings

Each dashboard is organized in one file. It holds the information about itself like the `id`, `name`, `description`, and how many columns it's grid has.

The `id` field has to be unique. The `name` is what the user sees in big letters on top of the page and the `description` is some text you pass to give the user more details regarding the dashboard. You may organize the cards in a grid with `3`, `4`, `5`, or `6` columns using the `grid_cols` parameter.

## Cards

There are 3 types of cards you can add to your dashboard: `metric`, `chartkick` and `partial`.

#### Setting the base settings

All cards have some common settings like `id` which must be unique, and `label` and `description`. Each card has it's own `cols` setting where you can control the width of the card inside the dashboard grid.

```ruby{2-5}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.label = 'Users count'
  self.description = 'Users description'
  self.cols = 1
end
```

#### Control the aggregation using ranges

You may also want to give the user the ability to query data in different ranges. You can control what's being passed in the drop-down using the `ranges` attribute. The array passed here will be parsed and displayed on the card. All integers are transformed to days and other string variables will be passed as they are.
You can also set a default range using the `range` attribute.

```ruby{4,5}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.label = 'Users count'
  self.range = 30
  self.ranges = [7, 30, 60, 365, 'TODAY', 'MTD', 'QTD', 'YTD', 'ALL']
end
```

#### Keep the data fresh

If this dashboard is something that you keep on the big screen and you need to keep the data fresh at all times. That's easy using `refresh_every`. You pass it the number of seconds you need it to be refreshed in and forget about it. Avo will do it for you.

```ruby{3}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.refresh_every = 10.minutes
end
```

### Metric card

When you only need to display a simple big number on your dashboard, metric is your friend. To generate one run `bin/rails g avo:card users_metric --type metric`. You may add `--sample` to get dummy data in your `query` callback.

#### Calculate results

To calculate your result you may use the `query` method. The value you return from that method will be displayed in the metric.

<img :src="$withBase('/assets/img/dashboards/metric.jpg')" alt="Metric card" class="border mb-4" />

```ruby
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.label = 'Users count'
  self.description = 'Users description'
  self.cols = 1
  self.range = 30
  self.ranges = [7, 30, 60, 365, 'TODAY', 'MTD', 'QTD', 'YTD', 'ALL']
  self.prefix = '$'
  self.suffix = '%'
  self.refresh_every = 10.minutes

  def query(context:, range:, dashboard:, card:)
    from = Date.today.midnight - 1.week
    to = DateTime.current

    if range.present?
      if range.to_s == range.to_i.to_s
        from = DateTime.current - range.to_i.days
      else
        case range
        when 'TODAY'
          from = DateTime.current.beginning_of_day
        when 'MTD'
          from = DateTime.current.beginning_of_month
        when 'QTD'
          from = DateTime.current.beginning_of_quarter
        when 'YTD'
          from = DateTime.current.beginning_of_year
        when 'ALL'
          from = Time.at(0)
        end
      end
    end

    User.where('created_at >= :from AND created_at < :to', from: from, to: to).count
  end
end
```

#### Embelish the data using `prefix` and `suffix`

On some metrics might want to add a `prefix` or a `suffix` to better display the data.

```ruby{3,4}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.prefix = '$'
  self.suffix = '%'
end
```

### Chartkick card

A picture is worth a thousand words. So maybe a chart a hundred? Who knows? But creating charts in Avo is very easy with the help of [chartkick](https://github.com/ankane/chartkick) gem.

You start by running `bin/rails g avo:card users_chart --type chart`. You may add `--sample` to get an example in your `query` callback.

<img :src="$withBase('/assets/img/dashboards/chartkick.jpg')" alt="Chartkick card" class="border mb-4" />

```ruby
class UserSignups < Avo::Dashboards::ChartkickCard
  self.id = 'user_signups'
  self.label = 'User signups'
  self.chart_type = :area_chart
  self.description = 'Some tiny description'
  self.cols = 2
  self.range = 30
  self.ranges = [7, 30, 60, 365, 'TODAY', 'MTD', 'QTD', 'YTD', 'ALL']
  self.chart_options = { library: { plugins: { legend: { display: true } } } }
  self.omit_position_offset = false

  def query(context:, range:, dashboard:, card:)
    points = 16
    i = Time.new.year.to_i - points
    base_data =
      Array
        .new(points)
        .map do
          i += 1
          [i.to_s, rand(0..20)]
        end
        .to_h

    [
      { name: 'batch 1', data: base_data.map { |k, v| [k, rand(0..20)] }.to_h },
      { name: 'batch 2', data: base_data.map { |k, v| [k, rand(0..40)] }.to_h },
      { name: 'batch 3', data: base_data.map { |k, v| [k, rand(0..10)] }.to_h }
    ]
  end
end
```

#### Chart types

Using the `self.chart_type` attribute you can change the type of the chart. Supported types are `line_chart`, `pie_chart`, `column_chart`, `bar_chart`, `area_chart`, and `scatter_chart`.

#### Customize chart

You can send different [chartkick options](https://github.com/ankane/chartkick#options) to the chart using `chart_options`.

Because the charts are being rendered with some padding initially we offset that padding in our code to make the chart look good in the card. In order to disable that you can set `self.omit_position_offset = true`. That will set the chart loose for you to further customize.

If you'd like to use [Groupdate](https://github.com/ankane/groupdate), [Hightop](https://github.com/ankane/hightop), and [ActiveMedian](https://github.com/ankane/active_median) you should require them in your `Gemfile`. Only `chartkick` is added by default.

Only `chart.js` is supported for the time being. If you need support for please reach out or post a PR (🙏 PR's are much appreciated).

### Partial card

You might want to add your own custom content to a card. You can do that using a partial card. You generate one by running `bin/rails g avo:card custom_card --type partial`. That will create the card class and the partial for it.
