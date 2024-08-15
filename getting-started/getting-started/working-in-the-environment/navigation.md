# Navigation

### **Slug Names**&#x20;

Set the slug or path for each page.

* **Slug:** A slug is the part of the URL that identifies a particular page on your site in a more readable way, typically following the domain (e.g., `subdomain.domain.com/`<mark style="color:red;">`your-slug`</mark>).
* **(internal) Path:** The full URL path, which can include the slug and any additional routing information (e.g., `subdomain.domain.com`<mark style="color:red;">`/your-slug`</mark>).

Remember to save your changes. In the ellipsis dropdown, you can:

* **Redirect** to edit the page
* **Precache** the page (sync data with the app)
* **Add more slugs** for the page
* **Preview** the page
* **Delete** the page

### **Menu Schema**

**Sidebar Navigation Menu Schema:** This section allows you to edit the structure of your sidebar navigation menu. The schema is represented as an array of objects, for example:

```json
[{
    "sectionLabel": "Menu",
    "subs": [{
        "exact": true,
        "icon": "fa fa-home",
        "label": "Home",
        "path": "/"
    }]
}]
```

* Each object within the <mark style="color:red;">`subs`</mark> array represents a menu item.
* You can customize each menu item by:
  * Adding your menu text as the **label**
  * Specifying an **icon** to display before the text
  * Defining the **path** of the page the menu item links to
* You can also apply custom styling with the <mark style="color:red;">`"styleClasses"`</mark> property and control dynamic rendering using <mark style="color:red;">`"visible_calc"`</mark>.
* **HTML objects** can be included inside <mark style="color:red;">`subs`</mark> as menu items.
* **Nested menus** can be created by using nested <mark style="color:red;">`subs`</mark> arrays to manage hierarchical navigation.
