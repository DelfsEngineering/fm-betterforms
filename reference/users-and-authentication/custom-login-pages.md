# Custom Login Pages

In order to customize the authentication pages for your app, you simply need to design pages that will perform the same [authentication actions](../actions-processor/authentication-actions.md) as the default authentication pages. Then, in your site settings, assign the following [navigation slugs](../site-settings/navigationoverview.md) to their respective keywords and reference your own page's UID.

| Auth Page | Default Navigation Slug | Recommended [Actions](../actions-processor/authentication-actions.md) |
| :--- | :--- | :--- |
| Login | `login` | authLogin |
| Register | `login/signup` | authRegister |
| Resend Email Verification | `login/verify` | authVerify |
| Reset Password | `login/reset` | authReset |

{% hint style="info" %}
See the examples for best practices on building a custom login page.
{% endhint %}

## Other Considerations

There are various additional elements that are suggested when building a login form.

### Use isForm

This flag on the page that contains the login form will allow the user to type their credentials and then press "enter" to login. [Learn more here](../form-settings/misc-page-settings.md#isform).

### Enable autofill

Add `"autocomplete": "current-password"` to the schema of your password field to signal to the browser that this is your password field and allow it to suggest saving the password for your user.

Similarly, add `"autocomplete": "email"` to the schema of your email field for similar results.

### Autofocus in the email field

If you enable autofocus for the email field, the browser will put the cursor in this field when the page first loads. This is also helpful for users so they can simply start typing their login credentials immediately. To enable, add an **attributes** object to the schema of your email field, with an **autofocus** key set within that object, like so:`"attributes": { "autofocus": "" }` In this case, there is no value required.

This trick will only work on page load. For other situations, consider using the [setFocus action](../actions-processor/actions_overview/setfocus.md).

