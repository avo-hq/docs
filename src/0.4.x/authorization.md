# Authorization

[[toc]]

When you share access to Avo with your clients or large teams, you may want to restrict access to a resource or a subset of resources. One example may be that only admin level users may delete records. Avo leverages Pundit under the hood to manage the role-based authentication.

## Policies

To generate a new policy, just run the regular pundit `bin/rails g pundit:policy Post`.

<div class="rounded-md bg-blue-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3 flex-1 md:flex md:justify-between">
      <div class="text-sm leading-5 text-blue-700">
        If this is a new app you need to install pundit first <code>bin/rails g pundit:install</code>.
      </div>
    </div>
  </div>
</div>

With this new policy, you may control what every type o user can do with Avo. The policy has the default methods for the regular controller actions: `index?`, `show?`, `create?`, `new?`, `update?`, `edit?` and `destroy?`.

These methods control whether the resource appears on the sidebar, if the view/edit/destroy buttons are visible or if a user has access to those index/show/edit/create pages.

### index?

`index?` is used to display the resources on the sidebar, display the related HasMany resources view and restrict access to the resources `Index` view.

### show?

When setting `show?` to `false`, the user will not see the show icon on the resource row and will not have access to the `Show` view of a resource.

### create?

The `create?` method will prevent the users from creating a resource.

### new?

The `new?` method will control whether the users see the `Create new RESOURCE` button and their access to the `New` view.

### edit?

`edit?` to `false` will hide the edit button on the resource row and prevent the user from seeing the edit view.

### update?

`update?` to `false` will prevent the user from updating a resource.

### destroy?

`destroy?` to `false` will prevent the user from destroying a resource and hiding the delete button.

## Scopes

In the generated policy, you may also specify a scope for the `Index` view.

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

Now, Avo will use `avo_index?` instead of `index?` to manage the `Index` view authorization.
