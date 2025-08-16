---
description: Recommended practices for securing authentication flows in BetterForms.
---

# Security Best Practices

Guidelines to help secure all authentication strategies.

## Tokens

- Treat verification and reset tokens as secrets
- Use short TTLs and enforce single-use, delete temp token from the database after redeeming
- Do not log tokens; avoid storing them in cleartext
- After validating a token from a URL, redirect to remove it from the address bar

## Passwords

- Hash passwords server-side using a modern algorithm
- Never transmit or store plaintext passwords
- Enforce minimum complexity and length
- On admin resets, force user to change password at next login or use a reset-link flow

## Cookies & Sessions

- Keep session duration short; rotate on privilege changes
- Do not store sensitive user data in cookies

## Pages & Actions

- Require authentication for restricted pages
- Validate required fields before running auth actions (e.g., email, password)
- Surface errors to the user via `model.authMessage` when available

## Hooks

- Use `onAuthNotifier` script for sending verification and reset emails from your server
- Centralize business rules in `onLogin` and `onRegistration` where appropriate

## Operational Considerations

- Monitor for repeated failures and lock or throttle as needed (roll your own)



