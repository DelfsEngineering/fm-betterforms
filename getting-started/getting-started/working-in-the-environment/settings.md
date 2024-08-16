# Settings

### General

You can set the <mark style="color:red;">**App Name**</mark> and <mark style="color:red;">**Common hookSet Name**</mark>** here.**

### App Model

You can define the default data model for your entire app.

{% hint style="info" %}
Data in the App Model resets on page refresh unless cached. It’s not sent to the server but can be set server-side using <mark style="color:red;">`$$BF_App`</mark>.
{% endhint %}

Store global elements like your logo or user info here and reference them as `{{app.key}}`. For example, upload your logo to **File Assets**, copy its URL, and set it in `logoURL`:

```json
"env": {
    "logoURL": "https://your-logo-url"
}
```

In **Styling** > **Header slots > HTML contents**:&#x20;

```html
<img :src="app.env.logoURL">
```

You can also cache the data here to enable <mark style="color:red;">Sync with app</mark> for a single page's data model.

{% hint style="info" %}
Caching:

* In Browser: Uses local storage, persists across tabs and after browser closure.
* In Tab: Uses session storage, persists only in the tab and survives refreshes.
* If both options are selected, session storage is prioritized.
{% endhint %}

### DOM Header Insertions

DOM Header Insertions allow you to add or modify scripts, styles, and other elements that influence how your app loads and behaves.

#### Load First

This section is for essential libraries and scripts that need to be available as soon as the app loads. For example: Tailwind CSS, Font Awesome and Custom CSS Classes. For example:

<pre class="language-html"><code class="lang-html">&#x3C;script src="https://cdn.tailwindcss.com">&#x3C;/script>
<strong>&#x3C;style type="text/tailwindcss">
</strong>:root {
    --white-color: #ffffff;
}

.btn-pri {
    @apply py-2 px-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700;
}

.btn-sec {
    @apply py-2 px-3 rounded-md bg-white text-indigo-600 hover:bg-slate-50;
}
&#x3C;/style>
</code></pre>

In Styling > CSS:

```css
.main-content-wrapper,body {    background: var(--white-color);}
```

In a single page html object:

```markup
<button class="btn-pri">Save</button>
<button class="btn-sec">Cancel</button>
```

#### Load Later

This section is for elements that can load after the initial content, such as:

App Title:

```markup
<title>Your App Title</title>
```

Favicon: Change the favicon by updating the URL in the link tag.

```markup
<link rel="shortcut icon" href="https://your-favicon-url" />
```

Additional Scripts: Add scripts like Marker.io that don’t need to load immediately.
