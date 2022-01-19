---
prev: /1.0/
---

# Installation

[[toc]]


## Requirements

- Ruby on Rails >= 6.0
- Ruby >= 2.6

## Installing Avo

1. Add `gem 'avo'` to your `Gemfile`
1. Run `bundle install`.
1. Run `bin/rails generate avo:install` to generate the initializer and add Avo to the `routes.rb` file.
1. [Generate an Avo Resource](resources)

## Next steps

To make sure your app is safely secured and you have access to all the features you need please follow the next steps.

1. Set up [authentication](authentication)
1. Set up [licensing](licensing)
