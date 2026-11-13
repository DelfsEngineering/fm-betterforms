# Setting up Microsoft Entra ID (Office 365)

Microsoft Entra ID (formerly Azure AD) is one of the OAuth providers supported by Klai Studio. Use it when users should sign in with their Microsoft work or school (Office 365) account.

Before using this guide, make sure you have already set up the shared Klai Studio OAuth requirements in the canonical reference:

- [OAuth](../../reference/authentication/oauth.md)

That page covers the Klai Studio-side flow, required callback page, `authLoginOauth`, `Users.oauthId`, and `onBeforeRegistration`.

## What Is Microsoft-Specific

For Microsoft Entra, the main provider-specific pieces are:

- Create an Entra app registration of type `Web`
- Add the Klai Studio callback URL to the registration
- Copy the Entra credentials into Klai Studio
- Put the **Directory (tenant) ID** (or `common`) in the Klai Studio **Subdomain** field — the same vault shape used by Auth0, Okta, and Google
- Add the `email` and `xms_edov` values on the ID token, so Klai Studio can tell the email is verified

## Create the Entra App Registration

In the [Azure Portal](https://portal.azure.com), open **Microsoft Entra ID** → **App registrations** → **New registration**:

- Name: for example `Klai Studio` or your app name
- Supported account types: usually **Accounts in this organizational directory only** (single tenant) for Office 365 orgs
- Redirect URI platform: **Web**

## Redirect URI (Callback URL)

In the app registration, under **Authentication**, add:

```text
https://yourapp.domain.com/oauth/microsoft/callback
```

If the same Klai Studio app is reachable on multiple domains, add each callback URL as a separate redirect URI.

Examples:

- `https://bfmeetingsdev.clientportal.cloud/oauth/microsoft/callback`
- `https://yourapp.fmbetterforms.com/oauth/microsoft/callback`

## Credentials to Copy Into Klai Studio

Klai Studio expects the same three OAuth vault fields used by other providers:

In Klai Studio, open the app environment menu, choose **App Settings** (or **Env Edit** → **3rd Party Auth**), enable OAuth, and select provider **Microsoft**:

- **Client ID** — Application (client) ID from the Entra overview page
- **Client Secret** — value from **Certificates & secrets** → New client secret
- **Subdomain** — Directory (tenant) ID, or a verified domain such as `contoso.onmicrosoft.com`

| Klai Studio field | Entra value |
| --- | --- |
| Provider | `Microsoft` |
| Subdomain | Directory (tenant) ID, verified domain, or `common` |
| Client ID | Application (client) ID |
| Client Secret | Client secret **value** (not the secret ID) |

Use `common` in Subdomain only when the Entra app is configured for multi-tenant / any Microsoft account. For a typical single-tenant Office 365 org, use the Directory (tenant) ID.

## Token and API Permissions

In the Entra app registration:

1. **API permissions** — add Microsoft Graph delegated permissions `openid`, `profile`, and `email` (and grant admin consent if your tenant requires it).
2. **Token configuration** — optional claims → ID → add **email** and **xms_edov**.

Klai Studio matches people by the email, and only when Microsoft says that email is verified. `xms_edov` must be true. Klai Studio does not use the Microsoft username.

## Start Microsoft Login

Start the flow with a `path` action:

```json
{
  "action": "path",
  "options": {
    "sameWindow": true,
    "url": "/oauth/microsoft"
  }
}
```

## Allowing New Users

New people can get an account without any extra hook. To stop a signup, add `onBeforeRegistration` and set `model.createUser` to `false`.

A person who already has a password is not created again. They are asked to sign in with that password once. See [OAuth](../../reference/authentication/oauth.md).

## Optional: Force a Full Microsoft Logout

`authLogout` clears the Klai Studio session. If you also need to clear the Microsoft-hosted session, redirect the browser to Entra's end-session endpoint after `authLogout`.

```json
"logout": [
  {
    "action": "authLogout"
  },
  {
    "action": "path",
    "function": "action.options.url = `https://login.microsoftonline.com/YOUR_TENANT_ID/oauth2/v2.0/logout?post_logout_redirect_uri=https://${window.location.host}`",
    "options": {
      "sameWindow": true,
      "url": "/"
    }
  }
]
```

Replace `YOUR_TENANT_ID` with your Directory (tenant) ID (or `common` if that matches how you configured the app).

## Troubleshooting

- **Redirect URI mismatch** — the URI in Entra must match exactly, including `https` and `/oauth/microsoft/callback`.
- **Email was not confirmed** — add the ID token values `email` and `xms_edov`. Both are needed before a new person can sign up, or before a password account can be connected. Someone who is already connected can still sign in.
- **Wrong tenant** — single-tenant apps need the Directory (tenant) ID in Klai Studio Subdomain, not another org's ID.
- **Personal Microsoft accounts fail** — check the app registration's supported account types; work/school-only apps reject personal MSA accounts.
