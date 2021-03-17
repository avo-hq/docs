# Licensing

Avo has two types of licenses. **Community edition** which is free and open source for personal and hobby projects and **Pro** for commercial usage.

## Community vs Pro

The Community version is filled with features that you can use today like [Resource management](./resources.html), quite a lot of [feature-rich](./fields-reference.html) [fields](./fields.html), out-of-the box [sorting](./fields-reference.html#sortable-fields), [filtering](./filters.html) and [actions](./actions.html) and all the [associations](./associations.html) you need.

## Adding the license key

After you purchase an Avo license add it to your `config/initializers/avo.rb` file along with changing the license type from `community` to `pro`.

```ruby{3-4}
# config/initializers/avo.rb
Avo.configure do |config|
  config.license = 'pro'
  config.license_key = '************************' # or use ENV['AVO_LICENSE_KEY']
end
```
