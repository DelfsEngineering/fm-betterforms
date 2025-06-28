# 7. Run your first Hook

For your first hook, let's try enabling the **onFormRequest** option for the page you just created. This option can be enabled in the **Integration** tab of the page editor.

## The FileMaker Script

From the scripts you pasted into your legacy FileMaker file, locate the one called `BF - onFormRequest - [scopedHookName]` where **\[scopedHookName]** is the name of scoped hook you defined on your page settings. This is the script that is run when the page is first loaded in the browser.

You can do anything you want in this script, but the ultimate goal for this example is to push data back to the browser. This is accomplished by setting the **\$$BF\_Model** global variable to a JSON object containing the data.

For now, just set the variable to something like this as an example, as long as it's different than what you set on the page's default data model so you can make sure the hook is running properly.

```javascript
JSONSetElement ( $$BF_Model ; 
    [ "nameFirst" ; "Jim" ; JSONString ];
    [ "nameLast" ; "Bob" ; JSONString ]
)
```

{% hint style="info" %}
Notice how we are only modifying the **\$$BF\_Model** JSON instead of replacing it. This is good practice when working with that global variable because otherwise you could accidentally erase existing data from the user's browser.
{% endhint %}

## Running the hook

* Save the FileMaker script
* Save your page settings
* Refresh your preview tab (or launch it again)

If everything is properly connected, you should see the data set from your FileMaker script on the page instead of the default data model. Even if you succeed here, be sure to review the troubleshooting tips for those times when it doesn't always go as planned.

## Troubleshooting Hooks

### Check the Inbox

Every single hook that interacts with your FileMaker server goes through the Helper file, so that's always a great place to start debugging.

Open the helper file and click the **Inbox** tab. Show the status toolbar and make sure you are viewing the most recent record. The left side shows you what data came in for a hook, while the right side shows you the data you sent back to the browser.

**If the record doesn't show up in the inbox**, then the hook never reached your FileMaker server.

* Double-check that the **onFormRequest** is enabled for your page in the Integration tab of the page editor. Then refresh your preview.
You* Check the BetterForms [user credentials](../setup/configure-fm-server.md) _(see below)_

**If you're not sure if the record is in the inbox or not**, clear the inbox (delete all records) then refresh your preview in the browser to double-check if the inbox record was created.

**If the inbox record exists but you had unexpected results**, check the outbox payload (the right side) to see the data model that was returned to the browser. You can run the hook locally by clicking the **Run Hook** button.

**If the hook runs as expected locally, but not through BetterForms**, then you need to [check the privileges](../setup/configure-fm-server.md) of the BetterForms user. The only differences between how BetterForms runs the script and when you run it locally with that handy button is the user account that runs the script.

### Check Extended Privileges

Invalid credentials or misconfigured extended privileges for the BetterForms user is the most common cause of integration problems.

Make sure your credentials for the BetterForms user have XML and Data API privileges enabled, and that they match what was configured in your [site settings](../first-app/create-app.md).

* BetterForms encrypts these credentials so you would have to re-enter them to verify they are correct. Your current credentials are not viewable from the IDE.

{% hint style="warning" %}
Remember that all files that BetterForms interact with must have these matching credentials. If the BetterForms user does not have access to the file or does not have XML and Data API privileges enabled in all files, the server script fails silently unless you have strong error capturing in place.
{% endhint %}
