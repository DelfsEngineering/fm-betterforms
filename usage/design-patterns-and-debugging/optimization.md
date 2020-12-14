# Optimization

Optimizing your app for best performance can be a process that you incorporate tward the end for the development. Because of the nature of the BetterForms hooks, typical early development optimizations are not as beneficial as later in the development stages.

There are several areas when most apps can be made more performant; perception, caching, threading and general FileMaker best practices. Once you app is built you will know what areas and workflows will need to be revisited, if any.

### Hook Call Times & Payload Size

The Helper File inbox has a timer that measures the total time a hook took to run as well as the volume of data coming in and out of the FileMaker server. The call time and payload size are the two key metrics you can use to judge the performance of the FileMaker side business logic.

### Reducing Data Transfer

BF hooks transfer data between the client and the BF servers. Reducing this data transfer will reduce latency times for all calls. Inspect the inbox for data size. Often you can remove data that is not needed to perform the purpose of the hook.

### Caching Data

If you are compiling deep JSON data objects with your asJSON un-stored calc's there can be many large potential gains you can make with data caching.

#### Server Side \(FMS\) Caching asJSON

If you have a large array of data that seldom changes \( only changes when a user occasionally adds data\), you can create a data cache table that can easily be used for all cached data regardless of the data source. 

A simple table that has a `dataName` and `data` fields will suffice. When a user edits data that would normally trigger an expensive operation to rebuild it, you call a script that wil rebuild the data and run asynchronously.

#### App and Page Model Browser Side Caching \(bf-v0.10.4+\)

The `app` data model and the page level `model` keys can be individually cached in the browsers local or session storage.

This keys you would like to cache are is enabled within the corresponding  model edit page of the page builder.

* **Use Local Storage** - This data will persist from session to session, and remain even after the browser has been closed.
* **Use Session Storage** - This data will survive a page refresh, but will not survive after the tab has been closed in the browser.

As your application loads, BetterForms will first check the **Session Storage** and if enabled, try to pull data from there, if that is not successful, it will check the **Local Storage** if enabled and attempt to populate data from there. By allowing separate control, you can have a given tabs context preserved. 

Keys that are set for caching will automatically be saved locally as they are changed. No additional cache management is required.

{% hint style="warning" %}
**Security:** It is important to be mindful of sensitive data. Browser side caching is not encrypted and as such can be viewed directly by users. 

You can clear local storage explicitly upon logout via an action function with the below JS code. This is not a security mitigation, but may be considered under some circumstances.

```text
window.localStorage.clear();
```
{% endhint %}





