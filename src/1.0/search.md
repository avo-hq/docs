# Search

[[toc]]

Finding what you're looking for fast is essential. That's why Avo leverages [ransack's](https://github.com/activerecord-hackery/ransack) powerful query language.

## Enable search for a resource

To enable search for a resource, you need to add the `ransack_query` class variable to the resource file.

```ruby{3-5}
class UserResource < Avo::BaseResource
  self.title = :name
  self.ransack_query = ->(params:) do
    scope.ransack(id_eq: params[:q], first_name_cont: params[:q], last_name_cont: params[:q], m: "or").result(distinct: false)
  end

  # fields go here
end
```

The `ransack_query` block passes over the `params` object that holds the `q` param, the actual query string. It also provides the `scope` variable on which you run the query. That ensures that the [authorization scopes](./authorization.html#scopes) have been appropriately applied.

In this block, you may configure the search however strict or loose you need it. Check out [ransack's search matchers](https://github.com/activerecord-hackery/ransack#search-matchers) to compose the query better.

## Configure the search result

### Label

By default, the search results will be displayed as text. The text label will be the [title column](./resources.html#setting-the-title-of-the-resource) you previously configured.

<img :src="$withBase('/assets/img/search/search_blank.jpg')" alt="Blank search" class="border mb-4" />

You may configure that to be something more complex using the `as_label` option. That will take the final value of that field and display it as the label of the search result.

```ruby{9-11}
class PostResource < Avo::BaseResource
  self.title = :name
  self.ransack_query = ->(params:) do
    scope.ransack(id_eq: params[:q], m: "or").result(distinct: false)
  end

  field :id, as: :id
  field :name, as: :text, required: true, as_label: true
  field :complex_name, as: :text, hide_on: :all, as_label: true do |model|
    "[#{model.id}]#{model.name}"
  end
end
```

<img :src="$withBase('/assets/img/search/search_label.jpg')" alt="Search label" class="border mb-4" />

Notice the `hide_on: :all` option used to hide the computed `complex_name` attribute from the rest of the views. That is because you **may or may not** want to show that attribute in other views.

### Description

You might want to show more than just the title in the search result. Avo provides the `as_description` option to add some more information.

```ruby{12-16}
class PostResource < Avo::BaseResource
  self.title = :name
  self.ransack_query = ->(params:) do
    scope.ransack(id_eq: params[:q], m: "or").result(distinct: false)
  end

  field :id, as: :id
  field :name, as: :text, required: true, as_label: true
  field :complex_name, as: :text, hide_on: :all, as_label: true do |model|
    "[#{model.id}]#{model.name}"
  end
  field :excerpt, as: :text, as_description: true do |model|
    ActionView::Base.full_sanitizer.sanitize(model.body).truncate 130
  rescue
    ""
  end
end
```

<img :src="$withBase('/assets/img/search/search_description.jpg')" alt="Search description" class="border mb-4" />

### Avatar

You may improve the results listing by adding an avatar to each search result. You do that by using the `as_avatar` attribute. This attribute has three options `:square`, `:rounded` or `:circle`. This influences the final roundness of the avatar.



```ruby{17}
class PostResource < Avo::BaseResource
  self.title = :name
  self.ransack_query = ->(params:) do
    scope.ransack(id_eq: params[:q], m: "or").result(distinct: false)
  end

  field :id, as: :id
  field :name, as: :text, required: true, as_label: true
  field :complex_name, as: :text, hide_on: :all, as_label: true do |model|
    "[#{model.id}]#{model.name}"
  end
  field :excerpt, as: :text, as_description: true do |model|
    ActionView::Base.full_sanitizer.sanitize(model.body).truncate 130
  rescue
    ""
  end
  field :cover_photo, as: :file, is_image: true, as_avatar: :rounded
end
```

<img :src="$withBase('/assets/img/search/search_avatar.jpg')" alt="Search avatar" class="border mb-4" />

## Resource search

When a resource has the `ransack_query` attribute, you will see a new search input in the `Index` view. You can use that to search that particular resource.

<img :src="$withBase('/assets/img/search/resource_search.jpg')" alt="Resource search" class="border mb-4" />

## Global search

Avo also has a global search feature. It will search through all the resources that have the `ransack_query` attribute present.

You open the global search input by clicking the trigger on the navbar or by using the <kbd>CMD</kbd> + <kbd>K</kbd> keyboard shortcut (<kbd>Ctrl</kbd> + <kbd>K</kbd> on windows).

<img :src="$withBase('/assets/img/search/global_search_trigger.jpg')" alt="Global search trigger" class="border mb-4" />
