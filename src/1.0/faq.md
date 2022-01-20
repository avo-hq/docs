# FAQ

[[toc]]

## Why don't regular url helpers work as expected?

When writing rails code somewhere in Avo domain you might want to use your regular url helpers like below:

```ruby{2}
field :partner_home, as: :text, as_html: true do |model, *args|
  partner_home_url(model)
end
```

This will not work because Avo will execute that code inside itself, a Rails engine. So per the [Rails documentation](https://guides.rubyonrails.org/engines.html#routes) you have to preprend the helper with `main_app` for it to work. Rails need to know for which engine should it search the route. So the above query becomes this 👇


```ruby{2}
field :partner_home, as: :text, as_html: true do |model, *args|
  main_app.partner_home_url(model)
end
```

## I want to give access to different kind of users to different resources.

You can do that using Pundit scopes and the Authorization feature. You create a policy for that resource and set the condition on the `index?` method. More on that on the [authorization](authorization) page and Pundit's [docs](https://github.com/varvet/pundit).

Authorization is a Pro feature for Avo. Please let us know if you need a trial key to test it out.

## How can I set a homepage for the admin section

You can do that using the [home_path](customization.html#home-path) configuration. You just set `config.home_path = "/avo/resources/posts"` (or whatever path you'd like) in the Avo initializer and you're all set up. The user will be redirected to that path when navigating to `/avo`.


```ruby{8}
# config/initializers/avo.rb

Avo.configure do |config|
  config.root_path = '/avo'
  config.license = 'pro'
  config.license_key = ENV['AVO_LICENSE_KEY']
  config.id_links_to_resource = true
  config.home_path = '/avo/resources/posts'
  config.set_context do
    {
      foo: 'bar',
      user: current_user,
      params: request.params,
    }
  end
end
```

## I want to have 2 different resources maped to the same model with different type

This depends on your setup:

1. If you have [Rails STI](https://guides.rubyonrails.org/association_basics.html#single-table-inheritance-sti), then it will work. Avo knows how to handle STI models. So you'll have two models and an Avo resource for each one. That will render two resources in your admin panel's sidebar.
2. You don't have Rails STI but something custom. Then the response is it depends. Because something custom is... custom, we offer a few mechanisms to get over that.

If you have one model `User`, then you'll have one Avo resource `UserResource`.
Then you can customize different things based your requirements. Like if for instance you want to show only some types of users on the `Index` view, you can use [custom query scopes](https://docs.avohq.io/1.0/customization.html#custom-query-scopes) to hide specific types (if that's what you want to do).
Same if you want to [show/hide fields](https://docs.avohq.io/1.0/field-options.html#field-visibility) based on the type of resource or type of user.

All in all **we're confident you'll have the necessary instruments** you need to build your admin.
