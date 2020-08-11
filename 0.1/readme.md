---
title: Home
next: ./dashboard
---

# Installation

- [Requirements](#requirements)
- [Installing Avo](#installing-avo)


# Requirements

 - Ruby on Rails > 6.0
 - Ruby 2.6

# Installing Avo

1. [Sign up](https://avohq.io) for early access and get `avo.gem`
1. Run `gem install avo.gem`
1. Add `gem 'avo'` in your Ruby on Rails app
1. Run `bundle install`.
1. Run `bin/rails generate avo:install` to generate the initializer and add the route.

# Authorization

Probably you would not want to allow anyone access to Avo. Although using Avo doesn't require [devise](https://github.com/heartcombo/devise), you can use it to filter out requests to it in your `routes.rb` file.

```ruby
authenticate :user, -> user { user.is_admin? } do
  mount Avo::Engine => '/avo'
end
```
