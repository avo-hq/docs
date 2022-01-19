# FAQ

[[toc]]

## Why don't regular url helpers work as expected?

When writing rails code somewhere in Avo domain you might want to use your regular url helpers like below:

```ruby{3}
field :partner_home, as: :text, as_html: true do |model, *args|
  partner_home_url(model)
end
```

This will not work because Avo will execute that code inside itself, a Rails engine. So per the [Rails documentation](https://guides.rubyonrails.org/engines.html#routes) you have to preprend the helper with `main_app` for it to work. Rails need to know for which engine should it search the route. So the above query becomes this 👇


```ruby{3}
field :partner_home, as: :text, as_html: true do |model, *args|
  main_app.partner_home_url(model)
end
```

