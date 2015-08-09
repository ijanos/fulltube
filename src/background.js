chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.youtube.com' },
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});


chrome.pageAction.onClicked.addListener(function(tab) {
  if (tab.url.indexOf("embed") > -1 ) {
    chrome.tabs.update(tab.id, {url: tab.url.replace("embed/","watch?v=")});
  } else {
    chrome.tabs.update(tab.id, {url: tab.url.replace("watch?v=","embed/")});
  }
});
