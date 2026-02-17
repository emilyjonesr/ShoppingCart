let sidebar = null;
let floatingBtn = null;

function createFloatingButton() {
  floatingBtn = document.createElement('div');
  floatingBtn.id = 'sc-floating-btn';
  floatingBtn.textContent = '🛒';
  floatingBtn.addEventListener('click', toggleSidebar);
  document.body.appendChild(floatingBtn);
}

function createSidebar() {
  sidebar = document.createElement('div');
  sidebar.id = 'sc-sidebar';
  sidebar.innerHTML = `
    <div class="sc-header">
      <h2>Shopping Cart</h2>
      <button id="sc-close">×</button>
    </div>
    <div id="sc-items"></div>
    <button id="sc-add-item" class="sc-add-btn">+ Add Current Item</button>
  `;
  document.body.appendChild(sidebar);
  
  document.getElementById('sc-close').addEventListener('click', closeSidebar);
  document.getElementById('sc-add-item').addEventListener('click', showAddModal);
}

function toggleSidebar() {
  sidebar.classList.toggle('open');
}

function closeSidebar() {
  sidebar.classList.remove('open');
}

function showAddModal() {
  const details = detectItemDetails();
  
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
  
  document.body.appendChild(modal);
  
  document.getElementById('sc-cancel').addEventListener('click', () => modal.remove());
  document.getElementById('sc-confirm').addEventListener('click', () => {
    const item = {
      id: Date.now(),
      name: document.getElementById('sc-item-name').value,
      url: document.getElementById('sc-item-url').value,
      image: document.getElementById('sc-item-image').value,
      site: document.getElementById('sc-item-site').value
    };
    
    const sizeInput = document.getElementById('sc-item-size');
    if (sizeInput) item.size = sizeInput.value;
    
    const colorInput = document.getElementById('sc-item-color');
    if (colorInput) item.color = colorInput.value;
    
    addItem(item);
    modal.remove();
  });
}
