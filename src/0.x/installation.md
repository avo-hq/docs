---
prev: /0.x/
---

# Installation

[[toc]]


## Requirements

- Ruby on Rails > 6.0
- Ruby 2.6

## Installing Avo

1. Add `gem 'avo'` to your `Gemfile`
1. Run `bundle install`.
1. Run `bin/rails generate avo:install` to generate the initializer and add Avo to the `routes.rb` file.
1. [Generate an Avo Resource](resources)

## Authorization

You probably would not want to allow anyone access to Avo. If you're using [devise](https://github.com/heartcombo/devise) in your app, use this block to filter out requests to it in your `routes.rb` file.

```ruby
authenticate :user do
  mount Avo::Engine => '/avo'
end
```

You may also add custom user validation such as `user.admin?` to only permit a subset of users to your Avo instance.

```ruby
authenticate :user, -> user { user.admin? } do
  mount Avo::Engine => '/avo'
end
```

### Adding the license key

After you purchase an Avo license add it to your `config/initializers/avo.rb` file along with changing the license type from `community` to `pro`.

```ruby{5-6}
Avo.configure do |config|
  config.root_path = '/avo'
  config.app_name = 'The most amazing rails app'
  config.locale = 'en-US'
  config.license = 'pro'
  config.license_key = '************************' # or use ENV['AVO_LICENSE_KEY']
end
```