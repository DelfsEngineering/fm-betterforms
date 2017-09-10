# Form Options

### Common Options

| Key | Description |
| :--- | :--- |
| form.title |  |
| form.subtitle |  |
|  |  |

### form.type: Wizard

| Key | Description |
| :--- | :--- |
| form.color | HTML color Color of form |
| form.shape | Shape of wizard tabs see [Form Wizard Git](https://www.gitbook.com/book/delfsengineering/fm-betterforms/edit#) |
| form.validateOnBack | Applies to wizard only |
| form.errorColor |  |
| form.backButtonText |  |
| form.nextButtonText |  |
| form.finishButtonText |  |
| form.transition | CSS transition used when changing tabs |
| form.shape | Used for wizard wizard for type |
| state.startIndex | 0 based index of the tab the form will have selected |
| page\[ {pageNumber} \].visible | set to \`false\` to hide this page, default is \`true\` |
|  |  |

## Form Design

### Form Types

[Form Wizard Git](https://github.com/cristijora/vue-form-wizard)

### type

This is the object type for this field, e.g. input, radio, dropdown etc.

see: [https://icebob.gitbooks.io/vueformgenerator/content/fields/core-fields.html](https://icebob.gitbooks.io/vueformgenerator/content/fields/core-fields.html)

Visible - boolean Boolean or string expression

Field components can be hsown shown or hidden programatically. The valie valid of value of the `visible` key is evaluated and the boolean Boolean result will control fiels field visibility.

```
// example - show occupation when employed is 'yes'

Model ; {
    "isEmployed" : ""
    },

 ... "fields" : {
    "label" : "Are you employedemployed'?",
    ...
    "model" : "isEmployed"
    },
    {
```

### \#\# Bootstrap Columns

Add custom `CSS` classes to `styleClasses`

[https://www.w3schools.com/bootstrap/bootstrap\_grid\_examples.asp](https://www.w3schools.com/bootstrap/bootstrap_grid_examples.asp)

omit periods

// e.g.:

`"styleClasses": "col-md-offset-2 col-md-6"`

## \#\# Validation

see: [https://icebob.gitbooks.io/vueformgenerator/content/validation/built-in-validators.html](https://icebob.gitbooks.io/vueformgenerator/content/validation/built-in-validators.html)

## Sample Wizard JSON

```JSON
{
  "form": {
    "formType": "formwizard",
    "title": "Camp Green Acres 2018 Application For Enrollment",
    "text": "<br /><h2>This is an example of a multiple page form.</h2>  Disrupt jean shorts viral hella meh, plaid cupidatat magna art party. Echo Park adipisicing literally narwhal. Williamsburg leggings church-key, craft beer forage cornhole jean shorts blue bottle pariatur.  <br /> <br /> <h2>Officia sapiente </h2>Bespoke, locavore plaid cray voluptate deep v ex vinyl tote bag chillwave swag occaecat. \n\nSed banh mi 3 wolf moon single-origin coffee quis tempor. Hoodie pitchfork pork belly aliqua, shabby chic elit consequat freegan ethical try-hard mixtape. Schlitz banjo deep v ullamco blog, umami nulla sint elit skateboard Godard odio.  ",
    "color": "grey",
    "shape": "circle",
    "errorcolor": "#a94442",
    "showPannelHeader": false,
    "panelHeaderText": "Your Dating Profile",
    "wizardTitle": "Register your child ",
    "panelIsCollapsible": false,
    "validateOnBack" : false,
    "cssObject": {
      "col-md-12": true,
      "text-danger": false
    },
    "styleObject": {}
  },
  "pages": [
    {
      "title": "Start",
      "description": "Overview Information",
      "icon": "fa fa-car",
      "validateOnServer": true,
      "schema": {
        "fields": [
          {
            "type": "switch",
            "label": "Status",
            "model": "status",
            "multi": true,
            "readonly": false,
            "featured": false,
            "disabled": true,
            "default": true,
            "textOn": "Active",
            "textOff": "Inactive"
          },
          {
            "type": "select",
            "label": "Prefix",
            "model": "prefix",
            "values": [
              "Mr.",
              "Mr. & Mrs.",
              "Mrs.",
              "Ms."
            ],
            "styleClasses": "col-md-2"
          },
          {
            "type": "input",
            "inputType": "text",
            "label": "Family Name",
            "model": "familyName",
            "readonly": false,
            "disabled": false,
            "styleClasses": "col-md-5"
          },
          {
            "type": "input",
            "inputType": "text",
            "label": "Referred By",
            "model": "reffered",
            "readonly": false,
            "disabled": false,
            "styleClasses": "col-md-5"
          }
        ]
      }
    },
    {
      "title": "Parent Info",
      "description": "Contact Info",
      "icon": "fa fa-user ",
      "schema": {
        "fields": [
          {
            "type": "input",
            "inputType": "text",
            "label": "First Name",
            "model": "nameFirst",
            "placeholder": "",
            "featured": true,
            "required": true,
            "styleClasses": "col-md-4"
          },
          {
            "type": "googleAddress",
            "inputType": "text",
            "label": "Address",
            "model": "address",
            "placeholder": "start typ",
            "featured": true,
            "required": true,
            "styleClasses": "col-md-4"
          },
          {
            "type": "input",
            "inputType": "email",
            "label": "E-mail",
            "model": "email",
            "validator": "email",
            "placeholder": "User's e-mail address",
            "styleClasses": "col-md-4"
          },
          {
            "type": "input",
            "inputType": "text",
            "label": "First Name",
            "model": "nameFirst2",
            "placeholder": "",
            "featured": true,
            "required": true,
            "styleClasses": "col-md-4"
          },
          {
            "type": "input",
            "inputType": "text",
            "label": "Last Name",
            "model": "nameLast2",
            "placeholder": "",
            "featured": true,
            "required": true,
            "styleClasses": "col-md-4"
          },
          {
            "type": "input",
            "inputType": "email",
            "label": "E-mail",
            "model": "email2",
            "validator": "email",
            "placeholder": "User's e-mail address",
            "styleClasses": "col-md-4"
          }
        ]
      }
    },
    {
      "title": "Camper Info",
      "description": "Camper Information & Program Selections",
      "icon": "fa fa-home",
      "schema": {
        "fields": [
          {
            "type": "input",
            "inputType": "text",
            "label": "Campers First Name",
            "model": "campFirstName",
            "placeholder": "",
            "featured": true,
            "required": true,
            "styleClasses": "col-md-6"
          },
          {
            "type": "input",
            "inputType": "text",
            "label": "Campers Last Name",
            "model": "camplast",
            "placeholder": "",
            "featured": true,
            "required": true,
            "styleClasses": "col-md-6"
          },
          {
            "type": "radios",
            "label": "Gender",
            "model": "gender",
            "values": [
              " Male",
              " Female"
            ],
            "styleClasses": "col-md-4"
          },
          {
            "type": "dateTime",
            "label": "DOB",
            "model": "dob",
            "required": true,
            "placeholder": "User's birth of date",
            "min": "",
            "max": "",
            "validator": "date",
            "dateTimePickerOptions": {
              "format": "YYYY-MM-DD"
            },
            "onChanged": "",
            "styleClasses": "col-md-4"
          }
        ]
      }
    },
    {
      "title": "Payment",
      "description": "Visa, Paypal",
      "icon": "fa fa-credit-card",
      "schema": {
        "fields": [
          {
            "type": "input",
            "inputType": "text",
            "label": "Card Type",
            "model": "cardType",
            "placeholder": "visa / MC / Amex",
            "featured": false,
            "required": false
          },
          {
            "type": "input",
            "inputType": "text",
            "label": "Full Name On Card",
            "model": "cardName",
            "placeholder": "john J. Smith",
            "featured": false,
            "required": false
          },
          {
            "type": "input",
            "inputType": "input",
            "label": "Number",
            "model": "cardNumber",
            "placeholder": "xxx-xxx-xxx"
          }
        ]
      }
    }
  ],
  "model": {
    "id": 1,
    "prefix": "Mr.",
    "nameFirst": "John",
    "nameLast": "Smith",
    "password": "J0hnD03!x4",
    "skills": [
      "Javascript",
      "VueJS"
    ],
    "email": "cdelfs@delfsengineering.ca",
    "status": true
  },
  "options": {
    "validateAfterLoad": true,
    "validateAfterChanged": true
  },
  "state": {
    "startIndex": 0
  }
}
```



