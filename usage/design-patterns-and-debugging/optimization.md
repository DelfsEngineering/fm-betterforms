# Optimization

Optimizing your app for best performance can be a process that you incorporate tward the end for the development. Because of the nature of the BetterForms hooks, typical early development optimizations are not as benefitial as later in the development stages.

There are several areas when most apps can be made more performant; perception, caching, threading and general FileMker best practices. Once you app is built you will know what areas and workflows will need to be revisitied, if any.

### Hook Call Times & Payload Size

The Helepr File inbox has a timer that measues the total time a hook took to run as well as the volume of data coming in and out of the FileMaker server. The call time and payload size are the two key metrics you can use to judge the performance of the FileMaker side business logic.

### Reducing Data Transfer

BF hooks transfer data between the client and the BF servers. Reducing this data transfer will reduce latency times for all calls. Inspect the inbox for data size. Often you can remove data that is not needed to perform the purpose of the hook.

### Caching

If you care compiling deep JSON data objects with your asJSON unstored calcs there can be many large potential gains you can make with data caching.

#### Caching asJSON

If you have a large array of data that seldom changes \( only changes when a user occasionally adds data\), you can create a data cache table that can easily be used for all cahced data regardless of the data source. 

A simple table that has a `dataName` and `data` fields will suffice. When a user edits data that would normally trigger an expsensive operation to rebuild it, you call a script that 

{% hint style="info" %}
 test
{% endhint %}



