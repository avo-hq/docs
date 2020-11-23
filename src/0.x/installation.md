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