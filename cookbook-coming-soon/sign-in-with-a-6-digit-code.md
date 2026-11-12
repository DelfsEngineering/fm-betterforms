---
description: Text a one-time 6-digit code, then sign the open app in with authLogin.
---

# Sign in with a 6-digit code

Text a one-time code, store it on the helper user, and let `authLogin` grant the session on the app that is already connected.

This is a recipe on top of magic-link login, added in BetterForms `3.4.x`. Klai Studio does not generate the code or send the text. Your FileMaker script does that. The browser, including an installed PWA, only submits the code. The server then signs the JWT for that same connection.

`authInviteComplete` is a different flow. It sets a password from an invite token. It does not send a code, and it does not sign anyone in from a code alone.

## What you end up with

1. The person enters the email for an enabled helper user and asks for a code.
2. FileMaker writes a 6-digit code to that user's `resetToken`, sets `resetExpires` a few minutes ahead, and texts the code.
3. The person types the code into a field whose model key is `token` and runs `authLogin`.
4. The open app calls `authenticate({ strategy: "magic", token })` on its existing socket.
5. The server finds the Users row with that `resetToken`, checks expiry and `isEnabled`, clears the code, and returns a JWT. That socket is now that user. `onLogin` runs.

The code has to be on the helper **Users** record. A code saved only on a person record in your solution does not grant a session. Copy it onto the matching Users row before the person submits it.

## Pages

Use two ordinary pages. Give the code page a slug that does not already carry a token, such as `login/code`. `authLogin` reads `model.token` first, then a token in the route or query. A leftover URL token would be submitted instead of what they typed.

### Ask for a code

Model key: `email`.

The button runs your utility hook. `type` is your own branch name inside `onUtility`.

```json
{
  "action": "runUtilityHook",
  "options": {
    "type": "sendSignInCode"
  }
}
```

Do not return the code in the hook model. Tell the page to show the code field. A generic line such as "If that account can sign in, a code has been sent." avoids confirming which emails exist.

### Enter the code

Model key: `token`. The key name matters. `authLogin` does not read a custom name such as `code`.

```json
{
  "action": "authLogin"
}
```

When `model.token` has a value, `authLogin` ignores `email` and `password` and redeems the token. An empty `token` falls through to a normal email and password login.

Show `model.authMessage` on the page. A wrong, expired, or disabled code comes back as `Invalid login` and `auth.invalid_login` (`10150`). This path does not use `auth.account_disabled`.

## Pseudo code

FileMaker side of `onUtility` when `hookPackage.options.type` is `sendSignInCode`. This shows the steps. `Random` is only here so the shape is obvious. It is not a strong code generator, and a production script should use a stronger source you already trust.

```text
Set Variable [ $email ; JSONGetElement ( $$BF_Model ; "email" ) ]

# Find the helper Users row for $email.
# If it is missing or isEnabled is false, return the generic message and stop.
# Do not reveal whether the email exists.

Set Variable [ $code ; Right ( "000000" & Int ( Random * 1000000 ) ; 6 ) ]

# If another unexpired Users row already has this resetToken, generate again.
# The login lookup is "resetToken equals this string" and uses the first match.

# Write the helper user, for example through API- User CRUD (user):
#   resetToken   = $code          // string, keep leading zeros
#   resetExpires = now + 5 minutes, as Unix milliseconds
# Leave isEnabled true. A disabled user cannot redeem the code.

# Send the SMS from FileMaker. The text contains $code only.
# Do not put $code in $$BF_Model or $$BF_Actions.
```

Example user payload, same fields as an invite token:

```json
{
  "id": "AA2F347A-8E3F-4190-91BB-9843DC8B2ED9",
  "isEnabled": 1,
  "resetToken": "048213",
  "resetExpires": 1776172800000
}
```

`resetExpires` may be Unix milliseconds (13 digits), Unix seconds (10 digits), or a date string `Date.parse` accepts. A missing or past value is rejected.

## How the session is granted

FileMaker cannot stamp the open app as logged in. The app has to present the code on the socket it already has.

`authLogin` sends `{ strategy: "magic", token: "<the 6 digits>" }`. The magic strategy loads the Users row whose `resetToken` matches that string, requires a future `resetExpires` and `isEnabled`, then clears `resetToken` and `resetExpires`. The authentication service signs a JWT whose audience is this site's host and returns `accessToken`. Feathers stores that token on the connection. The installed PWA and a normal browser tab use this same call. Reload uses `reAuthenticate` with the stored token.

A successful redeem burns the code. Asking for another code overwrites `resetToken`. Password reset and emailed magic links write those same two fields, so the latest write wins. Keep this recipe on its own UI, away from `authForgot` and `authMagicRequest` for the same user.

## Limits of a 6-digit code

The strategy compares the submitted string to `resetToken` and does not also check the email. Six digits is one million values, and this strategy has no guess counter. Use a short expiry, one outstanding code per user, and a code that no other user is holding. Treat the code as a secret: do not log it. For a link in email, keep using `authMagicRequest`, which stores a long random token instead.

## Related

- [Authentication Actions](../reference/actions-processor/authentication-actions.md)
- [Password Management](../reference/authentication/password-management.md)
- [Custom Login Pages](../reference/authentication/custom-login-pages.md)
- [runUtilityHook](../reference/actions-processor/actions_overview/runutilityhook.md)
- [Creating a PWA](../guides/integrations/creating-a-pwa.md)
