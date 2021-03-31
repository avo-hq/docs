---
prev: /1.0/
---

# Installation

[[toc]]


## Requirements

- Ruby on Rails >= 6.0
- Ruby >= 2.6
- Webpacker gem (we're working on removing this dependency)

## Installing Avo

1. Add `gem 'avo'` to your `Gemfile`
1. Run `bundle install`.
1. Run `bin/rails generate avo:install` to generate the initializer and add Avo to the `routes.rb` file.
1. [Generate an Avo Resource](resources)
