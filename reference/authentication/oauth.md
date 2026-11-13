---
description: OAuth sign-in with Google, Auth0, Okta, and Microsoft Entra ID.
---

# OAuth

OAuth sign-in with Google, Auth0, Okta, and Microsoft Entra ID.


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

New people can get an account without any extra setup. To stop some signups, add the `onBeforeRegistration` hook and set `model.createUser` to `false`. See [onBeforeRegistration](../hooksoverview/commonoverview.md#onbeforeregistration).

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

1. Add a button or link that goes to `/oauth/{provider}`.
2. The provider checks who the person is, then sends them back to Klai Studio.
3. If this login is already connected, or the person has no password, Klai Studio opens your `auth/oauth` page and signs them in.
4. If the person already has a password and this login is not connected yet, Klai Studio opens the login page instead. They sign in with that password once. Klai Studio then connects the login.
5. After a normal sign-in, `authLoginOauth` saves the login and the usual login flow continues.

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

## How Sign-In Decides

Klai Studio matches people by a confirmed email address.

Google, Auth0, and Okta must send an email that the provider has verified. Microsoft must send an email and mark it verified. Klai Studio does not use the Microsoft username.

If the email is missing or not verified, and this login is not already connected, nothing is changed. The person sees: "The identity provider did not confirm this email address."

### Already connected

If this provider login is already saved in `Users.oauthId`, the person signs in. Klai Studio does not change their record.

### No password on the account

Klai Studio connects this login, marks the account verified, and signs the person in.

### Account already has a password

Klai Studio does not connect the login yet, and it does not sign the person in. They are sent to the login page and see: "Sign in with your password once to connect this login."

After they sign in with that password, Klai Studio connects the login. They do not need to click the provider button again. This lasts about 10 minutes. Signing in with a magic link does not connect it.

Show that sentence on the login page. Do not put an empty function action before `oauthLoginHook` on that page, or the message will not appear.

If the button that starts login points back to a page in your app, Klai Studio keeps that page after the login is connected.

### New person

If no account uses that email, Klai Studio creates one and marks it verified.

To stop that, return `model.createUser` set to `false` from `onBeforeRegistration`. If you do not have that hook, the account is still created.

### Disabled account

A disabled account sees "Invalid login." Klai Studio does not say which email was used.

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

- HTTP **406** (`NotAcceptable`) means the provider is not in the connection OAuth vault. Enable 3rd Party Authentication being on is not enough — Google, Auth0, Okta, or Microsoft still needs client credentials saved. See [Klai Error Codes](../bf-error-codes.md).
- The password-connection case opens the login page, not `auth/oauth`. Other problems still open `auth/oauth`, where `authLoginOauth` shows the message. A disabled account on that page uses `10163` / `auth.account_disabled`. Other failures there use `10160` / `auth.oauth_failed`.
- Any query params you append to the initial OAuth URL are also available to `onBeforeRegistration` if you need them for registration logic.
- For an Auth0-specific walkthrough, see [Setting Up Auth0](../../guides/integrations/setting-up-auth0.md).
- For Microsoft Entra ID (Office 365), see [Setting Up Microsoft Entra ID](../../guides/integrations/setting-up-microsoft-entra.md).
