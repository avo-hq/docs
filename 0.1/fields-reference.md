---
prev: ./resources
next: ./grid-view
---

# Fields reference

[[toc]]

## Defining fields

Each Avo resource has a `fields` method that registers your resource's fields. Avo ships with a variety of fields like `text`, `textarea`, `number`, `password`, `boolean`, `select`, and others.

To add a field you just need to declare it in the `fields` method like so:

```ruby
fields do
  text :name
end
```

This will create a text input field that will update the `name` attribute on that model.

## Field conventions

Avo will convert the snake case version of your field to a humanized version, but, if you want to customize it even  more, you can give it a name that's different from the field itself with the `name` property.

```ruby
text :body, name: 'Post body'
```

In the following example the `is_available` id will render the label of the field as `Is available`.

```ruby
boolean :is_available
```

## Showing / Hiding fields

You may want to display a field in the **Create** and **Edit** and hide on the **Index** and **Show** view. For this may use `hide_on`, `show_on`, `only_on` and `except_on` methods like so.

```ruby
text :body, hide_on: [:index, :show]
```

## Computed Fields

At times you might need to show a field with something else than you have available in the database. In this case you may compute the value using a block that receives the `model` (the actual database record), `resource` (the Avo configured resource) and the `view` in which it's displayed. Then you can computed what to show on this field in the **Index** and **Show** views.

```ruby
boolean 'Has written something' do |model, resource, view|
  model.posts.present?
end
```

This example will display a boolean field with the value computed from your custom block.

## Fields Formatter

There could be a case where you will want to process the database value before you show it to the user. You may do that using `format_using` block

```ruby
text :is_writer, format_using: -> (value) { value ? '👍' : '👎' }
```

This example snippet will make the `:is_writer` field to generate emojis instead of 1/0 values.

## Sortable Fields

One of the most common operations with database records is sorting the records by one of your fields. You leverage the `sortable` attribute.

Just add it to any field and Avo will make that column sortable in the **Index** view.

```ruby
text :name, sortable: true
```

## Placeholder

Some fields support the `placeholder` attribute which will be passed to the inputs on **Edit** and **New** views.

```ruby
text :name, placeholder: 'John Doe'
```

## Required

Sometimes you will want to prevent the user from submitting the form without filling in a field. This is where `required` is needed. This will add an asterisk to that field indicating that it's mandatory.

```ruby
text :name, required: true
```

You will however need to add your own validation logic to your model (`validates :name, presence: true`).

## Readonly

Sometimes you will want to prevent the user from editing a field. `readonly` will render the field as disabled.

```ruby
text :name, readonly: true
```

## Default Value

When you need to give a default value to your fields on the **Create** view you may use the `default` method, which takes either a fixed value or a callback function.

```ruby
# using a value
text :name, default: 'John'

# using a callback function
select :level, options: { beginner: 'Beginner', advanced: 'Advanced' }, default: -> (model, resource, view, field) { Time.now.hour < 12 ? 'advanced' : 'beginner' }
```

## Help Text

Sometimes you will need a some extra text to better explain what the fied is used for. You can achieve this by using the `help` method.

This can be either text or HTML.

```ruby
# using text value
code :custom_css, theme: 'dracula', language: 'css', help: "This enables you to edit the user's custom styles."

# using HTML value
password :password, help: 'You may verify the password strength <a href="http://www.passwordmeter.com/">here</a>.'
```

## Nullable

On a regular basis, Avo is trying to store a value for each field. There are cases, where you may prefer to explicitly instruct Avo to store a `NULL` value in the database when the field is empty.
In order to achieve this, you may use `nullable` method, which converts nil and empty in `NULL`.

You may also define which values are interpreted as `NULL` using the `null_values` method.

```ruby
# using default options
status :updated_status, failed_when: [:closed, :rejected, :failed], loading_when: [:loading, :running, :waiting], nullable: true

# using custom null values
textarea :body, nullable: true, null_values: ['0', '', 'null', 'nil']
```

## As Link To Resource

Sometimes you may want a field in the table to contain a link to the resource, so that you don't have to scroll to the end of the table to click on the `show` icon. This can be achieved using `as_link_to_resource` method, which is available only on index
and only for `Id`, `Text` and `Gravatar` fields.

```ruby
# for id field
id as_link_to_resource: true

# for text field
text :name, as_link_to_resource: true

# for gravatar field
gravatar :email, as_link_to_resource: true
```