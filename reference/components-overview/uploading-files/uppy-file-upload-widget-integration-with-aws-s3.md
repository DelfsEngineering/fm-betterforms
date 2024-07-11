# 🏗️ Uppy File Upload Widget Integration with AWS S3

{% hint style="warning" %}
This page is in development&#x20;
{% endhint %}

This page provides instructions on how to integrate the Uppy file upload widget with AWS S3 for seamless file uploads. It also includes helper functions for path extraction and named actions.

#### **1. Uppy Library**

Include the Uppy library and its CSS in your DOM Header Insertions.

```html
<script src="https://releases.transloadit.com/uppy/v3.7.0/uppy.min.js"></script>
<link href="https://releases.transloadit.com/uppy/v3.7.0/uppy.min.css" rel="stylesheet">
```

#### 2. Path Extraction Function

Include the the `BF.getPaths` in  your DOM Header Insertion. This function is used to extract JSON paths from a data object based on a filter. This can be helpful for dynamically generating paths to specific data elements.

```html
<script>
    BF.getPaths = function(data, filter) {
        var paths = jp.paths(data, filter);
        var arrayLength = paths.length;
        var lineResult = [];
        for (var i = 0; i < arrayLength; i++) {
            var line = paths[i];
            for (var j = 0; j < line.length; j++) {
                var term = line[j];
                if (term == "$") {
                    // Root element
                } else if (typeof term === "number") {
                    lineResult[i] = lineResult[i] + "[" + term + "]";
                } else {
                    lineResult[i] = lineResult[i] == null ? "data." + term : lineResult[i] + "." + term;
                }
            }
        }
        return lineResult;
    }
</script>
```

#### 3. Named Action Promise Function

Include the `BF.namedActionPromise` function in  your DOM Header Insertion. It facilitates the execution of named actions with a promise-based approach. This function generates a unique ID for each action and resolves the promise once the action is complete.

```html
<script>
    BF.namedActionPromise = function(namedActionName, options) {
        var idResolver_uid = BF.getUUID();
        options.idResolver_uid = idResolver_uid;
        return new Promise((resolve, reject) => {
            window.namedActionResolve[options.idResolver_uid] = resolve;
            BF.namedAction(namedActionName, options);
        });
    };
</script>
```

#### **4. AWS S3 Setup**

Ensure you have an AWS S3 bucket and the necessary credentials for accessing it. You can reference [here](dropzone-to-s3.md).

{% hint style="info" %}
Check [this example](https://app.fmbetterforms.com/#/apps/pages/edit?id=FR\_A1E5B73B-3238-1A43-A212-92999C2EA9CF) for Uppy used in various cases.
{% endhint %}

#### Action Scripts

`getSignedURL` handles the process of obtaining a signed URL from AWS S3 to upload files securely.

`resolver` resolves the signed URLs obtained for file uploads.

`runSignedURL` triggers the process to get the signed URL for file uploads.

`uploadHandler` handles the post-upload process.

`onFormLoad` In this action, it **i**nitializes necessary variables and Uppy instances for different upload scenarios, including drag-drop area, status bar, dashboard trigger, and file input.

```javascript
// Initialize session and promise resolver
window.namedActionResolve = {};
model.idSession = BF.getUUID();

// Initialize Uppy instances with configurations
window.uppy1 = new Uppy.Uppy({ /* ... */ });
window.uppy2 = new Uppy.Uppy({ /* ... */ });
window.uppy3 = new Uppy.Uppy({ /* ... */ });
window.uppy4 = new Uppy.Uppy({ /* ... */ });

// Additional setup and event listeners for Uppy instances
```
