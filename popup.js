// const API_KEY = "6c0c051a-3663-48e6-8619-f761922a82a4";
const API_URL = "https://api.mem.ai/v0/mems";
const form = document.getElementById("form");
const apiKeyForm = document.getElementById("api-key-form");
const apiKeyInputField = document.getElementById("apikey");
const notesInputField = document.getElementById("notes");
const apiForm = document.getElementById("api-form");
const notesForm = document.getElementById("notes-form");
const apiKeyButton = document.getElementById("update-api-key-button");

const displayNotesForm = () => {
  notesForm.style.display = "block";
  apiForm.style.display = "none";
};

const displayApiKeyForm = () => {
  notesForm.style.display = "none";
  apiForm.style.display = "block";
};

async function saveWebsite(title, url, apiKey) {
  const content = `Title: ${title}, URL: ${url}`;

  let response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        Authorization: `ApiAccessToken ${apiKey}`,
      },
      body: JSON.stringify(content),
    });
  } catch (error) {
    console.log(error, "error");
  }

  if (response?.ok) {
    return response.json();
  } else {
    throw new Error("Website was not saved properly");
  }
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
  // Save website and URL to Notes
  if (API_KEY) {
    memData = await saveWebsite(title, url, API_KEY);
    displayNotesForm();
    // form.prepend(updateApiKeyButton());
    // apiKeyInputField.style.display = "none";
  } else {
    displayApiKeyForm();
    // notesInputField.style.display = "none";
  }

  apiKeyForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    let apiKeyId = document.getElementById("apikey").value;

    try {
      memData = await saveWebsite(title, url, apiKeyId);
      await saveApiKey(apiKeyId);
      displayNotesForm();
    } catch (error) {
      alert("There was an issue with the API Key. Please try again.");
      throw Error(error, "error here");
    }
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    // let name = document.getElementById("apikey").value;
    const API_KEY = await getApiKey();
    let body = document.getElementById("notes").value;

    await saveNotes(memData.id, body, API_KEY);
  });

  apiKeyButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("here??");
    displayApiKeyForm();
  });
});
