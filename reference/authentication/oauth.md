---
description: OAuth sign-in with Google, Auth0, Okta, and Microsoft Entra ID.
---

# OAuth

Klai Studio currently supports OAuth login with:

- `google`
- `auth0`
- `okta`
- `microsoft`

Use OAuth when you want the provider to authenticate the user while Klai Studio still creates or updates the app user and signs them into the app.

## What You Need

- OAuth credentials configured for the app or tenant
- A `Users.oauthId` field in your helper file, available on the `Users` layout
- A callback page with the navigation slug `auth/oauth`
- `authLoginOauth` on that page's `onFormLoad`

If you want Klai Studio to create users who do not already exist, you also need the `onBeforeRegistration` server hook. The same hook can also gate password signup; see [onBeforeRegistration](../hooksoverview/commonoverview.md#onbeforeregistration).

## Provider Callback URL

In your OAuth provider settings, use this callback pattern:

```text
https://your.domain.com/oauth/{provider}/callback
```

Examples:

- `https://your.domain.com/oauth/google/callback`
- `https://your.domain.com/oauth/auth0/callback`
- `https://your.domain.com/oauth/okta/callback`
- `https://your.domain.com/oauth/microsoft/callback`

## Typical Flow

1. Add a button or link that navigates to `/oauth/{provider}`.
2. The provider authenticates the user and returns to Klai Studio.
3. Klai Studio redirects the browser to your `auth/oauth` page.
4. Your `auth/oauth` page runs `authLoginOauth`.
5. Klai Studio stores the token and continues through the normal login flow.

## Callback Page

Add `authLoginOauth` to the page's `onFormLoad` action:

```json
"onFormLoad": [
  {
    "action": "authLoginOauth"
  }
]
```

`oauthLoginHook` is a legacy alias and is still supported, but `authLoginOauth` is the preferred name.

## How User Matching Works

- Klai Studio looks up users by email from the provider response.
- If the user already exists, Klai Studio updates `oauthId` when needed and signs the user in.
- If the user does not exist, Klai Studio calls `onBeforeRegistration`.
- New user creation only continues when that hook returns `model.createUser = true` (OAuth is fail-closed; a missing hook blocks creation).
- New users created through OAuth are automatically verified.

## Minimal Login Example

Start the flow with a `path` action:

```json
{
  "action": "path",
  "options": {
    "sameWindow": true,
    "url": "/oauth/google"
  }
}
```

## Notes

- If OAuth login fails, Klai Studio returns an `errorMessage` to the callback page and `authLoginOauth` sends it through the normal Klai Studio error pipeline.
- Any query params you append to the initial OAuth URL are also available to `onBeforeRegistration` if you need them for registration logic.
- For an Auth0-specific walkthrough, see [Setting Up Auth0](../../guides/integrations/setting-up-auth0.md).
- For Microsoft Entra ID (Office 365), see [Setting Up Microsoft Entra ID](../../guides/integrations/setting-up-microsoft-entra.md).
