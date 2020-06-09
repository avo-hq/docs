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

## Field conventions

Avocado will try to get the snake case version of your field. But, if you want you can give it a name that's different from the field itself you can use the `name` property.

```ruby
text :body, name: 'Post body'
```

In the following example it will get the `is_available` attribute and render the label and placeholder `Is available`.

```ruby
boolean :IsAvailable
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
boolean :IsWriter, format_using: -> (value) { value ? '👍' : '👎' }
```

## Sortable Fields

You may need to sort the records by one of your fields. You can do that using the `sortable` attribute.

```ruby
text :name, sortable: true
```

## Placeholder

Some fields support the `placeholder` attribute which will be passed to the inputs on `edit` and `new` views.

```ruby
text :name, placeholder: 'John Doe`
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

# Fields reference

## Boolean

The boolean field renders a `checkbox` `input` and supports the following options.

```ruby
boolean :is_published,
  name: 'Published',
  required: true,
  readonly: true,
  true_value: 'yes',
  false_value: 'no',
```

### Customize true/false values

You might store the value differently than `1` and `0`. You may customize those values using `true_value` and `false_value`.

## Boolean Group

The boolean group can be used to update a Hash with string keys and boolean values in the database.

```ruby
# Example boolean group hash
{
  admin: true,
  manager: true,
  creator: true,
}
```

```ruby
boolean_group :roles,
  name: 'User roles',
  required: true,
  readonly: true,
```

## Date

The Date field may be used to display date values. The `edit` view of the picker is using flatpickr. You may use the [formatting tokens](https://flatpickr.js.org/formatting/) to format the `edit` element and the moment.js [tokens](https://momentjs.com/docs/#/displaying/format/) to display the `index` and `show` element.

```ruby
boolean_group :roles,
  name: 'User roles',
  placeholder: 'The date',
  required: true,
  readonly: true,
  first_day_of_week: 1, # 1 is Monday (default), 7 is Sunday
  picker_format: 'Y-m-d', # flatpickr date forma
  format: 'YYYY-MM-DD' # momentjs date format
```

## DateTime

The DateTime field is similar to the Date field.

```ruby
datetime :created_at,
  name: 'User joined',
  required: true,
  readonly: true,
  first_day_of_week: 1, # 1 is Monday (default), 7 is Sunday
  picker_format: 'Y-m-d', # flatpickr date format
  format: 'YYYY-MM-DD', # momentjs date format
  time_24hr: true, # Whether to display the field in a 24 hour format
  timezone: 'PST' # The timezone in which to display the time
```

## File

The File field may be used to attach files using the [Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html) module.

```ruby
file :avatar,
  name: 'User avatar',
  required: true,
  readonly: true,
  is_avatar: true, # Whether to show the image next to the model in searches. Also sets is_image: true
  is_image: true # Whether the file is an image
```

## Files

The File field may be used to attach files using the [Active Storage](https://edgeguides.rubyonrails.org/active_storage_overview.html) module.

```ruby
files :documents,
  name: 'User docs',
  required: true,
  readonly: true,
  is_image: true # Whether the files are images
```

## ID

The ID field is used to show the record's id.

```ruby
id :ID
```

## Number

The number field renders a `number` `input` and supports the following options:

```ruby
number :age,
  name: "User's age",
  required: true,
  readonly: true,
  placeholder: 'Happy Birthday!',
  format_using: -> (value) { "🥂 #{value}" }
  min: 0,
  max: 120,
  step: 5
```

## Password

The password field renders a `password` `input` and supports the following options:

```ruby
password :password,
  name: 'The password',
  required: true,
  readonly: true,
  placeholder: 'secret',
```

## Select

The select field renders a `select` element and supports the following options:

```ruby
select :type,
  options: { large: 'Large container', medium: 'Medium container', small: 'Tiny container' }, # The options that should be listed in the dropdown
  display_with_value: true, # Wether to display the values of the labels
  placeholder: 'Choose the size of the container.'
```

On `index` and `show` views you may want to display the values and not the labels off the options. You may change that using `display_with_value`.

## Text

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

# Relations


