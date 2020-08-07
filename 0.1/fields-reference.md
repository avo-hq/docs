---
prev: ./resources
next: ./fields
---

# Fields reference

[[toc]]

## Defining fields

Each Avocado resource has a `fields` method that registers your configured fields. Avocado ships with a variety of fields like `text`, `textarea`, `number`, `password`, `boolean`, `select`, and others.

To add a field you just need to declare it in the `fields` method like so:

```ruby
fields do
  text :name
end
```

This will create a text input field that will update the `name` attribute on that model.

## Field conventions

Avocado will try to get the snake case version of your field. But, if you want you can give it a name that's different from the field itself you can use the `name` property.

```ruby
text :body, name: 'Post body'
```

In the following example it will get the `is_available` attribute and render the label and placeholder `Is available`.

```ruby
boolean :is_available
```

## Showing / Hiding fields

You may want to display a field in the Show, Create & Edit and hide on the Index view. You may use `hide_on`, `show_on`, `only_on` and `except_on` methods like so:

```ruby
text :body, hide_on: [:index, :show]
```

## Computed Fields

You might need to show a field with something else than you have available in the database. In this case you may compute the value using a block that receives the `user` (the actual database record), `resource` (the Avocado configured resource) and the `view` in which it's displayed.

```ruby
boolean 'Has written something' do |model, resource, view|
  model.posts.present?
end
```

## Fields Formatter

There could be a case where you will want to process the database value before you show it to the user. You may do that using `format_using` block

```ruby
boolean :is_writer, format_using: -> (value) { value ? '👍' : '👎' }
```

## Sortable Fields

You may need to sort the records by one of your fields. You can do that using the `sortable` attribute.

```ruby
text :name, sortable: true
```

## Placeholder

Some fields support the `placeholder` attribute which will be passed to the inputs on `edit` and `new` views.

```ruby
text :name, placeholder: 'John Doe'
```

## Required

Sometimes you will want to prevent the user from submitting the form without filling in a field

```ruby
text :name, required: true
```

## Readonly

Sometimes you will want to prevent the user from editing a field. `readonly` will render the field as disabled.

```ruby
text :name, readonly: true
```

## Default Value

Sometimes you will want to give a `default value` to your fields for the create instance. This can be achieved by using the
`default` method, which takes either a value or a callback function.

```ruby
# using a value
text :name,
  default: 'John'

# using a callback function
select :level,
  options: { beginner: 'Beginner', advanced: 'Advanced' },
  default: -> (model, resource, view, field) { Time.now.hour < 12 ? 'advanced' : 'beginner' }
```

## Help Text

Sometimes you will need a `help text` below a field. You can achieve this by using the `help` method. This can be either text or
 HTML.

```ruby
# using text value
code :custom_css, theme: 'dracula', language: 'css', help: "This enables you to edit the user's custom styles."

# using HTML value
password :password, help: 'You may verify the password strength <a href="http://www.passwordmeter.com/">here</a>.'
```

## Nullable

On a regular basis, Avo is trying to store a value for each field. There are cases, where you may prefer to explicitly instruct
 Avo to store a `NULL` value in the database when the field is empty. In order to achieve this, you may use `nullable` method, which converts
 nil and empty in `NULL`.

 You can also define which values are interpreted as `NULL` using `null_values` method.

```ruby
# using default options
status :updated_status, failed_when: [:closed, :rejected, :failed], loading_when: [:loading, :running, :waiting], nullable: true

# using custom null values
textarea :body, nullable: true, null_values: ['0', '', 'null', 'nil']
```