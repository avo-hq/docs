# Custom tools

[[toc]]

Avo makes it easy to add custom tools and pages to your dashboard.

## Generate tools

`bin/rails generate avo:tool dashboard` will generate the necessary files to show the new custom tool.

```
▶ bin/rails generate avo:tool dashboard
      create  app/views/avo/sidebar/items/_dashboard.html.erb
      insert  app/controllers/avo/tools_controller.rb
      create  app/views/avo/tools/dashboard.html.erb
       route  namespace :avo do
  get "dashboard", to: "tools#dashboard"
end
```

### Controller

If this is your first custom tool, a new `ToolsController` will be generated for you. Within this controller, Avo created a new method.

```ruby
class Avo::ToolsController < Avo::ApplicationController
  def dashboard
  end
end
```

You can keep this action in this controller or move it to another controller and organize it differently.

### Route

```ruby{2-4}
Rails.application.routes.draw do
  namespace :avo do
    get "dashboard", to: "tools#dashboard"
  end

  authenticate :user, ->(user) { user.admin? } do
    mount Avo::Engine => Avo.configuration.root_path
  end
end
```

The route generated is wrapped inside a namespace with the `Avo.configuration.root_path` name. You may move it inside your authentication block next to the Avo mounting call.

### Sidebar item

The `_dashboard.html.erb` partial will be added to the `app/views/avo/sidebar/items` directory. All the files in this directory will be loaded by Avo and displayed in the sidebar. They are displayed in alphabetical order so you may change their name to reorder the items.

### Customize the sidebar

If you want to further customize the sidebar partial you can [eject](./customization.html#eject-views) it and update it to your liking. We're planning on creating a better sidebar customization experience later this year.

## Add assets

Please follow [this guide](./custom-asset-pipeline.html) to bring your own assets with your own asset pipeline.

