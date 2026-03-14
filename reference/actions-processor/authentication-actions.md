# Authentication Actions

These actions are used on custom login, registration, verification, reset, and magic-link pages.

Added in BetterForms `3.4.x`: passwordless magic-link support via `authMagicRequest` and token-based `authLogin`.

{% content-ref url="../authentication/custom-login-pages.md" %}
[custom-login-pages.md](../authentication/custom-login-pages.md)
{% endcontent-ref %}

{% content-ref url="./actions_overview/authloginoauth.md" %}
[authloginoauth.md](./actions_overview/authloginoauth.md)
{% endcontent-ref %}

* _**authLogin**_ - Signs the user in with email/password or a magic-link token
* _**authLogout**_ - Signs the user out
* _**authReset**_ - Completes a password reset
* _**authForgot** -_ Requests a password-reset email
* _**authMagicRequest**_ - Requests a passwordless magic sign-in link
* _**authVerify**  _ - Verifies the email-verification token
* _**authResend**_ - Resends the email-verification token
* _**authRegister**_ - Registers a user and, on success, runs [onRegistration](../hooksoverview/commonoverview.md#onregistration)

These actions do not take custom options, but several require specific model keys such as `email`, `password`, or a token delivered in the URL.

|  Action Name | Requires `email` key | Requires `password` key | Requires `token`\* |
| -----------: | :------------------: | :---------------------: | :----------------: |
|    authLogin |                      |            ✅            |          ✅         |
|   authLogout |                      |                         |                    |
|    authReset |                      |            ✅            |          ✅         |
|   authForgot |           ✅          |                         |                    |
| authMagicRequest |        ✅         |                         |                    |
|   authVerify |                      |                         |          ✅         |
|   authResend |           ✅          |                         |                    |
| authRegister |           ✅          |            ✅            |                    |

If these values are required, add field validation and run a `validate` action before the authentication action.

The **authRegister** action does _not_ require 2 password fields. If you want the user to enter their password twice before creating an account, you should create a [custom validator](../form-settings/validationoverview/clientside.md) that checks if the `password` key also matches some other `password2` key.

The **authReset** action doesn't require an email field, but it does require a valid `token` in the URL. The token is generated and appended automatically when you run **authForgot**.

Similarly, **authVerify** only checks for the verification token in the URL. It is usually run in `onFormLoad` because users arrive from an email link.

The **authMagicRequest** action requires an `email` key in the model and sends a one-time sign-in link through `onAuthNotifier`. It is typically used on the page where the user enters their email address.

The **authLogin** action can now work in two modes:

- Email/password login using `email` and `password`
- Magic-link login using `token` in the model or URL

For magic-link pages, it is common to run `authLogin` in `onFormLoad` after the user lands on a page with `?token=...`.
When a `token` is present, `authLogin` redeems that magic link token instead of attempting a normal email/password login.

## Auth Feedback

Authentication pages can read feedback from:

- `model.authMessage`
- `model.authMessageCode`
- `model.authMessageType`
- `BF.authGetLastFeedback()`

For new pages, prefer `auth.*` codes over parsing the English message text. For UI examples and patterns, see [Custom Login Pages](../authentication/custom-login-pages.md) and [BF Utility Functions](../bf-utility-function-ver-0.9.20+.md).

Security note:

- Default auth UI should avoid confirming whether a specific email/account exists.
- For request/initiation flows such as magic-link request or password reset request, prefer existence-blind messages such as "If that email is registered..." or "If that email can be used to sign in...".
