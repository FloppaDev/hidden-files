
const getOctotree = () => {
  chrome.management.get('bkhaagjahfmjljalopjnoealnfndnagc', (info) => {
    let octotree = info && info.enabled ? true : false;
    chrome.storage.sync.set({octotree: octotree});
  });
};

chrome.webNavigation.onCompleted.addListener(() => {
  getOctotree();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.executeScript(
        tabs[0].id,
        {file: 'hide.js'});
  });
})

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({color: '#3aa757'}, () => {
    
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'github.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
