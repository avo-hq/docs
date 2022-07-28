# Resource tools

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
        This is a <a href="https://avohq.io/purchase/pro" target="_blank" class="underline">pro</a> feature
      </div>
    </div>
  </div>
</div>

<div class="space-x-2 mt-2">
  <a href="https://github.com/avo-hq/avo/discussions/836" target="_blank" class="rounded bg-purple-600 hover:bg-purple-500 text-white no-underline px-2 py-1 inline leading-none mt-2">
    Provide feedback
  </a>

  <a href="https://youtu.be/Eex8CiinQZ8?t=196" target="_blank" class="rounded bg-green-600 hover:bg-green-500 text-white no-underline px-2 py-1 inline leading-none mt-2">
    Demo video
  </a>
</div>

Similar to adding custom fields to a resource, you can add custom tools. A custom tool is a partial added to your resource's `Show` and `Edit` views.

## Generate a resource tool

Run `bin/rails generate avo:resource_tool post_info`. That will create two files. The configuration file `app/avo/resource_tools/post_info.rb` and the partial file `app/views/avo/resource_tools/_post_info.html.erb`.

The configuration file holds the tool's name and the partial path if you want to override it.

```ruby
class PostInfo < Avo::BaseResourceTool
  self.name = "Post info"
  # self.partial = "avo/resource_tools/post_info"
end
```

The partial is ready for you to customize further.

```erb
<div class="flex flex-col">
  <%= render Avo::PanelComponent.new title: "Post info" do |c| %>
    <% c.tools do %>
      <%= a_link('/avo', icon: 'heroicons/solid/academic-cap', style: :primary) do %>
        Dummy link
      <% end %>
    <% end %>

    <% c.body do %>
      <div class="flex flex-col p-4 min-h-24">
        <div class="space-y-4">
          <h3>🪧 This partial is waiting to be updated</h3>

          <p>
            You can edit this file here <code class='p-1 rounded bg-gray-500 text-white text-sm'>app/views/avo/resource_tools/post_info.html.erb</code>.
          </p>

          <p>
            The resource tool configuration file should be here <code class='p-1 rounded bg-gray-500 text-white text-sm'>app/avo/resource_tools/post_info.rb</code>.
          </p>

          <%
            # In this partial you have access to the following variables:
            # tool
            # @resource
            # @resource.model
            # params
            # Avo::App.context
            # current_user
          %>
        </div>
      </div>
    <% end %>
  <% end %>
</div>
```

<img :src="$withBase('/assets/img/resource-tools/resource-tool-partial.png')" alt="Avo resource tool partial" class="border mb-4" />

## Partial context

You might need access to a few things in the partial.

You have access to the `tool`, which is an instance of your tool `PostInfo`, and the `@resource`, which holds all the information about that particular resource (`view`, `model`, `params`, and others), the `params` of the request, the `Avo::App.context` and the `current_user`.
That should give you all the necessary data to scope out the partial content.

## Tool visibility

The resource tool is visible on the `Show` view of a resource by default. You can change that using the [visibility options](field-options.html#showing-hiding-fields-on-different-views) (`show_on`, `only_on`).

```ruby
# app/avo/resources/post_resource.rb
class PostResource < Avo::BaseResource
  tool PostInfo, show_on: :edit
end
```

### Using path helpers

Because you're in a Rails engine you will have to prepend the engine object to the path.

#### For Avo paths

Instead of writing `resources_posts_path(1)` you have to write `avo.resources_posts_path(1)`.

#### For the main app paths

When you want to reference paths from your main app, instead of writing `posts_path(1)` you have to write `main_app.posts_path`.
