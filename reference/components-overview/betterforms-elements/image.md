# Image Display Element

The live `image` field supports both displaying an image and selecting a local file that is then stored into the model as a data URL.

In BetterForms, this field is useful for lightweight image preview and simple inline image capture. For larger upload workflows, use the dedicated uploader components.

## Common Configuration Properties

| Property       | Type    | Description                                                                                             |
| :------------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `type`         | `String`| Must be set to `"image"`.                                                                              |
| `label`        | `String`| An optional label for the image, which might be displayed as a caption or title.                        |
| `model`        | `String`| The key in your BetterForms data model that holds the image URL or Base64 data string.                    |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply to the image wrapper or the image itself for custom styling.                 |
| `fieldOptions` | `Object` | V3+ image field configuration such as `preview`, `hideInput`, `browse`, and `autocomplete`. |

## `fieldOptions`

Common keys include:

| Key | Type | Description |
| :-- | :-- | :-- |
| `preview` | `Boolean` | When not `false`, shows the preview area below the field |
| `hideInput` | `Boolean` | When `true`, hides the URL/text input |
| `browse` | `Boolean` | When `false`, hides the file picker input |
| `autocomplete` | `String` | Browser autocomplete mode for the text input |

### Example Schema Snippet (Image from URL)

```json
{
  "type": "image",
  "label": "Company Logo",
  "model": "companyLogoUrl",
  "fieldOptions": {
    "preview": true
  }
}
```

### Example Schema Snippet (Image from Base64 Data)

```json
{
  "type": "image",
  "model": "userAvatarBase64",
  "styleClasses": "img-circle",
  "fieldOptions": {
    "preview": true,
    "hideInput": true
  }
}
```

## BetterForms Specific Notes

*   If the text input is used, only values starting with `http` are written back to the model.
*   If the file input is used, the selected file is read with `FileReader.readAsDataURL()` and stored as a base64 data URL in the model.
*   The preview area also includes a remove control that clears the model value.
*   For heavier upload pipelines, use the dedicated upload components documented under "Uploading Files".

## Full Property Reference

This element is implemented in the sibling `vue-form-generator` source as `fieldImage.vue`.
