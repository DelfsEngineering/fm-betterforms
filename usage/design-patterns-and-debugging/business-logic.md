# Business Logic

Separating Concerns

## DRY - Don't Repeat yourself

Write scripts that can be called from both FM Client and BF Web apps equally. This is a paradigm change for most FileMaker developers.

Consider a workflow that creates a new record when a user initiates some action like clicking a button.

#### Traditional FileMaker Pseudo code

* \[Button Clicked\] - Run script "Create Record"

## Validation Best Practices

Do not assume data has been validated. **Anything that comes from the client \(browser\) can be hacked.** If you are using the database native field validations \(not empty, unique etc\) then make sure you trap for errors on commit. These errors should be echoed back to the client in the form of a [modal](../../reference/actions-processor/actions_overview/showmodal.md) or [alert](../../reference/actions-processor/actions_overview/showalert.md).

