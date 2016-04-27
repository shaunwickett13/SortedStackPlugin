# SortedStackPlugin

## Description
A Google Chrome and Firefox extension that supplements stackoverflow.com by marking the highest voted answer by the community with a unique icon, as well as moving this answer to the first place position in the list.

Normally the person asking the question can select a single answer as accepted, and this acceptted answer will always be the first answer listed even if it doesn't have the most amount of votes. Often times other answers arise that were too late to the game or the asker didn't like. This extension always places the answers in sorted order by the number of votes the answer received, no matter if the asker selected an answer as accepted or not. 

## Install
**Chrome:** [Download](https://chrome.google.com/webstore/detail/sorted-stack/fpbbollnpcfogjaccdegemhcmpbeglkn)

**Firefox:** [Download](https://addons.mozilla.org/en-US/firefox/addon/sorted-stack/)

## Building From Source
#### Chrome 
1. Download all the files in the chrome directory. 
2. Open chrome://extensions/
3. Click on "Load unpacked extension...".
4. Navigate to the directory containing all the downloaded files.
5. Make sure the "Enabled" box is checked.
6. You're all set to go!

#### Firefox
1. Download all the files in the firefox directory.
2. Install jpm using npm (or through any other means of installation).
3. To run the extension, navigate to the directory with the files and run the command 'jpm run'.
4. To build the xpi file for installation run the command 'jpm xpi'.

Icons made by Freepik from www.flaticon.com.
