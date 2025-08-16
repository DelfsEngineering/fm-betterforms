---
description: OAuth sign-in with external identity providers.
---

# OAuth

This page references the existing OAuth guide to avoid duplication while we consolidate the new Authentication section.

{% content-ref url="../users-and-authentication/oauth.md" %}
[Existing OAuth Guide](../users-and-authentication/oauth.md)
{% endcontent-ref %}

## Actions and Initiation

- Preferred login action: `authLoginOauth`
- Legacy alias (still supported): `oauthLoginHook`
- Initiate the flow by navigating to `/oauth/{provider}` via a `path` action (e.g., `/oauth/google`)
- Your callback landing page should run `authLoginOauth` in `onFormLoad` to finalize login


