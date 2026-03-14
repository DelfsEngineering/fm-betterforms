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



