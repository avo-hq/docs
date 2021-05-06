# Resources

[[toc]]

Avo effortlessly empowers you to build a full admin dashboard for your Ruby on Rails application.
One of the most powerful features is how easy you can administer your database records.
Avo does this using **Resources**. Each resource maps out one of your models.

## Defining Resources

```bash
bin/rails generate avo:resource post
```

This command will generate a resource file under your `app/avo/resources` directory. The `app/avo` directory will hold all of your Avo configuration files.

Inside the creates resource file will look like so:

```ruby
class PostResource < Avo::BaseResource
  self.title = :id
  self.includes = []

  field :id, as: :id
  # add fields here
end
```

From this config, Avo will infer that the resource's model will be the `Post` model.

You can add more fields to this resource below the `id` field.

```ruby{5-15}
class PostResource < Avo::BaseResource
  self.title = :id
  self.includes = []

  field :id, as: :id
  field :name, as: :text, required: true
  field :body, as: :trix, placeholder: "Add the post body here", always_show: false
  field :cover_photo, as: :file, is_image: true, link_to_resource: true
  field :is_featured, as: :boolean

  field :is_published, as: :boolean do |model|
    model.published_at.present?
  end

  field :user, as: :belongs_to, placeholder: "—"
end
```

## Setting the title of the resource

Initially, the `title` attribute is set to `:id`, so the model's `id` attribute will be used to display the resource in search results and belongs select fields. You usually change it to something more representative, like the model's `title`, `name` or `label` attributes.

```ruby
class PostResource < Avo::BaseResource
  self.title = :name # it will now reference @project.name to show you the title
end
```

<!-- ## Search

Using the `@search` property you can tell Avo which fields it should look through when doing a search on this resource. -->

## Eager loading

If you regularly need access to a resource's associations, you can tell Avo to eager load those associations on the **Index** view using `includes`. This will help you avoid those nasty `n+1` performance issues.

```ruby
class PostResource < Avo::BaseResource
  self.includes = [:user, :tags]
end
```

## Views

Each generated resource will have four views **Index** view where you see all your resources listed, **Show** view where you get to see one resource in more detail, **Edit** view where you can edit one resource and **Create** view where you can create a new resource.

### Grid view

On **Index view**, the most common view type is `:table`. You might have some data that you want to display in a **grid view**. You change that by setting `default_view_type` to `:grid` and add the `grid` block.

<img :src="$withBase('/assets/img/grid-view.jpg')" alt="Avo grid view" class="border mb-4" />

```ruby
class PostResource < Avo::BaseResource
  self.default_view_type = :grid
end
```

See how you can customize the grid item in the additional [grid view documentation](grid-view).

## Custom model class

You might have a model that belongs to a namespace or that has a different name than than the resource. For those occasions you can use the `@model` option to tell Avo which model to reference.

```ruby{2}
class DelayedJobResource < Avo::BaseResource
  self.model_class = ::Delayed::Job

  field :id, as: :id
  # ... other fields go here
end
```

## Devise password optional

If you use `devise` and you update your user models (usually `User`) without passing a password you will get a validation error. You can use `devise_password_optional` to stop receiving that error. It will [strip out](https://stackoverflow.com/questions/5113248/devise-update-user-without-password/11676957#11676957) the `password` key from `params`.

```ruby
class UserResource < Avo::BaseResource
  self.devise_password_optional = true
end
```


## Filters

It's a very common scenario to add filters to your resources to make it easier to find your records. Check out the additional [Filters documentation](./filters.html) to see how easy it is to set up custom filters with Avo.

<img :src="$withBase('/assets/img/filters.jpg')" alt="Avo filters" style="width: 300px;" class="border mb-4" />

## Actions

Most of the time, you will want to trigger some events against your records or run more heavy updates. Avo makes this so easy with **Actions**.

<img :src="$withBase('/assets/img/actions.jpg')" alt="Avo actions" class="border mb-4" />

Check out the additional [Actions documentation](./actions.html).

## Search
Check out the additional [Search documentation](./search.html).
