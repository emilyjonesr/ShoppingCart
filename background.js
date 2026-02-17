chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'UPDATE_BADGE') {
    const text = message.count > 0 ? message.count.toString() : '';
    chrome.action.setBadgeText({ text });
    chrome.action.setBadgeBackgroundColor({ color: '#2563eb' });
  }
});
