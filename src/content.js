function init() {
  if (!isShoppingSite()) return;
  
  createFloatingButton();
  createSidebar();
  loadCart();
}

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'TOGGLE_SIDEBAR') {
    if (!sidebarShadow) {
      createFloatingButton();
      createSidebar();
      loadCart();
    }
    toggleSidebar();
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
