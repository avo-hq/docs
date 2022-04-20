# Filters

[[toc]]

<a href="https://github.com/avo-hq/avo/discussions/838" target="_blank"
  class="rounded bg-purple-600 hover:bg-purple-500 text-white no-underline px-2 py-1 inline leading-none mt-2">
  Provide feedback
</a>

Filters allow you to better scope the index queries for records you are looking for.

## Defining filters

Avo has two types of filters available at the moment [Boolean filter](#boolean-filter) and [Select filter](#select-filter).

<img :src="$withBase('/assets/img/filters.jpg')" alt="Avo filters" style="width: 300px;" class="border mb-4" />

### Filter values

Because the filters get serialized back and forth, the final `value`/`values` in the `apply` method will be stringified or have the keys stringified if they are hashes. You can declare them as regular hashes (with the keys symbolized) in the `options` method but they will get stringifed in the end.

## Boolean Filter

You generate one running `bin/rails generate avo:filter featured_filter` creating a filter configuration file.

```ruby
class FeaturedFilter < Avo::Filters::BooleanFilter
  self.name = 'Featured filter'

  # `values` comes as a hash with stringified keys
  # Eg:
  # {
  #   'is_featured': true
  # }
  def apply(request, query, values)
    return query if values['is_featured'] && values['is_unfeatured']

    if values['is_featured']
      query = query.where(is_featured: true)
    elsif values['is_unfeatured']
      query = query.where(is_featured: false)
    end

    query
  end

  def options
    {
      is_featured: "Featured",
      is_unfeatured: "Unfeatured"
    }
  end

  # Optional method to set the default state.
  # def default
  #   {
  #     is_featured: true
  #   }
  # end
end
```

Each filter file comes with a `name`, `apply` and `options` methods.

The `name` method lets you set the name of the filter.

The `apply` method is responsible for filtering out the records by giving you access to modify the `query` object. The `apply` method also gives you access to the current `request` object, and the passed `values`. The `values` object is a `Hash` containing all the configured `options` with the option name as the key and `true`/`false` as the value.

```ruby
# Example values payload
{
  'is_featured': true,
  'is_unfeatured': false,
}
```

The `options` method defines the available values of your filter. They should return a `Hash` with the option id as a key and option label as value.

### Default value

You can set a default value to the filter so it has a predetermined state on load. To do that return the state you desire it from the `default` method.

```ruby{23-27}
class FeaturedFilter < Avo::Filters::BooleanFilter
  self.name = 'Featured status'

  def apply(request, query, values)
    return query if values['is_featured'] && values['is_unfeatured']

    if values['is_featured']
      query = query.where(is_featured: true)
    elsif values['is_unfeatured']
      query = query.where(is_featured: false)
    end

    query
  end

  def options
    {
      is_featured: "Featured",
      is_unfeatured: "Unfeatured"
    }
  end

  def default
    {
      is_featured: true
    }
  end
end
```

## Select Filter

Select filters are similar to Boolean ones. You generate one running `rails generate avo:filter published_filter --select`.

The biggest difference from the **Boolean filter** is in the `apply` method. You only get back one `value` attribute, which represents which entry from the `options` method is selected.

A finished, select filter might look like this.

```ruby
class PublishedFilter < Avo::Filters::SelectFilter
  self.name = 'Published status'

  # `value` comes as a string
  # Eg: 'published'
  def apply(request, query, value)
    case value
    when 'published'
      query.where.not(published_at: nil)
    when 'unpublished'
      query.where(published_at: nil)
    else
      query
    end
  end

  def options
    {
      published: "Published",
      unpublished: "Unpublished"
    }
  end

  # Optional method to set the default state.
  # def default
  #   :published
  # end
end
```

### Default value

The select filter supports setting a default too. That should be a string or symbol with the select item. It will be stringified by Avo automatically.

```ruby{22-24}
class PublishedFilter < Avo::Filters::SelectFilter
  self.name = 'Published status'

  def apply(request, query, value)
    case value
    when 'published'
      query.where.not(published_at: nil)
    when 'unpublished'
      query.where(published_at: nil)
    else
      query
    end
  end

  def options
    {
      'published': 'Published',
      'unpublished': 'Unpublished',
    }
  end

  def default
    :published
  end
end
```

## Multiple select filter

You may also use a multiple select filter.

```ruby
class PostStatusFilter < Avo::Filters::MultipleSelectFilter
  self.name = "Status"

  # `value` comes as an array of strings
  # Ex: ['admins', 'non_admins']
  def apply(request, query, value)
    if value.include? 'admins'
      query = query.admins
    end

    if value.include? 'non_admins'
      query = query.non_admins
    end

    query
  end

  def options
    {
      admins: "Admins",
      non_admins: "Non admins",
    }
  end

  # Optional method to set the default state.
  # def default
  #   ['admins', 'non_admins']
  # end
end
```

<img :src="$withBase('/assets/img/multiple-select-filter.jpg')" alt="Avo multiple select filter" style="width: 300px;" class="border mb-4" />

## Dynamic options

The select filter can also take dynamic options:

```ruby{15-17}
class AuthorFilter < Avo::Filters::SelectFilter
  self.name = 'Author'

  def apply(request, query, value)
    query = query.where(author_id: value) if value.present?
    query
  end

  def options
    Author.select(:id, :name).each_with_object({}) { |author, options| options[author.id] = author.name }
  end
end
```

## Text Filter

You can also add complex text filters to Avo by running `rails generate avo:filter name_filter --text`.

```ruby
class NameFilter < Avo::Filters::TextFilter
  self.name = "Name filter"
  self.button_label = "Filter by name"

  # `value` comes as text
  # Eg: 'avo'
  def apply(request, query, value)
    query.where('LOWER(name) LIKE ?', "%#{value}%")
  end

  # def default
  #   'avo'
  # end
end

```

## Registering filters

To add an filter to one of your resources, you need to declare it on the resource using the `filter` method to which you pass the filter class.

```ruby{8}
class PostResource < Avo::BaseResource
  self.title = :name
  self.search = :id

  field :id, as: :id
  # other fields

  filter PublishedFilter
end
```
