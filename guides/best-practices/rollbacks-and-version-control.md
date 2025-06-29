# Rollbacks and Version Control

#### **Overview**

Introducing the BetterForms Version Control feature, designed to provide users with the ability to effortlessly manage changes and rollback pages, sites, and environments to previously saved versions. By assigning unique version numbers to each entity, users can easily identify and revert to desired versions, ensuring enhanced control and flexibility when working with forms and applications in FM BetterForms.

1. _**Environment versioning:**_ Incremented version numbers with each edit made to the environment before deployment, making it easy to track changes and revert if needed.
2. _**Page versioning:**_ Dual-number versioning system that represents major (environment) and minor (page) versions, allowing users to easily identify and rollback to previous versions.
3. _**Site versioning:**_ Similar versioning system as pages, incremented with changes to site styling, action scripts, navigation, components, or settings.
4. _**Preserved versions:**_ Approximately 20 versions of a page or site saved, including recent edits within the past 2 days and various older versions.
5. _**Deployment-based preservation:**_ Permanent saving of pages and entities associated with deployed versions for easy reference and rollback.

#### **Environments**:

The environment version number is incremented every time an edit is made to the environment before deployment. If the environment is not edited at the point of deployment, a new version will not be created. The same rule applies to rollbacks. If the environment was edited before the rollback, a new version will be created. Otherwise, a new version will not be created.

#### **Pages**:

The version number of a page consists of two numbers separated by a dot. The first number represents the major version of the environment, and the second number represents the minor version of the page. For example, a page with version number 14.28 would convey that the major version is 14 and the minor version is 28. Every time a page is successfully saved, the minor version number is incremented by one.

BetterForms saves approximately 20 versions of a page or site. These versions will include all recent edits within the past 2 days in addition to various versions dating backward in time. If a deployment is made, the pages and entities associated with that deployed version will be saved permanently.

After a deployment of the environment that the page belongs to, the major version is incremented, and the minor version is reset to zero.

#### **Sites**:

The version number of a site follows the same rules and logic as that of a page. A site version is incremented whenever any information pertaining to the site itself is changed. Examples of such changes include editing the styling, action scripts, navigation, components, or settings.
