# Authorization

[[toc]]

When you share access to Avo with your clients or large teams, you may want to restrict access to a resource or a subset of resources. One example may be that only admin level users may delete records. Avo leverages Pundit under the hood to manage the role-based authentication.

## Policies

To generate a new policy, just run the regular pundit `bin/rails g pundit:policy Post`.

<notice>
  If this is a new app you need to install pundit first <code>bin/rails g pundit:install</code>.
</notice>

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
