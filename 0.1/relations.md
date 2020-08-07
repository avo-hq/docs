---
prev: ./fields
---

# Relations

[[toc]]

## Belongs to

You can use `belongs_to` like so:

```ruby
belongs_to :user
```

## Has And Belongs To Many

You can use `has_and_belongs_to_many` like so:

```ruby
has_and_belongs_to_many :users
```

## Has Many

You can use `has_many` like so:

```ruby
has_many :posts
```

## Has One

You can use `has_one` like so:

```ruby
has_one :admin
```