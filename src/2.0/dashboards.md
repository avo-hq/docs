# Dashboards

[[toc]]

There comes a point in your app's life when you need to display the data in an aggregated form like a metric or chart. That's what Avo's Dashboards are all about.


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

The `id` field has to be unique. The `name` is what the user sees in big letters on top of the page and the `description` is some text you pass to give the user more details regarding the dashboard.

You may organize the cards in a grid with `3`, `4`, `5`, or `6` columns using the `grid_cols` parameter. The default is `3`.

## Cards

There are 3 types of cards you can add to your dashboard: `metric`, `chartkick` and `partial`.

#### Setting the base settings

All cards have some common settings like `id` which must be unique, `label` and `description`. The `label` is going to be the title of your card and `description` is going to show a tiny question mark icon on the bottom right with a tooltip and that description.

Each card has it's own `cols` and `rows` setting where you can control the width and height of the card inside the dashboard grid. They can have values from `1` to `6`.

```ruby{2-5}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.label = 'Users count'
  self.description = 'Users description'
  self.cols = 1
  self.rows = 1
  self.display_header = true
end
```

#### Control the aggregation using ranges

You may also want to give the user the ability to query data in different ranges. You can control what's being passed in the drop-down using the `ranges` attribute. The array passed here will be parsed and displayed on the card. All integers are transformed to days, and other string variables will be passed as they are.

You can also set a default range using the `initial_range` attribute.

```ruby{4,5}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.label = 'Users count'
  self.initial_range = 30
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

#### Hide the header

In cases where you need to embed some type of content that should fill the whole card (like a map for example) you can choose to hide the label and ranges dropdown.

```ruby{3}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.display_header = false
end
```

## Dividers

You may want to separate the cards. You can use dividers to do that.

```ruby{8,10,13}
class Dashy < Avo::Dashboards::BaseDashboard
  self.id = 'dashy'
  self.name = 'Dashy'
  self.description = 'The first dashbaord'
  self.grid_cols = 3

  card NorthStar
  divider invisible: true
  card ProductsSold
  divider label: "User details"
  card UserSignups
  card UserInteraction
  divider label: "Order details"
  card OrderValues
  card ProductsPerOrder
end
```

Dividers can be a simple line between your cards or have some text on them that you control using the `label` option.
When you don't want to show even the line, you can enable the `invisible` option which adds the divider but it does not display a border or label.

### Metric card

When you only need to display a simple big number on your dashboard, the metric card is your friend. To generate one run `bin/rails g avo:card:metric users_metric`.

#### Calculate results

To calculate your result you may use the `query` block. After you make the query, use the `result` method to store the value that will be displayed on the card.

<img :src="$withBase('/assets/img/dashboards/metric.jpg')" alt="Metric card" class="border mb-4" />

```ruby{13-34,36}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.label = 'Users count'
  self.description = 'Some tiny description'
  self.cols = 1
  # self.rows = 1
  # self.initial_range = 30
  # self.ranges = [7, 30, 60, 365, 'TODAY', 'MTD', 'QTD', 'YTD', 'ALL']
  # self.prefix = '$'
  # self.suffix = '%'
  # self.refresh_every = 10.minutes

  query do
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

    result User.where(created_at: from..to).count
  end
end
```

#### Decorate the data using `prefix` and `suffix`

On some metrics might want to add a `prefix` or a `suffix` to better display the data.

```ruby{3,4}
class UsersMetric < Avo::Dashboards::MetricCard
  self.id = 'users_metric'
  self.prefix = '$'
  self.suffix = '%'
end
```

### Chartkick card

A picture is worth a thousand words. So maybe a chart a hundred? Who knows? But creating charts in Avo is very easy with the help of the [chartkick](https://github.com/ankane/chartkick) gem.

You start by running `bin/rails g avo:card:chartkick users_chart`.

<img :src="$withBase('/assets/img/dashboards/chartkick.jpg')" alt="Chartkick card" class="border mb-4" />

```ruby
class UserSignups < Avo::Dashboards::ChartkickCard
  self.id = 'user_signups'
  self.label = 'User signups'
  self.chart_type = :area_chart
  self.description = 'Some tiny description'
  self.cols = 2
  # self.rows = 1
  # self.chart_options = { library: { plugins: { legend: { display: true } } } }
  # self.flush = true
  # self.legend = false
  # self.scale = false
  # self.legend_on_left = false
  # self.legend_on_right = false

  query do
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

    data = [
      { name: 'batch 1', data: base_data.map { |k, v| [k, rand(0..20)] }.to_h },
      { name: 'batch 2', data: base_data.map { |k, v| [k, rand(0..40)] }.to_h },
      { name: 'batch 3', data: base_data.map { |k, v| [k, rand(0..10)] }.to_h }
    ]

    result data
  end
end
```

#### Chart types

Using the `self.chart_type` class attribute you can change the type of the chart. Supported types are `line_chart`, `pie_chart`, `column_chart`, `bar_chart`, `area_chart`, and `scatter_chart`.

#### Customize chart

Because the charts are being rendered with some padding initially we offset that padding before rendering to make the chart look good in the card. In order to disable that you can set `self.flush = false`. That will set the chart loose for you to further customize.

After you set `flush` to `false` you can add/remove the `scale` and `legend`. You can also place the legend on the left or right using `legend_on_left` and `legend_on_right`.

These are just some of the predefined options we provide out of the box, but you can send different [chartkick options](https://github.com/ankane/chartkick#options) to the chart using `chart_options`.

If you'd like to use [Groupdate](https://github.com/ankane/groupdate), [Hightop](https://github.com/ankane/hightop), and [ActiveMedian](https://github.com/ankane/active_median) you should require them in your `Gemfile`. Only `chartkick` is required by default.

Only `chart.js` is supported for the time being. If you need support for please reach out or post a PR (🙏 PR's are much appreciated).

### Partial card

You might want to add your own custom content to a card. You can do that using a partial card. You generate one by running `bin/rails g avo:card:partial custom_card`. That will create the card class and the partial for it.

```ruby{5}
class ExampleCustomPartial < Avo::Dashboards::PartialCard
  self.id = "users_custom_card"
  self.cols = 1
  self.rows = 4
  self.partial = "avo/cards/custom_card"
  # self.display_header = true
end
```

You may even embed a piece of content from another app using an iframe. You can hide the header using the `self.display_header = false` option. That will render the embedded content flush to the container.

```ruby{5}
# app/avo/cards/map_card.rb
class MapCard < Avo::Dashboards::PartialCard
  self.id = "map_card"
  self.label = "Map card"
  self.partial = "avo/cards/map_card"
  self.display_header = false
  self.cols = 2
  self.rows = 4
end
```

```html
<!-- app/views/avo/cards/_map_card.html.erb -->
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d17991.835132857846!2d-73.98926852562143!3d40.742050491245955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sro!4v1647079626880!5m2!1sen!2sro" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
```
