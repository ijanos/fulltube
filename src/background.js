chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'www.youtube.com' }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab) {
  if (tab.url.indexOf("embed") > -1 ) {
    var video_id = tab.url .split("embed/")[1].split("?")[0];
    chrome.tabs.update(tab.id, {url: "https://youtube.com/watch?v=" + video_id});
  } else if (tab.url.indexOf("watch") > -1 ) {
    var video_id = tab.url .split("v=")[1].split("&")[0];
    chrome.tabs.update(tab.id, {url: "https://youtube.com/embed/" + video_id + "?autoplay=1"});
  }
});
