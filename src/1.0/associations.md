# Associations

[[toc]]

One of the most amazing things about Ruby on Rails is how easy it is to create [Active Record associations](https://guides.rubyonrails.org/association_basics.html) between models. We try to keep the same simple approach in Avo too.

## Belongs to

```ruby
field :user, as: :belongs_to
```

When you add a `BelongsTo` association to a model, you will see three different field types.

On the **Index** view, you'll see a column with the [`@title`](./resources.html#setting-the-title-of-the-resource) value of the associated model.

<img :src="$withBase('/assets/img/associations/belongs-to-index.jpg')" alt="Belongs to index" class="border mb-4" />

On the **Show** view, you'll see a link to the associated model.

<img :src="$withBase('/assets/img/associations/belongs-to-show.jpg')" alt="Belongs to show" class="border mb-4" />

On the **Edit** and **Create** views, you'll see a drop-down element with the available records. Here you may change the associated model.

<img :src="$withBase('/assets/img/associations/belongs-to-edit.jpg')" alt="Belongs to edit" class="border mb-4" />

### Polymorphic `belongs_to`

To use a polymorphic relation you need to add the `polymorphic_as` and `types` properties.

```ruby{12}
class CommentResource < Avo::BaseResource
  self.title = :id

  field :id, as: :id
  field :body, as: :textarea
  field :excerpt, as: :text, show_on: :index, as_description: true do |model|
    ActionView::Base.full_sanitizer.sanitize(model.body).truncate 60
  rescue
    ""
  end

  field :commentable, as: :belongs_to, polymorphic_as: :commentable, types: [::Post, ::Project]
end
```

## Has One

The `HasOne` association shows the unfolded view of you `HasOne` association. It's like peaking on the **Show** view of that association. You also get the _Attach_/_Detach_ button to easily switch records.

```ruby
field :admin, as: :has_one
```

<img :src="$withBase('/assets/img/associations/has-one.jpg')" alt="Has one" class="border mb-4" />

## Has Many

The `HasMany` field is visible only on the **Show** page. Below the regular fields panel, you will see a new panel with the model's associated records.

```ruby
field :projects, as: :has_many
```

<img :src="$withBase('/assets/img/associations/has-many-table.jpg')" alt="Has many table" class="border mb-4" />

Here you may attach more records by clicking the "Attach" button.

<img :src="$withBase('/assets/img/associations/has-many-attach-modal.jpg')" alt="Has many attach" class="border mb-4" />

In a similar fashion, you may detach a model using the detach button.

<img :src="$withBase('/assets/img/associations/has-many-detach.jpg')" alt="Has many detach" class="border mb-4" />

### Has many through

The `HasMany` association also supports the `:through` option.

```ruby
field :members, as: :has_many, through: :memberships
```

## Has And Belongs To Many

The `HasAndBelongsToMany` association works similarly to `HasMany`.

```ruby
field :users, as: :has_and_belongs_to_many
```

## Single Table Inheritance (STI)

When you have models that share behavior and fields through with STI, Rails will cast the model as the final class no matter how you query it.

```ruby
# app/models/user.rb
class User < ApplicationRecord
end

# app/models/super_user.rb
class SuperUser < User
end

# User.all.map(&:class) => [User, SuperUser]
```

For example, when you have two models, `User` and `SuperUser` with STI, when you call `User.all` Rails will return an instance of `User` and an instance of `SuperUser`. That confuses Avo in producing the proper resource of `User`. That's why when you deal with STI, the final resource `SuperUserResource` should receive the underlying `model_class` so Avo knows which model it represents.

```ruby{4}
class SuperUserResource < Avo::BaseResource
  self.title = :name
  self.includes = []
  self.model_class = ::SuperUser

  field :id, as: :id
  field :name, as: :text
end
```

## Add scopes to associations

When displaying associations, you might want to scope out some associated records. You can use the `scope` option to do that.

```ruby{5,15}
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
  field :comments, as: :has_many, scope: -> { starts_with :a }
end
```

Now, the `comments` query on the user `Index` page will have the `starts_with` scope attached.

<img :src="$withBase('/assets/img/associations/scope.jpg')" alt="Association scope" class="border mb-4" />

## Show/hide buttons

You will want to control the visibility of the attach/detach/create/destroy/actions buttons that are visible throughout your app. You can use the policy methods to do that.

Find out more on the [authorization](authorization#associations) page.

<img :src="$withBase('/assets/img/associations/authorization.jpg')" alt="Associations authorization" class="border mb-4" />

## Add custom labels to the associations pages

You might want to change the name that appears on the association page. For example, if you're displaying a `team_members` associations, by default your users will see `Team members` as the title, but you'd like to show them `Members`.

You can customize that using [fields localization](localization.html#localizing-fields).

<img :src="$withBase('/assets/img/associations/custom-label.jpg')" alt="Custom label" class="border mb-4" />
