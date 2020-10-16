---
title: Getting started
next: ./resources
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

<!-- 1. [Sign up](https://avohq.io) for early access to get a preview `TOKEN`
1. **Locally** run `bundle config packager.avohq.io TOKEN`
1. Add `gem 'avo', source: 'https://packager.avohq.io/avo-hq'` in your app's `Gemfile` -->

## Authorization

You probably would not want to allow anyone access to Avo. Although using Avo doesn't require [devise](https://github.com/heartcombo/devise), you can use it to filter out requests to it in your `routes.rb` file.

```ruby
authenticate :user, -> user { user.is_admin? } do
  mount Avo::Engine => '/avo'
end
```

<!-- ## Deploying with CI

For `bundler` to install the gem in automated processes like CI systems, it needs authenticate with the source server.
It does that using an environment variable with the authentication token.

```env
BUNDLE_PACKAGER__AVOHQ__IO={THE_LICENSE_TOKEN_FROM_AVOHQ.IO}
```

## Deploying to Heroku

You may add the environment variable using `config:set`.

```env
heroku config:set BUNDLE_PACKAGER__AVOHQ__IO={THE_LICENSE_TOKEN_FROM_AVOHQ.IO}
``` -->
