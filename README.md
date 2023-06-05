## Mem.ai Chrome Extension

# Project Overview

Your task is to build a Chrome extension for Mem that allows users to save a website directly to Mem. The extension should be easy to use and integrate smoothly with Mem's existing features.

# Features

1. User can save website title and URL by clicking on Chrome Extension
2. User can also add notes to the saved mem in markdown format
3. User's API Key is saved in chrome storage once it successfully saves a note in Mem
4. User can update the API Key
5. User can use a shortcut (CMD + B for iOS) to call extension

# Design Decisions

1. Chrome Storage to Save API Keys

- My idea behind this was so that we could save user's API key once a website has been saved without having the user reinput an API key everytime they make a request to save the website. I'm not sure if this is the most optimal or secure way to save this key so it was a quick solution to solve this issue

2. Displaying Saved Badge status

- This was to show the user once a website was successfully saved to their notes. I implemented this by sending a message to the background once a user successfully saves a website which would update the badge text

3. Sending Notes

- The user would be able to send notes in a markdown state via an input field in the extension which would append to the currently saved note by the memId. For e.g, sending a note with a # before the text would create a tag when saved to the note

# Improvements

1. Prefetch the User's API Key in background instead of during the popup
2. Create more general purpose reusable functions
3. Fix UI state where it briefly displays the option to update the API key as well as the update API key button
4. Fix badge behavior so it doesn't show a saved status on all tabs but only the currently saved tab
5. Styling
