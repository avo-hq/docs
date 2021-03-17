# Actions

[[toc]]

Avo actions allow you to perform specific tasks on one or more of your records. For example, you might want to mark a user as active/inactive and optionally send a message that may be customized by the person that wants to run the action.

Once you attach an action to a resource using the `actions` method it will appear in the **Actions** dropdown.

<img :src="$withBase('/assets/img/actions/actions-dropdown.jpg')" alt="Actions dropdown" class="border mb-4" />

## Overview

Avo actions use two main methods. `handle` and `fields`.

```ruby{4-18,20-23}
class ToggleActive < Avo::BaseAction
  self.name = 'Toggle active'

  def handle(models:, fields:)
    models.each do |model|
      if model.active
        model.update active: false
      else
        model.update active: true
      end

      # Optionally you may send a notification with the message to that user.
      UserMailer.with(user: model).toggle_active(fields[:message]).deliver_later
    end

    succeed 'Perfect!'
  end

  fields do |field|
    field.boolean :notify_user, default: true
    field.text :message, default: 'Your account has been marked as inactive.'
  end
end
```

In the `fields` method, you may declare extra fields just as you do it in resources. The `fields` method is optional. You may have actions that don't have any fields attached.

```ruby
fields do |field|
  field.boolean :notify_user
  field.textarea :message, default: 'Your account has been marked as inactive.'
end
```

<img :src="$withBase('/assets/img/actions.jpg')" alt="Avo actions" class="border mb-4" />

The `handle` method is where the magic happens. This is where you put your action logic. In this method, you will have access to the selected `models` (if there's only one it will be automatically wrapped in an array) and, the values passed to the `fields`.

```ruby
def handle(models:, fields:)
  models.each do |model|
    if model.active
      model.update active: false
    else
      model.update active: true
    end

    # Optionally you may send a notification with the message to that user.
    UserMailer.with(user: model).toggle_active(fields[:message]).deliver_later
  end

  succeed 'Perfect!'
end
```

## Registering actions

To use an action, you need to declare it on the resource using the `actions` method.

```ruby{10-12}
class UserResource < Avo::BaseResource
  self.title = :name
  self.search = [:id, :first_name, :last_name]

  fields do |field|
    field.id
    # other fields
  end

  actions do |action|
    action.use ToggleInactive
  end
end
```

## Action responses

After an action runs, you may use a few methods to respond to the user. You may respond with just a message or with a message and an action.

The default response is to reload the page and show the _Action ran successfully_ message.

### Message responses

You will have two message response methods at your disposal `succeed` and `fail`. These will render out green or red alerts to the user.

```ruby{4}
def handle(models:, fields:)
  models.each do |model|
    if model.admin?
      fail "Can't mark inactive! The user is an admin."
    else
      model.update active: false
    end
  end
end
```

<img :src="$withBase('/assets/img/actions/actions-succeed-message.jpg')" alt="Avo succeed message" class="border inline-block mr-2" />
<img :src="$withBase('/assets/img/actions/actions-fail-message.jpg')" alt="Avo fail message" class="border inline-block" />

### Action responses

After you notify the user about what happened through a message, you may want to execute an action like `reload` (default action) or `redirect_to`. You may use message and action responses together.

```ruby{10}
def handle(models:, fields:)
  models.each do |model|
    if model.admin?
      fail "Can't mark inactive! The user is an admin."
    else
      model.update active: false
    end
  end

  reload
end
```

The available action responses are:

#### `reload`

When you use `reload`, a full-page reload will be triggered.

```ruby{7}
def handle(models:, fields:)
  models.each do |project|
    project.update active: false
  end

  succeed 'Done!'
  reload
end
```

#### `redirect_to`

`redirect_to` will execute a redirect to a new path of your app.

```ruby{7}
def handle(models:, fields:)
  models.each do |project|
    project.update active: false
  end

  succeed 'Done!'
  redirect_to '/avo/resources/users'
end
```

#### `download`

`download` will start a file download to your specified `path` and `filename`.

```ruby{12}
def handle(models:, fields:)
  models.each do |project|
    project.update active: false

    report_path = project.report_path
    report_filename = project.report_filename
  end

  succeed 'Done!'

  if report_path.present? and report_filename.present?
    download report_path, report_filename
  end
end
```

## Customization

```ruby{2-6}
class TogglePublished < Avo::BaseAction
  self.name = 'Mark inactive'
  self.message = 'Are you sure you want to mark this user as inactive?'
  self.confirm_button_label = 'Mark inactive'
  self.cancel_button_label = 'Not yet'
  self.no_confirmation = true
```

### Customize the message

You may update the `self.message` class attribute to customize the message if there are no fields present.

<!-- <img :src="$withBase('/assets/img/actions/actions-message.jpg')" alt="Avo message" class="border mb-4" /> -->

### Customize the buttons

You may customize the labels for the action buttons using `confirm_button_label` and `cancel_button_label`.

<img :src="$withBase('/assets/img/actions/actions-button-labels.jpg')" alt="Avo button labels" class="border mb-4" />

### No confirmation actions

If you don't want to show the confirmation modal, pass in the `self.no_confirmation = true` class attribute. This will execute the action without showing the modal at all.
