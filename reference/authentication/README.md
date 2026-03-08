---
description: High-level overview of BetterForms authentication strategies and building blocks.
---

# Authentication

BetterForms supports multiple authentication strategies to fit different application needs. This page is the canonical authentication hub and orients you to the available options, how authentication is enabled, and the core concepts used across all workflows. Detailed, step-by-step guides are provided in the linked pages.

## Supported Methods

- **Basic Authentication**
  - Email/password with a `Users` table in the helper file
  - Registration, email verification, login, logout, password reset, and magic-link sign-in
- **Query & Cookie Based Auth (Roll your own)**
  - Smart links that can include a time-bound token in the URL query
  - Cookie/session-based access for trusted flows
- **OAuth**
  - Sign-in with external identity providers (e.g., Auth0, Okta, Google)
  - Incorporate various 3rd party apps via common Identity providers

## Building Blocks

- **Authentication Actions** (used on pages)
  - `authLogin`, `authLogout`, `authRegister`, `authForgot`, `authMagicRequest`, `authReset`, `authVerify`, `authResend`
  - OAuth-specific: `authLoginOauth` (preferred), `oauthLoginHook` (legacy alias still supported)
  - To initiate OAuth login, use a `path` action to `/oauth/{provider}` (e.g., `/oauth/google`)
- **Hooks** (FileMaker)
  - `onLogin`, `onRegistration`, `onAuthNotifier` (email delivery and notifications)
- **Data Model & Flow**
  - Users are stored in the helper file with hashed passwords (for Basic Auth)
  - Basic Authorization verification and reset tokens are delivered via URL query for the relevant pages and consumed by the corresponding actions
  - Authentication error messages appear in `model.authMessage`

## Concepts

- Hooks are server calls.
- Actions and named actions are client-side workflows.
- A named action can include a `runUtilityHook` action when a workflow needs to call the server.

## Enabling Authentication on Pages

- Authentication is enabled per page in the IDE. If a page requires auth, unauthenticated users are redirected to your login page.
- After a successful login, users are redirected back to the original page by default. Returning a `path` action from `onLogin` overrides this.
- For custom auth UIs, use the Actions listed above. See [Custom Login Pages](./custom-login-pages.md).

## Default Auth Pages and Slugs

If you implement custom auth screens, assign navigation slugs so the system can route correctly:

- Login: `login`
- Register: `login/signup`
- Email Verification: `login/verify`
- Password Reset: `login/reset`
- Magic Link Landing Page: `login/magic`

Attach the appropriate Actions to the relevant pages:

- Registration page ➜ `authRegister`
- Verification page ➜ `authVerify` (recommended to run on form load)
- Forgot page ➜ `authForgot`
- Magic link request page ➜ `authMagicRequest` to email a one-time sign-in link
- Magic link landing page ➜ `authLogin` (recommended to run on form load) to redeem the token from the URL
- Reset page ➜ `authReset`
- Login page ➜ `authLogin`
- Logout button/link ➜ `authLogout`

## Tokens at a Glance

- Verification, password reset, and magic-link flows rely on time-bound tokens delivered via URL query parameters.
- The `authVerify`, `authReset`, and magic-link `authLogin` flows read the token from the URL; you generally do not need to parse or store tokens manually.
- In practice, the magic-link flow is usually split into two pages or steps: `authMagicRequest` to send the email, then `authLogin` to consume the token after the user opens the link.
- Once redeeded, tokens are cleared from the database ( helper file ) 

## Error Handling

- Authentication errors are automatically placed into `model.authMessage` and can be displayed on the page.

## Email Delivery

- Verification, reset, and magic-link emails are sent from your FileMaker server via `onAuthNotifier`. Ensure SMTP is configured there during setup.

## Version Note

- Magic-link authentication was added in BetterForms `3.4.x`.

## Canonical Reference Pages

- [Basic Authentication](./basic-auth.md)
- [User Registration & Verification](./user-registration.md)
- [Password Management](./password-management.md)
- [Custom Login Pages](./custom-login-pages.md)
- [Managing User Accounts](./managing-users.md)
- [Query & Cookie Based Auth](./query-cookie-auth.md)
- [OAuth](./oauth.md)
- [JWT Expiration](./jwt-expiration.md)
- [Security Best Practices](./security-best-practices.md)

See the dedicated pages for step-by-step workflows and best practices:

- Basic Authentication ➜ Registration & Verification, Password Management
- Query & Cookie Based Auth
- OAuth
  - See JWT Expiration to configure per-tenant token lifetime


