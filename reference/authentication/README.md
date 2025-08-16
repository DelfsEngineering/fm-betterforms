---
description: High-level overview of BetterForms authentication strategies and building blocks.
---

# Authentication

BetterForms supports multiple authentication strategies to fit different application needs. This page orients you to the available options, how authentication is enabled, and the core concepts used across all workflows. Detailed, step-by-step guides are provided in the linked pages.

## Supported Methods

- **Basic Authentication**
  - Email/password with a `Users` table in the helper file
  - Registration, email verification, login, logout, and password reset
- **Query & Cookie Based Auth (Roll your own)**
  - Smart links that can include a time-bound token in the URL query
  - Cookie/session-based access for trusted flows
- **OAuth**
  - Sign-in with external identity providers (e.g., Auth0, Okta, Google)
  - Incorporate various 3rd party apps via common Identity providers

## Building Blocks

- **Authentication Actions** (used on pages)
  - `authLogin`, `authLogout`, `authRegister`, `authForgot`, `authReset`, `authVerify`, `authResend`
  - OAuth-specific: `authLoginOauth` (preferred), `oauthLoginHook` (legacy alias still supported)
  - To initiate OAuth login, use a `path` action to `/oauth/{provider}` (e.g., `/oauth/google`)
- **Hooks** (FileMaker)
  - `onLogin`, `onRegistration`, `onAuthNotifier` (email delivery and notifications)
- **Data Model & Flow**
  - Users are stored in the helper file with hashed passwords (for Basic Auth)
  - Basic Authorization verification and reset tokens are delivered via URL query for the relevant pages and consumed by the corresponding actions
  - Authentication error messages appear in `model.authMessage`

## Enabling Authentication on Pages

- Authentication is enabled per page in the IDE. If a page requires auth, unauthenticated users are redirected to your login page.
- After a successful login, users are redirected back to the original page by default. Returning a `path` action from `onLogin` overrides this.
- For custom auth UIs, use the Actions listed above. See also `Users & Authentication > Custom Login Pages` in the Reference.

## Default Auth Pages and Slugs

If you implement custom auth screens, assign navigation slugs so the system can route correctly:

- Login: `login`
- Register: `login/signup`
- Email Verification: `login/verify`
- Password Reset: `login/reset`

Attach the appropriate Actions to the relevant pages:

- Registration page ➜ `authRegister`
- Verification page ➜ `authVerify` (recommended to run on form load)
- Forgot page ➜ `authForgot`
- Reset page ➜ `authReset`
- Login page ➜ `authLogin`
- Logout button/link ➜ `authLogout`

## Tokens at a Glance

- Verification and password reset flows rely on time-bound tokens delivered via URL query parameters.
- The `authVerify` and `authReset` actions read the token from the URL; you generally do not need to parse or store tokens manually.
- Once redeeded, tokens are cleared from the database ( helper file ) 

## Error Handling

- Authentication errors are automatically placed into `model.authMessage` and can be displayed on the page.

## Email Delivery

- Verification and reset emails are sent from your FileMaker server via `onAuthNotifier`. Ensure SMTP is configured there during setup.

See the dedicated pages for step-by-step workflows and best practices:

- Basic Authentication ➜ Registration & Verification, Password Management
- Query & Cookie Based Auth
- OAuth


