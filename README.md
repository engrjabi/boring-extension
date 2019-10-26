
# Boring Extension [BETA]

Simple chrome extension that will make you productive by making it easier for you to navigate the web by upgrading your new tab page and extend functionalities of selected web apps

## Features
**New Tab Page**
- Add, Delete, and Edit shortcuts.
- Import and Export shortcuts to and from a file.
- Have an option to use a random robot picture or icon of the website as the shortcut's icon. (Icons makes it easier to remember links)
- Counts how many times you have visited a shortcut.
- Enable custom arrangement of shortcuts via drag and drop

**Content Scripts**
- **Slack** - Enabled search function using the query parameter search. So visiting a URL like this ([https://app.slack.com/client?search=hello%20world](https://app.slack.com/client?search=hello%20world)) will trigger a search on page load
- **Bitbucket** - Automatically add a search slack link to the pull request page, So you can easily search slack thread associated with that pull requests. Currently, the regex used is hardcoded for now

## Roadmap
**General**
- Make an options/settings page
- Make a simple website showcasing featurs and host on github page

**New Tab Page**
- Easy multi-delete of shortcuts
- Option to sort by 
	- Frequency of usage 
	- Recently Opened
	- New or Updated
- Auto-suggest on shortcut's link input based on most visited sites, history or bookmarks when creating or editing a shortcut 
- Allow customization of date and week display format
- Allow custom color for the navbar
- Allow data backup via a third party storage provider like google drive or dropbox

**Content Scripts**
- Allow toggling different extended functionalities added by content scripts via the settings page
- Add options to make content scripts configurable. (i.e. edit any regex or string that is currently hardcoded in the code)

## Getting Started

- `npm install` - Before doing any dev work
- `npm start` - To develop the new tab page without loading it yet on the chrome extension.
- `npm run build` - Builds both the new tab page and the content scripts to be injected by the chrome extension.

To test the build version locally in chrome read step 2 of [this link](https://support.google.com/chrome/a/answer/2714278?hl=en)

***Note!!! Right now I don't have a solid way to test content scripts other than building it and manually refreshing it on the chrome extension page and test on the actual web app***

## Authors

List of contributors 
- **Joshua Ignacio** - *Initial work* - [engrjabi](https://github.com/engrjabi)
- ;;;
