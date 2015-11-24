DRRrrRrvrr
====

Zombifies text of documents from your google drive.

## Features

* Authorize user via Google's OAuth
* View list of the first 10 documents in your google drive root folder
* Translate text of a document into zombie

## How to run

Note: all commands are run from the root of the project unless otherwise stated.

### Install Packages

* `npm install`
* `bower install`

### Running

* `gulp`
  * builds the project
  * runs the tests
  * watches for javascript, css, and html changes which tests, jshint, rebuilds, livereloads appropriately

To run the tests independently:

* `karma start`

Then in a separate console you can re-run the tests:

* `karma run`

## Notes/Misc

* Tested using Chrome and Firefox
* The initial load of a document can sometimes take some time, my guess it's the heroku app spinning up + network time. Just need to wait a few moments.