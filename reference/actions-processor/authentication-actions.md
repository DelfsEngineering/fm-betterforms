# Authentication Actions

The authentication set of actions are used on pages that have custom login and registration screens.

* _**authLogin**_ - Performs an authentication login
* _**authLogout**_ - Performs logout
* _**authReset**_ - Performs a password reset action
* _**authForgot** -_ Performs a forgotten password reset hook
* _**authResend**_ - Re/sends the email verification token
* _**authVerify**_  - Performs a verification of the verify token
* _**authRegister**_ - Performs a registration and if successful, runs the [onRegistrationHook](../hooksoverview/commonoverview.md#onregistration)
* 
Each of these actions should be attached to a button that the user will click to perform the respective task. They do not take any options, but some do require that an `email` and/or `password` key is present in your data model.

| Action Name | Requires `email` key | Requires `password` key | Requires `slug`\*  |
| ---: | :---: | :---: | :---: |
| authLogin | ✅ | ✅ |  |
| authLogout |  |  |  |
| authForgot | ✅ |  |  |
| authReset |  | ✅ | ✅ |
| authVerify | ✅ |  |  |
| authResend | ✅ |  |  |
| authRegister | ✅ | ✅ |  |

If these values are required, you should add validation to those fields and run a validate action before the authentication action.

The **authRegister** action does _not_ require 2 password fields. If you want the user to enter their password twice before creating an account, you should create a [custom validator](../form-settings/validationoverview/clientside.md) that checks if the `password` key also matches some other `password2` key.

The **authReset** action doesn't require an email field, but it does require a valid `slug` token key be present as a query parameter. The token is automatically generated and appended to the URL when you run the **authForgot** action, so you don't need to do anything with it on the page.

## Error Handling

Authentication error messages will get added automatically to your `model` under the `authMessage` key. You can display this info with any decoration you would like with an `html` element and some Vue syntax as follows:

```yaml
{
  "type": "html",
  "html": "<h2 class=\"warning\">{{model.authMessage}}</h2>",
  "styleClasses": "col-md-12"
}
```

