chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "ON",
  });
});

// const extensions = "https://developer.chrome.com/docs/extensions";
// const webstore = "https://developer.chrome.com/docs/webstore";

// chrome.action.onClicked.addListener(async (tab) => {
//   // console.log(tab.url, "tab url");
//   // console.log("anything here?");
//   if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
//     // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//     const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//     // Next state will always be the opposite
//     const nextState = prevState === "ON" ? "OFF" : "ON";

//     // Set the action badge to the next state
//     await chrome.action.setBadgeText({
//       tabId: tab.id,
//       text: nextState,
//     });
//     if (nextState === "ON") {
//       // Insert the CSS file when the user turns the extension on
//       await chrome.scripting.insertCSS({
//         files: ["focus-mode.css"],
//         target: { tabId: tab.id },
//       });
//     } else if (nextState === "OFF") {
//       // Remove the CSS file when the user turns the extension off
//       await chrome.scripting.removeCSS({
//         files: ["focus-mode.css"],
//         target: { tabId: tab.id },
//       });
//     }
//   }
// });

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      var title = activeTab.title;
      var url = activeTab.url;
      console.log("Title:", title);
      console.log("URL:", url);

      // await saveWebsite(title, url)
    });
  }
});

// Listen for changes in Chrome storage
// chrome.storage.onChanged.addListener(function (changes, namespace) {
//   for (var key in changes) {
//     if (key === "apiKey") {
//       var newValue = changes[key].newValue;
//       // Store the API key value in a variable or send a message to the popup
//       // You can use chrome.runtime.sendMessage to send the API key to the popup script
//       chrome.runtime.sendMessage({ apiKey: newValue });
//     }
//   }
// });
