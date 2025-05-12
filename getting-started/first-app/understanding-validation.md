# 2.7 Understanding Validation

Validation is a crucial part of ensuring data integrity in your BetterForms application. This guide will help you understand how to implement and manage validation in your pages.

## Client-Side Validation

Client-side validation is controlled by the `validator` key in all page elements. This validation happens immediately in the browser, providing instant feedback to users.

### Triggering Validation

Validation does not run automatically. You must trigger client validation with the `validate` action. This action can be added to buttons or other elements to validate the form when needed. Automatic validation can be controlled with the validations settings from the `Page Settings` tab withing the page editor. 

### Validator Types

The `validator` key can be set to the following types:

* **number**: Checks that the value is numeric and within the fields min & max range, if defined.
* **integer**: Checks that the value is a valid JavaScript Number and an integer.
* **double**: Checks that the value is a valid number.
* **string**: Checks that the value is a string and its length is within the fields min & max range, if defined.
* **array**: Checks that the value is an array and its length is within the fields min & max range, if defined.
* **date**: Checks that the value is a valid JavaScript Date and between the fields min and max dates, if defined.
* **regexp**: Checks that the value matches the regex defined in the fields schema.pattern.
* **email**: Checks that the value is a plausible looking email address.
* **url**: Checks that the value is a plausible looking http url.
* **creditCard**: Checks that the value is a valid credit card number.
* **alpha**: Checks that the value is a letter.
* **alphaNumeric**: Checks that the value is a letter or a number.

## Custom Validators

You can define your own JavaScript custom validation calculation that will fire the same as the regular validators. By selecting the `validator` type to `calc` and adding a calculation and error message, you can have excellent control over validation.

### Example: Custom Validator

Here's an example of how to define a custom validator:

```json
{
  "inputType": "text",
  "label": "Some Password",
  "model": "password1",
  "placeholder": "",
  "styleClasses": "w-80",
  "type": "input",
  "required": true,
  "validator": "string"
},
{
  "inputType": "text",
  "label": "Another Password",
  "model": "password2",
  "placeholder": "",
  "styleClasses": "w-80",
  "type": "input",
  "required": true,
  "validator": "calc",
  "validator_calc": "model.password1 == model.password2",
  "errorMsg": "The passwords do not match"
}
```

## Server-Side Validation

While client-side validation is useful for providing immediate feedback, sensitive data should also be validated in your FileMaker scripts before committing to the database. This ensures that data integrity is maintained even if client-side validation is bypassed.

## Validation Settings

The **Page Settings** tab allows you to manage validation settings for your page:

* **Validate After Loaded**: Triggers validation routines as soon as the page is loaded. This should be enabled if any fields on the page have validators.
* **Validate After Changed**: Triggers validation routines as soon as a field is changed. This should also be enabled if fields have validators to ensure data integrity.

## Next Steps

You now have a basic understanding of how to implement and manage validation in your BetterForms application. As you build out your first application, you'll become more familiar with these components and how to use them effectively.

Explore the [BetterForms Elements reference](../../core-concepts/betterforms-elements/README.md) to see the wide variety of available elements and their specific configuration options. 