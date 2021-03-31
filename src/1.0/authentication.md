# Authentication

[[toc]]

## Filter out requests

You probably do not want to allow Avo access to everybody. If you're using [devise](https://github.com/heartcombo/devise) in your app, use this block to filter out requests to it in your `routes.rb` file.

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

Check out more examples of authentication on [sidekiq's authentication section](https://github.com/mperham/sidekiq/wiki/Monitoring#authentication).

## `authenticate_with` method

Alternatively you can user the `authenticate_with` config attribute. It takes a block and evaluates it in Avo's `ApplicationController` as a `before_action`.

```ruby
# config/initializers/avo.rb
Avo.configure do |config|
  config.authenticate_with do
    authenticate_admin_user
  end
end
```

## Customize the `current_user` method

If you're not using [devise](https://github.com/heartcombo/devise) for authentication you may customize the `current_user` method to something else. The `current_user_method` key takes a block parameter (shorthand or full block).

```ruby
# config/initializers/avo.rb
Avo.configure do |config|
  config.current_user_method do
    current_admin
  end
end
```

Using the block shorthand notation:

```ruby
# config/initializers/avo.rb
Avo.configure do |config|
  config.current_user_method(&:current_admin)
end
```
