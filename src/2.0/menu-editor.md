# Menu editor

[[toc]]

<div class="rounded-md bg-blue-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3 flex-1 md:flex md:justify-between">
      <div class="text-sm leading-5 text-blue-700">
        The Menu editor is a <a href="https://avohq.io/purchase/pro" target="_blank" class="underline">Pro</a> feature
      </div>
    </div>
  </div>
</div>

<a href="https://github.com/avo-hq/avo/discussions/831" target="_blank" class="rounded bg-purple-600 hover:bg-purple-500 text-white no-underline px-2 py-1 inline leading-none mt-2">
  Provide feedback
</a>

One common task you need to do is organize your sidebar resources into menus. You can easily do that using the menu editor in the initializer.

When you start with Avo, you'll get an auto-generated sidebar By default. That sidebar will contain all your resources, dashboards, and custom tools. To customize that menu, you have to add the `main_menu` key to your initializer.

```ruby{3}
# config/initializers/avo.rb
Avo.configure do |config|
  config.main_menu = -> {
    section "Resources", icon: "heroicons/outline/academic-cap" do
      group "Academia" do
        resource :course
      end
    end
  }
```

For now, Avo supports editing only two menus, `main_menu` and `profile_menu`. However, that might change in the future by allowing you to write custom menus for other parts of your app.

```ruby
# config/initializers/avo.rb
Avo.configure do |config|
  config.main_menu = -> {
    section I18n.t("avo.dashboards"), icon: "dashboards" do
      dashboard :dashy, visible: -> { true }
      dashboard :sales, visible: -> { true }

      group "All dashboards", visible: false do
        all_dashboards
      end
    end

    section "Resources", icon: "heroicons/outline/academic-cap" do
      group "Academia" do
        resource :course
        resource :course_link
      end

      group "Blog" do
        resource :posts
        resource :comments
      end

      group "Other" do
        resource :fish
      end
    end

    section "Tools", icon: "heroicons/outline/finger-print" do
      all_tools
    end

    group do
      link "Avo", path: "https://avohq.io"
      link "Google", path: "https://google.com", target: :_blank
    end
  }
  config.profile_menu = -> {
    link "Profile", path: "/profile", icon: "user-circle"
  }
end
```

## Menu item types

A few menu item types are supported `link`, `section`, `group`, `resource`, and `dashboard`. There are a few helpers too, like `all_resources`, `all_dashboards`, and `all_tools`.

## Link

Link is the menu item that the user will probably interact with the most. It will generate a link on your menu. You can specify the `name`, `path` , and `target`.

```ruby
link "Google", path: "https://google.com", target: :_blank
```

## Resource

To make it a bit easier, you can use `resource` to quickly generate a link to one of your resources. For example, you can pass a short symbol name `:user` or the full name `UserResource`.


```ruby
resource :posts
resource "CommentsResource"
```

## Dashboard

Similar to `resource`, this is a helper to make it easier to reference a dashboard.

```ruby
resource :dashy
resource "SalesDashboard"
```

## Section

Sections are the big categories in which you can group your menu items. They take `name` and `icon` options.

```ruby
section "Resources", icon: "heroicons/outline/academic-cap" do
  resource :course
  resource :course_link
end
```

## Group

Groups are smaller categories where you can bring together your items.

```ruby
group "Blog" do
  resource :posts
  resource :categories
  resource :comments
end
```

## `all_` helpers

We also added some helpers for the scenario where you want to customize part of a menu for convenience. For example, let's say you want to add some custom tools and mix and match the dashboards, but you don't want to disturb the resources. You can use `all_resources` to generate a list containing all of them.

```ruby
section "Dashboards", icon: "dashboards" do
  dashboard :dashy, visible: -> { true }
  dashboard "Sales", visible: -> { true }

  group "Resources", icon: "resources" do
    all_resources
  end

  group "All tools", icon: "tools" do
    all_tools
  end
end
```

## Icons

For [`Section`](#section)s, you can use icons to make them look better. You can use some local ones that we used throughout the app and all [heroicons](https://heroicons.com/) designed by [Steve Schoger](https://twitter.com/steveschoger). You can use the `solid` or `outline` versions. We used the `outline` version throughout the app.

```ruby
section "Resources", icon: "heroicons/outline/academic-cap" do
  resource :course
end

section "Resources", icon: "heroicons/solid/finger-print" do
  resource :course
end

section "Resources", icon: "heroicons/outline/adjustments" do
  resource :course
end
```

## Profile menu

The profile menu allows you to add items to the menu displayed in the profile component. **The sign-out link is automatically added for you.**

```ruby
# config/initializers/avo.rb
Avo.configure do |config|
  config.profile_menu = -> {
    link "Profile", path: "/profile", icon: "user-circle"
  }
end
```

<img :src="$withBase('/assets/img/menu-editor/profile-menu.png')" alt="Avo profile menu" class="border mb-4" />
