# 🏗️ BF.i18n()

{% hint style="warning" %}
This page is under construction
{% endhint %}

You can use this functionality to set up multiple languages for your app or a single page.

### Step 1: Define Languages in Your App Model

```json
"i18in": {
        "dict": {
            "buttonExplore": {
                "ch": "探索功能",
                "en": "Explore Features"
            },
            "buttonJoin": {
                "ch": "加入社区",
                "en": "Join Community"
            }
        },
        "langDefault": "en",
        "langSelected": "en",
        "languages": [{
            "id": "en",
            "name": "English"
        }, {
            "id": "ch",
            "name": "简体中文"
        }]
    }
```

### Step 2: Set Default Languages in DOM Header Insertions

<pre class="language-html"><code class="lang-html"><strong>&#x3C;!-- BF.i18in -->
</strong>&#x3C;script>
        BF.i18n = function(key) {
        var _app = vueapp.$store.state.site.content.app
        var langSelected = _app.i18n.langSelected
        var langDefault = _app.i18n.langDefault

        if (typeof key == "undefined" || _.isEmpty(key)) {
            return ''
        }

        return _.get(_app.i18n.dict, [key, langSelected]) ||
            _.get(_app.i18n.dict, [key, langDefault]) ||
            'No default lang value or invalid key'
    }
&#x3C;/script>
</code></pre>

### Step 3: Add Translatable Text in Your HTML

In your HTML block, add the text using <mark style="color:red;">`BF.i18n()`</mark> with the corresponding keys:

```html
<button>{{BF.i18in('buttonExplore')}}</button>
<button>{{BF.i18in('buttonJoin')}}</button>
```

### **Step 4: Set Language Through the App**

If you are setting the language through the app, you can do this in your global scripts <mark style="color:red;">`onAppLoad`</mark>. If setting the language for only a single page, use a page local script <mark style="color:red;">`onFormLoad`</mark>:

```javascript
app.i18n.langSelected =  Vue.cookie.get('langSelected') || app.i18n.langDefault
```

This setup allows your app to support multiple languages, enhancing user experience by displaying content in their preferred language.
