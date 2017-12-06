## Private information and PCI Compliance

You can prevent critical information from being saved to records by adding a `deletePaths` array of data model paths you want to remove or `'***'` out from the data model.
All hooks will have full access the re original payload data.

```
{
  "model": {
    "deletePaths": [
    "payment.cvv",
    "payment.exp",
    "payment.cardNumber"
    ],
    "nameFirst": "Charles ",
    "nameLast": "Delfs",
    "payment": {
      "address1": "50 moore",
      "cardNumber": "1231 11221 212121",
      "city": "Bradford on",
      "country": "canada",
      "cvv": "123",
      "exp": "11-11"
    }
  }
}

// results is saved data:
{
  "model": {
    "deletePaths": [
      "payment.cvv",
      "payment.exp",
      "payment.cardNumber"
    ],
    "nameFirst": "Charles ",
    "nameLast": "Delfs",
    "payment": {
      "address1": "50 moore",
      "cardNumber": "***",
      "city": "Bradford on",
      "country": "canada",
      "cvv": "***",
      "exp": "***"
    }
  }
}
```
