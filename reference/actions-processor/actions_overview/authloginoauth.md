---
description: Finalizes an OAuth login after the provider redirects back into BetterForms.
---

# authLoginOauth / oauthLoginHook

Finalizes an OAuth login after the provider redirects back into BetterForms.


`authLoginOauth` finalizes an OAuth login after the user returns from the provider callback.

`oauthLoginHook` is a legacy alias that is still supported.

## Typical Flow

1. The person clicks a button that goes to `/oauth/{provider}`.
2. The provider checks who they are.
3. When sign-in can finish, BetterForms opens the page with the slug `auth/oauth`.
4. That page runs `authLoginOauth`, usually in `onFormLoad`.
5. BetterForms saves the login and continues through the normal login flow.

If the person already has a password and this provider login is not connected yet, BetterForms opens the login page instead. They sign in with that password, and BetterForms connects the login. See [OAuth](../../authentication/oauth.md).

## Action Object

```json
{
  "action": "authLoginOauth"
}
```

## Notes

- This action is usually run automatically on the OAuth callback page.
- Use `authLoginOauth` as the preferred action name for new work.
- If the provider did not confirm the email, this action shows: "The identity provider did not confirm this email address."
- A disabled account uses `10163` / `auth.account_disabled` and keeps the server sentence.
- Other problems on this page use `10160` / `auth.oauth_failed`.
- "Sign in with your password once to connect this login." is shown on the login page, not here.
- This action does not need any custom options.

## Related Pages

- [OAuth](../../authentication/oauth.md)
- [Authentication](../../authentication/)
