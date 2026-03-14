---
description: Step-by-step for user sign-up and email verification using Basic Authentication.
---

# User Registration & Verification

This workflow covers creating a user account with email/password and verifying the email address before allowing login.

## Prerequisites

- Users table in the helper file with fields for: `email`, `passwordHash`, `isVerified`, `isEnabled`, and timestamps
- Email delivery configured in `onAuthNotifier` (server-side) for verification messages

## Workflow

1. User submits the registration form
2. Run `authRegister` action
3. Helper file creates the user (password stored as a one-way hash)
4. System sends verification email with a time-bound verification link
5. User clicks the link and lands on a verification page
6. Run `authVerify` action on page load to confirm the token
7. Mark the user record as verified (`isVerified = True`)
8. Optionally sign the user in or redirect to login

## Page Actions

- Registration page: `authRegister`
- Verification page: `authVerify` (recommended to run in an onFormLoad named action)
- Optional resend-verification UI: `authResend` (requires `email`)

## Hooks (FileMaker)

- `onRegistration`: optional post-registration business logic
- `onAuthNotifier`: send verification email and any admin notifications

## Data Considerations

- Verification tokens should be treated as secrets; avoid logging or storing them in cleartext
- Verification tokens should be time-bound and single-use

## Practical Notes

- Registration pages must provide `email` and `password` in the page model before running `authRegister`
- If you want a second "confirm password" field, use a custom validator to compare `password` and `password2`
- Authentication feedback can be shown with `model.authMessage`, or more robustly with `model.authMessageCode` and `model.authMessageType`
- Verification pages usually run `authVerify` automatically in `onFormLoad`
- The verification action reads the token from the URL; you generally do not need to parse it manually
- Users must still be enabled (`isEnabled = true`) to sign in after verification

## Related Pages

- [Authentication](./README.md)
- [Authentication Actions](../actions-processor/authentication-actions.md)
- [Custom Login Pages](./custom-login-pages.md)


