# Page Navigation

## Navigation Slugs

In the Appearance > Navigation tab of your site's settings, you can define **navigation slugs**, which are displayed in the URL of in the user's browser. You'll see more about how the URLs are built later in this page.

The structure of your navigation slugs is a nested JSON object as shown below. The name of the slug is the key of the object, and the id shown is the UID of the page you want to appear at that navigation slug.

```yaml
{
    "default": {
        "id": "36D74465-3F11-4CE4-A0FD-370D78C98B86"
    },
    "dashboard": {
        "id": "633D7D10-F8AD-4B6E-8D86-BDC8038D6E91"
    }
}
```

More features may be added to this object in the future, but for now, `id` is the only option that can be set here.

## URL Structure

Every page in a BetterForms URL starts with the domain name followed by the # symbol as shown. The # symbol allows the application to function like a single-page web app so that parts of the page can be changed without the browser needing to render the entire page again.

The domain section can be either a subdomain of fmbetterforms.com or your own [custom domain](../../reference/advanced-configuration/custom-domains.md),

**https:// `domain` /#/**

The base URL will load whatever page is listed as the default key in your site's [navigation slugs](page-navigation.md#navigation-slugs).

Other pages can be loaded either by ID or by their navigation slug. Using Navigation slugs is merely a shortcut to the page's ID, but they are the recommended method of building URLs for the following reasons:

* They make URLs shorter and easier for your users to understand
* You can easily update a page later across all of your site simply by updating the ID in your site's settings

**.../#/`navSlug`**

**.../#/form/`Page ID`**

{% hint style="warning" %}
Navigating by **Page ID** may not be supported in a future version of BetterForms in order to provide better support for other features. Always use a **navSlug** to maintain compatibility.
{% endhint %}

## Query Parameters

Query parameters are additional values that can be passed with a URL as a page is loading. If you are new to query parameters, [see this](https://en.wikipedia.org/wiki/Query\_string) on Wikipedia.

BetterForms parses these values into a JSON object for your use in any [scoped hooks](../../reference/hooksoverview/hooks.md). They are available in the [**\$$BF\_Query**](../../reference/hooksoverview/filemaker-globals/) global variable.

You can also access the query from JavaScript using the [utility function](../../reference/bf-utility-function-ver-0.9.20+.md) `BF.getQueryParam(key)`.
