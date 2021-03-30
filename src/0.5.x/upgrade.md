# Upgrade from 0.4.x to 0.5.x notation

[[toc]]

If you're upgrading from <strong>0.4.x</strong> please follow the steps below to account for the API changes. If you're starting fresh, please follow the guides to [Defining resources](./resources.html).

## Resources

### Resources inherit from `Avo::BaseResource`

**Changes**
  - all resources are standalone classes
  - all resources inherit from `Avo::BaseResource`
  - no more opening up the `Avo` namespace
  - resource classes have the `Resource` suffix
  - resource files have the `_resource.rb` suffix

All resources should now inherit from `Avo::BaseResource`. This is a pattern more widely used for these kinds of DSLs. Also all resources now have the `Resource` suffix (ex: `app/avo/resources/user.rb` becomes `app/avo/resources/user_resource.rb` with the class `UserResource`).

```ruby{3-5}
# 0.4.x notation
# app/avo/resources/post.rb
module Avo
  module Resources
    class Post < Resource
      def initialize
        ...
      end

      fields do
        text :name
      end

      use_action ToggleAdmin

      ...
```

```ruby{3}
# 0.5.x notation
# app/avo/resources/post_resource.rb
class PostResource < Avo::BaseResource
  ...
end
```

### Fields

**Changes**
  - the `fields do` declaration removed
  - all fields are declared with the class method `field`
  - the field type is declared using the `as:` attribute

```ruby
# 0.4.x notation
module Avo
  module Resources
    class Post < Resource
      fields do
        text :name
        file :logo
      end
    end
  end
end
```

```ruby
# 0.5.x notation
class PostResource < Avo::BaseResource
  field :name, as: :text
  field :logo, as: :file
end
```

### `heading` field is now a class method

**Changes**
  - use the `heading` class method to add headings

```ruby
# 0.4.x notation
module Avo
  module Resources
    class Post < Resource
      fields do
        heading 'Post details'
        text :name
        file :logo
      end
    end
  end
end
```

```ruby
# 0.5.x notation
class PostResource < Avo::BaseResource
  heading 'Post details'
  field :name, as: :text
  field :logo, as: :file
end
```

### Resource controllers

All resources must have their own controllers that inherit from `Avo::ResourcesController`. You may generate a controller for each of your existing resource using the `bin/rails generate avo:controller RESOURCE_NAME` command.

Ex: `bin/rails generate avo:controller post`.

From now on a controller will be generated when you generate an Avo resource.

### The initialize method removed

**Changes**
 - the `initialize` method removed
 - all options from `initialize` become class attributes

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

```ruby{3-5}
# 0.5.x notation
PostResource < Avo::BaseResource
  self.title = :name
  self.includes = :user
  self.default_view_type = :grid
```

### Grid fields declaration

**Changes**
  - inside the `grid do` declaration you declare fields on the `cover`, `title` and `body`
  - each grid field will now hold it's own configuration. It's not passed on from the `fields` method anymore.

The grid fields declaration method has changed to match the regular `fields` declaration method. This way you can configure and customize the grid fields however you need them.

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
grid do
  cover :cdn_cover_photo, as: :external_image, required: true, link_to_resource: true
  title :name, as: :text, required: true, link_to_resource: true
  body :excerpt, as: :text do |model|
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
# 0.4.x notation
module Avo
  module Resources
    class User < Resource
      def initialize
        @title = :name
        @has_devise_password = true
      end
```

```ruby{4}
# 0.5.x notation
class UserResource < Avo::BaseResource
  self.title = :name
  self.devise_password_optional = true
```


## Fields

### `datetime` field renamed to `date_time`

```ruby{7}
# 0.4.x notation
module Avo
  module Resources
    class Project < Resource
      def fields(request)
        ...
        f.datetime :started_at, name: 'Started', time_24hr: true, relative: true, timezone: 'EET'
        ...
      end
```

```ruby{5}
# 0.5.x notation
class ProjectResource < Avo::BaseResource
  field :started_at, as: :date_time, name: 'Started', time_24hr: true, relative: true, timezone: 'EET'
```

### `date` & `date_time` field format change

The formatting token for the `date` & `date_time` fields changed their format tokens from moment.js to [ruby date format](https://apidock.com/ruby/DateTime/strftime). You may also use the [`Time::DATE_FORMATS`](https://api.rubyonrails.org/classes/Time.html#DATE_FORMATS) tokens.

### Removed the `currency` and `key_value` fields.

We're going to bring them back in a later iteration.


## Filters

### Filters are standalone classes that inherit from base filter classes

**Changes**
  - all filters inherit from `Avo::Filter::SelectFilter` or `Avo::Filter::BooleanFilter`
  - all filters are standalone classes
  - no more opening up the `Avo` namespace

```ruby
# 0.4.x notation
module Avo
  module Filters
    class FeaturedFilter < BooleanFilter
```

```ruby
# 0.5.x notation
class FeaturedFilter < Avo::Filters::BooleanFilter
```

### `use_filter` deprecated

**Changes**

 - `use_filter` is deprecated
 - use the `filter` class method


```ruby
# 0.4.x notation
use_filter Avo::Filters::FeaturedFilter
use_filter Avo::Filters::PublishedFilter
```

```ruby
# 0.5.x notation
class PostResource < Avo::BaseResource
  filter FeaturedFilter
  filter PublishedFilter
end
```

### Filters drop the `name` method

**Changes**
 - remove the `name` method from filters
 - add the `self.name` class attribute

```ruby{5-7}
# 0.4.x notation
module Avo
  module Filters
    class PublishedFilter < SelectFilter
      def name
        'Published status'
      end
```

```ruby{3}
# 0.5.x notation
class PublishedFilter < Avo::Filters::SelectFilter
  self.name = 'Published status'
```

## Actions

### Actions are standalone classes that inherit from `Avo::BaseAction`

**Changes**
  - all actions inherit from `Avo::BaseAction` class
  - all actions are standalone classes
  - no more opening up the `Avo` namespace

All filter should now inherit from the `Avo::BaseAction` class.

```ruby
# 0.4.x notation
module Avo
  module Actions
    class TogglePublished < Action
      def name
        'Toggle post published'
      end
```

```ruby
# 0.5.x notation
class TogglePublished < Avo::BaseAction
  self.name = 'Toggle post published'
```

### `use_action` is deprecated

**Changes**

 - `use_action` is deprecated
 - use the `action` class method


```ruby
# 0.4.x notation
use_action Avo::Actions::TogglePublished
```

```ruby
# 0.5.x notation
class PostResource < Avo::BaseResource
  action TogglePublished
end
```

### Actions drops the label methods in favour of class attributes

**Changes**
 - `name` method becomes `self.name` class attribute
 - `message` method becomes `self.message` class attribute
 - `confirm_text` method becomes `self.confirm_button_label` class attribute
 - `cancel_text` method becomes `self.cancel_button_label` class attribute
 - `no_confirmation` method becomes `self.no_confirmation` class attribute

```ruby{5-23}
# 0.4.x notation
module Avo
  module Actions
    class TogglePublished < Action
      def name
        'Toggle post published'
      end

      def message
        'Are you sure, sure?'
      end

      def confirm_text
        'Toggle'
      end

      def cancel_text
        "Don't toggle yet"
      end

      def no_confirmation
        true
      end
```

```ruby{3-7}
# 0.5.x notation
TogglePublished < Avo::BaseAction
  self.name = 'Toggle post published'
  self.message = 'Are you sure, sure?'
  self.confirm_button_label = 'Toggle'
  self.cancel_button_label = "Don't toggle yet"
  self.no_confirmation = true
```

### Fields

**Changes**

 - the `fields do` declaration removed
 - declare fields using the `field` class method

```ruby{7-10}
# 0.4.x notation
module Avo
  module Actions
    class ToggleInactive < Action
      ...

      fields do
        boolean :notify_user
        textarea :message, default: 'Your account has been marked as inactive.'
      end
    end
  end
end
```

```ruby{4-5}
# 0.5.x notation
class ToggleInactive < Avo::BaseAction
  ...
  field :notify_user, as: :boolean, default: true
  field :message, as: :text, default: 'Your account has been marked as inactive.'
  ...
end
```

## Locales

### Added a few more locales

Please run `bin/rails generate avo:locales` to refresh the locales file.
