# Global Named Actions

Global named actions can be defined in the **Environment > Named Actions** tab in your [site settings](./). When a named action is called, BetterForms will first look to see if a page-specific named action is defined for that name and if not, then check for a site-wide named action.

Global named actions can be called from anywhere within the application. This makes them perfect for reuse. For the occasion when you need a special override to that global name action, you can use a locally scoped named action.

Typical Usage:

* Common actions that are located in header or footer slots
* Reused actions like `print` and `save`
* Reused navigation like `gotoPageListview`



For more details about named actions, see this page:

{% content-ref url="../actions-processor/actions_named.md" %}
[actions\_named.md](../actions-processor/actions\_named.md)
{% endcontent-ref %}
