# Customize Avo

[[toc]]

## Change the app name

On the main navbar next to the logo Avo generates a link to the homepage of your app. The label for the link is usually computed from your Rails app name. You can customize that however you want using `config.app_name = 'Avocadelicious'`.

## Timezone and currency

In your data-rich app you might have a few fields where you reference `date`, `datetime` and `currency` fields. You may customize the global timezone and currency with `config.timezone = 'UTC'` and `config.currency = 'USD'` config options.

## Partials

You can customize some layout partials. Run `bin/rails generate avo:partials` to create the default partials.

This will generate 4 partials:

<!--

1. `_header.html.erb` - displays the app name with a link to the homepage
2. `_logo.html.erb` - displays the logo of your app (defaults to Avo's logo)
3. `_footer.html.erb` - displays the copyright and Avo's version
4. `_scripts.html.erb` - an empty partial where you can insert scripts and other types of content (Analytics, etc.) -->

### Logo

In the `app/views/vendor/avo/partials` directory you will find the `_logo.html.erb` partial which you may customize however you want. It will be displayed in place of Avo's logo.

<img :src="$withBase('/assets/img/customization/logo.jpg')" alt="Avo logo customization" class="border mb-4" />

### Header

The `_header.html.erb` partial enables you to customize the name and link of your app.

<img :src="$withBase('/assets/img/customization/header.jpg')" alt="Avo header customization" class="border mb-4" />

### Footer

The `_footer.html.erb` partial enables you to customize the footer of your admin.

<img :src="$withBase('/assets/img/customization/footer.jpg')" alt="Avo footer customization" class="border mb-4" />

### Scripts

The `_scripts.html.erb` partial enables you to insert scripts in the footer of your admin.

## Resource Index view

There are a few customization options to change the ways resources are displayed in the **Index** view.

### Resources per page

You my customize how many resources you can view per page with `config.per_page = 24`.

<img :src="$withBase('/assets/img/resource-index/per-page-config.jpg')" alt="Per page config" class="border mb-4" />

### Per page steps

Similarly customize the per-page steps in the per-page picker with `config.per_page_steps = [12, 24, 48, 72]`.

<img :src="$withBase('/assets/img/resource-index/per-page-steps.jpg')" alt="Per page config" class="border mb-4" />

### Resources via per page

For `has_many` associations you can control how many resources are visible in their `Index view` with `config.via_per_page = 8`.

### Default view type

The `ResourceIndex` component supports two view types `:table` and `:grid`. You can change that by `config.default_view_type = :table`. Read more on the [grid view configuration page](./grid-view.html).

<div class="grid grid-flow-row sm:grid-flow-col sm:grid-cols-2 gap-2 w-full">
  <div class="w-full">
    <strong>Table view</strong>
    <img :src="$withBase('/assets/img/customization/table-view.png')" alt="Table view" class="border mb-4" />
  </div>
  <div class="w-full">
    <strong>Grid view</strong>
    <img :src="$withBase('/assets/img/customization/grid-view.png')" alt="Grid view" class="border mb-4" />
  </div>
</div>

## ID links to resource

On the **Index** view each row has at the end the controls component which allows the user to go to the **Show** and **Edit** views, and delete that entry. If you have a long row and a not-so-wide monitor it might not be that easy to scroll to the right-most section to click the **Show** link.

To make it easier you can enable the `id_links_to_resource` config option.

```ruby{4}
Avo.configure do |config|
  config.root_path = '/avo'
  config.app_name = 'Avocadelicious'
  config.id_links_to_resource = true
end
```

This will render all `id` fields in the **Index** view as link to that resource.

<img :src="$withBase('/assets/img/fields-reference/as-link-to-resource.jpg')" alt="As link to resource" class="border mb-4" />

## Container width

```ruby{2-3}
Avo.configure do |config|
  config.full_width_index_view = false
  config.full_width_container = false
end
```

By default Avo's main content is constrained to a regular [Tailwind CSS container](https://tailwindcss.com/docs/container). If you have a lot of content or prefer to display it full-width you have two options to choose from.

### Display only the Index view full-width

Using `full_width_index_view: true` tells Avo to display the **Index** view full-width.

### Display all views full-width

Using `full_width_container: true` tells Avo to display all views full-width.

## Cache resources on Index view

By default Avo caches each resource row (or Grid item for Grid view) for the performance benefits. You can disable that cache using the `cache_resources_on_index_view` configuration option.

```ruby{2}
Avo.configure do |config|
  config.cache_resources_on_index_view = false
end
```

## Context

In the `Resource` and `Action` classes you have a global `context` object to which you can attach a custom payload. For example you may add the `current_user`, the current request `params` or any other arbitrary data.

You can configure it using the `set_context` method in your initializer. The block you pass in will be instance evaluated in `Avo::ApplicationController` so it will have access to the `current_user` method or `Current` object.

```ruby{2-8}
Avo.configure do |config|
  config.set_context do
    {
      foo: 'bar',
      user: current_user,
      params: request.params,
    }
  end
end
```

<!-- @todo: add docs for use_partials custom functionality -->
