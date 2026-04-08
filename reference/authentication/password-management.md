---
description: Password reset flows for end users in Basic Authentication.
---

# Password Management

Covers the end-user forgot/reset flow in Basic Authentication.

Added in BetterForms `3.4.x`: the same helper-file token fields can also be used for magic-link sign-in.

## User-Initiated Reset (Forgot/Reset)

1. User requests a reset link
2. Run `authForgot` action (requires `email` in the model)
3. Server generates a time-bound, one-time reset token and stores it on the user record in the helper
4. `onAuthNotifier` hook runs with the user object in `$$BF_User` and sends the reset email link (developer-configured)
5. User clicks the link and lands on the reset page (token in URL)
6. User submits new password; page runs `authReset` with the token
7. Server validates token, updates the password hash, and invalidates the token
8. `onAuthNotifier` hook runs to optionally notify that the password reset succeeded

Recommended page actions:

- Request page: `authForgot`
- Reset page: `authReset` (requires `password` and a valid token via URL)

## Admin-Triggered Reset

This page focuses on the built-in end-user reset flow.
If you need an admin-managed reset process, implement it as custom business logic on the FileMaker side.

## Developer Invite Flow (Set Password + Optional Auto-Login)

When a developer or admin wants to invite a user without using the default `authForgot` email flow, use `authInviteComplete` with helper user fields.

### Why use UUID tokens

- A UUIDv4 token provides high entropy and is difficult to guess.
- It is easy to generate in FileMaker and easy to move through scripts/emails.
- Combined with short expiry and single-use clearing, it is suitable for invite links.

### Fields to set on the user record

- `resetToken` (token string, for example UUIDv4)
- `resetExpires` (future timestamp/date)
- `isEnabled` (must be true for redemption)
- `isVerified` (recommended true for invite-completion flows)

You can set these through the helper `API- User CRUD (user)` script by passing a user JSON payload.

Example payload:

```json
{
  "id": "AA2F347A-8E3F-4190-91BB-9843DC8B2ED9",
  "isEnabled": 1,
  "isVerified": 1,
  "resetToken": "7f9e8f9a-43c8-4d49-9c8d-1a2b3c4d5e6f",
  "resetExpires": 1776172800000
}
```

### Invite URL example

```text
https://christinadev.bfoperations.com:8080/#/login/reset?token=7f9e8f9a-43c8-4d49-9c8d-1a2b3c4d5e6f
```

### Reset/invite page action

Use `authInviteComplete` on the password page:

```json
{
  "action": "authInviteComplete",
  "options": {
    "signIn": true
  }
}
```

- `signIn: false` (default): sets password and clears invite token fields.
- `signIn: true`: sets password, clears invite token fields, and signs the user in immediately.

### Compatibility note

`authInviteComplete` and `authReset` are separate redemption paths. Use the same action family that issued the token.

## Hooks (FileMaker)

- `onAuthNotifier`: email delivery for reset links and notifications
- Add your own FileMaker-side rules if you need extra checks around password reset

## Shared Token Fields

Magic-link authentication can reuse the same helper-file token fields used by password reset.

- `resetToken`
- `resetExpires`

If you use both password reset and magic-link sign-in in the same UI, the most recently issued token wins. For most apps, it is best to use one token-based strategy per UI flow.

## Security Considerations

- Treat reset tokens as secrets; limit TTL and ensure single-use
- Never log tokens or cleartext passwords

## Related Pages

- [Authentication](./README.md)
- [Authentication Actions](../actions-processor/authentication-actions.md)
- [Custom Login Pages](./custom-login-pages.md)



