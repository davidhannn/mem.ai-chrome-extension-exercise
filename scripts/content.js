chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.title && request.url) {
    // Display the title and URL in a popup
    alert("Title: " + request.title + "\nURL: " + request.url);
  }
});
