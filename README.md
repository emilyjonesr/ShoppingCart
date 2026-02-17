# ShoppingCart Chrome Extension

Universal shopping cart that works across all shopping websites.

## Features
- Auto-detects shopping sites
- Floating cart button on product pages
- Sidebar to view/manage items
- Auto-detect item name, URL, image, size, and color
- Badge counter on extension icon
- Persistent storage across sessions
- Deduplication (won't add same URL twice)

## Project Structure
```
/ShoppingCart
  /src
    content.js      - Main entry point
    detection.js    - Site & item detection logic
    storage.js      - Cart storage operations
    ui.js          - UI components (sidebar, modal, buttons)
  /styles
    content.css     - All styling
  background.js     - Badge counter service worker
  popup.html        - Extension popup UI
  popup.js          - Popup functionality
  manifest.json     - Extension config
```

## Installation
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `ShoppingCart` folder

## Usage
- Extension only appears on detected shopping sites
- Click 🛒 floating button (bottom-right) to open sidebar
- Click "+ Add Current Item" to add current page
- Review/edit auto-detected details in modal
- Extension icon shows cart item count
- Click extension icon to see count and clear cart

## Next Phases
- Group items by site
- Record price and calculate total
- Fix size not being recorded bug
- Toggle side panel opening from Google Chrome Extension button in top right
- UI improvements (button disappears when panel is open, change colors, fonts, add clear button)
