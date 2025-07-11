# **BetterForms Documentation Fixes - Status Update**

## **✅ COMPLETED FIXES (25 total)**

**🚀 Getting Started - Pearson**

### **Understanding Core BetterForms Concepts**

- **3.1 Introduction to Hooks (and where to find them in the IDE)**
- ✅ **FIXED:** Restored complete missing content (61 lines) - Found orphaned content and integrated comprehensive hook introduction with IDE location guidance, hook categories, timing, naming conventions, and FileMaker analogy

- **3.2 Running Your First Hook (Practical Example)**
- ✅ **FIXED:** Restored complete missing content (111 lines) - Created step-by-step onFormRequest hook setup guide with comprehensive troubleshooting section and scenarios table

- **3.3 Introduction to Actions & Action Scripts (IDE Context)**
- ✅ **FIXED:** Restored complete missing content (163 lines) - Combined practical content from multiple existing files with FileMaker developer context, IDE navigation guidance, and working examples

- **3.4 Understanding the Data Model (and Page Data Model UI)**
- ✅ **FIXED:** Restored complete missing content - Added comprehensive data model explanation with UI context, practical examples, and developer guidance

### **Common Customizations & Expanding Your App**

- **4.1 Adding & Configuring Buttons (Page Builder)**
- ✅ **FIXED:** Restored complete missing content (350+ lines) - Created comprehensive button guide with IDE context, FileMaker integration, practical examples, and troubleshooting

- **4.2 Implementing Page Navigation (Actions & Site Navigation UI)**
- ✅ **FIXED:** Restored complete missing content (300+ lines) - Combined action-based navigation, site navigation setup, IDE workflow, and practical examples with FileMaker context

- **4.3 Displaying Data in Tables (Page Builder & Element Config)**
- ✅ **FIXED:** Restored complete missing content (400+ lines) - Created comprehensive guide covering listrows vs tables2, IDE setup, FileMaker integration, and performance considerations

- **4.4 Basic App Styling (Site Styling UI)**
- ✅ **FIXED:** Restored complete missing content (350+ lines) - Combined Bootstrap CSS fundamentals, Site Styling UI, custom CSS, responsive design, and FileMaker integration

**📘 Reference**

### **Site Settings - Hassan**

- **Global Named actions**
- ✅ **FIXED:** Typical usage example has save with a strike through instead of code

### **Page Settings - Hassan**

- **Validation**
- ✅ **FIXED:** Validation does not__ run … typo with a

**Page Elements - Linxue**

**BetterForms Elements**

- **cleave**
- ✅ **FIXED:** type should be "cleave" (updated from "input" to "cleave" in all examples)

**Common**

- **Button**
- ✅ **FIXED:** check out examples words break as url name
- ✅ **FIXED:** example "text": "Goto /dash" do not need "/"
- ✅ **FIXED:** showAlert example icon class is wrong, should be "icon": "fa fa-triangle-exclamation"
- ✅ **FIXED:** Javascript Function Example icon classes is wrong, should be "icon": "fa fa-print"

**Grouping Elements**

- **Accordion2**
- ✅ **FIXED:** table slots typo "row.*idex" → "row._index"*

### **Actions Processor - Hassan**

- **Actions**
- ✅ **FIXED:** wait example has typo and shows **Example** and not the bolded text
- ✅ **FIXED:** emit also has a random U: G and the **Example issue**

### **Script Hooks - Jason**

- **Overview**
- ✅ **FIXED:** CommonHookSets: "app's" → "apps"
- ✅ **FIXED:** ScopedHookSets: "custoer" → "customer"
- **Global Variables**
- ✅ **FIXED:** "This is the **forms** entire data model" → "This is the **form's** entire data model"
- **Keeping Keys Private**
- ✅ **FIXED:** "All hooks will have full access the original payload data" → "All hooks will have full access **to** the original payload data"
- **API Callback Endpoint**
- ✅ **FIXED:** "The hook **is** passes all header" → "The hook passes all header"

### **APIs & Services - Eduardo**

- ✅ **FIXED:** Change APIs & SERVICES (side bar navigation text) to: APIs & Services

---

## **🔄 PENDING ITEMS**

### **🚀 Getting Started - Pearson**

- Welcome to FM BetterForms!
- System Overview
- Quick Tour of the BetterForms IDE
1. Setting Up Your Foundation
2. Building Your First Application
3. Understanding Core BetterForms Concepts - **COMPLETED**
4. Common Customizations & Expanding Your App - **COMPLETED**
5. Mastering the BetterForms Environment & Advancing Your Skills
- Support & Resources
- Getting Help - **Missing content**
- Learning JSON

**📘 Reference**

### **Site Settings - Hassan**

- **Navigation**
- there is no Appearance > Navigation tab
- this section seems to be talking about the Menu Schema not the actual navigation section
- **Site structure**
- Should this be linked on slots page for clarity?
- **Slots / Code Injection**
- window.formGen and formGen.formSchema.model is wrong paths? We dont use formGen
- No "Appearance > Slots" tab we have no appearance section
- headerMiddle and headerRight are not filled in

### **Page Settings - Hassan**

- **Data Model**
- Naming may be confusing as nothing is called "Production data"

**Page Elements - Linxue**

**BetterForms Elements**

- Add "HTML Data Model Inspector" especially when work with card modals where dev tool could show the model data from card modal (suggestions?)
- **checkbox**
- label incorrect description
- missing text key description
- type should be "bfcheckbox1" or "checkbox" (all works)
- **checklist**
- listBox default is true
- **DateTime Picker**
- common configuration properties: missing "format" key, format of selected data in model
- dateTimePickerOptions "format" key, format of selected data showing in calendar
- **Image Display Element**
- suggest move the comments out from code snippet json; (copy paste json will gave user errors if comments in json)
- **Masked input**
- examples are broken (@Hassan Mukhtar do we even have a working example?)
- **Range Slider**
- examples are broken (@Hassan Mukhtar do we even have a working example?)
- Suggest: other than select and advanced Select, add "vueMultiSelect" mutiple dropdown and simple dropdown

**Grouping Elements**

- suggestion: instead of using bullet point with links, show the child pages in buttons like previous parent page "Common"
- **Tabs**: need more testing on this example
- **Accordion2**: also need double check the example {{row.*index +1}} not updating the row number*
- **listrows**: in example, dose not need schema and fields, just listrows object is enough

### **Actions Processor - Hassan**

- **Named Actions (Action Scripts)**
- Defining Named actions section is confusing and incorrect as we dont have a Misc tab to edit, its the scripts tab
- **Actions**
- We dont have an emit or consoleError actions in the snippets
- clear command doesnt mention BF.actionsClear() instead the vueapp clear

### **Script Hooks - Jason**

- **Global Variables**
- The Var Names $$BF_Model and $$BF_App in the chart are marked with astericks [] but no legend exists to indicate what the astericks indicate
- "Keys passed in will be merged with the current app model. (0.8.32+)" - Not clear what the number in bracket is supposed to represent
- "This data may not be present **of** reduced payload options are set for the current layout" - not clear what this means
- The first 3 have links and further information - but we are missing further info for the following:
- $$BF_User, $$BF_Query, $$BF_Cookie, $$BF_Form, $$BF_Payload
- **$$BF_Model** - Needs further information, e.g., JSONGetElement and JSONSetElement examples
- **$$BF_App** - Need emphasis about global vs local data and optimization use cases
- **$$BF_State** - Need use case for appSite to indicate dev vs. staging vs. production environments
- **Reducing Payload Size** - Needs reference pic for "Send full schema in utility hooks" setting + Model Override Method example
- **API Callback Endpoint** - Needs clearer examples for variables, headers/statusCode description, section reordering
- **Common Hooks** - Duplicate onLogin title, missing onAuthNotifier, Global Before/After, onApiCall sections
- **Scoped Hooks** - Missing section for onFormRequest

### **Users & Authentication - Jason**

- **Users & Authentication** - Need image for page editor authentication toggle + path action example
- **User Registration** - Need onRegistration hook details + BF_User to business file linking info
- **Managing User Accounts** - Methods section needs examples + Error Handling example
- **Custom Login Pages** - Navigation slugs link doesn't work properly

### **Advanced Configuration - Eduardo**

- **Landing page is empty** (When you click on "Advanced Configuration")
- **Custom Domains** - *.fmbetterforms.com reference issue + need* .clientportal.cloud info + step reordering
- **Naked Domains** - Empty section with "(update needed)"

### **BF Utility Function Ver. 0.9.20+ - Eduardo**

- **Table** - BF.getPaths(object, JPquery) → BF.getPaths(object, JPath)
- **Example Usage** - Landing page is empty + need examples for every function (currently only i18n)

### **APIs & Services - Eduardo**

- **Messaging**
- Adding users to channels - Update Helper File version requirement
- Sending messages - Response object is empty
- **Core APIs**
- BF Server Proxy - Testing Connection has TODO text
- BetterForms Error Pages API - Complete Error Code List link doesn't work
- Custom error pages - Need onAppLoad workaround documentation
- **BF Streaming Proxy**
- BF Streaming API (Chat) - Fix "Avail in **bf-staging** only" text

### **Support & Maintenance - Eduardo**

- **Connection Trouble Shooting Guide** - Empty section
- **Updating the Helper File** - Empty section

---

## **📊 Summary Stats**

- ✅ **Completed:** 25 fixes across 20 files
- 🔄 **Remaining:** ~72+ items across all sections
- 🎯 **Next Priority:** Missing content sections or technical corrections?

**Commits Made:**
1. Fix multiple typos across documentation (9 fixes)
2. Fix button examples and global named actions (5 fixes)
3. Fix element type specifications and table typo (3 fixes)
4. Restore missing Getting Started section 3.1 - Introduction to Hooks (61 lines)
5. Restore missing Getting Started section 3.2 - Running Your First Hook (111 lines)
6. Restore missing Getting Started section 3.3 - Introduction to Actions & Action Scripts (163 lines)
7. Restore missing Getting Started section 3.4 - Understanding the Data Model (complete content)
8. Restore missing Getting Started section 4.1 - Adding & Configuring Buttons (350+ lines)
9. Restore missing Getting Started section 4.2 - Implementing Page Navigation (300+ lines)
10. Restore missing Getting Started section 4.3 - Displaying Data in Tables (400+ lines)
11. Restore missing Getting Started section 4.4 - Basic App Styling (350+ lines)

All changes have been pushed to the repository and are live! 🚀 