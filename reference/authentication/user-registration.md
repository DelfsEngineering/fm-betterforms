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

## Hooks (FileMaker)

- `onRegistration`: optional post-registration business logic
- `onAuthNotifier`: send verification email and any admin notifications

## Data Considerations

- Verification tokens should be treated as secrets; avoid logging or storing them in cleartext
- Developer‑generated tokens are recommended to be time‑bound and single‑use (delete after use)

## Notes

- FileMaker script references and examples will be linked where relevant in this and related pages.

---

## Detailed Steps (from existing docs)

### 1) Registration Page

- Required action: `authRegister`
- Data model: must include `email` and `password` keys for the action to succeed
- Validation: add client-side validation before running the action
  - If you want a second "confirm password" field, use a custom validator to compare `password` and `password2` (the action itself does not require two fields)
- Error display: authentication errors are available at `model.authMessage`

References:
- See `reference/actions-processor/authentication-actions.md` for required keys and actions behavior

### 2) Server-side Processing

- On registration, the helper file creates a new user record in the Users table
- Password is stored as a one-way hash
- An onRegistration Hook is run and passed email and id in the `$$BF_User` object
- A verification email is sent from your FileMaker server
  - Ensure SMTP is configured in `onAuthNotifier` during setup

References:
- See `reference/users-and-authentication/README.md` for Users table, password hashing, and verification email

### 3) Verification Link and Page

- The verification email contains a link with a token in the URL
- Recommended: run `authVerify` automatically on the verification page load (onFormLoad named action)
- The action reads the token from the URL; you generally do not need to parse it manually on the page
- On success, the user’s `isVerified` is set to `True`

References:
- See `reference/actions-processor/authentication-actions.md` for `authVerify` token handling guidance
- See `reference/users-and-authentication/README.md` for `isVerified`

### 4) Login Eligibility

- Users must have `isEnabled = True` in the user table to be able to log in
- This can be configured automatically or per your business logic

References:
- See `reference/users-and-authentication/README.md`

### 5) Optional: Resend Verification

- Provide a page or UI to run `authResend` (requires `email`) to re-send the verification link

References:
- See `reference/actions-processor/authentication-actions.md`

---

## Open Questions (not explicitly defined in current docs)

- After successful verification, should the user be auto-logged in or redirected to the login page? The docs do not specify auto-login behavior.
- Preferred post-verification destination (e.g., dashboard vs. login page). If custom, we can document using a `path` action.


