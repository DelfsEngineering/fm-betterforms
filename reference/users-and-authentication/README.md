---
description: >-
  This section will guide you through how authentication is built into
  BetterForms and how you can customize its behavior to meet the needs of your
  app.
---

# Users & Authentication

## Enabling Authentication

Authentication is enabled on a per-page basis in BetterForms. In the general tab of the page editor, you can toggle authentication on or off for that page.

If authentication is enabled for the page that user is trying to visit, BetterForms will not allow any user to load that page unless they are logged in. Non-authenticated users who attempt to access a restricted page will be redirected to login. After login, they are redirected back to the page they were trying to access. To override this behavior you can add a [path action](../actions-processor/actions_overview/path.md) in the **onLogin** hook script.

## User Registration

Users in your BetterForms web app are stored within the **Users** table of your [helper file](../../getting-started/integration/installation.md#what-is-the-helper-file). When a user registers for an account on your site, they provide an email and a password. As long as their email address is unique, a new record will be created in your Users table. Their password is stored as a one-way hash.

Then, a verification link is sent to verify their email address. When they click the link in that email, their record in the Users will have the **isVerified** field set to `True`.

{% hint style="warning" %}
Since email sending happens on your FileMaker server, you must configure your email server settings at the end of the **BF - Common Hooks &gt; onAuthNotifier** script that you pasted into your legacy FileMaker file during [setup](../../getting-started/integration/3.-copy-custom-functions-and-scripts.md).
{% endhint %}

Users must also have the **isEnabled** field of their user record set to `True` before they can login. This can be configured to occur automatically, or based on any business logic that you choose to implement in your legacy FileMaker file.

To easily manage the users in this table, an API script is available for you to call from your legacy FileMaker file. Learn more here:

{% page-ref page="managing-users.md" %}

## Customizing Your Login/Registration Pages

For full control over the style and behavior of all the pages related to login, registration, password resets, etc, see this guide:

{% page-ref page="custom-login-pages.md" %}

