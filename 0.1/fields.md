---
prev: ./fields-reference
next: ./relations
---

# Fields

[[toc]]

## Badge

The badge field can be used to display the status, condition of a value in the database. This field is intended only for
`index` and `show` pages. In order to modify the value shown by badge field, use another field: ex `text`, in combination with `hide_on: index`
and `hide_on: show`.

```ruby
badge :stage,
  map: { info: [:discovery, :idea], success: :done, warning: 'on hold', danger: :cancelled } # The mapping of custom values to badge values.
```

By default, the badge field supports four values: `info` (blue), `success` (green), `danger` (red), `warning` (yellow), having the possibility
to override and/or add values by providing `map` parameter.

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

## Code

The Code field generates a code editor using [vue-codemirror](https://github.surmon.me/vue-codemirror/), linked to a text field. On index, a code editor
 is not displayed.

```ruby
code :custom_css,
  theme: 'dracula',
  language: 'css'
```

### Customize Theme
You may customize the theme of the Code field using the theme method. It defaults to `material-darker`, but you can choose from: `material-darker`, `eclipse`,
 `dracula`. You can preview the themes here: [codemirror-themes](https://codemirror.net/demo/theme.html).

### Customize Syntax Highlighting
You may customize the programming language highlighting of the Code field using the language method. It defaults to `javascript`, but you can choose from: `css`, `dockerfile`,
 `htmlmixed`, `javascript`, `markdown`, `nginx`, `php`, `ruby`, `sass`, `shell`, `sql`, `vue`, `xml`.

## Country

Country field generates a `select` field that includes all [ISO 3166-1](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) countries.
You can easily choose to display the `name` of the countries in `index` and `show` views by declaring `display_name` to `true`.

```ruby
country :country,
  display_name: true # Option to display full name of countries instead of country code. Defaults to false.
```

## Currency

The currency field generates a `number` field that is automatically formatted using [Vue Currency Input](https://dm4t2.github.io/vue-currency-input/) to look
 currency alike. You may use `currency` and `locale` to specify the sign and format of the currency field. Be aware that `currency` defaults to `USD`, while
 `locale` defaults to `en-US`.

```ruby
currency :salary,
  currency: 'EUR', # Option to specify the currency. Defaults to USD.
  locale: 'de-DE', # Option to specify the locale formatting. Defaults to en-US.
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

## Gravatar

The Gravatar field is linked to the email from database, displaying the avatar image assigned to that email address in [Gravatar](https://en.gravatar.com/site/implement/images/) database. However, if
 the email address is stored in another column, you can specify that column.

On index, by default, the image is `rounded` and has size of `40 px`, but it can be changed by setting `rounded` to `false` and by specifying the `size` (in pixels) in field declaration.

On show, the image is always `squared` and the size is `responsive`.

You can customize the image shown when gravatar is not found by changing `default_url` (url) to custom image URL (for example company's logo).

```ruby
gravatar :email,
  rounded: false,
  size: 60,
  default_url: 'some image url'
```

## Heading
The Heading field is used to display a banner between different fields, such as a separator for big lists or header for different sections.
This field is not assigned to any column in the database.
```ruby
heading 'Address fields'
```
The options for this field include `as_html`, which renders your value as HTML.
```ruby
heading '<div class="underline text-gray-800 uppercase">Address fields</div>',
  as_html: true
```
On `index` the field is not visible, because it is not necessary.

## Hidden
The Hidden field is used to display a value in a hidden input, mostly used to pass any value that doesn't have to be changed by user but is
 required to save the form.
```ruby
hidden :group_id
```

## ID

The ID field is used to show the record's id.

```ruby
id :ID
```

## KeyValue

The keyvalue field gives you the chance to edit flat key-value pairs stored in JSON format in database.

```ruby
key_value :meta, # The database field ID
  key_label: 'Meta key', # Custom value for key header. Defaults to 'Key'.
  value_label: 'Meta value', # Custom value for value header. Defaults to 'Value'.
  action_text: 'New item', # Custom value for button to add a row. Defaults to 'Add'.
  delete_text: 'Remove item', # Custom value for button to delete a row.. Defaults to 'Delete'.
  disable_editing_keys: false, # Option to disable the ability to edit keys. Implies disabling to add rows. Defaults to false.
  disable_adding_rows: false, # Option to disable the ability to add rows. Defaults to false.
  disable_deleting_rows: false # Option to disable the ability to delete rows. Defaults to false.
```
You can easily customize the values displayed in the UI by mentioning custom values in `key_label`, `value_label`, `action_text` and `delete_text`
 properties when defining the field.

You can enforce some restrictions by removing the ability to edit the keys of the field, by setting `disable_editing_keys` to `true`. Be aware that
 this option will also disable adding rows as well. You can separately remove the ability to add new row by setting `disable_adding_rows` to `true`.
  Deletion of rows can be enforced by setting `disable_deleting_rows` to `true`.

On the index you have to click on `View` to see the KeyValue field value.

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

## Status

The status field is used to visually display the state of a column, supporting the following options:

```ruby
status :progress, # The database field ID
  failed_when: ['closed', 'rejected', 'failed'], # The values for 'failed' state (text displayed in red)
  loading_when: ['loading', 'running', 'waiting', 'in progress'] # The values for 'loading' state (spinner shown)
```

Be aware that `failed_when` defaults to 'failed', while `loading_when` defaults to both 'waiting' and 'running'.

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
