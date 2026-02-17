function init() {
  if (!isShoppingSite()) return;
  
  createFloatingButton();
  createSidebar();
  loadCart();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
