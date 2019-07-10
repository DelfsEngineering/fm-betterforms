# uploadCare

`uploadCare` gives you file uploads, media processing, and adaptive delivery for web and mobile by providing a widget allowing multiple file uploads from various sources including social media. 

See UploadCare for more detailed information [https://uploadcare.com/](https://uploadcare.com/)

The component is based on UploadCares JS widget.   
**Documentation**: [https://uploadcare.com/docs/api\_reference/javascript/](https://uploadcare.com/docs/api_reference/javascript/) 

**Version**: &gt; 0.8.18

### Usage

1. Register for a free account at [www.uploadcare.com](www.uploadcare.com)
2. Add your API public key into the schema
3. Uploaded file data is found in the `model` key.

#### Notes:

Not all of UploadCare's options setting ar available as `options.someOption` keys, some are only available as global variables. To handle this BetterForms adds provision for adding both `GLOBAL` and `JS` options. See options documentation for what ones are supported under what key.

Fully read the UploadCare documentation before posting support requests.

```text
// Example
{
    "globals": {
        "UPLOADCARE_CLEARABLE": true,
        "UPLOADCARE_LOCALE_TRANSLATIONS": {
            "buttons": {
                "choose": {
                    "files": {
                        "other": "Add Files"
                    }
                }
            }
        }
    },
    "model": "newFiles",
    "onUploadComplete_actions": [{
        "action": "runUtilityHook",
        "options": {
            "type": "add"
        }
    }],
    "options": {
        "crop": true,
        "multiple": true,
        "publicKey": "922fff6657dc1ae880be"
    },
    "styleClasses": "col-md-2",
    "type": "uploadcare"
}


```

