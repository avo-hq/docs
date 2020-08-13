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

1. [Sign up](https://avohq.io) for early access to get a preview `TOKEN`
1. **Locally** run `bundle config https://rubygems.pkg.github.com/avocadohq TOKEN`
1. Add `gem 'avo', source: 'https://rubygems.pkg.github.com/avocadohq'` in your app's `Gemfile`
1. Run `bundle install`.
1. Run `bin/rails generate avo:install` to generate the initializer and add the route.

# Authorization

Probably you would not want to allow anyone access to Avo. Although using Avo doesn't require [devise](https://github.com/heartcombo/devise), you can use it to filter out requests to it in your `routes.rb` file.

```ruby
authenticate :user, -> user { user.is_admin? } do
  mount Avo::Engine => '/avo'
end
```

# Deploying with CI

For `bundler` to be able to install the gem on automated systems like CI systems it needs authenticate with the source server.
It does that using an environment variable with the authentication token.

```
BUNDLE_RUBYGEMS__PKG__GITHUB__COM=TOKEN
```

# Deploying to Heroku

You may add the environment variable using `config:set`.

```bash
heroku config:set BUNDLE_RUBYGEMS__PKG__GITHUB__COM=TOKEN
```
