# SEO Meta Tags Field Reference

> **⚠️ PRELIMINARY FEATURE - BETA**
>
> This feature is currently in beta testing. The API and functionality may change in future releases. We welcome feedback and suggestions as we refine this feature.

---

## Overview

The `seoMeta` field type allows you to define SEO meta tags at the form/page level. These tags are extracted during Server-Side Rendering (SSR) and injected into the HTML `<head>` section, enabling:

- **Search Engine Optimization** - Better indexing by Google, Bing, etc.
- **Social Media Previews** - Rich previews when links are shared on Slack, Facebook, LinkedIn, Twitter, Discord, etc.
- **Dynamic Meta Tags** - Use `_calc` expressions to populate tags from database data

---

## Field Structure

### Basic Schema 

```json
{
  "type": "seoMeta",
  "metaTags": {
    "title": "Page Title - Your Brand",
    "description": "Page description for search results",
    "og:title": "Social Media Title",
    "og:image": "https://yourdomain.com/image.jpg"
  }
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | String | Yes | Must be `"seoMeta"` |
| `metaTags` | Object | Yes | Meta tag definitions |

---

## Behavior

### In Editor (GUI)
- **Visible** - Field appears in the form designer in the tree view
- **Editable** - Designers can modify meta tags
- **No Rendering** - Does not render in the actual form

### In Production (Runtime)
- **Hidden** - Field does not appear to users
- **SSR** - Meta tags are extracted during SSR for bots/crawlers
- **Client-Side** - Meta tags are also injected into `document.head` at runtime for regular users, enabling correct browser tab titles, social sharing from the SPA, and `<html lang>` attributes

---

## Meta Tags Object

The `metaTags` object supports two types of values:

### 1. Static Values
```json
{
  "title": "About Us - Acme Corp",
  "og:image": "https://cdn.acme.com/about.jpg"
}
```

### 2. Dynamic Values with `_calc`
```json
{
  "title_calc": "model.product.name + ' - $' + model.product.price",
  "description_calc": "model.product.description || 'Default description'"
}
```

**Important:** The `_calc` suffix is removed when rendering:
- `title_calc` → becomes `title` in HTML
- `og:image_calc` → becomes `og:image` in HTML

---

## Supported Meta Tag Types

### Special Keys

These keys have unique behavior and do **not** render as `<meta>` tags:

| Key | Behavior |
|-----|----------|
| `title` | Sets `<title>` tag (browser tab / search result title) |
| `language` | Sets `<html lang="...">` attribute. Defaults to `"en"` if omitted |
| `_comment*` | Ignored — for developer notes and organization |

### Standard Meta Tags
Use `name=""` attribute:

```json
{
  "description": "Page description",
  "keywords": "keyword1, keyword2",
  "author": "Your Name",
  "robots": "index, follow"
}
```

**Renders as:**
```html
<meta name="description" content="Page description">
<meta name="keywords" content="keyword1, keyword2">
```

---

### Open Graph (Facebook, LinkedIn, Slack)
Use `property=""` attribute:

```json
{
  "og:title": "Social Media Title",
  "og:description": "Social media description",
  "og:image": "https://example.com/image.jpg",
  "og:type": "website",
  "og:url": "https://example.com/page"
}
```

**Renders as:**
```html
<meta property="og:title" content="Social Media Title">
<meta property="og:image" content="https://example.com/image.jpg">
```

---

### Twitter Card
Use `name=""` attribute:

```json
{
  "twitter:card": "summary_large_image",
  "twitter:title": "Twitter Title",
  "twitter:description": "Twitter description",
  "twitter:image": "https://example.com/twitter.jpg"
}
```

**Renders as:**
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Twitter Title">
```

---

### Article Meta (Blog Posts)
Use `property=""` attribute:

```json
{
  "og:type": "article",
  "article:published_time": "2024-01-15T10:00:00Z",
  "article:author": "John Doe",
  "article:section": "Technology"
}
```

---

### Product Meta (E-commerce)
Use `property=""` attribute:

```json
{
  "og:type": "product",
  "product:price:amount": "29.99",
  "product:price:currency": "USD",
  "product:availability": "in stock"
}
```

---

## Dynamic Expressions with `_calc`

Add `_calc` to any key to evaluate it as a JavaScript expression. The expression has access to the `model` object from the form's data model.

```json
{
  "title_calc": "model.product.name + ' | My Store'"
}
```

If both a static key and its `_calc` counterpart exist, `_calc` takes precedence.

---

## Complete Examples

### Static Page

```json
{
  "type": "seoMeta",
  "metaTags": {
    "title": "About Us - Acme Corporation",
    "description": "Learn about Acme Corp's mission, values, and team",
    "og:title": "About Acme Corp",
    "og:image": "https://cdn.acme.com/about-og.jpg",
    "og:type": "website",
    "twitter:card": "summary_large_image"
  }
}
```

### Dynamic Page (using `_calc`)

Any key with a `_calc` suffix is evaluated as a JavaScript expression with access to `model`. The `_calc` version takes priority over the static key.

```json
{
  "type": "seoMeta",
  "metaTags": {
    "title_calc": "model.product.name + ' - $' + model.product.price + ' | Acme Store'",
    "description_calc": "model.product.description?.substring(0, 160)",
    "og:title_calc": "model.product.name",
    "og:image_calc": "model.product.images?.[0]?.url || 'https://cdn.acme.com/default.jpg'",
    "og:type": "product",
    "twitter:card": "summary_large_image"
  }
}
```

---

## Requirements

### Server-Side Rendering (SSR) Enabled per page

The `seoMeta` field **only works with SSR enabled**. Meta tags are extracted and rendered when:

1. A bot/crawler accesses the page (Googlebot, Facebookbot, etc.)
2. SSR is enabled for the form's layout in site settings
3. The form is successfully loaded with data

### Form Data (`onFormRequest`)

For **dynamic** `_calc` expressions:

- The form's `onFormRequest` hook must be enabled
- The hook must populate the `model` object with data
- SSR will fetch this data automatically

For **static** values:
- No `onFormRequest` needed
- Tags are rendered as-is

---

## Validation & Best Practices

### Character Limits

| Tag | Recommended Length |
|-----|-------------------|
| `title` | 50-60 characters |
| `description` | 150-160 characters |
| `og:title` | 60-90 characters |
| `og:description` | 55-65 characters |
| `twitter:title` | 70 characters |

### Image Requirements

| Platform | Size | Aspect Ratio |
|----------|------|--------------|
| Open Graph (Facebook, LinkedIn, Slack) | 1200x630px | 1.91:1 |
| Twitter Large Image | 1200x675px | 16:9 |
| Twitter Summary | 120x120px (min) | 1:1 |

### Best Practices

1. ✅ **Always include fallbacks** in `_calc` expressions
2. ✅ **Use absolute URLs** for images
3. ✅ **Test previews** on actual platforms (Slack, Facebook, etc.)
4. ✅ **Keep descriptions concise** and compelling
5. ✅ **Use high-quality images** (1200x630px minimum)
6. ❌ **Don't use relative URLs** for og:image
7. ❌ **Don't exceed character limits** (truncated by platforms)

---

## Testing

### Test as Bot

Use curl with a bot user-agent:

```bash
curl -H "User-Agent: Googlebot" https://yourdomain.com/page
```

Look for meta tags in the `<head>` section.

### Test Social Previews

- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Inspector:** https://www.linkedin.com/post-inspector/
- **Slack:** Just paste the link in any channel

---

## Troubleshooting

### Meta Tags Not Appearing

**Check:**
1. Is SSR enabled for this layout?
2. Is the form loading successfully?
3. Are you testing with a bot user-agent?
4. Does the `seoMeta` field exist in the form schema?

### Dynamic Values Not Working

**Check:**
1. Is `onFormRequest` enabled for the form?
2. Is the `model` object populated with data?
3. Are `_calc` expressions syntactically correct?
4. Check server logs for evaluation errors

### Social Previews Not Updating

**Solution:**
- Clear the platform's cache using their debugging tools
- Facebook/LinkedIn/Twitter cache previews for 7 days
- Use their inspector tools to force a refresh

---

## Security

### XSS Prevention

All meta tag values are **automatically HTML-escaped** to prevent XSS attacks:

```javascript
<script>alert('xss')</script>
// Becomes:
&lt;script&gt;alert('xss')&lt;/script&gt;
```

### Expression Safety

`_calc` expressions are evaluated with:
- Limited scope (only `model` object available)
- Error catching (failures are logged, not exposed)
- No access to `require()`, `process`, or other Node.js APIs

---

## Auto-Generated Tags

The following are injected automatically if not explicitly defined in `metaTags`:

| Tag | Value |
|-----|-------|
| `<link rel="canonical">` | Current page URL |
| `og:url` | Current page URL |

---

## Page Language

Set the page language with the `language` key:

```json
{
  "language": "fr",
  "title": "Titre de la Page"
}
```

**Renders as:**
```html
<html lang="fr">
```

For dynamic language based on model data:
```json
{
  "language_calc": "model.userLanguage || 'en'"
}
```

If omitted, defaults to `"en"`.

---

## Dynamic robots.txt and sitemap.xml

BetterForms automatically generates `robots.txt` and `sitemap.xml` for each tenant. Pages with `ssr.enabled: true` are allowed/listed; everything else is disallowed. No configuration required beyond enabling SSR per layout.

---

## Query String Forwarding

When a non-bot user visits a clean URL like `/pricing?ref=campaign`, SSR redirects them to the SPA hash route while **preserving query parameters**:

```
/pricing?ref=campaign&utm_source=google
→ 302 redirect to /#/pricing?ref=campaign&utm_source=google
```

This ensures UTM tracking, referral codes, and other query parameters are not lost during the SSR → SPA redirect.

---

## Related Documentation

- [Form Settings Overview](./README.md)
- [Data Model](./data-model.md)
- [SEO and Social Sharing Guide](../../guides/customization/seo-and-social-sharing.md)
- [DOM Header Insertions](../site-settings/dom-header-insertions.md)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| Beta 1.0 | 2024-02 | Initial release |
| Beta 1.1 | 2026-02 | Client-side meta injection, `language` key, `robots.txt`/`sitemap.xml`, query string forwarding |

---

## Feedback

This is a preliminary feature. Please report issues or suggestions:
- **Email:** support@fmbetterforms.com
- **Forum:** [BetterForms Community](https://community.fmbetterforms.com)

---

*Last Updated: February 2026*
