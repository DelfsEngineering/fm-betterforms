# BF.i18n()

You can use this functionality to set up multiple languages for your app.

### Step 1: Define Languages in Your App Model

In App Model, define your dictionary with keys and values as following example:

```json
"i18n": {
        "dict": {
            "buttonExplore": {
                "en": "Explore Features",
                "zh": "探索功能"
            },
            "buttonJoin": {
                "en": "Join Community",
                "zh": "加入社区"
            }
        },
        "langDefault": "en",
        "langSelected": "en",
        "languages": [{
            "id": "en",
            "name": "English"
        }, {
            "id": "zh",
            "name": "简体中文"
        }]
    }
```

You can also have a key to cache the user selection in App model and check it in <mark style="color:red;">`App Key Caching`</mark>.

```json
"langCurrent": "en"
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

Set the language in your global scripts global scripts <mark style="color:red;">`onAppLoad`</mark>.&#x20;

```javascript
app.i18n.langSelected =  app.currentLang || app.i18n.langDefault
```

### Step 4: Add Function to Handle User Selection

In your global script, create a JavaScript function like <mark style="color:red;">`selectLanguage`</mark> to handle user select.

```javascript
// change selected language by user
app.i18n.langSelected = action.options.lang

// change cached langugae
app.langCurrent = action.options.lang
```

In your page, use the following to call <mark style="color:red;">`selectLanguage`</mark> and highlight the current selection:

```html
<div v-for="lang in app.i18n.languages" 
     @click="namedAction('selectLanguage', { lang: lang.id })"
     :class="['block px-4 py-2 text-sm leading-5 focus:outline-none', 
              app.langCurrent === lang.id ? 'bg-purple-700 text-white' : 'text-white hover:bg-purple-400 hover:text-gray-900 cursor-pointer']"
>
  {{ lang.name }}
</div>
```

This setup allows your app to support multiple languages, enhancing user experience by displaying content in their preferred language.
