# 6. BetterForms  File Integration

## BetterForms Helper File Integration Guide

The BetterForms Helper file contains preconfigured custom functions and scripts that help you interact with BetterForms. This guide will show you how to insert these into your existing FileMaker file.

### What is a "Legacy Business FileMaker File"?

The "business file" refers to the existing FileMaker file that you are integrating with BetterForms. If you have multiple files or wish to create a new "API" file for stronger separation of business logic, the custom functions and scripts are only needed in a single file. Paste them into the file handling your logic for all BetterForms requests.

{% hint style="info" %}
Each FileMaker file that BetterForms interacts with must have the same user credentials. Your BetterForms user account should have \[Data Entry Only] permissions with XML and Data API extended privileges enabled.
{% endhint %}

### Steps to Install

**1. Install Custom Functions**

1. Open the helper file on your server.
2. Navigate to the Integration tab and select Step 1. This action will copy the custom functions to your clipboard.
3. Paste these custom functions into your legacy FileMaker file.

**2. Install Scripts**

1. In the helper file's Integration tab, click Step 2.
2. Enter the same common hook set name that you configured for your site in BetterForms.
3. For your first scoped hook set, enter the name of the Scoped Hook Set that you chose for your first page.
4. A set of scripts will now be on your clipboard. Open the Script Workspace of your legacy FileMaker file and paste in the generated scripts.

**3. Reconnect the Helper File**

1. Open the Script Workspace in the Helper file.
2. Locate the script named `Hooks - Developer - Transmitter- CONFIGURE HERE`.
3. Edit the else if branch to match the domain you configured in your site settings.
4. Edit the `Perform Script` step to run the `Betterforms - App - Receiver and Dispatch` script in your legacy file. You will need to add the legacy file as an additional FileMaker Data source to the helper file.

The helper file can route multiple BetterForms sites. While branching by the site's domain is most common, you can configure multiple sites in any way you see fit in this script.



