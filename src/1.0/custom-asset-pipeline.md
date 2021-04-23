# Custom asset pipeline

[[toc]]

When creating custom tools or fields you might want to import assets (javascript and stylesheets files). You can do that so easy from v1.3.
Avo's asset pipeline is abstracted away and you can use your own pipeline to bring new assets in.

When you run `bin/rails generate avo:eject :head` a new partial will be created where you can add you assets.

## Webpacker

*Instructions below are for Webpacker version 6. Version 5 has different paths (`app/javacript/packs`).*

Create `avo_application.js` and `avo_application.css` inside `app/packs/entrypoints` with the desired scripts and styles.
Then add them to Avo using the `head.html` partial.

```erb
# app/views/avo/partials/_head.html.erb

<%= javascript_pack_tag 'avo_application' %>
<%= stylesheet_pack_tag 'avo_application', media: 'all' %>
```

## Sprockets

Create `avo_application.js` and `avo_application.css` inside `app/assets/javascripts` and `app/assets/stylesheets` with the desired scripts and styles.

```erb
# app/views/avo/partials/_head.html.erb

<%= javascript_include_tag 'avo_application' %>
<%= stylesheet_link_tag 'avo_application', media: 'all' %>
```
