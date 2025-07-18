# Validation

Client side validation is controlled by the `validator` key in all page elements.&#x20;

```yaml
// Example
{
  "inputType": "text",
  "label": "Last Name",
  "model": "nameLast",
  "required": true,
  "styleClasses": "col-md-3",
  "type": "input",
  "validator": "string"
}
```

Validation **does not** run automatically. You must trigger client validation with the [validate action.](../../actions-processor/actions\_overview/validate.md)

### **The validator key can be set to the following:**

**number** Checks that the value is numeric - and that it's within the fields min & max range, if these are defined in the schema. **integer** Checks that the value is a valid Javascript Number - and that it's an integer.

**double** Checks that the value is a valid number.

{% hint style="warning" %}
When validating with **number**, **integer**, or **double**, make sure the `inputType` for the field is set to `number`, otherwise the input will be saved as a JSON string in your data model.
{% endhint %}

**string** Checks that the value is a string - and that its length is within the fields min & max range, if these are defined in the schema.

**array** Checks that the value is an array - and that the arrays length is within the fields min & max range, if these are defined in the schema. Expects the value to be a valid Javascript array literal - something like this: \["John", "Doe", "Jane"] or \[1, 2, 3].

**date** Checks that the value is a valid Javascript Date - and that the date is between the fields min and max dates, if these are defined in the schema.

**regexp** Checks that the value matches the regex defined in the fields schema.pattern. If schema.pattern isn't set, validation is skipped.

**email** Checks that the value is a plausible looking email address, using a regular expression.

**url** Checks that the value is a plausible looking http url, using a regular expression. Among other checks, the URL needs to start with http:// or https://.

**creditCard** Checks that the value is a valid credit card number, using code from here.

**alpha** Checks that the value is a letter, using this regex: /^\[a-zA-Z]\*$/

**alphaNumeric** Checks that the value is a letter or a number, using this regex: /^\[a-zA-Z0-9]\*$/

{% hint style="danger" %}
This validation works great as a user interface element, but should not be trusted in FileMaker. **Anything that comes from the a client's web browser can be hacked**, so sensitive data should also be validated in your FileMaker scripts before committing to the database.
{% endhint %}

Source: [https://icebob.gitbooks.io/vueformgenerator/content/validation/built-in-validators.html](https://icebob.gitbooks.io/vueformgenerator/content/validation/built-in-validators.html)
