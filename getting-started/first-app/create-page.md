# 2.2 Create Your First Page (Intro to Page Builder)

Now that you have [created your App (Site) structure](create-app.md), the next exciting step is to build your first interactive page within it.

## What is a BetterForms Page?

Think of a BetterForms page like a FileMaker layout. It will contain any combination of fields, buttons, data tables, text, labels, etc., that you place onto it. The primary difference is that a BetterForms **page** is not tied to a specific Table Occurrence from your FileMaker solution. Instead, it will have access to whatever data you pass into it individually through its **Data Model**.

Pages are managed within the "Pages" tab of your App in the BetterForms IDE. From there, you can create new pages, edit existing ones, and manage their settings.

{% hint style="warning" %}
This guide assumes that you already have a working knowledge of basic JSON formatting and terminology. If you have never worked with JSON before, we recommend you [review this introduction to JSON](../support/learning-json.md) first.
{% endhint %}

## Key Concepts for Your First Page

Before diving into the creation steps, let's touch on two fundamental concepts:

### 1. The Data Model

All data that can be seen and interacted with on the page lives in the **Data Model**. The Data Model is simply a JSON object. It can be pre-populated with data from your FileMaker Server when the page loads, and then users can modify it through input fields or other page elements.

When you run a [**Scoped Hook**](broken-reference) (a FileMaker script tied to this page), the current Data Model is passed with the request, allowing you to process and save the data back to your FileMaker database.

### 2. The Page Schema

The **Page Schema** is where you define all the elements that will appear on your page. It's also structured in JSON format.

The most important part of the schema for now is the `fields` array. This array holds a list of all the [Page Elements](../../reference/components-overview/) (like input fields, buttons, text areas, etc.) that make up your page.

If you're familiar with HTML, you know that pages are built from the top down by default. The same concept applies here. Using Bootstrap CSS classes (which BetterForms supports), you can control the layout, such as how wide an element should be, and the elements will stack on the page accordingly.

## Step-by-Step: Creating Your First Page

Let's walk through creating a simple page.

1. **Navigate to Create a New Page:**
   * In the BetterForms IDE, within your newly created App, go to the **"Pages"** section.
   * Click the **"New Page"** button (or a similar "+" icon).
2. **Initial Page Settings:**
   * **Page Name:** Give your page a descriptive name, e.g., "My First Page".
   * **Description:** (Optional) Add a brief description.
   * **Scoped Hook Set Name:** You'll need to set a [Scoped Hook Set Name](broken-reference) for the page. For this first page, something simple like "page1" or "myFirstPageHooks" will work. This name corresponds to a group of FileMaker scripts that will handle data operations for this specific page.
   * **Authentication:** For this initial page, let's simplify things. Turn the **Authentication toggle to OFF** (it might show as "No Auth" or similar). This means users won't need to log in to see this specific page for now.
3.  **Adding a Simple Element to See Data (Schema Editor):**

    * After basic settings, you'll typically be taken to the page editing interface, which includes a **Schema Editor** tab. This is where you define what appears on your page.
    * Your new page might start with some default elements. We're going to add a special element to display the contents of our Data Model.
    * In the Schema Editor, look for a "Snippets" search bar or section. Search for "HTML".
    * You should find a snippet like **"HTML - Data Model Inspector"**. Click the copy button for this snippet.
    * Now, you need to paste this copied JSON snippet into the `fields` array within your page's schema. If there are already elements in the `fields` array, make sure to add a comma (`,`) after the last existing element before pasting the new one.

    Your schema's `fields` array, with the new HTML inspector added, might look something like this (some existing default elements might be present):

    ```json
    {
        "schema": {
            "fields": [
                // ... any existing default elements would be here ...
                // If there were elements above, ensure there's a comma after the last one.
                {
                    "type": "html",
                    "label": "Data Model Inspector",
                    "html": "<pre>{{model}}</pre>",
                    "styleClasses": "col-md-12" // Or col-md-6 depending on template
                }
            ]
        },
        "showPanelHeader": true, // This might be a default setting
        "title": "My First Page" // This often reflects the page name
    }
    ```

    _(Note: The exact structure of default elements can vary. The key is adding the `Data Model Inspector` object correctly into the `fields` array.)_

    \{% hint style="info" %\} The schema editor might seem overwhelming at first, but it's very well organized.

    * To help you understand the structure, try clicking the small triangles or arrows often found near the line numbers. This allows you to collapse and expand JSON objects or arrays, making it easier to see the hierarchy.
    * Alternatively, while you're learning, you might find it useful to copy your page schema JSON and paste it into an external JSON editor like [jsoneditoronline.org](https://jsoneditoronline.org/) to view and edit it in a different visual format. \{% endhint %\}
4.  **Populating Initial Data (Data Model Tab):**

    * Now, switch to the **"Data Model"** tab for your page. This is where you can define some initial data that your page will have when it loads.
    * Enter a simple JSON object. The "HTML - Data Model Inspector" element we added to the schema will display this data on the page.
    * For example, add:

    ```json
    {
        "nameFirst": "John",
        "nameLast": "Doe",
        "message": "Hello, BetterForms!"
    }
    ```
5. **Save Your Page:**
   * **Crucial step:** Click the **"Save"** button to save all your changes to the page schema and data model.

## Viewing Your New Page

You have two main ways to see your page:

1. **Preview within the IDE:** Most page editors have a **"Preview"** button. This will render your page directly within the BetterForms environment.
2. **Preview in Your Site:** To see it as your users would, you often want to preview it within your actual site. To do this, replace the `app.fmbetterforms.com` part of the preview URL (or the IDE's URL) with your own app's domain that you configured (e.g., `myawesomeapp.bfm.app`).

{% hint style="success" %}
Remember to **save** your page _before_ previewing it in a new browser tab or window to ensure you see the latest changes!
{% endhint %}

Go ahead and preview this page in your site. You should see the "Data Model Inspector" element displaying the JSON data you entered:

```
{
  "nameFirst": "John",
  "nameLast": "Doe",
  "message": "Hello, BetterForms!"
}
```

(Or however the `<pre>{{model}}</pre>` renders it).

## Next Steps

Congratulations! You've successfully created a basic page, defined its structure with the schema, added some initial data, and viewed it.

The next step is to learn about [Adding and Configuring Page Elements](adding-elements.md) to build more complex and interactive user interfaces.
