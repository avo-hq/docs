# Custom fields

[[toc]]

Avo ships with 20+ fields out of the box. They are well polished and ready to be used with your admins.

When you need a field that isn't provided by default, Avo makes it easy to add it.

## Generate a new field

Every new field comes with three [view components](https://viewcomponent.org/), `edit` (which is also used in the `new` view), and `show` and `index`. There's also a `Field` configuration file.

`bin/rails generate avo:field progress_bar` generates the files for you.

```shell
▶ bin/rails generate avo:field progress_bar
      create  app/components/avo/fields/progress_bar_field
      create  app/components/avo/fields/progress_bar_field/edit_component.html.erb
      create  app/components/avo/fields/progress_bar_field/edit_component.rb
      create  app/components/avo/fields/progress_bar_field/index_component.html.erb
      create  app/components/avo/fields/progress_bar_field/index_component.rb
      create  app/components/avo/fields/progress_bar_field/show_component.html.erb
      create  app/components/avo/fields/progress_bar_field/show_component.rb
      create  app/avo/fields/progress_bar_field.rb
```

The `ProgressBarField` file is what registers the field in your admin.

```ruby
class ProgressBarField < Avo::Fields::BaseField
  def initialize(name, **args, &block)
    super(name, **args, &block)
  end
end
```

Now you can use your field like so:

```ruby{6}
# app/avo/resources/progress_bar_field.rb
class ProjectResource < Avo::BaseResource
  self.title = :name

  field :id, as: :id, link_to_resource: true
  field :progress, as: :progress_bar
end
```
<img :src="$withBase('/assets/img/custom-fields/progress-show.jpg')" alt="Progress custom field" class="border mb-4" />

The generated view components are basic text fields for now.

```erb
# app/components/avo/fields/progress_bar_field/edit_component.html.erb
<%= edit_field_wrapper field: @field, index: @index, form: @form, resource: @resource, displayed_in_modal: @displayed_in_modal do %>
  <%= @form.text_field @field.id,
    class: helpers.input_classes('w-full', has_error: @field.model_errors.include?(@field.id)),
    placeholder: @field.placeholder,
    disabled: @field.readonly %>
<% end %>

# app/components/avo/fields/progress_bar_field/index_component.html.erb
<%= index_field_wrapper field: @field do %>
  <%= @field.value %>
<% end %>

# app/components/avo/fields/progress_bar_field/show_component.html.erb
<%= show_field_wrapper field: @field, index: @index do %>
  <%= @field.value %>
<% end %>
```

You can customize them and add as much or as little content as needed. More on customization [below](#customize-the-views).

## Field options

This file is where you may add field-specific options.

 ```ruby{3-6,11-14}
# app/avo/fields/progress_bar_field.rb
class ProgressBarField < Avo::Fields::BaseField
  attr_reader :max
  attr_reader :step
  attr_reader :display_value
  attr_reader :value_suffix

  def initialize(name, **args, &block)
    super(name, **args, &block)

    @max = 100
    @step = 1
    @display_value = false
    @value_suffix = nil
  end
end
```

The field specific options can come from the field declaration as well.

```ruby{11-14,23}
# app/avo/fields/progress_bar_field.rb
class ProgressBarField < Avo::Fields::BaseField
  attr_reader :max
  attr_reader :step
  attr_reader :display_value
  attr_reader :value_suffix

  def initialize(name, **args, &block)
    super(name, **args, &block)

    @max = args[:max] || 100
    @step = args[:step] || 1
    @display_value = args[:display_value] || false
    @value_suffix = args[:value_suffix] || nil
  end
end

# app/avo/resources/progress_bar_field.rb
class ProjectResource < Avo::BaseResource
  self.title = :name

  field :id, as: :id, link_to_resource: true
  field :progress, as: :progress_bar, step: 10, display_value: true, value_suffix: "%"
end
```

## Field visibility

If you need to hide the field in some view you can use the [visibility helpers](./field-options.html#showing-hiding-fields-on-different-views).

```ruby{16}
# app/avo/fields/progress_bar_field.rb
class ProgressBarField < Avo::Fields::BaseField
  attr_reader :max
  attr_reader :step
  attr_reader :display_value
  attr_reader :value_suffix

  def initialize(name, **args, &block)
    super(name, **args, &block)

    @max = args[:max] || 100
    @step = args[:step] || 1
    @display_value = args[:display_value] || false
    @value_suffix = args[:value_suffix] || nil

    hide_on :forms
  end
end
```

## Customize the views

No let's do something about those views. Let's add a progress bar to the `index` and `show` views.

```erb
# app/components/avo/fields/progress_bar_field/show_component.html.erb
<%= show_field_wrapper field: @field, index: @index do %>
  <!-- If display_value is set to true, show the value above the progress bar -->
  <% if @field.display_value %>
    <div class="text-center text-sm font-semibold w-full leading-none mb-1">
      <!-- Add the suffix if value_suffix is set -->
      <%= @field.value %><%= @field.value_suffix if @field.value_suffix.present? %>
    </div>
  <% end %>

  <!-- Show the progress input with the settings we passed to the field. -->
  <progress max="<%= @field.max %>" value="<%= @field.value %>" class="block w-full"></progress>
<% end %>

# app/components/avo/fields/progress_bar_field/index_component.html.erb
<%= index_field_wrapper field: @field do %>
  <!-- If display_value is set to true, show the value above the progress bar -->
  <% if @field.display_value %>
    <div class="text-center text-sm font-semibold w-full leading-none mb-1">
      <!-- Add the suffix if value_suffix is set -->
      <%= @field.value %><%= @field.value_suffix if @field.value_suffix.present? %>
    </div>
  <% end %>

  <!-- Show the progress input with the settings we passed to the field. -->
  <progress max="<%= @field.max %>" value="<%= @field.value %>" class="block w-24"></progress>
<% end %>
```

<img :src="$withBase('/assets/img/custom-fields/progress-index.jpg')" alt="Progress bar custom field on index" class="border mb-4" />

For the `edit` view we're going to do something else. We'll implement a `range` input.

```erb
<%= edit_field_wrapper field: @field, index: @index, form: @form, resource: @resource, displayed_in_modal: @displayed_in_modal do %>
  <!-- Show the progress input with the settings we passed to the field. -->
  <% if @field.display_value %>
    <div class="text-center text-sm font-semibold w-full leading-none mb-1">
      <!-- Add the suffix if value_suffix is set -->
      <span class="js-progress-bar-value-<%= @field.id %>"><%= @field.value %></span><%= @field.value_suffix if @field.value_suffix.present? %>
    </div>
  <% end %>
  <!-- Add the range input with the settings we passed to the field -->
  <%= @form.range_field @field.id,
    min: 0,
    max: @field.max,
    step: @field.step,
    class: 'w-full',
    placeholder: @field.placeholder,
    disabled: @field.readonly %>
<% end %>


<script>
// Get the input and value elements
var input = document.getElementById('project_progress');
// Scope the selector to the current field. You might have more than one progress field on the page.
var log = document.querySelector('.js-progress-bar-value-<%= @field.id %>');

// Add event listener for when the input is updated
input.addEventListener('input', updateValue);

// Update the value element with the value from the input
function updateValue(e) {
  log.textContent = e.target.value;
}
</script>
```
<img :src="$withBase('/assets/img/custom-fields/progress-edit.jpg')" alt="Progress bar custom field edit" class="border mb-4" />

In the example above we added the javascript on the page just to demonstrate the functionality. In reality you might add that to a stimulus controller inside your own Avo [dedicated pipeline](./custom-asset-pipeline.html) (webpacker or sprockets).

