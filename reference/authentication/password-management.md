---
description: Password reset flows for end users and admin-initiated resets in Basic Authentication.
---

# Password Management

Covers both user-initiated password resets and admin-triggered resets.

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

When an admin resets a user’s password:

- This is currently not supported

## Hooks (FileMaker)

- `onAuthNotifier`: email delivery for reset links and notifications
- Optional business logic hooks to enforce account validity etc

## Security Considerations

- Treat reset tokens as secrets; limit TTL and ensure single-use
- Never log tokens or cleartext passwords



