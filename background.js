// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: "ON",
//   });
// });

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {
  if (request.message === "True") {
    // Do something with the message received from the popup
    console.log("Message received from the popup:", request.message);
    await chrome.action.setBadgeText({
      text: "SAVE",
    });
    // Send a response back to the popup if needed
    sendResponse({ response: "Message received successfully!" });
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var activeTab = tabs[0];
      var title = activeTab.title;
      var url = activeTab.url;
      console.log("Title:", title);
      console.log("URL:", url);
    });
  }
});
