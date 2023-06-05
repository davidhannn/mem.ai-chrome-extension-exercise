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
  } catch (error) {}

  if (response?.ok) {
    return response.json();
  } else {
    throw new Error("Website was not saved properly");
  }
}

async function saveNotes(memId, notes, apiKey) {
  console.log(apiKey, "apiKey");
  let response;
  try {
    response = await fetch(`https://api.mem.ai/v0/mems/${memId}/append`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        Authorization: `ApiAccessToken ${apiKey}`,
      },
      body: notes,
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

function updateBadge() {
  chrome.runtime.sendMessage({ message: "True" }, function (response) {
    // Handle the response from the background script, if any
    console.log("Response from background script:", response);
  });
}

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  var activeTab = tabs[0];
  var title = activeTab.title;
  var url = activeTab.url;

  // Call the function to get the API key
  const API_KEY = await getApiKey();
  let memData;

  // Hide API Input Field if user already has API Key stored in chrome storage
  // Display a button to update API Key field
  // Save website and URL to Notes
  if (API_KEY) {
    memData = await saveWebsite(title, url, API_KEY);
    updateBadge();
    displayNotesForm();
  } else {
    displayApiKeyForm();
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
    const API_KEY = await getApiKey();

    try {
      await saveNotes(memData.id, notesInputField.value, API_KEY);
      notesInputField.value = "";
    } catch (error) {
      alert("There was an issue with the API Key. Please try again.");
      throw Error(error, "error here");
    }
  });

  apiKeyButton.addEventListener("click", (e) => {
    e.preventDefault();
    displayApiKeyForm();
  });
});

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
