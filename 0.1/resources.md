---
prev: /dashboard
next: ./fields-reference
---

# Basics

[[toc]]

Avo empowers you in a very easy way to build a full admin dashboard for your Ruby on Rails application.
One of the most powerful features is how easy you can administer your database records.
Avo does this using **Resources**. Each resource maps out one of your models.

## Defining Resources

```bash
bin/rails generate avo:resource post
```

This command will generate a resource file under your `app/avo/resources` directory. The `app/avo` directory will hold all of your Avo configuration files.

Inside the creates resource file will look like so:

```ruby
module Avo
  module Resources
    class Post < Resource
      def initialize
        @title = :id
        @search = :id
      end

      fields do
        id :id
      end
    end
  end
end
```

From this config Avo will infer that the resource's model will be the `Post` model.

## Setting the title of the resource

Initially the `@title` attribute is set to `:id`, so the model's `id` attribute will be used to reference the resource on index, search and other views. You usually change it to something more representative like the model's `title` or `name` attributes.

## Search

Using the `@search` property you can tell Avo in which fields should it look through when doing a search on this resource.

## Eager loading

If you regularly need access to a resource's relations you tell Avo to eager load those relations on the `index` screen using `@includes` in your initializer

```ruby
def initialize
  @includes = [:user, :tags]
end
```

## Views

Each generated resource will have four views **Index view** where you see all your resources listed, **Show view** where you get to see one resource in more detail, **Edit view** where you can edit one resource and **Create view** where you can create a new resource.

## Grid view

On **Index view**, the most common view type is `:table`. But you might have some data that you want to display it in a **grid view**. You change that by setting `@default_view_type`.

<img :src="$withBase('/assets/img/grid-view.jpg')" alt="Avo grid view">

```ruby
  @default_view_type = :grid
```

Check out the additional [grid view documentation](grid-view).

## Filters

It's a very common scenario to add filters to your resources to make it easier to find your records. This is very easy with Avo.

<img :src="$withBase('/assets/img/filters.jpg')" alt="Avo filters" style="width: 300px;" />

Check out the additional [filters documentation](filters).
