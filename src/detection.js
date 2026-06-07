function isShoppingSite() {
  const hostname = window.location.hostname.toLowerCase();
  
  const shoppingDomains = [
    'azazie', 'amazon', 'ebay', 'etsy', 'shopify', 'walmart', 'target', 'bestbuy',
    'nordstrom', 'macys', 'nike', 'adidas', 'zara', 'hm.com', 'uniqlo',
    'asos', 'revolve', 'ssense', 'farfetch', 'net-a-porter', 'sephora',
    'ulta', 'yesstyle', 'shein', 'alibaba', 'aliexpress', 'wayfair',
    'overstock', 'homedepot', 'lowes', 'ikea', 'abercrombie', 'gap',
    'oldnavy', 'jcrew', 'bananarepublic', 'anthropologie', 'urbanoutfitters',
    'freepeople', 'princesspolly', 'showpo', 'nastygal', 'prettylittlething',
    'boohoo', 'missguided', 'lulus', 'shopbop', 'zappos', 'footlocker',
    'eastbay', 'finish-line', 'dickssportinggoods', 'rei', 'patagonia', 'fashionnova',
    'mango', 'hellomolly'
  ];
  
  if (shoppingDomains.some(domain => hostname.includes(domain))) return true;
  
  const hasAddToCart = document.querySelector('[class*="add-to-cart"], [id*="add-to-cart"], button[class*="cart"]');
  const hasPrice = document.querySelector('[class*="price"], [id*="price"]');
  const hasBuyNow = document.querySelector('[class*="buy-now"], [id*="buy-now"]');
  
  return !!(hasAddToCart || (hasPrice && hasBuyNow));
}

function detectItemDetails() {
  const title = document.querySelector('meta[property="og:title"]')?.content 
    || document.querySelector('h1')?.textContent 
    || document.title;
  
  const url = window.location.href;
  const site = window.location.hostname.replace('www.', '');
  
  let image = 
    document.querySelector('#landingImage')?.src ||
    document.querySelector('#imgBlkFront')?.src ||
    document.querySelector('.product__media img')?.src ||
    document.querySelector('.product-single__photo img')?.src ||
    document.querySelector('[data-product-featured-image]')?.src ||
    document.querySelector('[class*="product"][class*="image"] img')?.src ||
    document.querySelector('[id*="product"][id*="image"]')?.src ||
    (() => {
      const ogImg = document.querySelector('meta[property="og:image"]')?.content;
      if (ogImg && !ogImg.includes('logo') && !ogImg.includes('brand')) return ogImg;
    })() ||
    (() => {
      const images = Array.from(document.querySelectorAll('img'))
        .filter(img => img.width > 200 && img.height > 200);
      const sorted = images.sort((a, b) => (b.width * b.height) - (a.width * a.height));
      return sorted[0]?.src;
    })() ||
    '';
  
  let size = '';
  const sizeBtn = document.querySelector(
    '[class*="size"][class*="selected"], ' +
    '[class*="size"][class*="active"], ' +
    'button[aria-pressed="true"][class*="size"], ' +
    '.swatch.selected, ' +
    '.size-selector button.active, ' +
    '.product-form__input input[type="radio"]:checked + label'
  );
  if (sizeBtn) {
    size = sizeBtn.textContent?.trim() || sizeBtn.getAttribute('aria-label') || '';
  } else {
    const sizeSelect = document.querySelector('select[name*="size"], select[id*="size"]');
    if (sizeSelect) size = sizeSelect.options[sizeSelect.selectedIndex]?.text || sizeSelect.value;
  }
  
  let color = '';
  const colorBtn = document.querySelector(
    '[class*="color"][class*="selected"], ' +
    '[class*="color"][class*="active"], ' +
    '[class*="colour"][class*="selected"], ' +
    '.color-swatch.selected, ' +
    '.product-form__input input[name*="color"]:checked + label, ' +
    '.product-form__input input[name*="colour"]:checked + label'
  );
  if (colorBtn) {
    color = colorBtn.getAttribute('aria-label') || colorBtn.getAttribute('title') || colorBtn.textContent?.trim() || '';
  } else {
    const colorSelect = document.querySelector('select[name*="color"], select[name*="colour"]');
    if (colorSelect) color = colorSelect.options[colorSelect.selectedIndex]?.text || colorSelect.value;
  }
  
  return { title: title.trim(), url, site, image, size, color };
}
