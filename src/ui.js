let sidebarHost = null;
let buttonHost = null;
let sidebarShadow = null;
let buttonShadow = null;

const CSS = `
  * { 
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif !important;
    box-sizing: border-box !important;
    letter-spacing: 0 !important;
    word-spacing: 0 !important;
    text-transform: none !important;
    margin: 0;
    padding: 0;
  }

  .sc-item-name,
  .sc-item-site,
  .sc-item-size,
  .sc-item-color,
  .sc-header h2,
  label {
    letter-spacing: 0 !important;
  }
  
  #sc-floating-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: #FFB5C0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 2147483646;
    transition: transform 0.2s;
  }
  
  #sc-floating-btn:hover { transform: scale(1.1); }
  
  #sc-sidebar {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100vh;
    background: white;
    box-shadow: -2px 0 8px rgba(0,0,0,0.1);
    z-index: 2147483646;
    transition: right 0.3s;
    display: flex;
    flex-direction: column;
  }
  
  #sc-sidebar.open { right: 0; }
  
  .sc-header {
    padding: 20px;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .sc-header h2 {
    margin: 0;
    font-size: 20px;
    color: #111827;
  }
  
  #sc-close {
    background: none;
    border: none;
    font-size: 32px;
    cursor: pointer;
    color: #6b7280;
    padding: 0;
    width: 32px;
    height: 32px;
  }
  
  #sc-items {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }
  
  .sc-empty {
    text-align: center;
    color: #9ca3af;
    margin-top: 40px;
  }
  
  .sc-item {
    background: #f9fafb;
    border-radius: 8px;
    padding: 12px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  
  .sc-item-link {
    flex: 1;
    display: flex;
    gap: 12px;
    text-decoration: none;
    color: inherit;
  }
  
  .sc-item-link:hover .sc-item-name { color: #2563eb; }
  
  .sc-item-img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 6px;
    flex-shrink: 0;
  }
  
  .sc-item-info {
    flex: 1;
    min-width: 0;
  }
  
  .sc-item-name {
    font-weight: 600;
    color: #111827;
    margin-bottom: 4px;
    font-size: 14px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.4;
  }
  
  .sc-item-meta {
    display: flex;
    gap: 8px;
    margin-bottom: 4px;
  }
  
  .sc-item-size,
  .sc-item-color {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 3px;
    background: #e5e7eb;
    color: #374151;
    font-weight: 500;
  }
  
  .sc-item-site {
    color: #6b7280;
    font-size: 12px;
  }
  
  .sc-delete {
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    padding: 0;
    flex-shrink: 0;
    position: relative;
    z-index: 10;
  }
  
  .sc-add-btn {
    margin: 16px 16px 8px;
    padding: 12px;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  
  .sc-add-btn:hover { background: #1d4ed8; }

  .sc-clear-btn {
    margin: 0 16px 16px;
    padding: 12px;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .sc-clear-btn:hover { background: #dc2626; }

  .sc-clear-btn:disabled {
    background: #d1d5db;
    cursor: not-allowed;
  }
  
  #sc-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999999;
  }
  
  .sc-modal-content {
    background: white;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    max-width: 90vw;
  }
  
  .sc-modal-content h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
  }
  
  .sc-modal-content label {
    display: block;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 600;
    color: #374151;
  }
  
  .sc-modal-content input {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 14px;
  }
  
  .sc-modal-actions {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }
  
  .sc-modal-actions button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  
  #sc-cancel {
    background: #f3f4f6;
    color: #374151;
  }
  
  #sc-confirm {
    background: #2563eb;
    color: white;
  }
  
  #sc-confirm:hover { background: #1d4ed8; }
`;

function createFloatingButton() {
  buttonHost = document.createElement('div');
  buttonShadow = buttonHost.attachShadow({ mode: 'open' });
  
  const style = document.createElement('style');
  style.textContent = CSS;
  buttonShadow.appendChild(style);
  
  const btn = document.createElement('div');
  btn.id = 'sc-floating-btn';
  btn.textContent = '🛒';
  btn.addEventListener('click', toggleSidebar);
  buttonShadow.appendChild(btn);
  
  document.body.appendChild(buttonHost);
}

function createSidebar() {
  sidebarHost = document.createElement('div');
  sidebarShadow = sidebarHost.attachShadow({ mode: 'open' });
  
  const style = document.createElement('style');
  style.textContent = CSS;
  sidebarShadow.appendChild(style);
  
  const sidebar = document.createElement('div');
  sidebar.id = 'sc-sidebar';
  sidebar.innerHTML = `
    <div class="sc-header">
      <h2>Shopping Cart</h2>
      <button id="sc-close">×</button>
    </div>
    <div id="sc-items"></div>
    <button id="sc-add-item" class="sc-add-btn">+ Add Current Item</button>
    <button id="sc-clear-cart" class="sc-clear-btn">Clear Cart</button>
  `;
  sidebarShadow.appendChild(sidebar);
  document.body.appendChild(sidebarHost);
  
  sidebarShadow.getElementById('sc-close').addEventListener('click', closeSidebar);
  sidebarShadow.getElementById('sc-add-item').addEventListener('click', showAddModal);
  sidebarShadow.getElementById('sc-clear-cart').addEventListener('click', () => {
    if (confirm('Clear all items from cart?')) {
      chrome.storage.local.set({ cart: [] }, () => {
        loadCart();
        updateBadge();
      });
    }
  });
}

function toggleSidebar() {
  sidebarShadow.getElementById('sc-sidebar').classList.toggle('open');
}

function closeSidebar() {
  sidebarShadow.getElementById('sc-sidebar').classList.remove('open');
}

function showAddModal() {
  const details = detectItemDetails();
  
  const modalHost = document.createElement('div');
  const modalShadow = modalHost.attachShadow({ mode: 'open' });
  
  const style = document.createElement('style');
  style.textContent = CSS;
  modalShadow.appendChild(style);
  
  const modal = document.createElement('div');
  modal.id = 'sc-modal';
  modal.innerHTML = `
    <div class="sc-modal-content">
      <h3>Add Item</h3>
      <label>Name:</label>
      <input type="text" id="sc-item-name" value="${details.title}" />
      <label>URL:</label>
      <input type="text" id="sc-item-url" value="${details.url}" />
      <label>Image URL:</label>
      <input type="text" id="sc-item-image" value="${details.image}" />
      ${details.size ? `<label>Size:</label><input type="text" id="sc-item-size" value="${details.size}" />` : ''}
      ${details.color ? `<label>Color:</label><input type="text" id="sc-item-color" value="${details.color}" />` : ''}
      <label>Site:</label>
      <input type="text" id="sc-item-site" value="${details.site}" readonly />
      <div class="sc-modal-actions">
        <button id="sc-cancel">Cancel</button>
        <button id="sc-confirm">Add</button>
      </div>
    </div>
  `;
  modalShadow.appendChild(modal);
  document.body.appendChild(modalHost);
  
  modalShadow.getElementById('sc-cancel').addEventListener('click', () => modalHost.remove());
  modalShadow.getElementById('sc-confirm').addEventListener('click', () => {
    const item = {
      id: Date.now(),
      name: modalShadow.getElementById('sc-item-name').value,
      url: modalShadow.getElementById('sc-item-url').value,
      image: modalShadow.getElementById('sc-item-image').value,
      site: modalShadow.getElementById('sc-item-site').value
    };
    
    const sizeInput = modalShadow.getElementById('sc-item-size');
    if (sizeInput) item.size = sizeInput.value;
    
    const colorInput = modalShadow.getElementById('sc-item-color');
    if (colorInput) item.color = colorInput.value;
    
    addItem(item);
    modalHost.remove();
  });
}
