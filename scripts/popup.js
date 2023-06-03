chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  var activeTab = tabs[0];
  var title = activeTab.title;
  var url = activeTab.url;
  console.log("Title:", title);
  console.log("URL:", url);
  console.log("wtf");
});
