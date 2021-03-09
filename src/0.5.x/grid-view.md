# Grid view

[[toc]]

<br />
<img :src="$withBase('/assets/img/grid-view.jpg')" alt="Avo grid view" class="border mb-4" />

Some resources are best displayed in a grid view.
Avo's Grid view enables you to display the resource using an image (`:preview`), a title (`:title`) and a body (`:body`).

## Enable grid view

To enable grid view in a resource you need to declare it in the resource `configure` method.

```ruby{7}
module Avo
  module Resources
    class Post < Resource
      def configure
        @title = :name
        @search = [:name, :id]
        @default_view_type = :grid
      end
    end
  end
end
```

## Fields configuration

Besides the regular `fields` method you should add a new `grid` method that configures the grid fields. Each field should have a new option called `grid_position` that can be `:preview`, `:title` or `:body`.


```ruby{8-12}
def fields(request)
  field.id
  field.text :name, required: true
  field.textarea :body
  field.file :cover_photo, is_image: true
end

def grid(request)
  grid.file :cover_photo, grid_position: :preview, is_image: true
  grid.text :name, grid_position: :title
  grid.textarea :body, grid_position: :body
end
```

This will render the `Post` resource index view as a **Grid view** using the selected fields. Avo will also display a button to toggle between the two view types `:grid` and `:table`.

These fields take the same options like those in the `fields` method, so you can configure them however you want them.

For example, in the **Grid view** you might want to truncate the `:body` to a certain length and use an external image for the preview that you compute on the fly. And also render the `:preview` and the `:title` fields as links to that resource with `link_to_resource: true`.

```ruby
def grid(request)
  grid.external_image :logo, grid_position: :preview, link_to_resource: true do |model|
    if model.url.present?
      "//logo.clearbit.com/#{URI.parse(model.url).host}?size=180"
    end
  end
  grid.text :name, grid_position: :title, link_to_resource: true
  grid.text :excerpt, grid_position: :body do |model|
    begin
      ActionView::Base.full_sanitizer.sanitize(model.body).truncate 130
    rescue => exception
      ''
    end
  end
end
```