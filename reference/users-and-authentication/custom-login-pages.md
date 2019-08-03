# Custom Login Pages

In order to customize the authentication pages for your app, you simply need to design pages that will perform the same [authentication actions](../actions-processor/authentication-actions.md) as the default authentication pages. Then, in your site settings, assign the navigation slugs to the appropriate keywords and reference your own page's UID.

| Auth Page | Default Navigation Slug | Recommended [Actions](../actions-processor/authentication-actions.md) |
| :--- | :--- | :--- |
| Login | `login` | authLogin |
| Register | `login/signup` | authRegister |
| Resend Email Verification | `login/verify` | authVerify |
| Reset Password | `login/reset` | authReset |

{% hint style="info" %}
See the examples for best practices on building a custom login page.
{% endhint %}



