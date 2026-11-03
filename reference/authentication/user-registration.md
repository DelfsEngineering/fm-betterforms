---
description: Step-by-step for user sign-up and email verification using Basic Authentication.
---

# User Registration & Verification

Step-by-step for user sign-up and email verification using Basic Authentication.


This workflow covers creating a user account with email/password and verifying the email address before allowing login.

## Prerequisites

- Users table in the helper file with fields for: `email`, `passwordHash`, `isVerified`, `isEnabled`, and timestamps
- Email delivery configured in `onAuthNotifier` (server-side) for verification messages

## Workflow

1. User submits the registration form
2. Run `authRegister` action. The sign-up page model, form, pages, and URL query go with that request. `password` and `password2` are removed.
3. `onBeforeRegistration` runs, then the user record is created (password stored as a one-way hash)
4. `onAuthNotifier` sends the verification email. That call includes `data.model` from the sign-up form.
5. `onRegistration` runs in the same request. `data.user` is the new user record (`id` and `recid`). The helper replaces `data.user` with `ui_Users::asJSON` before your hook script runs.
6. User clicks the link and lands on a verification page
7. Run `authVerify` action on page load to confirm the token
8. Mark the user record as verified (`isVerified = True`)
9. Optionally sign the user in or redirect to login

## Page Actions

- Registration page: `authRegister`
- Verification page: `authVerify` (recommended to run in an onFormLoad named action)
- Optional resend-verification UI: `authResend` (requires `email`)

## Hooks (FileMaker)

- `onBeforeRegistration`: optional gate **before** the user is created — return `model.createUser = false` to reject the signup
- `onRegistration`: runs after the user exists, in the same sign-up request. `data.user` is the new row (`id`, `recid`). `data.model` is the sign-up page model without passwords. Returned actions continue the sign-up thread; no actions sends the browser to `/dash`.
- `onAuthNotifier`: sends the verification email. The email sent during sign-up includes `data.model`. `authResend` does not.

## Controlling Who Can Sign Up

Use `onBeforeRegistration` when you want FileMaker rules to approve or reject a signup before the Users record is created.

Examples:

- allow only `@yourcompany.com` addresses
- require a pre-approved invite or matching contact record
- block self-service signup for locked-down apps (`createUser = false`)

For password registration (`authRegister`):

- `model.createUser = true` → registration continues
- `model.createUser` is not `true` → registration is rejected
- hook missing (older helpers) → registration still continues, so existing apps are not broken

When the hook rejects the signup, the Klai Sign Up page shows this error after **Create Account**:

`User not authorized to register.`

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

- [Authentication](./)
- [Common Hooks — onBeforeRegistration](../hooksoverview/commonoverview.md#onbeforeregistration)
- [Authentication Actions](../actions-processor/authentication-actions.md)
- [Custom Login Pages](./custom-login-pages.md)


