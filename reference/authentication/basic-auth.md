---
description: Email/password authentication using the internal Users table in the helper file.
---

# Basic Authentication

Basic Authentication uses the internal `Users` table with email and hashed password. It supports registration, email verification, login, logout, and password resets.

## Scope

- Internal Users table and fields (e.g., email, passwordHash, isVerified, isEnabled)
- Page-level actions for auth screens
- Server-side hooks for workflows and notifications

## Core Workflows

- Registration ➜ verification email sent ➜ user verified
- Login ➜ access to restricted pages
- Forgot/Reset password ➜ time-bound token ➜ set new password
- Logout ➜ session cleanup

## Building Blocks

- Actions: `authRegister`, `authVerify`, `authLogin`, `authLogout`, `authForgot`, `authReset`, `authResend`
- Hooks: `onRegistration`, `onLogin`, `onAuthNotifier`
- Data: Users table stores email and password hash; verification/reset tokens are treated as secrets

## Next

- See [User Registration & Verification](./user-registration.md) for step-by-step guidance
- See [Password Management](./password-management.md) for forgot/reset and admin reset patterns


