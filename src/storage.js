function addItem(item) {
  chrome.storage.local.get(['cart'], (result) => {
    const cart = result.cart || [];
    
    const exists = cart.some(existingItem => existingItem.url === item.url);
    if (exists) {
      alert('This item is already in your cart!');
      return;
    }
    
    cart.push(item);
    chrome.storage.local.set({ cart }, () => {
      loadCart();
      updateBadge();
    });
  });
}

function deleteItem(id) {
  chrome.storage.local.get(['cart'], (result) => {
    const cart = result.cart.filter(item => item.id !== id);
    chrome.storage.local.set({ cart }, () => {
      loadCart();
      updateBadge();
    });
  });
}

function loadCart() {
  chrome.storage.local.get(['cart'], (result) => {
    const cart = result.cart || [];
    const container = sidebarShadow.getElementById('sc-items');
    
    if (cart.length === 0) {
      container.innerHTML = '<p class="sc-empty">No items yet</p>';
      return;
    }
    
    container.innerHTML = cart.map(item => `
      <div class="sc-item">
        <a href="${item.url}" target="_blank" class="sc-item-link">
          ${item.image ? `<img src="${item.image}" class="sc-item-img" />` : ''}
          <div class="sc-item-info">
            <div class="sc-item-name">${item.name}</div>
            <div class="sc-item-meta">
              ${item.size ? `<span class="sc-item-size">${item.size}</span>` : ''}
              ${item.color ? `<span class="sc-item-color">${item.color}</span>` : ''}
            </div>
            <div class="sc-item-site">${item.site}</div>
          </div>
        </a>
        <button class="sc-delete" data-id="${item.id}">×</button>
      </div>
    `).join('');
    
    container.querySelectorAll('.sc-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteItem(parseInt(e.target.dataset.id));
      });
    });
  });
}

function updateBadge() {
  chrome.storage.local.get(['cart'], (result) => {
    const count = (result.cart || []).length;
    chrome.runtime.sendMessage({ type: 'UPDATE_BADGE', count });
  });
}
