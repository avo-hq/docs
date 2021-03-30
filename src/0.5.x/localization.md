# Localization (i18n)

Avo leverages Rails powerful I18n translations module. When you run `bin/rails avo:install` Rails will generate for you the `avo.en.yml` translation file. This file will automatically be injected into the I18n translations module.

## Localizing resources

Let's say you want to localize a resource. All you need to do is add a `self.translation_key` class attribute in the `Resource` file. This will tell Avo to use that translation key to localize this resource. This will change the labels of that resource everywhere in Avo.

```ruby{4}
# app/avo/resources/user_resource.rb
class UserResource < Avo::BaseResource
  self.title = :name
  self.translation_key = 'avo.resource_translations.user'
end
```

```yml{6-10}
# avo.es.yml
es:
  avo:
    dashboard: 'Dashboard'
    # ... other translation keys
    resource_translations:
      user:
        zero: 'usuarios'
        one: 'usuario'
        other: 'usuarios'
```

## Localizing fields

Similarly, you can even localize fields. All you need to do is add a `translation_key:` option on the field declaration.


```ruby{8}
# app/avo/resources/project_resource.rb
class ProjectResource < Avo::BaseResource
  self.title = :name

  field :id, as: :id
  # ... other fields
  field :files, as: :files, translation_key: 'avo.field_translations.file'
end
```

```yml{6-10}
# avo.es.yml
es:
  avo:
    dashboard: 'Dashboard'
    # ... other translation keys
    field_translations:
      file:
        zero: 'archivos'
        one: 'archivo'
        other: 'archivos'
```

## Setting the locale

Setting the locale for Avo is simple. Just use the `config.locale = 'en-US'` config attribute.


```ruby{2}
Avo.configure do |config|
  config.locale = 'en-US'
end
```

## Re-generate the locale

When updating Avo please run `bin/rails generate avo:locales` to re-generate the locales file.
