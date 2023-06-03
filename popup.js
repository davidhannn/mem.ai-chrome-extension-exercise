const API_KEY = "6c0c051a-3663-48e6-8619-f761922a82a4";
const API_URL = "https://api.mem.ai/v0/mems";

async function saveWebsite(title, url) {
  // Authorization: ApiAccessToken <Replace this with your access token>
  // const content = {
  //   content: `Title: ${title}, Url: ${url}`,
  //   isRead: true,
  //   isArchived: true,
  //   scheduledFor: "2032-08-02T08:15:30-05:00",
  // };
  const content = `Title: ${title}, URL: ${url}`;

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

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  var activeTab = tabs[0];
  var title = activeTab.title;
  var url = activeTab.url;
  console.log("This is in the popup js file");
  console.log("Title:", title);
  console.log("URL:", url);
  await saveWebsite(title, url);
});
