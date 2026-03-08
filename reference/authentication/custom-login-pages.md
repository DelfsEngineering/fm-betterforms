# Custom Login Pages

This is the canonical reference for building custom authentication pages in BetterForms.

Use this page together with:

- [Authentication](./README.md)
- [Authentication Actions](../actions-processor/authentication-actions.md)
- [Basic Authentication](./basic-auth.md)
- [OAuth](./oauth.md)

## What This Page Covers

Custom login pages are regular BetterForms pages that run authentication actions.

- Hooks are server calls.
- Actions and named actions are client-side workflows.
- A named action can include a `runUtilityHook` action when a workflow needs to call the server.

## Recommended Authentication Pages

If you are replacing the default authentication UI, create pages for the flows your app needs and assign the correct navigation slugs.

| Auth Page | Recommended Navigation Slug | Recommended Action |
| --- | --- | --- |
| Login | `login` | `authLogin` |
| Register | `login/signup` | `authRegister` |
| Email Verification | `login/verify` | `authVerify` |
| Password Reset | `login/reset` | `authReset` |
| Magic Link Landing Page | `login/magic` | `authLogin` |

Notes:

- `authVerify` is typically run from an `onFormLoad` named action so the verification page can consume the token immediately after the user opens the email link.
- `authLogin` supports both email/password login and token-based magic-link login.
- `authResend` is useful as a button or link on an existing page. The current docs do not define a required dedicated slug for it, so only document a custom standalone page for resend if your app needs one.
- OAuth callback handling is documented separately in [OAuth](./oauth.md).

## Recommended Flow Mapping

- Login page: `authLogin`
- Logout button or link: `authLogout`
- Registration page: `authRegister`
- Forgot-password page: `authForgot`
- Reset page: `authReset`
- Verification page: `authVerify`
- Magic-link request page: `authMagicRequest`
- Magic-link landing page: `authLogin`

## Form Design Notes

### Use `isForm`

If the page contains a login form, enable [`isForm`](../form-settings/misc-page-settings.md#isform) so pressing Enter can submit the credentials flow more naturally.

### Enable browser autofill

For the password field:

```json
{
  "autocomplete": "current-password"
}
```

For the email field:

```json
{
  "autocomplete": "email"
}
```

### Autofocus

If you want the cursor to land in the email field on page load, add:

```json
{
  "attributes": {
    "autofocus": ""
  }
}
```

For later focus changes after page load, use [`setFocus`](../actions-processor/actions_overview/setfocus.md).

## Error Display

Authentication errors are written to `model.authMessage`.

Example:

```json
{
  "type": "html",
  "html": "<div class=\"alert alert-warning\">{{model.authMessage}}</div>",
  "styleClasses": "col-md-12"
}
```

## Related Pages

- [Authentication](./README.md)
- [Authentication Actions](../actions-processor/authentication-actions.md)
- [User Registration & Verification](./user-registration.md)
- [Password Management](./password-management.md)
