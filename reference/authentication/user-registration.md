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

- `onBeforeRegistration`: optional gate **before** the user is created — return `model.createUser = false` to reject the signup
- `onRegistration`: optional post-registration business logic
- `onAuthNotifier`: send verification email and any admin notifications

## Controlling Who Can Sign Up

Use `onBeforeRegistration` when you want FileMaker rules to approve or reject a signup before the Users record is created.

Examples:

- allow only `@yourcompany.com` addresses
- require a pre-approved invite or matching contact record
- block self-service signup for locked-down apps (`createUser = false`)

For password registration (`authRegister`):

- `model.createUser = false` → registration is rejected
- `model.createUser = true` → registration continues
- hook missing (older helpers) → registration still continues, so existing apps are not broken

OAuth new-user creation uses the same hook but is stricter: missing hook or no explicit allow blocks account creation. See [onBeforeRegistration](../hooksoverview/commonoverview.md#onbeforeregistration) and [OAuth](./oauth.md).

After a user is created, helper **Auto Enable User Accounts** still controls whether they can sign in (`isEnabled`). Use Auto Enable for “create but inactive”; use `onBeforeRegistration` when the account should not be created at all.

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
- [Common Hooks — onBeforeRegistration](../hooksoverview/commonoverview.md#onbeforeregistration)
- [Authentication Actions](../actions-processor/authentication-actions.md)
- [Custom Login Pages](./custom-login-pages.md)


