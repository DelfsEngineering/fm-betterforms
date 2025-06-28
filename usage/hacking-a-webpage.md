# Hacking a Webpage

As you begin to play around with BetterForms, you may find that sometimes you want to dig deeper into the webpage to understand what's really going on—especially if things don't display just right! If you're familiar with basic web development, these techniques may already seem familiar to you.

Hacking a webpage requires that you use the developer tools that are built into your browser. For a brief intro about how to use the developer tools in your browser, check out [this link](https://www.lifewire.com/web-browser-developer-tools-3988965). We recommend using **Google Chrome** for development, but these tips should work in FireFox and Safari just the same.

{% hint style="info" %}
These tips are only relevant for debugging **JavaScript**, **HTML**, and **CSS** in the web browser. If you're experiencing issues with your data not behaving as expected, you may want to start with your [Helper File's inbox & outbox](../reference/connection-trouble-shooting-guide.md) instead.
{% endhint %}

## Inspecting an Element

An easy way to open the developer tools in most browsers is to right-click on any element and select **"Inspect Element"**. This opens the developer tools panel with the element you selected highlighted in the HTML code. From here, you can easily see how the JSON schema of the BetterForms editor translates to the HTML element on the page. You can even edit the HTML directly in the developer tools panel to quickly see how the changes might affect the look of the page.

This panel also allows you to modify the CSS properties of an element. This is a great way to test how some CSS changes will look before you add them to your [site settings](../getting-started/environment/app-settings-navigation.md).

If you're new to CSS, this is a great way to expand your knowledge by playing around with existing sites. Check out [this article](https://designtlc.com/use-chrome-inspector-edit-website-css/) for a quick overview.

## Debugging JavaScript

If you have a function action that you want to step through line-by-line, you can add a `debugger;`statement to your code at the point you want the code to pause. Then, with your developer tools panel open, trigger the function \(click the button or refresh the page, etc...\).

You'll see your code pop up in your developer tools panel and can use the buttons to step over a function, step into/out of a function, or just play the script with the blue continue button. These buttons are very similar to those found in the FileMaker script debugger.

While a script is paused, you can mouse-over parts of a variable or JSON path to see the result of that data. This is very helpful to see if your JSON path reference is incorrect!

{% hint style="info" %}
When you're done, don't forget to remove the `debugger` statement so that your scripts are better hidden in your production app!
{% endhint %}

