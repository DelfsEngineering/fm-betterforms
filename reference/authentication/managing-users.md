# Managing User Accounts

This is the canonical reference page for helper-file and FileMaker-oriented user management notes.

This page is intentionally separate from the login/reset/verification workflows because it is focused on user-record management rather than page-level authentication actions.

## Scope

Use this page when you need to manage BetterForms web users from the helper file / FileMaker side.

- Users are stored in the helper file.
- This page is helper-file / FileMaker oriented.
- Authentication page flows are documented in the main [Authentication](./README.md) section.

## User Object

The requests below refer to a user object like this:

```json
{
  "id": "",
  "email": "",
  "avatar": "",
  "isEnabled": true,
  "isVerified": true
}
```

## Methods

### Create a User

Pass a JSON object without an `id` key.

- `isEnabled` defaults to `false` if not set
- `isVerified` defaults to `false` if not set

The script returns the created user object, including its new `id`.

### Read a User

Pass only the `id` key to fetch the full user object without updating it.

### Update a User

Pass the `id` plus any fields you want to change.

### Delete a User

Pass the `id` and an additional `isDelete` flag set to `true`.

## FileMaker Note

Since BetterForms users live in the helper file, your legacy FileMaker file may need the helper file added as an external data source in order to call the relevant helper-file scripts.

## Error Handling

Use the `Error.isError` custom function to check the returned result and confirm the helper-file script ran correctly.

## Related Pages

- [Authentication](./README.md)
- [Basic Authentication](./basic-auth.md)
- [User Registration & Verification](./user-registration.md)
- [Password Management](./password-management.md)
