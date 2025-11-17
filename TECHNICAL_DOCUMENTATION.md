# Sweet Bros - Technical Documentation Guide
**Complete Repository Overview & Quick Reference for Client Adjustments**

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Structure](#architecture--structure)
4. [Key Features & How They Work](#key-features--how-they-work)
5. [Data Management](#data-management)
6. [Shopify Integration](#shopify-integration)
7. [Styling & Design System](#styling--design-system)
8. [Common Customization Scenarios](#common-customization-scenarios)
9. [Deployment](#deployment)
10. [Environment Variables](#environment-variables)

---

## Project Overview

**Sweet Bros** is a modern e-commerce website for a pick-and-mix sweet shop run by two brothers (Logan, 13, and Barkley, 9). The site allows customers to:
- Browse pre-made sweet collections
- Build custom sweet bags (pick 10-20 sweets for a 500g bag)
- Build custom cable bags (pick 4 cable flavours)
- View gallery posts of collaborations and events
- Learn about the Sweet Bros story
- Checkout through Shopify

**Live URL**: https://sweet-bros.vercel.app/
**Shop Domain**: shop.sweet-bros.co.uk

---

## Technology Stack

### Core Technologies
- **React 19.1.1** - UI framework
- **Vite 7.0.4** - Build tool and dev server
- **React Router DOM 7.8.0** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Lucide React 0.536.0** - Icon library

### Backend/Services
- **Shopify Storefront API (2024-07)** - E-commerce backend
- **GraphQL** - API query language for Shopify

### Deployment
- **Vercel** - Hosting platform
- **Git** - Version control

---

## Architecture & Structure

### Folder Structure

```
sweet-bros/
├── public/                          # Static assets
│   ├── images/
│   │   ├── sweets/                  # Individual sweet images (50+ items)
│   │   ├── cables/                  # Cable images (8 flavours)
│   │   └── gallery/                 # Gallery post images
│   ├── fonts/                       # Custom fonts
│   ├── logo.png                     # Main logo
│   ├── sweet-bros-logo-hero.png    # Homepage hero logo
│   ├── homepage_photo.png           # Brothers with sweet bags
│   ├── about_page_image.png        # About page photo
│   ├── Logan.png & Barkley.png     # Brother avatars
│   └── favicon files
│
├── src/
│   ├── components/
│   │   ├── pages/                   # Page components
│   │   │   ├── HomePage.jsx         # Landing page
│   │   │   ├── ShopPage.jsx         # Main shop (collection → products → detail)
│   │   │   ├── AboutPage.jsx        # About the brothers
│   │   │   └── GalleryPage.jsx      # Collaboration gallery
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── Layout.jsx           # Main wrapper with header/footer
│   │   │   ├── Header.jsx           # Top header with logo & cart
│   │   │   ├── Navigation.jsx       # Nav menu (desktop & mobile)
│   │   │   └── Footer.jsx           # Footer with social links
│   │   │
│   │   ├── sweet-picker/            # Product browsing & selection
│   │   │   ├── CollectionGrid.jsx   # Shows all collections
│   │   │   ├── ProductGrid.jsx      # Shows products in a collection
│   │   │   ├── ProductCard.jsx      # Individual product card
│   │   │   ├── ProductDetail.jsx    # Product detail page
│   │   │   ├── SweetPicker.jsx      # Custom sweet/cable selector
│   │   │   ├── PartyTubSelector.jsx # Variant selector for party tubs
│   │   │   └── QuantitySelector.jsx # Quantity input
│   │   │
│   │   ├── cart/                    # Shopping cart
│   │   │   ├── Cart.jsx             # Cart sidebar
│   │   │   ├── CartItem.jsx         # Individual cart item
│   │   │   └── CheckoutButton.jsx   # Shopify checkout integration
│   │   │
│   │   └── ui/                      # Reusable UI components
│   │       ├── Logo.jsx             # Animated logo
│   │       ├── CartIcon.jsx         # Cart icon with badge
│   │       └── SocialLinks.jsx      # Social media links
│   │
│   ├── context/
│   │   └── CartContext.jsx          # Global cart state management
│   │
│   ├── hooks/
│   │   ├── useCart.js               # Cart hook (re-export from context)
│   │   └── useShopify.js            # (Currently empty/unused)
│   │
│   ├── utils/
│   │   ├── shopify.js               # Shopify API functions
│   │   ├── helpers.js               # General utility functions
│   │   ├── scrollHelpers.js         # Scroll behavior utilities
│   │   └── colourHelpers.js         # Consistent random color generation
│   │
│   ├── data/
│   │   ├── sweets.json              # 50+ sweet definitions
│   │   ├── cables.json              # 8 cable flavour definitions
│   │   └── gallery.json             # Gallery posts
│   │
│   ├── App.jsx                      # Root component with routing
│   ├── main.jsx                     # Entry point
│   ├── index.css                    # Global styles
│   └── App.css                      # App-specific styles
│
├── index.html                       # HTML template with SEO meta tags
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
├── tailwind.config.js               # Tailwind theme & colors
├── vercel.json                      # Vercel routing config
└── eslint.config.js                 # ESLint configuration
```

---

## Key Features & How They Work

### 1. **Home Page** (`HomePage.jsx`)
**Location**: `src/components/pages/HomePage.jsx`

**What it does**:
- Displays floating Sweet Bros hero logo
- Shows photo of the brothers with rainbow gradient border
- Two CTA buttons: "Start Shopping" and "Build Your Own"
- Features grid showing Custom Mixes, Ready Made, and Made Fresh
- Quick stats section (50+ varieties, 500g bag size, £7.50 price, 100% fresh)
- Final CTA section

**Key elements**:
- Uses `getItemColour()` for consistent random colors across reloads
- "Build Your Own" button redirects to `/shop#custom-sweet-bag` (deep links to custom bag builder)
- Responsive design with animations (float, bounce, pulse)

**To modify**:
- Update stats in the Quick Stats section (lines 189-228)
- Change CTA button text/links
- Modify hero photo path

---

### 2. **Shop Page** (`ShopPage.jsx`)
**Location**: `src/components/pages/ShopPage.jsx`

**What it does**:
Three-level navigation system:
1. **Collections View** - Shows 7 main collections
2. **Products View** - Shows products within a collection
3. **Product Detail** - Shows single product with add to cart

**Collections defined** (lines 23-71):
```javascript
const collectionHandles = [
  'pick-mix-bags',                    // Pre-made themed bags
  'build-your-own-pick-n-mix-bag',   // Custom sweet builder
  'cable-bags',                       // Cable products
  'themed-picks',                     // Special mixes
  'mystery-boxes',                    // Surprise boxes
  'party-supplies',                   // Party tubs
  'bundles'                           // Bundle deals
]
```

**Special handling**:
- **Custom Sweet Bag**: Frontend-only product that opens `SweetPicker` component
  - Allows selecting 10-20 sweets from `sweets.json`
  - Creates custom product with selected sweets stored as attributes

- **Custom Cable Bag**: Similar to sweet bag but for cables
  - Allows selecting exactly 4 cable flavours from `cables.json`
  - Fixed quantity selection

- **Party Tubs**: Uses `PartyTubSelector` for variant selection (500g, 900g, 1.5kg sizes)

**Data flow**:
1. Fetches collections from Shopify on mount
2. On collection click → fetches products from Shopify
3. Custom collections bypass Shopify and use local JSON data
4. Products added to cart via `CartContext`

**To modify**:
- Add/remove collections: Update `collectionHandles` array and `collectionConfig` object
- Change collection titles/descriptions: Edit `collectionConfig`
- Modify custom bag rules: Edit lines 135-147 (sweet bag) or 181-203 (cable bag)

---

### 3. **About Page** (`AboutPage.jsx`)
**Location**: `src/components/pages/AboutPage.jsx`

**What it does**:
- Tells the Sweet Bros story
- Features Logan (13, calm, sensible) and Barkley (9, funny, wild)
- Shows their personalities with character cards
- Displays mission statement
- Uses rainbow gradient border matching homepage

**To modify**:
- Update ages: Lines 90, 90
- Change story text: Lines 89-168
- Modify character descriptions: Lines 105-136

---

### 4. **Gallery Page** (`GalleryPage.jsx`)
**Location**: `src/components/pages/GalleryPage.jsx`

**What it does**:
- Displays collaboration posts (Spud Bros, Blackburn Rovers, Glenside Juniors FC, market stalls)
- Reads from `gallery.json`
- Shows posts in masonry grid layout
- Each post has title, date, images, tags

**Data structure** (`gallery.json`):
```json
{
  "posts": [
    {
      "id": "spud-bros-collab",
      "title": "Sweet Bros x Spud Bros",
      "date": "2025-01-10",
      "images": ["/images/gallery/spud-bros.jpg"],
      "excerpt": "",
      "tags": ["collaboration", "spud-bros", "business"]
    }
  ]
}
```

**To modify**:
- Add new gallery post: Add entry to `src/data/gallery.json`
- Change layout: Modify grid structure in `GalleryPage.jsx`

---

### 5. **Cart System** (`CartContext.jsx`, `Cart.jsx`, `CheckoutButton.jsx`)

**How it works**:

**CartContext** (`src/context/CartContext.jsx`):
- Manages global cart state
- Persists cart to `localStorage` (key: `sweetBrosCart`)
- Provides: `addToCart`, `removeFromCart`, `updateQuantity`, `toggleCart`, `closeCart`
- Tracks: `cartItems`, `cartCount`, `cartTotal`, `isCartOpen`

**Cart sidebar** (`src/components/cart/Cart.jsx`):
- Slides in from right
- Shows all cart items
- Displays subtotal
- Checkout button

**Custom products handling**:
When a custom bag is added to cart, it stores:
```javascript
{
  id: 'custom-sweet-bag',
  title: 'Build Your Own Sweet Bag (500g)',
  price: 7.50,
  quantity: 1,
  isCustom: true,
  customSweets: [...selectedSweets],  // Array of sweet objects
  customType: 'sweets'
}
```

**Checkout flow** (`CheckoutButton.jsx`):
1. Converts cart items to Shopify line items
2. For custom products: Maps to Shopify product ID from env vars
3. Creates cart in Shopify via GraphQL mutation
4. Stores custom selections as cart line item attributes
5. Redirects to Shopify checkout URL (domain replaced to `shop.sweet-bros.co.uk`)

**To modify**:
- Change custom bag price: Update in `ShopPage.jsx` lines 139, 186
- Modify checkout domain: Edit line 120 in `CheckoutButton.jsx`

---

### 6. **Sweet/Cable Picker** (`SweetPicker.jsx`)
**Location**: `src/components/sweet-picker/SweetPicker.jsx`

**What it does**:
- Dual-purpose component for selecting sweets OR cables
- Configuration based on `type` prop ('sweets' or 'cables')

**Sweet mode**:
- Min: 10 items, Max: 20 items
- Reads from `sweets.json`
- Shows all 50+ sweets in grid

**Cable mode**:
- Exactly 4 items required
- Reads from `cables.json`
- Shows 8 cable flavours

**UI features**:
- Real product images or gradient background fallback
- Selection counter with validation
- Selected items summary
- Add/Remove buttons
- "PICKED!" badge on selected items

**To modify**:
- Change selection limits: Lines 14-15 (sweets) or 21-22 (cables)
- Add new sweets/cables: Edit `sweets.json` or `cables.json`

---

## Data Management

### 1. **Sweets Data** (`sweets.json`)
**Location**: `src/data/sweets.json`

**Structure**:
```json
[
  {
    "id": "cola-bottles",
    "name": "Cola Bottles",
    "category": "jelly",
    "image": "/images/sweets/cola_bottles.jpg"
  }
]
```

**Categories**: jelly, sour, fizzy, soft, chocolate

**Current count**: 50+ sweet varieties

**To add a new sweet**:
1. Add image to `/public/images/sweets/`
2. Add entry to `sweets.json`
3. Ensure unique `id`

---

### 2. **Cables Data** (`cables.json`)
**Location**: `src/data/cables.json`

**Structure**:
```json
[
  {
    "id": "vimto-cable",
    "name": "Vimto Cable",
    "flavour": "Vimto",
    "image": "/images/cables/vimto_cable.jpg"
  }
]
```

**Current count**: 8 cable flavours

---

### 3. **Gallery Data** (`gallery.json`)
**Location**: `src/data/gallery.json`

**Structure**:
```json
{
  "posts": [
    {
      "id": "unique-id",
      "title": "Post Title",
      "date": "2025-01-10",
      "images": ["/images/gallery/photo.jpg"],
      "excerpt": "",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

---

## Shopify Integration

### How it works

The site uses **Shopify Storefront API** (GraphQL) to:
1. Fetch collections
2. Fetch products within collections
3. Create carts
4. Generate checkout URLs

**API Configuration** (`src/utils/shopify.js`):
- Domain: `VITE_SHOPIFY_DOMAIN` (from env)
- Token: `VITE_SHOPIFY_STOREFRONT_TOKEN` (from env)
- API Version: `2024-07`

### Key API Functions

**`getCollectionByHandle(handle)`** - Fetch single collection with products
```javascript
const data = await getCollectionByHandle('pick-mix-bags')
```

**`getMultipleCollections(handles)`** - Fetch multiple collections at once
```javascript
const data = await getMultipleCollections(['pick-mix-bags', 'cable-bags'])
```

**`getAllSweets()`** - Fetch all products tagged with "individual"

**`getProductWithVariants(productId)`** - Fetch product with all variants (for party tubs)

**`getProductVariantId(productId)`** - Get first variant ID for a product

**`createCart(lineItems)`** - Create Shopify cart and get checkout URL
```javascript
const lineItems = [
  {
    merchandiseId: "gid://shopify/ProductVariant/123",
    quantity: 1,
    attributes: [
      { key: "Custom_Product_Type", value: "Sweet Bag" },
      { key: "Selected_Items", value: "Cola Bottles, Jelly Beans, ..." }
    ]
  }
]
```

### Custom Products in Shopify

For custom sweet/cable bags:
1. There are actual Shopify products for "Build Your Own Sweet Bag" and "Build Your Own Cable Bag"
2. Their product IDs are stored in environment variables
3. When added to cart, the selected items are stored as line item attributes
4. The Shopify store can read these attributes to fulfill the order

**Environment variables needed**:
```
VITE_CUSTOM_SWEET_BAG_PRODUCT_ID=12345678
VITE_CUSTOM_CABLE_BAG_PRODUCT_ID=87654321
```

---

## Styling & Design System

### Color Palette
Defined in `tailwind.config.js`:

```javascript
colors: {
  'phlox': '#dd18fe',      // Primary purple/pink
  'red': '#ff000c',         // Sweet Bros red
  'yellow_green': '#9fd600', // Bright lime
  'dodger_blue': '#0495ff'  // Bright blue
}
```

Each color has shades from 100-900.

### Typography
- **Primary font**: Nunito (Google Fonts)
- **Logo font**: Marble (custom font in `/public/fonts/`)
- **Weights**: 400 (normal), 600 (semibold), 700 (bold), 800 (extrabold)

### Consistent Random Colors
**File**: `src/utils/colourHelpers.js`

**Purpose**: Generate "random" colors that stay consistent across page reloads

**Usage**:
```javascript
import { getItemColour } from '../../utils/colourHelpers'

const buttonColour = getItemColour('hero-shop-button')
// Returns: { bg: 'bg-phlox-500', text: 'text-phlox-500', gradient: 'from-phlox-400 to-phlox-600', hover: 'hover:bg-phlox-600' }
```

**How it works**: Uses a hash of the item ID to deterministically pick a color

---

## Common Customization Scenarios

### 1. **Add a new sweet**
1. Add image: `/public/images/sweets/new-sweet.jpg`
2. Edit: `src/data/sweets.json`
   ```json
   {
     "id": "new-sweet",
     "name": "New Sweet Name",
     "category": "jelly",
     "image": "/images/sweets/new-sweet.jpg"
   }
   ```

### 2. **Change custom bag price**
**File**: `src/components/pages/ShopPage.jsx`
- Sweet bag: Line 139 (`price: 7.50`)
- Cable bag: Line 186 (`price: 5.00`)

### 3. **Change custom bag selection limits**
**File**: `src/components/sweet-picker/SweetPicker.jsx`
- Sweet bag: Lines 14-15 (`maxItems: 20, minItems: 10`)
- Cable bag: Lines 21-22 (`maxItems: 4, minItems: 4`)

### 4. **Add a new Shopify collection**
**File**: `src/components/pages/ShopPage.jsx`

1. Add handle to array (line 23):
   ```javascript
   const collectionHandles = [
     'pick-mix-bags',
     'new-collection',  // Add here
     ...
   ]
   ```

2. Add configuration (line 34):
   ```javascript
   'new-collection': {
     title: 'New Collection Title',
     description: 'Description here',
     color: 'from-purple-400 to-purple-600'
   }
   ```

### 5. **Update brothers' ages**
**File**: `src/components/pages/AboutPage.jsx`
- Line 90: Update Logan's age
- Line 90: Update Barkley's age

### 6. **Add a gallery post**
**File**: `src/data/gallery.json`

Add new entry:
```json
{
  "id": "new-collab",
  "title": "Sweet Bros x New Partner",
  "date": "2025-02-15",
  "images": ["/images/gallery/new-collab.jpg"],
  "excerpt": "Description of collaboration",
  "tags": ["collaboration", "new-partner"]
}
```

### 7. **Change website colors**
**File**: `tailwind.config.js`

Modify color values in the `colors` section (lines 9-70)

### 8. **Update social media links**
**File**: `src/components/ui/SocialLinks.jsx`

Update URLs and icons

### 9. **Modify navigation menu**
**File**: `src/components/layout/Navigation.jsx`

Edit `menuItems` array (lines 14-39)

### 10. **Change checkout domain**
**File**: `src/components/cart/CheckoutButton.jsx`

Line 120: Change domain replacement logic

---

## Deployment

### Hosting: Vercel

**Configuration**: `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes are handled by React Router (SPA routing).

### Build Commands
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Git Workflow
Current branch: `claude/repo-documentation-guide-012PoRuuQDLpAbYxopyxfz6h`

**To deploy**:
1. Commit changes
2. Push to GitHub
3. Vercel automatically deploys from connected repository

---

## Environment Variables

**Required for Shopify integration**:

Create a `.env` file (NOT committed to git):

```env
# Shopify Storefront API
VITE_SHOPIFY_DOMAIN=kkidz3-1h.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your_storefront_access_token

# Custom Product IDs
VITE_CUSTOM_SWEET_BAG_PRODUCT_ID=12345678
VITE_CUSTOM_CABLE_BAG_PRODUCT_ID=87654321
```

**Where to find these**:
1. Shopify Admin → Settings → Apps and sales channels → Develop apps
2. Create app → Configure Storefront API
3. Enable required scopes (products, collections, carts)
4. Get access token
5. Find product IDs in Shopify Admin → Products (last part of URL)

**For Vercel deployment**:
Add these as environment variables in Vercel dashboard:
- Project Settings → Environment Variables
- Add each variable with its value
- Redeploy

---

## File Modification Quick Reference

| Task | File(s) | Line(s) |
|------|---------|---------|
| Add new sweet | `src/data/sweets.json` | Append to array |
| Add new cable | `src/data/cables.json` | Append to array |
| Change sweet bag price | `src/components/pages/ShopPage.jsx` | 139 |
| Change cable bag price | `src/components/pages/ShopPage.jsx` | 186 |
| Update ages | `src/components/pages/AboutPage.jsx` | 90 |
| Add gallery post | `src/data/gallery.json` | Append to posts array |
| Add collection | `src/components/pages/ShopPage.jsx` | 23-71 |
| Modify colors | `tailwind.config.js` | 9-70 |
| Change navigation | `src/components/layout/Navigation.jsx` | 14-39 |
| Update meta tags | `index.html` | 16-41 |

---

## Key Concepts Summary

### 1. **Three Types of Products**
- **Regular Shopify products**: Fetched directly from Shopify (themed bags, bundles, etc.)
- **Custom sweet bags**: Frontend-only, uses `SweetPicker`, maps to Shopify product ID
- **Custom cable bags**: Frontend-only, uses `SweetPicker`, maps to Shopify product ID

### 2. **Shopping Flow**
Collections → Products → Product Detail → Add to Cart → Checkout (Shopify)

### 3. **Data Sources**
- **Shopify**: Collections, regular products, cart creation, checkout
- **Local JSON**: Sweets list, cables list, gallery posts
- **localStorage**: Cart persistence

### 4. **State Management**
- **Global**: Cart state (`CartContext`)
- **Local**: Component-specific state (selected products, view state, etc.)

### 5. **Routing**
- `/` - Home
- `/shop` - Shop (collections → products → detail)
- `/about` - About page
- `/gallery` - Gallery page
- `/shop#custom-sweet-bag` - Direct link to custom sweet builder

---

## Support & Maintenance

### Common Issues

**1. Products not loading**
- Check environment variables are set
- Verify Shopify API token has correct permissions
- Check browser console for API errors

**2. Images not displaying**
- Ensure images are in `/public/images/` directory
- Check paths in JSON files match actual file locations
- Verify image files are committed to git

**3. Cart not persisting**
- localStorage might be disabled
- Check browser console for localStorage errors

**4. Checkout failing**
- Verify custom product IDs in environment variables
- Check Shopify checkout domain in `CheckoutButton.jsx`
- Ensure Shopify products exist with correct IDs

### Development Tips

1. **Testing cart flow**: Open browser dev tools → Application → Local Storage → Check `sweetBrosCart`

2. **Testing Shopify API**: Check Network tab for GraphQL requests to Shopify

3. **Mobile testing**: Use browser dev tools device emulation for responsive design

4. **Color consistency**: Always use `getItemColour()` for consistent random colors

---

## Contact & Resources

- **Repository**: Greenie5656/sweet-bros
- **Live site**: https://sweet-bros.vercel.app/
- **Shop domain**: https://shop.sweet-bros.co.uk
- **Build tool**: Vite (https://vitejs.dev/)
- **Shopify docs**: https://shopify.dev/docs/api/storefront

---

*Last updated: November 17, 2025*
*Generated for client reference and quick adjustments*
