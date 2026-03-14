---
description: High-level overview of BetterForms authentication strategies and building blocks.
---

# Authentication

BetterForms supports multiple authentication strategies to fit different application needs. This page orients you to the available options, how authentication is enabled, and the core concepts used across all workflows. Detailed, step-by-step guides are provided in the linked pages.

## Supported Methods

- **Basic Authentication**
  - Email/password with a `Users` table in the helper file
  - Registration, email verification, login, logout, password reset, and magic-link sign-in
- **Query & Cookie Based Auth (Roll your own)**
  - Smart links that can include a time-bound token in the URL query
  - Cookie/session-based access for trusted flows
- **OAuth**
  - Sign-in with external identity providers (e.g., Auth0, Okta, Google)
  - Use your identity provider to authenticate users while BetterForms signs them into the app

## Building Blocks

- **Authentication Actions** (used on pages)
  - `authLogin`, `authLogout`, `authRegister`, `authForgot`, `authMagicRequest`, `authReset`, `authVerify`, `authResend`
  - OAuth-specific: `authLoginOauth` (preferred), `oauthLoginHook` (legacy alias still supported)
  - To initiate OAuth login, use a `path` action to `/oauth/{provider}` (e.g., `/oauth/google`)
- **Hooks** (FileMaker)
  - `onLogin`, `onRegistration`, `onAuthNotifier` (email delivery and notifications)
- **Data Model & Flow**
  - Users are stored in the helper file with hashed passwords (for Basic Auth)
  - Verification, reset, and magic-link tokens are delivered through the URL and consumed by the relevant actions
  - Auth UIs can read `model.authMessage`, `model.authMessageCode`, `model.authMessageType`, and `BF.authGetLastFeedback()`

## Enabling Authentication on Pages

- Authentication is enabled per page in the IDE. If a page requires auth, unauthenticated users are redirected to your login page.
- After a successful login, users are redirected back to the original page by default. Returning a `path` action from `onLogin` overrides this.
- For custom auth UIs, use the Actions listed above. See also [Custom Login Pages](./custom-login-pages.md).

## Default Auth Pages and Slugs

If you implement custom auth screens, assign navigation slugs so the system can route correctly:

- Login: `login`
- Register: `login/signup`
- Email Verification: `login/verify`
- Password Reset: `login/reset`
- Magic Link Landing Page: `login/magic`

Attach the appropriate Actions to the relevant pages:

- Registration page ➜ `authRegister`
- Verification page ➜ `authVerify` (recommended to run in `onFormLoad`)
- Forgot page ➜ `authForgot`
- Magic link request page ➜ `authMagicRequest` to email a one-time sign-in link
- Magic link landing page ➜ `authLogin` (recommended to run in `onFormLoad`) to redeem the token from the URL
- Reset page ➜ `authReset`
- Login page ➜ `authLogin`
- Logout button/link ➜ `authLogout`

## Tokens at a Glance

- Verification, password reset, and magic-link flows rely on time-bound tokens delivered via URL query parameters.
- The `authVerify`, `authReset`, and magic-link `authLogin` flows read the token from the URL; you generally do not need to parse or store tokens manually.
- In practice, the magic-link flow is usually split into two pages or steps: `authMagicRequest` to send the email, then `authLogin` to consume the token after the user opens the link.
- Once redeemed, tokens are cleared from the helper file.

## Error Handling

- Authentication pages can read feedback from `model.authMessage`, `model.authMessageCode`, and `model.authMessageType`.
- The latest auth result is also available through `BF.authGetLastFeedback()`.
- Real auth failures continue to flow through the normal BetterForms error pipeline.
- Success/info auth states update the auth feedback contract but are not pushed into the global error stack.
- For new UI, prefer mapping from `auth.*` codes to your own localized copy instead of parsing the English message text.
- For UI examples, see [Custom Login Pages](./custom-login-pages.md) and [BF Utility Functions](../bf-utility-function-ver-0.9.20+.md).

## Email Delivery

- Verification, reset, and magic-link emails are sent from your FileMaker server via `onAuthNotifier`. Ensure SMTP is configured there during setup.

## Version Note

- Magic-link authentication was added in BetterForms `3.4.x`.

See the dedicated pages for step-by-step workflows and best practices:

- [Basic Authentication](./basic-auth.md)
- [Registration & Verification](./user-registration.md)
- [Password Management](./password-management.md)
- [Query & Cookie Based Auth](./query-cookie-auth.md)
- [OAuth](./oauth.md)
- [JWT Expiration](./jwt-expiration.md)


