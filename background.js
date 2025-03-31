chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureScreen") {
      chrome.tabs.captureVisibleTab(null, { format: "png" }, sendResponse);
      return true;
    }
  });
  