# Customize Avo

[[toc]]

## Views

You can customize some layout partials. Run `bin/rails generate avo:views` to create the default partials.

### Logo

In the `app/views/vendor/avo/partials` directory you will find the `_logo.html.erb` partial which you may customize however you want. It will be displayed in place of Avo's logo.

<img :src="$withBase('/assets/img/customization/logo.jpg')" alt="Avo logo customization" class="border" />

### Header

The `_header.html.erb` partial enables you to customize the name and link of your app.

<img :src="$withBase('/assets/img/customization/header.jpg')" alt="Avo header customization" class="border" />

### Footer

The `_footer.html.erb` partial enables you to customize the footer of your admin.

<img :src="$withBase('/assets/img/customization/footer.jpg')" alt="Avo footer customization" class="border" />
