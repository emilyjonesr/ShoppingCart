function updateCount() {
  chrome.storage.local.get(['cart'], (result) => {
    const count = (result.cart || []).length;
    document.getElementById('count').textContent = count;
    document.getElementById('clear').disabled = count === 0;
  });
}

document.getElementById('clear').addEventListener('click', () => {
  if (confirm('Clear all items from cart?')) {
    chrome.storage.local.set({ cart: [] }, () => {
      updateCount();
      chrome.runtime.sendMessage({ type: 'UPDATE_BADGE', count: 0 });
    });
  }
});

updateCount();
