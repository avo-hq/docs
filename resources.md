# Basics

[[toc]]

Avocado empowers you in a very easy way to build a full administration dashboard for your Ruby on Rails application.
This gets done by giving you the ability of adding "Resources".

## Defining Resources

```
rails generate avo:resource RESOURCE_NAME
```

In your app under `app/services` an `avocado` directory will be created. This directory will hold all of your Avocado configuration files.
The resource config file will be created under the `resources` sub-directory.

Inside the creates resource file will look like so:

```ruby
module Avocado
  module Resources
    class Post < Resource
      def initialize
        @title = :id
        @search = :id
      end

      fields do
        id :ID
      end
    end
  end
end
```

From this config Avocado will infer that the resource's model will be the `Post` model.

## Setting the title of the resource

Initially the `@title` attribute is set to `:id`, so the model's `id` will be used to reference the resource on index, search and other views. You usually change it to something more representative like the model's `title` or `name` attributes.

## Search

Using the `@search` property you can instruct Avocado in which fields should it look through when doing a search on this resource.

## Eager loading

If you regularly need access to the resource's relations you can instruct Avocado to eager load those relations on the `index` screen using `@includes` in your initializer

```ruby
def initialize
  @includes = :user
end
```
