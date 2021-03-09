# Fields reference

[[toc]]

## Defining fields

Each Avo resource has a `fields` method that registers your `Resource`'s fields. Avo ships with a variety of fields like `text`, `textarea`, `number`, `password`, `boolean`, `select`, and others.

To add a field you need to declare it in the `fields` method like so:

```ruby
def fields(request)
  field.text :name
end
```

This will create a text input field that will display & update the `name` field on that model.

The `fields` method has the `request` parameter that you can use to conditionally enable fields or change the options.

## Field conventions

When you declare a field you specify the database row that's specific for that field. Usually that's a snake case value. When it will be displayed to the user, Avo will convert the snake case value of the field to a humanized version.

In the following example, the `is_available` id will render the label of the field as *Is available*.

```ruby
field.boolean :is_available
```

<img :src="$withBase('/assets/img/fields-reference/naming-convention.jpg')" alt="Field naming convention" class="border mb-4" />

If you want to customize the name, you can pick a different label than the id with the `name` property.

```ruby
field.boolean :is_available, name: 'Availability'
```

<img :src="$withBase('/assets/img/fields-reference/naming-convention-override.jpg')" alt="Field naming convention override" class="border mb-4" />

## Showing / Hiding fields on different views

You may want to display a field in the **Create** and **Edit** view and hide it **Index** and **Show** view.

For scenarios like that you may use the visibility helpers `hide_on`, `show_on`, `only_on` and `except_on` methods. Available options for these methods are: `:create`, `:edit`, `:index`, `:show`, `:forms` (both `:create` and `:edit`) and `:all` (only for `hide_on` and `show_on`).

Be aware that a few fields are designed in such a way that a some methods and/or options won't work (ex: the `id` field is hidden in `Edit` and `Create`).

```ruby
field.text :body, hide_on: [:index, :show]
```

## Field visibility

You might want to restrict some fields to be accessible only if a certain condition applies. Like hide fields if the user is not an admin.

You can use the `can_see` block to do that.

```ruby
field.boolean :is_featured, can_see: -> () { user.is_admin? }
```

Now, the `is_featured` field will be hidden from all views for users that are not admins.

## Computed Fields

At times you might need to show a field with a value that you don't hold in a database row. In that case, you may compute the value using a block that receives the `model` (the actual database record), the `resource` (the configured Avo resource), and the current `view`. With that information you can compute what to show on this field in the **Index** and **Show** views (computed fields are automatically hidden in `Edit` and `Create`).

```ruby
field.boolean 'Has written something' do |model, resource, view|
  model.posts.present?
end
```

This example will display a boolean field with the value computed from your custom block.

## Fields Formatter

Sometimes you will want to process the database value before showing it to the user. You may do that using `format_using` block that receives the `value` of that field as a parameter.

```ruby
field.text :is_writer, format_using: -> (value) { value.present? ? '👍' : '👎' }
```

This example snippet will make the `:is_writer` field to generate emojis instead of 1/0 values.

<img :src="$withBase('/assets/img/fields-reference/fields-formatter.jpg')" alt="Fields formatter" class="border mb-4" />

## Sortable fields

One of the most common operations with database records is sorting the records by one of your fields. For that Avo makes it easy using the `sortable` option.

Just add it to any field to make that column sortable in the **Index** view.

```ruby
field.text :name, sortable: true
```

<img :src="$withBase('/assets/img/fields-reference/sortable-fields.jpg')" alt="Sortable fields" class="border mb-4" />

## Placeholder

Some fields support the `placeholder` option which will be passed to the inputs on **Edit** and **New** views when they are empty.

```ruby
field.text :name, placeholder: 'John Doe'
```

<img :src="$withBase('/assets/img/fields-reference/placeholder.jpg')" alt="Placeholder option" class="border mb-4" />

## Required

When you will want to show to the user that a field is mandatory. You may use the `required` option that will add an asterisk to that field, indicating that it's mandatory.

```ruby
field.text :name, required: true
```

<img :src="$withBase('/assets/img/fields-reference/required.jpg')" alt="Required option" class="border mb-4" />

However, you will need to add your validation logic to your model (`validates :name, presence: true`).

## Readonly

When you need to prevent the user from editing a field, the `readonly` option will render the field as `disabled`.

```ruby
field.text :name, readonly: true
```

<img :src="$withBase('/assets/img/fields-reference/readonly.jpg')" alt="Readonly option" class="border mb-4" />

## Default Value

When you need to give a default value to your one of your fields on the **Create** view, you may use the `default` block, which takes either a fixed value or a block.

```ruby
# using a value
field.text :name, default: 'John'

# using a callback function
field.select :level, options: { 'Beginner': :beginner, 'Advanced': :advanced }, default: -> (model, resource, view, field) { Time.now.hour < 12 ? 'advanced' : 'beginner' }
```

## Help text

Sometimes you will need some extra text to explain better what the field is used for. You can achieve that by using the `help` method.

The value can be either text or HTML.

```ruby
# using text value
field.code :custom_css, theme: 'dracula', language: 'css', help: "This enables you to edit the user's custom styles."

# using HTML value
field.password :password, help: 'You may verify the password strength <a href="http://www.passwordmeter.com/">here</a>.'
```

<img :src="$withBase('/assets/img/fields-reference/help-text.jpg')" alt="Help text" class="border mb-4" />

## Nullable

When a user uses the _Save_ button, Avo is storing the value for each field in the database. There are cases where you may prefer to explicitly instruct Avo to store a `NULL` value in the database row when the field is empty. You do that by using the `nullable` option, which converts `nil` and empty values to `NULL`.

You may also define which values should be interpreted as `NULL` using the `null_values` method.

```ruby
# using default options
field.status :updated_status, failed_when: [:closed, :rejected, :failed], loading_when: [:loading, :running, :waiting], nullable: true

# using custom null values
field.textarea :body, nullable: true, null_values: ['0', '', 'null', 'nil', nil]
```

## Link to resource

Sometimes, on the **Index** view, you may want a field in the table to be a link to that resource, so that you don't have to scroll to the right to click on the `show` icon. You can use `link_to_resource` to change a table cell to be a link to that resource.

```ruby
# for id field
field.id link_to_resource: true

# for text field
field.text :name, link_to_resource: true

# for gravatar field
field.gravatar :email, link_to_resource: true
```

<img :src="$withBase('/assets/img/fields-reference/as-link-to-resource.jpg')" alt="As link to resource" class="border mb-4" />

You can add this property on `Id`, `Text`, and `Gravatar` fields.

Optionally you can enable the global config `id_links_to_resource`. More on that on the [id links to resource docs page](./customization.html#id-links-to-resource).