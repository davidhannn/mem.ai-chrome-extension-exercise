const API_KEY = "6c0c051a-3663-48e6-8619-f761922a82a4";
const API_URL = "https://api.mem.ai/v0/mems";

async function saveWebsite(title, url) {
  // Authorization: ApiAccessToken <Replace this with your access token>
  const content = {
    content: `Title: ${title}, Url: ${url}`,
    isRead: true,
    isArchived: true,
    scheduledFor: "2032-08-02T08:15:30-05:00",
  };

  const response = await fetch(API_URL, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      Authorization: `ApiAccessToken ${API_KEY}`,
    },
    body: JSON.stringify(content),
  });

  const result = await response.json();
  console.log(result, "result");
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
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
