## Private information and PCI Compliance

You can prevent critical information from being saved to records by adding a `deletePaths` array of data model paths you want to remove or `'***'` out from the data model.

```
{
  "model": {
    "cartTotal": 89.04,
    "courseFormat": "Printed Book",
    "deletePaths": [
      "payment.cvv",
      "payment.number",
      "payment.cardNumber"
    ],
    "email": "asd@asd.com",
    "enrollments": [
      {
        "amount": 89.04
      }
    ],
    "nameFirst": "Charles ",
    "nameLast": "Delfs",
    "payment": {
      "address1": "50 moore",
      "cardNumber": "***",
      "city": "Bradford on",
      "country": "canada",
      "cvv": "***",
      "exp": "11-11",
      "method": " Check",
      "nameFirst": "charles",
      "nameLast": "delfs",
      "state": "on",
      "zip": "l32223"
    }
  }
}
```