# Upgrade guide

[[toc]]

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