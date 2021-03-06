# Authorization

[[toc]]

When you share access to Avo with your clients or large teams, you may want to restrict access to a resource or a subset of resources. One example may be that only admin level users may delete records. Avo leverages Pundit under the hood to manage the role-based authentication.

## Policies

To generate a new policy, just run the regular pundit `bin/rails g pundit:policy Post`.

**If this is a new app you need to install pundit first <code>bin/rails g pundit:install</code>.**

With this new policy, you may control what every type o user can do with Avo. The policy has the default methods for the regular controller actions: `index?`, `show?`, `create?`, `new?`, `update?`, `edit?` and `destroy?`.

These methods control whether the resource appears on the sidebar, if the view/edit/destroy buttons are visible or if a user has access to those index/show/edit/create pages.

### index?

`index?` is used to display the resources on the sidebar, display the related HasMany resources view and restrict access to the resources **Index** view.

### show?

When setting `show?` to `false`, the user will not see the show icon on the resource row and will not have access to the **Show** view of a resource.

### create?

The `create?` method will prevent the users from creating a resource. This will also apply to the `Create new {model}` button on the relationship show page.

### new?

The `new?` method will control whether the users see the `Create new RESOURCE` button and their access to the `New` view.

### edit?

`edit?` to `false` will hide the edit button on the resource row and prevent the user from seeing the edit view.

### update?

`update?` to `false` will prevent the user from updating a resource.

### destroy?

`destroy?` to `false` will prevent the user from destroying a resource and hiding the delete button.


## Associations

When using relationships, you would like to set policies for `creating` new resources on the relationship, allowing to `attach` or `detach` relevant model. Avo makes this easy using a straight-forward naming schema.

For the creation of a new resource from the relationship show page, you can use the `create?` method defined above to limit the display of the `Create new {model}` button.

### attach_{model}?

When you have a Post resource and a Comment resource and you want to authorize which users can add comments to a post, you should define an `attach_comment?` policy on your post model's policy class.

If the name of you model is PascalCased like `MainUser`, you should define the policy as `attach_main_user?`.

If you define your fields as `field :post, as: :has_one` and `field :posts, as: :has_many`, be aware that you have to define the two policy methods, one for `post` as `attach_post?` and one for `posts` as `attach_posts?`.

### detach_{model}?

`detach` method works similarly to `attach` one, but for detaching.

## Scopes

In the generated policy, you may also specify a scope for the **Index** view.

```ruby{3-9}
class PostPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(published: true)
      end
    end
  end
end
```

## Using different policy methods

By default Avo will use the usual generated Pundit methods (`index?`, `show?`, `create?`, `new?`, `update?`, `edit?` and `destroy?`). But maybe, in your app, you're already using these methods and would like to use different ones for Avo. You may override these methods inside your configuration with a simple map using the `authorization_methods` key.


```ruby{6-14}
Avo.configure do |config|
  config.root_path = '/avo'
  config.app_name = 'Avocadelicious'
  config.license = 'pro'
  config.license_key = ENV['AVO_LICENSE_KEY']
  config.authorization_methods = {
    index: 'avo_index?',
    show: 'avo_show?',
    edit: 'avo_edit?',
    new: 'avo_new?',
    update: 'avo_update?',
    create: 'avo_create?',
    destroy: 'avo_destroy?',
  }
end
```

Now, Avo will use `avo_index?` instead of `index?` to manage the **Index** view authorization.
