---
sidebar: auto
---

# Fields

[[toc]]

## Defining fields

Each Avocado resource has a `fields` method that registers your configured fields. Avocado ships with a variety of fields like `text`, `textarea`, `number`, `password`, `boolean`, `select`, and others.

To add a field you just need to declare it in the `fields` method like so:

```ruby
fields do
  text :Name
end
```

This will create a text input field that will update the `name` attribute on that model.

# Field conventions

Avocado will try to get the snake case version of your field. But, if you want you can give it a name that's different from the field itself you can use the `name` property.

```ruby
text :body, name: 'Post body'
```

In the following example it will get the `is_available` attribute and render the label and placeholder `Is available`.

```ruby
boolean :IsAvailable
```

# Showing / Hiding fields

You may want to display a field in the Show, Create & Edit and hide on the Index view. You may use `hide_on`, `show_on`, `only_on` and `except_on` methods like so:

```ruby
text :body, hide_on: [:index, :show]
```

# Computed Fields

You might need to show a field with something else than you have available in the database. In this case you may compute the value using a block that receives the `user` (the actual database record), `resource` (the Avocado configured resource) and the `view` in which it's displayed.

```ruby
boolean 'Has written something' do |model, resource, view|
  model.posts.present?
end
```

# Fields Formatter

There could be a case where you will want to process the database value before you show it to the user. You may do that using `format_using` block

```ruby
boolean :IsWriter, format_using: -> (value) { value ? '👍' : '👎' }
```

# Sortable Fields

You may need to sort the records by one of your fields. You can do that using the `sortable` attribute.

```ruby
text :name, sortable: true
```

# Placeholder

Some fields support the `placeholder` attribute which will be passed to the inputs on `edit` and `new` views.

```ruby
text :name, placeholder: 'John Doe`
```

# Required

Sometimes you will want to prevent the user from submitting the form without filling in a field

```ruby
text :name, required: true
```

# Readonly

Sometimes you will want to prevent the user from editing a field. `readonly` will render the field as disabled.

```ruby
text :name, readonly: true
```

# Fields reference

## Boolean field

The boolean field renders a `checkbox` `input` and supports the following options.

```ruby
  text :title,
    name: 'Post title',
    required: true,
    readonly: true,
    true_value: 'yes',
    false_value: 'no',
```

### Customize true/false values

You might store the value differently than `1` and `0`. You may customize those values using `true_value` and `false_value`.

## Text field

The text field renders a `text` `input` and supports the following options:

```ruby
  text :title, # The database field ID
    name: 'Post title', # The name you want displayed
    required: true, # Display it as required
    readonly: true, # Display it disabled
    placeholder: 'My shiny new post', # Update the placeholder text
    format_using: -> (value) { value.truncate 3 } # Format the output
```

## Textarea

The textarea field renders a `textarea` element and supports the following options:

```ruby
  textarea :body,
    name: 'Post contents',
    required: true,
    readonly: true,
    placeholder: 'My shiny new post',
    format_using: -> (value) { value.truncate 3 },
    rows: 5 # The size of the element
```