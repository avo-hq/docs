# Upgrade guide

[[toc]]

## Upgrade from 2.4 to 2.5

### Change the way the scope is declared in associations

We changed how we add scopes to associations to make the API more flexible and extendable. You have to append `query.` to the scope.

Also, you now have access to a few more pieces of information inside that block. You can use the `parent`, which is the actual parent record (`User` in the example below) of that association.

```ruby{16,22}
# app/models/comment.rb
class Comment < ApplicationRecord
  belongs_to :user, optional: true

  scope :starts_with, -> (prefix) { where('LOWER(body) LIKE ?', "#{prefix}%") }
end

# app/models/user.rb
class User < ApplicationRecord
  has_many :comments
end

# app/avo/resource/user_resource.rb
class UserResource < Avo::BaseResource
  # Version before v2.5.0
  field :comments, as: :has_many, scope: -> { starts_with :a }
end

# app/avo/resource/user_resource.rb
class UserResource < Avo::BaseResource
  # Version after v2.5.0
  field :comments, as: :has_many, scope: -> { query.starts_with :a }
end
```

## Upgrade from 1.x to 2.0

### Update the gem

Run `bundle update avo` to update your gem. If you have a Pro license, follow [this guide](https://docs.avohq.io/2.0/licensing.html#upgrade-your-1-0-license-to-2-0) to update your license.

### Update your sidebar & profile partials

We changed some of the remaining partials to `view_component`s.

### View components

Renamed the following view components:

- `NavigationLinkComponent` to `SidebarItemComponent`.
- `NavigationHeadingComponent` to `SidebarHeadingComponent`.

### Translations

We added the following tags:

 - `avo.details`

Removed the following tags:

- `avo.resource_details`
- `avo.update_item`

### Controllers

Renamed `RelationsController` to `AssociationsController`
