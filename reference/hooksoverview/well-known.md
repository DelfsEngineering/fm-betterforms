# Well-Known URLs (Beta)

{% hint style="warning" %}
This is a **beta** feature in Klai Studio / BetterForms **3.5.69** and later. The routing contract may change. Only add a FileMaker handler when you have a concrete need for a site-root `/.well-known/` file. Unhandled well-known requests already return an empty `404`; you do not need a catch-all in FileMaker.
{% endhint %}

Some external services will only accept a file at a **fixed path on your app hostname**, not under `/api`. The usual case is Apple Pay merchant domain verification:

`https://your-app-domain/.well-known/apple-developer-merchantid-domain-association`

Other examples: Apple Universal Links (`apple-app-site-association`), Android App Links (`assetlinks.json`), or a custom well-known file your PSP gives you. Let's Encrypt `acme-challenge` and Klai `mcp.json` are **not** yours to implement.

From **3.5.69**, `GET` and `HEAD` to `/.well-known/{file}` (except the two platform paths below) are rewritten internally to `/api/.well-known/{file}` and dispatched to the same common hook as the [API Callback Endpoint](callback.md): `onApiCall`.

## When to use this

Implement a FileMaker branch only if:

* A payment provider (for example Apple Pay via a PSP) requires a domain association file on **your** Klai hostname, with no redirect.
* You need another well-known file at the site root (Universal Links, Android Digital Asset Links, and similar).
* The file content is tenant-specific (different blob per hostname or merchant).

Do **not** use this as a general website folder, for SSL issuance, or for MCP discovery.

## Platform-owned paths

| Path | Owner | What you should do |
| ---- | ----- | ------------------ |
| `/.well-known/mcp.json` | Klai | Leave it alone. Not sent to `onApiCall`. |
| `/.well-known/acme-challenge/...` | Certificate manager | Leave it alone. Not rewritten. |
| Any other `GET`/`HEAD` `/.well-known/...` | Your app, optional | Handle in `onApiCall` **or** let Node return an empty `404`. |

`POST` / `PUT` / `PATCH` / `DELETE` on `/.well-known` are not rewritten. Direct calls to `/api/.well-known/...` still use normal `/api` behavior (no well-known 404 trap).

## What Node does

1. Rewrites the public URL to `/api/.well-known/...` (no HTTP redirect).
2. Calls your common hook `onApiCall`.
3. If the script returns an explicit `contentType` of `text`, `json`, `xml`, or `html` and a `2xx` status, Node sends that body as-is.
4. If `contentType` is missing, the result is empty, the status is `3xx` / `401` / `403`, or the script errors, Node responds **`404` with an empty `text/plain` body**. It does not return SPA HTML, a hash redirect, or Feathers `"Snap, Page not found"` JSON.

That 404 trap exists because scanners probe many `/.well-known` paths. A default JSON `onApiCall` response on those URLs looks like an accidental API.

## FileMaker script to edit

Edit the common API callback script:

**`BetterForms Hooks - onApiCallback - {MyAppCommonHooksetName}`**

Replace `{MyAppCommonHooksetName}` with your app's common hook set name (the same name you configured for common hooks).

Add the well-known branch **at the top of the developer-editable area**, before version/service routing, and **exit** so existing `/api/V1/...` routes are unchanged.

The payload Node already builds for you:

* `params.method` — `GET` (HEAD is dispatched as GET)
* `params.path` — array, for Apple Pay: `[".well-known", "apple-developer-merchantid-domain-association"]`
* `params.wellKnown` — `true` on rewritten public well-known requests
* `state.subdomain` — request host without port

You must set `$contentType` (for Apple Pay, `"text"`), `$statusCode` (`200`), and `$response` to the **exact** file bytes. Do not JSON-encode a text blob. Do not wrap it in HTML.

For every other `.well-known` path, do not return a 200. Leave `$contentType` empty so Node 404s.

{% hint style="info" %}
The existing footer that writes `$$BF_Payload` already supports `text` / `html` / `xml` vs JSON. You do not need to change the "do not edit below here" block if it already includes `data.contentType`, `data.response`, `data.headers`, and `data.statusCode`.
{% endhint %}

### Example branch (Apple Pay file)

This is only the well-known part. Keep your existing dispatcher for `/api/V1/...`.

```
# /.well-known — Node rewrites GET /.well-known/{file} to /api/.well-known/{file}
# Add this before your version / service routing, then Exit Loop If.

If [ JSONGetElement ( $params ; "path[0]" ) = ".well-known" and JSONGetElement ( $params ; "path[1]" ) = "apple-developer-merchantid-domain-association" ]
	Set Variable [ $response ; Value: "PASTE_APPLE_OR_PSP_DOMAIN_ASSOCIATION_FILE_HERE" ]
	Set Variable [ $contentType ; Value: "text" ]
	Set Variable [ $statusCode ; Value: 200 ]
	Exit Loop If [ True ]
Else If [ JSONGetElement ( $params ; "wellKnown" ) = True or JSONGetElement ( $params ; "path[0]" ) = ".well-known" ]
	# Other well-known files: do not return JSON. Node will 404.
	Set Variable [ $contentType ; Value: "" ]
	Exit Loop If [ True ]
End If
```

If your script still parses the path with `$pathList` from `params.route.0` instead of `params.path`, also match:

`GetValue ( $pathList ; 1 ) = ".well-known"` and `GetValue ( $pathList ; 2 ) = "apple-developer-merchantid-domain-association"`

(or values `2` and `3` if your list has a leading empty value). Prefer `params.path[0]` / `params.path[1]` when present.

Replace `PASTE_APPLE_OR_PSP_DOMAIN_ASSOCIATION_FILE_HERE` with the exact domain association file from Apple or your PSP. For a smoke test only, a short unique string is enough to prove pass-through; Apple’s crawler requires the real file, `Content-Type: text/plain` (or `application/octet-stream`), HTTPS, `200`, and **no redirect**.

## Verify

```bash
curl -i https://your-app-domain/.well-known/apple-developer-merchantid-domain-association
# 200, text/plain, exact file bytes, no 3xx

curl -i https://your-app-domain/.well-known/nope
# 404, empty body

curl -i https://your-app-domain/.well-known/mcp.json
# existing Klai MCP JSON, not your onApiCall handler
```

## Related

* [API Callback Endpoint](callback.md)
* [Common Hooks](commonoverview.md)
* [Apple: Preparing merchant domains for verification](https://developer.apple.com/documentation/applepayontheweb)
* [Apple TN3173](https://developer.apple.com/documentation/technotes/tn3173-troubleshooting-issues-with-your-apple-pay-merchant-id-configuration)
