# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


## [0.1.0] - 2024-11-10

### Added
- Ideas page that allows for submission and viewing of ideas
- Delete API and Delete button for both the mythoughts page and the ideas page
- Home button implemented for mythoughts and ideas page


### Changed
- Ideas button now links to the new Ideas page
- Refactored app.js into standard Node.js/Express folder structure


### Removed
- Removed the Mongo Client in favor of Mongoose and subsequently removed the run() function in app.js in favor of individual async http methods



