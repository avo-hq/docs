---
title: Home
next: ./resources
---

# Installation

- [Requirements](#requirements)
- [Installing Avocado](#installing-avocado)


# Requirements

 - Rails > 6.0
 - Ruby 2.6

# Installing Avocado

Run `gem install avocado.gem` (you need to pass a relative path to `avocado.gem`), add `gem 'avocado'` in your Ruby on Rails app and run `bundle`.

Run `rails generate avo:install` to generate the initializer and add the route.

# Authorization

Although Avocado doesn't require [devise](https://github.com/heartcombo/devise), you can use it to filter out requests to it in your `routes.rb` file.

```ruby
authenticate :user, -> user { user.is_admin? } do
  mount Avocado::Engine => '/avocado'
end
```
