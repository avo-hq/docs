# Upgrade from 0.4.x

[[toc]]

If you're upgrading from <strong>0.4.x</strong> please follow the steps below to account for the API changes. If you're starting fresh, please follow the guides to [Defining resources](./resources.html).

## Resources

### Fields

**Changes**
  - the `fields do` declaration renamed to `def fields(request)`
  - declare fields on the `field` (or `f` alias) attribute

All fields declarations changed from using the `fields do` block to using a method that also gets the `request` object `def fields(request)`. Also, now you should declare the fields on the `field` (or `f` alias) attribute.

```ruby
# 0.4.x notation
fields do
  text :name
  file :logo
end
```

```ruby
# 0.5.x notation
def fields(request)
  field.text :name
  field.file :logo
end
```

### Resource controllers

All resources must have their own controllers that inherit from `Avo::ResourcesController`. You may generate a controller for each resource using the `bin/rails generate avo:controller RESOURCE_NAME` command.

Ex: `bin/rails generate avo:controller post`.

From now on, when you generate a resource, a controller will be generated also.

### The configure method

**Changes**
 - the `initialize` method renamed to `configure` in `Resource` files

```ruby{5}
# 0.4.x notation
module Avo
  module Resources
    class Post < Resource
      def initialize
        @title = :name
        @includes = :user
        @default_view_type = :grid
      end
```

```ruby{5}
# 0.5.x notation
module Avo
  module Resources
    class Post < Resource
      def configure
        @title = :name
        @includes = :user
        @default_view_type = :grid
      end
```

### Grid fields declaration

**Changes**

 - `grid do` renamed to `def grid(request)`
 - declare fields on the `grid` (or `g` alias) attribute
 - each grid field may now hold it's own configuration. It's not passed on from the `fields` method anymore.
 - each grid field must use the `grid_position` option that can have the values `preview`, `title` or `body`

The grid fields declaration method has changed to match the regular `fields` declaration method.

```ruby
# 0.4.x notation
grid do
  preview :cdn_cover_photo
  title :name
  body :excerpt
end
```

```ruby
# 0.5.x notation
def grid(request)
  grid.external_image :cdn_cover_photo, required: true, grid_position: :preview, link_to_resource: true
  grid.text :name, required: true, grid_position: :title, link_to_resource: true
  grid.text :excerpt, grid_position: :body do |model|
    begin
      ActionView::Base.full_sanitizer.sanitize(model.body).truncate 120
    rescue => exception
      ''
    end
  end
end
```

### `has_devise_password` renamed to `devise_password_optional`

The `has_devise_password` resource configuration has been renamed to `devise_password_optional`.

```ruby{7}
# 0.4.x
module Avo
  module Resources
    class User < Resource
      def initialize
        @title = :name
        @has_devise_password = true
      end
```

```ruby{7}
# 0.5.x
module Avo
  module Resources
    class User < Resource
      def configure
        @title = :name
        @devise_password_optional = true
      end
```



## Fields

### `datetime` field renamed to `date_time`

```ruby{7}
# 0.4.x
module Avo
  module Resources
    class Project < Resource
      def fields(request)
        ...
        f.datetime :started_at, name: 'Started', time_24hr: true, relative: true, timezone: 'EET'
        ...
      end
```

```ruby{7}
# 0.5.x
module Avo
  module Resources
    class Project < Resource
      def fields(request)
        ...
        f.date_time :started_at, name: 'Started', time_24hr: true, relative: true, timezone: 'EET'
        ...
      end
```

### `date` & `date_time` field format change

The formatting token for the `date` & `date_time` fields changed their format tokens from moment.js to [ruby date format](https://apidock.com/ruby/DateTime/strftime). You may also use the [`Time::DATE_FORMATS`](https://api.rubyonrails.org/classes/Time.html#DATE_FORMATS) tokens.

### Removed the `currency` and `key_value` fields.

We're going to bring them back in a later iteration.


## Filters

### `use_filter` deprecated

**Changes**

 - `use_filter` is deprecated
 - wrap the filters in a `def filters(request)` method
 - declare filters on the `filter` attribute


```ruby
# 0.4.x notation
use_filter Avo::Filters::FeaturedFilter
use_filter Avo::Filters::PublishedFilter
```

```ruby
# 0.5.x notation
def filters(request)
  filter.use Avo::Filters::FeaturedFilter
  filter.use Avo::Filters::PublishedFilter
end
```

### Filters now have a `configure` method

**Changes**

 - add the `configure` method
 - remove the `name` method from filters
 - add the `@name` instance variable

```ruby{4-9}
module Avo
  module Actions
    class TogglePublished < Action
      def configure
        @name = 'Toggle post published'
        @message = 'Are you sure, sure?'
        @confirm_text = 'Toggle'
        @cancel_text = "Don't toggle yet"
      end
```

## Actions

### `use_action` is deprecated

**Changes**

 - `use_action` is deprecated
 - wrap the filters in a `def actions(request)` method
 - declare filters on the `action` (or `a` alias) attribute

```ruby
# 0.4.x notation
use_action Avo::Actions::TogglePublished
```

```ruby
# 0.5.x notation
def actions(request)
  action.use Avo::Actions::TogglePublished
end
```

### Actions now have a `configure` method

**Changes**

 - add the `configure` method
 - remove the `message`, `confirm_text` and `cancel_text` methods from actions
 - add the `@message`, `@confirm_text` and `@cancel_text` instance variables

```ruby{4-9}
module Avo
  module Actions
    class TogglePublished < Action
      def configure
        @name = 'Toggle post published'
        @message = 'Are you sure, sure?'
        @confirm_text = 'Toggle'
        @cancel_text = "Don't toggle yet"
      end
```

### Fields

**Changes**

 - the `fields do` declaration renamed to `def fields(request)`
 - declare fields on the `field` (or `f` alias) attribute

## Locales

### Added a few more locales

Please run `bin/rails generate avo:locales` to refresh the locales file.
