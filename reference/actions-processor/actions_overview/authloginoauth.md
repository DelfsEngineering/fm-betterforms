---
description: Finalizes an OAuth login after the provider redirects back into BetterForms.
---

# authLoginOauth / oauthLoginHook

`authLoginOauth` finalizes an OAuth login after the user returns from the provider callback.

`oauthLoginHook` is a legacy alias that is still supported.

## Typical Flow

1. User clicks a button that navigates to `/oauth/{provider}`.
2. The provider authenticates the user.
3. BetterForms redirects back to your page with the slug `auth/oauth`.
4. That page runs `authLoginOauth`, usually in `onFormLoad`.
5. BetterForms stores the login token and continues through the normal login flow.

## Action Object

```json
{
  "action": "authLoginOauth"
}
```

## Notes

- This action is usually run automatically on the OAuth callback page.
- Use `authLoginOauth` as the preferred action name for new work.
- If the OAuth provider returns an error, BetterForms surfaces it through the normal error pipeline.
- This action does not need any custom options.

## Related Pages

- [OAuth](../../authentication/oauth.md)
- [Authentication](../../authentication/README.md)
