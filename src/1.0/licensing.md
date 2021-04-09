# Licensing

Avo has two types of licenses. **Community edition** which is free and open source for personal and hobby projects and **Pro** for commercial usage.

## Community vs Pro

The **Community version** has features that you can use today like [Resource management](./resources.html), quite a lot of [feature-rich](./field-options.html) [fields](./fields.html), out-of-the box [sorting](./field-options.html#sortable-fields), [filtering](./filters.html) and [actions](./actions.html) and all the [associations](./associations.html) you need.

The **Pro version** has [advanced authorization](./authorization.html) using Pundit and [localization support](./localization.html). In the future we'll add other features such as Dashboards, Custom fields and tools, Settings screens, Themes and more.

## Adding the license key

After you purchase an Avo license add it to your `config/initializers/avo.rb` file along with changing the license type from `community` to `pro`.

```ruby{3-4}
# config/initializers/avo.rb
Avo.configure do |config|
  config.license = 'pro'
  config.license_key = '************************' # or use ENV['AVO_LICENSE_KEY']
end
```

## Purchase a license

You can purchase a license on the [purchase](https://avohq.io/purchase/pro) page.

## License validation

### "Phone home" mechanism

Avo pings the [HQ](https://avohq.io) (the license validation service) with some information about the current Avo installation. You can find the full payload below.

```ruby
# HQ ping payload
{
  license: Avo.configuration.license,
  license_key: Avo.configuration.license_key,
  avo_version: Avo::VERSION,
  rails_version: Rails::VERSION::STRING,
  ruby_version: RUBY_VERSION,
  environment: Rails.env,
  ip: current_request.ip,
  host: current_request.host,
  port: current_request.port
}
```

That information helps us to identify your license and return a license valid/invalid response back to Avo.
The requests are made at boot time and every hour when you use Avo.
