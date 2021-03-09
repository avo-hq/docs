# Associations

[[toc]]

One of the most amazing things about Ruby on Rails is how easy it is to create [Active Record associations](https://guides.rubyonrails.org/association_basics.html) between models. We try to keep the same simple approach in Avo too.

At the moment, Avo supports four association types.

## Belongs to

```ruby
field.belongs_to :user
```

When you add a `BelongsTo` association to a model, you will see three different field types.

On the `Index` view, you'll see a column with the [`@title`](./resources.html#setting-the-title-of-the-resource) value of the associated model.

<img :src="$withBase('/assets/img/associations/belongs-to-index.jpg')" alt="Belongs to index" class="border mb-4" />

On the `Show` view, you'll see a link to the associated model.

<img :src="$withBase('/assets/img/associations/belongs-to-show.jpg')" alt="Belongs to show" class="border mb-4" />

On the `Edit` and `Create` views, you'll see a drop-down element with the available records. Here you may change the associated model.

<img :src="$withBase('/assets/img/associations/belongs-to-edit.jpg')" alt="Belongs to edit" class="border mb-4" />

## Has One

The `HasOne` association shows the unfolded view of you `HasOne` association. It's like peaking on the `Show` view of that association. You also get the _Attach_/_Detach_ button to easily switch records.

```ruby
field.has_one :admin
```

<img :src="$withBase('/assets/img/associations/has-one.jpg')" alt="Has one" class="border mb-4" />

## Has Many

The `HasMany` field is visible only on the `Show` page. Below the regular fields panel, you will see a new panel with the model's associated records.

```ruby
field.has_many :projects
```

<img :src="$withBase('/assets/img/associations/has-many-table.jpg')" alt="Has many table" class="border mb-4" />

Here you may attach more records by clicking the "Attach" button.

<img :src="$withBase('/assets/img/associations/has-many-attach-modal.jpg')" alt="Has many attach" class="border mb-4" />

In a similar fashion, you may detach a model using the detach button.

<img :src="$withBase('/assets/img/associations/has-many-detach.jpg')" alt="Has many detach" class="border mb-4" />

### Has many through

The `HasMany` association also supports the `:through` option.

```ruby
field.has_many :members, through: :memberships
```

## Has And Belongs To Many

The `HasAndBelongsToMany` association works similarly to `HasMany`.

```ruby
field.has_and_belongs_to_many :users
```