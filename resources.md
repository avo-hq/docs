# Basics

[[toc]]

Avocado empowers you in a very easy way to build a full administration dashboard for your Ruby on Rails application.
This gets done by giving you the ability of adding "Resources".

## Defining Resources

<!-- @todo: build resources generator -->

In your app under `app/services` create an `avocado` directory. This directory will hold all of your Avocado configuration files.
Inside that create a `resources` directory. This is the directory where the resources files will be kept.

Inside create a resource file that looks like so:

```ruby
module Avocado
  module Resources
    class Post < Resource
      def initialize
        @title = :id
        @search = [:name, :id]
        @includes = :user
      end

      fields do
        id :ID
        text :Title, required: true
      end
    end
  end
end
```

From this config Avocado will infer that the resource's model will be the `Post` model.

## Setting the title of the resource

Because we set the `@title` attribute to `:id`, then the model's `id` will be used to reference the resource on index, search and other views. You usually change it to something more representative like the model's `title` or `name` attributes.

## Search

Using the `@search` property you can instruct Avocado in which fields should it look through when doing a search on this resource.

## Eager loading

If you regularly need access to the resource's relations you can instruct Avocado to eager load those relations on the `index` screen using `@includes` in your initializer

```ruby
def initialize
  @includes = :user
end
```
