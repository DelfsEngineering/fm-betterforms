# 🏗️ BF.i18n()

{% hint style="warning" %}
This page is under construction
{% endhint %}

You can use this functionality to set up multiple languages for your app or a single page.

### Step 1: Define Languages in Your App Model

```json
"i18n": {
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

### Step 2: Add Translatable Text in Your HTML

In your HTML block, add the text using <mark style="color:red;">`BF.i18n()`</mark> with the corresponding keys:

```html
// html
<button>{{BF.i18n('buttonExplore')}}</button>
<button>{{BF.i18n('buttonJoin')}}</button>

// label calc
"label_calc": "BF.i18n('someKey')"
```

### **Step 3: Set Language Through the App**

If you are setting the language through the app, you can do this in your global scripts <mark style="color:red;">`onAppLoad`</mark>.&#x20;

```javascript
app.i18n.langSelected =  Vue.cookie.get('langSelected') || app.i18n.langDefault
```

This setup allows your app to support multiple languages, enhancing user experience by displaying content in their preferred language.
