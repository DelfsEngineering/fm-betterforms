# Image Display Element

The Image element is used to display an image on your form or page. The image source can be a URL or a Base64 encoded string.

In BetterForms, this element is primarily for displaying static or dynamic images. For image uploading, BetterForms typically uses dedicated uploader components like Dropzone or Uppy, which may have their own preview capabilities.

## Common Configuration Properties

| Property       | Type    | Description                                                                                             |
| :------------- | :------ | :------------------------------------------------------------------------------------------------------ |
| `type`         | `String`| Must be set to `"image"`.                                                                              |
| `label`        | `String`| An optional label for the image, which might be displayed as a caption or title.                        |
| `model`        | `String`| The key in your BetterForms data model that holds the image URL or Base64 data string.                    |
| `alt`          | `String`| Alternative text for the image, important for accessibility. Defaults to "Image".                       |
| `width`        | `String` / `Number` | Sets the display width of the image (e.g., "100px", "50%", or `100`).                                   |
| `height`       | `String` / `Number` | Sets the display height of the image (e.g., "100px", `100`). Can also be `"auto"`.                      |
| `styleClasses` | `String` / `Array` | CSS class(es) to apply to the image wrapper or the image itself for custom styling.                 |

### Example Schema Snippet (Image from URL)

```json
{
  "type": "image",
  "label": "Company Logo",
  "model": "companyLogoUrl", // This model field would contain 'https://example.com/logo.png'
  "alt": "Our Company Logo",
  "width": "150px"
}
```

### Example Schema Snippet (Image from Base64 Data)

```json
{
  "type": "image",
  "model": "userAvatarBase64", // Model field contains 'data:image/jpeg;base64,...'
  "alt": "User Avatar",
  "width": 100,
  "height": 100,
  "styleClasses": "img-circle"
}
```

## BetterForms Specific Notes

*   This element is for displaying images. For image *upload* functionality, refer to BetterForms' uploader components (e.g., Dropzone, Uppy) which are documented separately under "Uploading Files".
*   The `model` property should provide a valid image source (URL or Base64 data URI).
*   Dynamic image display can be achieved by updating the `model` field through actions or hook scripts.

## Full Property Reference

This element is based on a standard form generation library. For a comprehensive list of all available properties and the full technical specification, please refer to the [Image Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/image). 
