# Fields

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

Avocado will try to indentify the snake case version of your field. But, if you want you can give it a name that's different from the field itself.

```ruby
text :body, name: 'The body of the post'
```

# Showing / Hiding fields

You may want to display a field in the Show, Create & Edit

## Text field

