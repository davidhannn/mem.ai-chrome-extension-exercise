// const API_KEY = "6c0c051a-3663-48e6-8619-f761922a82a4";
const API_URL = "https://api.mem.ai/v0/mems";
const form = document.getElementById("form");
const apiKeyInputField = document.getElementById("apikey");

async function saveWebsite(title, url, apiKey) {
  const content = `Title: ${title}, URL: ${url}`;

  const response = await fetch(API_URL, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      Authorization: `ApiAccessToken ${apiKey}`,
    },
    body: JSON.stringify(content),
  });

  const result = await response.json();
  return result;
}

async function saveNotes(memId, notes, apiKey) {
  console.log(apiKey, "apiKey");
  const response = await fetch(`https://api.mem.ai/v0/mems/${memId}/append`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      Authorization: `ApiAccessToken ${apiKey}`,
    },
    body: notes,
  });

  const result = await response.json();
  return result;
}

// Retrieve the API key using async/await
async function getApiKey() {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("apiKey", function (result) {
      var apiKey = result.apiKey;
      resolve(apiKey);
    });
  });
}

// Store the API key
function saveApiKey(apiKey) {
  chrome.storage.local.set({ apiKey: apiKey }, function () {
    console.log("API key saved.");
  });
}

// // Remove the item from storage
// function removeItemFromStorage(itemKey) {
//   chrome.storage.local.remove(itemKey, function () {
//     console.log("Item removed from storage.");
//   });
// }

// var itemKey = "apiKey";
// removeItemFromStorage(itemKey);

// Call the function to save the API key
// var myApiKey = "YOUR_API_KEY";
// saveApiKey(myApiKey);

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  var activeTab = tabs[0];
  var title = activeTab.title;
  var url = activeTab.url;

  console.log("Title:", title);
  console.log("URL:", url);
  console.log("TESTING PLEASE");

  // Call the function to get the API key
  const API_KEY = await getApiKey();
  console.log(API_KEY, "api key in the query function");
  let memData;
  // Hide API Input Field if user already has API Key stored in chrome storage
  // Display a button to update API Key field

  if (API_KEY) {
    memData = await saveWebsite(
      title,
      url,
      "6c0c051a-3663-48e6-8619-f761922a82a4"
    );
    console.log(memData, "result");
    form.prepend(updateApiKeyButton());
    apiKeyInputField.style.display = "none";
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("anybody here");
    let name = document.getElementById("apikey").value;
    let body = document.getElementById("notes").value;
    console.log(body, "body");

    console.log(memData.id, "memData");
    console.log(name, "name");
    console.log(body, "body");
    console.log(API_KEY, "api key here?");
    await saveNotes(memData.id, body, "6c0c051a-3663-48e6-8619-f761922a82a4");
    // fetch("https://jsonplaceholder.typicode.com/posts", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: name,
    //     body: body,
    //   }),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (data) {
    //     console.log(data);
    //     title = document.getElementById("title");
    //     body = document.getElementById("bd");
    //     title.innerHTML = data.title;
    //     body.innerHTML = data.body;
    //   })
    //   .catch((error) => console.error("Error:", error));
  });
});

const updateApiKeyButton = () => {
  const apiKeyButton = document.createElement("button");
  apiKeyButton.textContent = "Update API Key";
  apiKeyButton.type = "button";

  return apiKeyButton;
};

// chrome.runtime.sendMessage({ getApiKey: true }, function (response) {
//   console.log(response, "response");
//   if (response && response.apiKey) {
//     var apiKey = response.apiKey;
//     // Use the API key in your popup script
//     console.log(apiKey, "what!");
//   } else {
//     console.log("apikey not available");
//     // Handle the case when the API key is not available
//   }
// });
