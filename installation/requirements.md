# Requirements

### FMS16

* V16 FileMaker Server with CWP and XML enabled


### Web Server

MISC NOTES FROM EMAILS TO BE CONVERTED TO A README

> Can Use my own web server?

Yes, there is an `Enterprise` option. This is only needed for very specific intranet application this may be the only option.

-What are the server requirements for this setup? I just want to confirm our current off-site server is sufficient  
None. The server side software will connect to where ever the FMS is located. This allows the software to be easily revisioned \(and rolled back etc\)

> After building out the application form how difficult is it to add other forms \(i.e. staff application form, staff contract form, field trip permission forms, etc?\) Is this the type of thing we would eventually be able to do on our own?’

Very easy. there are a few ways to do things here. It sounds like emailing a smart link token that the user clicks \(and FMS pre-populates the form is the way to go. But, in this particular case there could be some dev customization needed because of the repopulation of data. I would guess about 2 hours a form.

###### .



