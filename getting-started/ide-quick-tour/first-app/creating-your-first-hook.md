# 2.9 Creating Your First Hook

Now that you understand the basics of the Page Data Model and Hooks, let's create your first hook in BetterForms. This guide will walk you through the process of setting up and running a simple hook.

## Introduction to Hooks

Hooks are scripts that insert themselves into normal workflow, allowing additional control. They can be triggered at various points in the page lifecycle, such as when the page is first loaded or when a utility action is performed.

Hooks fall into two categories:

* **Common Hooks:** These are not contextual to a specific page and can be called from anywhere. Examples include login or registration hooks.
* **Scoped Hooks:** These are bound to a specific page. The `onFormRequest` hook is an example of a scoped hook, which is called when a specific form loads.

## Creating Your First Hook

For your first hook, let's enable the `onFormRequest` option for the page you just created. This option can be enabled in the **Integration** tab of the page editor.

### Step 1: Enable the onFormRequest Hook

1. **Navigate to the Integration Tab:**
   * In the BetterForms IDE, open the page you want to add a hook to.
   * Go to the **Integration** tab.
2. **Enable the onFormRequest Hook:**
   * Find the **Enable onFormRequest Hook** option and toggle it on. This will trigger the `onFormRequest` hook script when the page is first loaded.

### Step 2: Locate the FileMaker Script

From the scripts you pasted into your legacy FileMaker file, locate the one called `BF - onFormRequest - [scopedHookName]` where `[scopedHookName]` is the name of the scoped hook you defined on your page settings. This is the script that is run when the page is first loaded in the browser.

### Step 3: Modify the FileMaker Script

You can do anything you want in this script, but the ultimate goal for this example is to push data back to the browser. This is accomplished by setting the `$$BF_Model` global variable to a JSON object containing the data.

For now, just set the variable to something like this as an example, as long as it's different than what you set on the page's default data model so you can make sure the hook is running properly.

```javascript
JSONSetElement ( $$BF_Model ; 
    [ "nameFirst" ; "Jim" ; JSONString ];
    [ "nameLast" ; "Bob" ; JSONString ]
)
```

{% hint style="info" %}
Notice how we are only modifying the `$$BF_Model` JSON instead of replacing it. This is good practice when working with that global variable because otherwise you could accidentally erase existing data from the user's browser.
{% endhint %}

### Step 4: Run the Hook

* **Save the FileMaker script.**
* **Save your page settings.**
* **Refresh your preview tab (or launch it again).**

If everything is properly connected, you should see the data set from your FileMaker script on the page instead of the default data model. Even if you succeed here, be sure to review the troubleshooting tips for those times when it doesn't always go as planned.

## Troubleshooting Hooks

### Check the Inbox

Every single hook that interacts with your FileMaker server goes through the Helper file, so that's always a great place to start debugging.

Open the helper file and click the **Inbox** tab. Show the status toolbar and make sure you are viewing the most recent record. The left side shows you what data came in for a hook, while the right side shows you the data you sent back to the browser.

**If the record doesn't show up in the inbox**, then the hook never reached your FileMaker server.

* Double-check that the **onFormRequest** is enabled for your page in the Integration tab of the page editor. Then refresh your preview.
* Check the BetterForms [user credentials](../setup/configure-fm-server.md) _(see below)_

**If you're not sure if the record is in the inbox or not**, clear the inbox (delete all records) then refresh your preview in the browser to double-check if the inbox record was created.

**If the inbox record exists but you had unexpected results**, check the outbox payload (the right side) to see the data model that was returned to the browser. You can run the hook locally by clicking the **Run Hook** button.

**If the hook runs as expected locally, but not through BetterForms**, then you need to [check the privileges](../setup/configure-fm-server.md) of the BetterForms user. The only differences between how BetterForms runs the script and when you run it locally with that handy button is the user account that runs the script.

### Check Extended Privileges

Invalid credentials or misconfigured extended privileges for the BetterForms user is the most common cause of integration problems.

Make sure your credentials for the BetterForms user have XML and Data API privileges enabled, and that they match what was configured in your [site settings](create-app.md).

* BetterForms encrypts these credentials so you would have to re-enter them to verify they are correct. Your current credentials are not viewable from the IDE.

## Next Steps

You now have a basic understanding of how to create and run your first hook in BetterForms. As you build out your first application, you'll become more familiar with these components and how to use them effectively.

Explore the [BetterForms Elements reference](../../../reference/components-overview/) to see the wide variety of available elements and their specific configuration options.
