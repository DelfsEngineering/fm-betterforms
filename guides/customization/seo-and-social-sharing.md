# SEO and Social Sharing Guide

> **⚠️ PRELIMINARY FEATURE - BETA**
>
> This feature is currently in beta testing. The functionality and best practices may evolve based on user feedback. We encourage you to test thoroughly and share your experience with us.

---

## Overview

This guide shows you how to optimize your BetterForms pages for search engines and social media sharing using the new `seoMeta` field type. When configured correctly, your pages will:

- ✅ Appear in Google search results with rich titles and descriptions
- ✅ Display beautiful previews when shared on Slack, Teams, Discord
- ✅ Show engaging cards on Facebook, LinkedIn, Twitter
- ✅ Improve click-through rates from search and social
- ✅ Provide better user experience for link sharing

---

## Why This Matters

### Without SEO Meta Tags
When you share a link, you get a plain URL with no context:

```
https://yourdomain.com/products/widget-pro

(no preview, no image, no description)
```

### With SEO Meta Tags
Your links become rich, engaging previews:

```
╔══════════════════════════════════════╗
║  [Image: Product photo]              ║
║                                      ║
║  Widget Pro - $29.99                 ║
║  The ultimate widget for your needs  ║
║                                      ║
║  yourdomain.com                      ║
╚══════════════════════════════════════╝
```

---

## Quick Start

### Step 1: Add the Field to Your Form

In your form schema, add a `seoMeta` field:

```json
{
  "type": "seoMeta",
  "metaTags": {
    "title": "Your Page Title - Brand Name",
    "description": "Brief description of your page (150-160 characters)",
    "og:title": "Title for social media",
    "og:description": "Description for social media previews",
    "og:image": "https://yourdomain.com/images/social-preview.jpg",
    "og:type": "website",
    "twitter:card": "summary_large_image"
  }
}
```

### Step 2: Enable SSR for the Layout

In your site settings, ensure SSR is enabled for this page:

```json
{
  "layouts": {
    "your-page-slug": {
      "id": "YOUR_FORM_ID",
      "title": "Page Title",
      "ssr": {
         "enabled": true
      }
    }
  }
}
```

### Step 3: Test Your Page

Visit your page as a bot to see the meta tags:

```bash
curl -H "User-Agent: Googlebot" https://yourdomain.com/your-page
```

Look for your meta tags in the `<head>` section!

---

## Common Scenarios

### Static Page

For pages with fixed content (About Us, Contact, Pricing):

```json
{
  "type": "seoMeta",
  "metaTags": {
    "title": "About Us - Acme Corporation",
    "description": "Learn about Acme Corp's mission and team.",
    "og:title": "About Acme Corp",
    "og:image": "https://cdn.acme.com/images/about-hero-1200x630.jpg",
    "og:type": "website",
    "twitter:card": "summary_large_image"
  }
}
```

### Dynamic Page (using `_calc`)

For database-driven pages, add a `_calc` suffix to any key. The value is evaluated as a JavaScript expression with access to `model` (populated via `onFormRequest` hook).

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

`_calc` expressions support standard JavaScript — optional chaining, ternaries, string concatenation, array methods, fallbacks with `||`, etc.

---

## Supported Meta Tags

All standard Open Graph (`og:`) and Twitter Card (`twitter:`) tags are supported. The most commonly used:

| Tag | Used by |
|-----|---------|
| `title`, `description` | Google, Bing |
| `og:title`, `og:description`, `og:image`, `og:type` | Facebook, LinkedIn, Slack, Discord, WhatsApp |
| `twitter:card`, `twitter:title`, `twitter:image` | Twitter/X |

Use `"twitter:card": "summary_large_image"` for large image previews. A 1200x630px image works across all platforms.

---


## Testing

Test your page as a bot using curl:

```bash
curl -H "User-Agent: Googlebot" https://yourdomain.com/your-page
```

Use platform debuggers to preview and refresh cached social cards:

- **Facebook:** https://developers.facebook.com/tools/debug/
- **LinkedIn:** https://www.linkedin.com/post-inspector/
- **Slack:** paste link in channel, use `/unfurl clear <url>` to refresh

## Best Practices

- Titles: under 60 characters; descriptions: 150-160 characters
- Images: use absolute URLs, 1200x630px, under 1MB, publicly accessible
- Use fallback values in `_calc` expressions (e.g. `model.title || 'Default'`)
- Enable `onFormRequest` hook for dynamic `_calc` content
- Each page should have unique meta tags

---


## Automatic robots.txt and sitemap.xml

BetterForms automatically serves `robots.txt` and `sitemap.xml` for each tenant. Pages with `ssr.enabled: true` are allowed/listed; everything else is disallowed. No manual files or extra configuration needed.

---

## Page Language

Control the `<html lang="...">` attribute for international SEO using the `language` key in `metaTags`:

```json
{
  "type": "seoMeta",
  "metaTags": {
    "language": "fr",
    "title": "Tarification - Mon Application"
  }
}
```

- Defaults to `"en"` (English) if not specified
- Use any [ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) (`en`, `fr`, `es`, `de`, `ja`, etc.)
- For dynamic language: `"language_calc": "model.userLanguage || 'en'"`

---

## Client-Side Meta Tags

The `seoMeta` field also works for regular (non-bot) users in the browser. When the Vue app loads:

- `document.title` is updated (browser tab shows the correct title)
- `<html lang="...">` is set
- All meta tags are injected into `<head>` (useful for single-page app navigation)
- Tags are cleaned up when navigating away from the page

This means social sharing tools that read the live DOM (not just the initial HTML) will see the correct meta tags.

---

## Feedback

This is a preliminary feature. Please share feedback or suggestions in the Slack channel **#suggestions**.

---

*Last Updated: February 2026*
