/**
 * ShopSphere AI — Main Application Logic
 * Phase 3: Product Details Modal, Cart Drawer, Dynamic Totals, Coupons, Delivery, Checkout & Order Confirmation
 */

'use strict';

// -----------------------------------------------------------------------------
// 1. CONSTANTS & PRODUCT DATA (24 Curated Realistic Products Across 6 Categories)
// -----------------------------------------------------------------------------
const CURRENCY_SYMBOL = '₹';

function formatCurrency(amount) {
  return `${CURRENCY_SYMBOL}${Number(amount).toLocaleString('en-IN')}`;
}

const PRODUCTS = [
  // --- Electronics (4 items) ---
  {
    id: 1,
    name: 'Aura Sound Pro Wireless Headphones',
    category: 'Electronics',
    price: 199,
    originalPrice: 249,
    discount: '20% OFF',
    rating: 4.9,
    reviewCount: 240,
    reviews: 240,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-low latency audio with adaptive active noise cancellation and 40h battery.'
  },
  {
    id: 2,
    name: 'Smart Ergonomic Desk Lamp',
    category: 'Electronics',
    price: 79,
    originalPrice: 99,
    discount: '20% OFF',
    rating: 4.7,
    reviewCount: 140,
    reviews: 140,
    badge: 'Smart Pick',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1534972195531-a756b112697e?w=600&auto=format&fit=crop&q=80',
    description: 'Circadian rhythm auto-tuning with integrated wireless fast charging pad.'
  },
  {
    id: 3,
    name: 'PulseTech Horizon Smartwatch',
    category: 'Electronics',
    price: 229,
    originalPrice: 299,
    discount: '23% OFF',
    rating: 4.8,
    reviewCount: 312,
    reviews: 312,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    description: 'Precision biometric tracking, vibrant AMOLED display, and aircraft-grade titanium.'
  },
  {
    id: 4,
    name: 'SonicStream Studio Microphone',
    category: 'Electronics',
    price: 129,
    originalPrice: 160,
    discount: '19% OFF',
    rating: 4.8,
    reviewCount: 88,
    reviews: 88,
    badge: 'Creator Choice',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1583241800698-e8ab01830a07?w=600&auto=format&fit=crop&q=80',
    description: 'Cardioid condenser microphone with 24-bit/96kHz high-resolution sound capture.'
  },

  // --- Fashion (4 items) ---
  {
    id: 5,
    name: 'Eco-Knit Urban Runner Shoes',
    category: 'Fashion',
    price: 120,
    originalPrice: 150,
    discount: '20% OFF',
    rating: 4.7,
    reviewCount: 180,
    reviews: 180,
    badge: 'Eco Pick',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80',
    description: 'Breathable recycled knit upper with high-cushion responsive bouncy foam sole.'
  },
  {
    id: 6,
    name: 'Italian Leather Crossbody Bag',
    category: 'Fashion',
    price: 210,
    originalPrice: 280,
    discount: '25% OFF',
    rating: 4.9,
    reviewCount: 68,
    reviews: 68,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
    description: 'Full-grain Tuscan calfskin with brushed brass hardware and micro-suede lining.'
  },
  {
    id: 7,
    name: 'Merino Wool Minimalist Crewneck',
    category: 'Fashion',
    price: 95,
    originalPrice: 130,
    discount: '27% OFF',
    rating: 4.6,
    reviewCount: 115,
    reviews: 115,
    badge: 'Hot Deal',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-soft 100% Australian Merino wool that naturally regulates body temperature.'
  },
  {
    id: 8,
    name: 'Tailored All-Weather Trench Coat',
    category: 'Fashion',
    price: 280,
    originalPrice: 350,
    discount: '20% OFF',
    rating: 4.8,
    reviewCount: 94,
    reviews: 94,
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
    description: 'Water-repellent storm-proof gabardine with structured silhouette and belted waist.'
  },

  // --- Home (4 items) ---
  {
    id: 9,
    name: 'Ceramic Pour-Over Coffee Kit',
    category: 'Home',
    price: 48,
    originalPrice: 60,
    discount: '20% OFF',
    rating: 4.9,
    reviewCount: 82,
    reviews: 82,
    badge: 'Artisan',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    description: 'Artisanal matte ceramic dripper for pure, balanced specialty coffee extraction.'
  },
  {
    id: 10,
    name: 'Nordic Walnut Floating Shelf Set',
    category: 'Home',
    price: 65,
    originalPrice: 85,
    discount: '24% OFF',
    rating: 4.5,
    reviewCount: 76,
    reviews: 76,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    description: 'Solid American walnut with concealed steel mounting brackets and satin oil finish.'
  },
  {
    id: 11,
    name: 'AromaPure Ultrasonic Diffuser',
    category: 'Home',
    price: 42,
    originalPrice: 55,
    discount: '24% OFF',
    rating: 4.7,
    reviewCount: 164,
    reviews: 164,
    badge: 'Relaxation',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop&q=80',
    description: 'Whisper-quiet ambient ultrasonic mist with 7-color evening meditation glow.'
  },
  {
    id: 12,
    name: 'Loom-Crafted Linen Throw Blanket',
    category: 'Home',
    price: 75,
    originalPrice: 95,
    discount: '21% OFF',
    rating: 4.6,
    reviewCount: 108,
    reviews: 108,
    badge: 'Cozy Pick',
    image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=80',
    description: 'Stonewashed French flax linen woven with subtle fringed edges for timeless comfort.'
  },

  // --- Beauty (4 items) ---
  {
    id: 13,
    name: 'Botanical Glow Facial Serum',
    category: 'Beauty',
    price: 38,
    originalPrice: 45,
    discount: '15% OFF',
    rating: 4.8,
    reviewCount: 310,
    reviews: 310,
    badge: 'Best Seller',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1608248597358-29a3e6179e8e?w=600&auto=format&fit=crop&q=80',
    description: 'Pure cold-pressed squalane and Vitamin C for radiant everyday hydration.'
  },
  {
    id: 14,
    name: 'Rose Quartz Facial Sculpting Roller',
    category: 'Beauty',
    price: 28,
    originalPrice: 38,
    discount: '26% OFF',
    rating: 4.6,
    reviewCount: 195,
    reviews: 195,
    badge: 'Self Care',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
    description: 'Natural grade-A Brazilian rose quartz crafted to relieve facial tension and puffiness.'
  },
  {
    id: 15,
    name: 'Overnight Barrier Restoring Cream',
    category: 'Beauty',
    price: 52,
    originalPrice: 68,
    discount: '24% OFF',
    rating: 4.9,
    reviewCount: 142,
    reviews: 142,
    badge: 'Derm Pick',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80',
    description: 'Ceramide NP complex with triple hyaluronic acid for intensive nocturnal skin repair.'
  },
  {
    id: 16,
    name: 'Velvet Rose Hydrating Mist',
    category: 'Beauty',
    price: 24,
    originalPrice: 30,
    discount: '20% OFF',
    rating: 4.5,
    reviewCount: 87,
    reviews: 87,
    badge: 'Clean Beauty',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
    description: 'Organic Bulgarian rose hydrosol infused with soothing organic aloe and chamomile.'
  },

  // --- Sports (4 items) ---
  {
    id: 17,
    name: 'Ultra-Light Carbon Tennis Racket',
    category: 'Sports',
    price: 160,
    originalPrice: 210,
    discount: '24% OFF',
    rating: 4.6,
    reviewCount: 54,
    reviews: 54,
    badge: 'Pro Series',
    image: 'https://images.unsplash.com/photo-1617083934555-563d415840d2?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop&q=80',
    description: 'Toray carbon fiber composite engineered for spin velocity and pinpoint precision.'
  },
  {
    id: 18,
    name: 'FlexGrip Dual-Density Yoga Mat',
    category: 'Sports',
    price: 58,
    originalPrice: 75,
    discount: '23% OFF',
    rating: 4.8,
    reviewCount: 220,
    reviews: 220,
    badge: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
    description: 'Non-slip eco-polyurethane surface with laser-etched anatomical alignment lines.'
  },
  {
    id: 19,
    name: 'HydroShield Insulated Flask 1L',
    category: 'Sports',
    price: 34,
    originalPrice: 45,
    discount: '24% OFF',
    rating: 4.9,
    reviewCount: 410,
    reviews: 410,
    badge: 'Essential',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&auto=format&fit=crop&q=80',
    description: 'Triple-wall vacuum insulation keeping cold drinks icy for 24h or steaming hot for 12h.'
  },
  {
    id: 20,
    name: 'Velocity Alloy Road Cycling Helmet',
    category: 'Sports',
    price: 110,
    originalPrice: 145,
    discount: '24% OFF',
    rating: 4.7,
    reviewCount: 65,
    reviews: 65,
    badge: 'Safety First',
    image: 'https://images.unsplash.com/photo-1557687791-5a5078a1f815?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&auto=format&fit=crop&q=80',
    description: 'Aerodynamic wind-tunnel tested frame featuring MIPS rotational impact protection.'
  },

  // --- Accessories (4 items) ---
  {
    id: 21,
    name: 'Minimalist Chrono Watch',
    category: 'Accessories',
    price: 145,
    originalPrice: 180,
    discount: '19% OFF',
    rating: 4.8,
    reviewCount: 95,
    reviews: 95,
    badge: 'Staff Pick',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80',
    description: 'Surgical stainless steel casing with Italian vegetable-tanned leather band.'
  },
  {
    id: 22,
    name: 'Polarized Acetate Aviator Sunglasses',
    category: 'Accessories',
    price: 85,
    originalPrice: 115,
    discount: '26% OFF',
    rating: 4.7,
    reviewCount: 135,
    reviews: 135,
    badge: 'Classic',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&auto=format&fit=crop&q=80',
    description: 'Handmade cellulose acetate frames with 100% UVA/UVB polarized anti-glare lenses.'
  },
  {
    id: 23,
    name: 'RFID-Blocking Slim Bifold Wallet',
    category: 'Accessories',
    price: 42,
    originalPrice: 55,
    discount: '24% OFF',
    rating: 4.8,
    reviewCount: 278,
    reviews: 278,
    badge: 'Compact',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&auto=format&fit=crop&q=80',
    description: 'Top-grain cowhide leather with aerospace aluminum quick-card ejection slider.'
  },
  {
    id: 24,
    name: 'Braided Leather Keychain with Carabiner',
    category: 'Accessories',
    price: 22,
    originalPrice: 30,
    discount: '27% OFF',
    rating: 4.6,
    reviewCount: 160,
    reviews: 160,
    badge: 'Gift Pick',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80',
    fallbackImage: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&auto=format&fit=crop&q=80',
    description: 'Hand-braided vegetable tanned leather lanyard with heavy-duty matte zinc hardware.'
  }
];

// -----------------------------------------------------------------------------
// 2. STATE MANAGEMENT (localStorage & Active Catalog Filters)
// -----------------------------------------------------------------------------
const STORAGE_KEYS = {
  THEME: 'shopsphere_theme',
  CART: 'shopsphere_cart',
  WISHLIST: 'shopsphere_wishlist'
};

// Central Catalog Filter & Sort State
const catalogState = {
  searchQuery: '',
  category: 'all',
  maxPrice: 500,
  minRating: 0,
  sortBy: 'featured'
};

// Phase 3 State
let currentDetailProductId = null;
let activeCoupon = null;

/**
 * Load cart items from localStorage
 */
function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading cart from localStorage', err);
    return [];
  }
}

/**
 * Save cart items to localStorage and update badge
 */
function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    updateCartCounter();
  } catch (err) {
    console.error('Error saving cart to localStorage', err);
  }
}

/**
 * Load wishlist product IDs from localStorage
 */
function getWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading wishlist from localStorage', err);
    return [];
  }
}

/**
 * Save wishlist to localStorage and update badge
 */
function saveWishlist(wishlist) {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    updateWishlistCounter();
  } catch (err) {
    console.error('Error saving wishlist to localStorage', err);
  }
}

// -----------------------------------------------------------------------------
// 3. THEME CONTROLLER (Dark / Light Mode)
// -----------------------------------------------------------------------------
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);

  let initialTheme = 'light';
  if (savedTheme) {
    initialTheme = savedTheme;
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    initialTheme = 'dark';
  }

  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      showToast(`Switched to ${nextTheme.toUpperCase()} mode 🌓`);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (err) {
    console.error('Unable to persist theme', err);
  }
}

// -----------------------------------------------------------------------------
// 4. UI COUNTERS & TOAST SYSTEM
// -----------------------------------------------------------------------------
function updateCartCounter() {
  const counterEl = document.getElementById('cartCounter');
  if (!counterEl) return;
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
  counterEl.textContent = totalCount;
  animateBadge(counterEl);
}

function updateWishlistCounter() {
  const counterEl = document.getElementById('wishlistCounter');
  if (!counterEl) return;
  const wishlist = getWishlist();
  counterEl.textContent = wishlist.length;
  animateBadge(counterEl);
}

function animateBadge(el) {
  el.classList.add('pop');
  setTimeout(() => el.classList.remove('pop'), 200);
}

/**
 * Display a modern non-blocking toast message
 */
function showToast(message, icon = '✨') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// -----------------------------------------------------------------------------
// 4B. PHASE 6.1 — INVENTORY & STOCK MANAGEMENT SYSTEM
// -----------------------------------------------------------------------------
const DEFAULT_INITIAL_INVENTORY = {
  1: 18, 2: 14, 3: 4, 4: 12, 5: 16, 6: 10,
  7: 3,  8: 15, 9: 20, 10: 12, 11: 15, 12: 5,
  13: 14, 14: 18, 15: 10, 16: 12, 17: 15, 18: 22,
  19: 16, 20: 14, 21: 15, 22: 18, 23: 12, 24: 15
};

function getInventory() {
  try {
    const raw = localStorage.getItem('shopsphere_inventory');
    if (!raw) {
      saveInventory(DEFAULT_INITIAL_INVENTORY);
      return { ...DEFAULT_INITIAL_INVENTORY };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      saveInventory(DEFAULT_INITIAL_INVENTORY);
      return { ...DEFAULT_INITIAL_INVENTORY };
    }
    let needsResave = false;
    for (let id = 1; id <= 24; id++) {
      if (typeof parsed[id] !== 'number' || isNaN(parsed[id])) {
        parsed[id] = DEFAULT_INITIAL_INVENTORY[id] || 15;
        needsResave = true;
      }
    }
    if (needsResave) {
      saveInventory(parsed);
    }
    return parsed;
  } catch (e) {
    return { ...DEFAULT_INITIAL_INVENTORY };
  }
}

function saveInventory(inv) {
  try {
    localStorage.setItem('shopsphere_inventory', JSON.stringify(inv));
  } catch (e) {
    console.error('Failed to save inventory to localStorage:', e);
  }
}

function getProductStock(productId) {
  const inv = getInventory();
  const stock = inv[productId];
  return (typeof stock === 'number' && !isNaN(stock)) ? Math.max(0, stock) : 15;
}

function isProductInStock(productId) {
  return getProductStock(productId) > 0;
}

function decrementStock(productId, qty = 1) {
  const inv = getInventory();
  const current = getProductStock(productId);
  const updated = Math.max(0, current - qty);
  inv[productId] = updated;
  saveInventory(inv);
  return updated;
}

function restockProduct(productId, qty = 10) {
  const inv = getInventory();
  const current = getProductStock(productId);
  const updated = current + qty;
  inv[productId] = updated;
  saveInventory(inv);
  return updated;
}

// -----------------------------------------------------------------------------
// 4C. PHASE 6.2 — CUSTOMER REVIEWS & UGC RATING ENGINE
// -----------------------------------------------------------------------------
const DEFAULT_INITIAL_REVIEWS = [
  {
    reviewId: "REV-1001",
    productId: 1, // Aura Sound Pro
    author: "Rohan Deshmukh",
    rating: 5,
    title: "Best ANC headphones I've owned!",
    comment: "The active noise cancellation blocks out all office chatter and engine roar. Bass is punchy without distorting vocals. Easily lasted 38 hours on a single charge.",
    date: "February 24, 2026",
    timestamp: 1771920000000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1002",
    productId: 1, // Aura Sound Pro
    author: "Pooja Hegde",
    rating: 5,
    title: "Sleek, lightweight and incredible clarity",
    comment: "Memory foam earcups don't squeeze my ears even after hours of work calls. The ambient sound passthrough mode is super natural.",
    date: "February 27, 2026",
    timestamp: 1772179200000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1003",
    productId: 1, // Aura Sound Pro
    author: "Vikram Mehta",
    rating: 4,
    title: "Fantastic sound, slight delay when gaming",
    comment: "For music and movies this is an absolute 10/10. When playing fast-paced competitive FPS games there is a minuscule Bluetooth latency, but wired mode fixes it completely.",
    date: "March 1, 2026",
    timestamp: 1772438400000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1004",
    productId: 2, // Luxe Minimalist Watch
    author: "Sneha Nair",
    rating: 5,
    title: "Pure elegance on the wrist",
    comment: "The sapphire crystal glass and Japanese quartz movement feel extremely premium. I receive compliments every time I wear it to meetings.",
    date: "February 18, 2026",
    timestamp: 1771401600000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1005",
    productId: 2, // Luxe Minimalist Watch
    author: "Ananya Roy",
    rating: 4,
    title: "Stunning design, band takes a week to break in",
    comment: "The leather band was slightly stiff out of the box, but softened beautifully after 4-5 days of daily wear. Keeps time impeccably.",
    date: "February 22, 2026",
    timestamp: 1771747200000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1006",
    productId: 3, // PulseTech Smartwatch
    author: "Amitabh Sen",
    rating: 5,
    title: "Accurate health metrics & crisp AMOLED",
    comment: "The heart rate and SpO2 sensor matches my clinical pulse oximeter closely. The battery lasts a solid 6 days with always-on display disabled.",
    date: "February 25, 2026",
    timestamp: 1772006400000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1007",
    productId: 4, // Ergonomic Office Chair
    author: "Deepak Verma",
    rating: 5,
    title: "Cured my lower back fatigue",
    comment: "The adjustable lumbar support and breathable mesh make 9-hour coding marathons painless. Build quality is rock solid.",
    date: "February 15, 2026",
    timestamp: 1771142400000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1008",
    productId: 5, // Ceramic Pour-Over Set
    author: "Maya Kapoor",
    rating: 5,
    title: "Barista level pour-over at home",
    comment: "Optimal thermal retention compared to plastic drippers. Beautiful matte glaze looks stunning on my kitchen countertop.",
    date: "February 20, 2026",
    timestamp: 1771574400000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1009",
    productId: 7, // Minimalist Ceramic Vase
    author: "Kavita Rao",
    rating: 5,
    title: "Architectural masterpiece in clay",
    comment: "Textured unglazed finish gives it an organic earthy aesthetic. Perfect proportions for pampas grass or fresh eucalyptus stems.",
    date: "February 10, 2026",
    timestamp: 1770710400000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1010",
    productId: 8, // Vitamin C Glow Serum
    author: "Tanvi Saxena",
    rating: 5,
    title: "Noticeable brightness in 10 days",
    comment: "Non-greasy, absorbs rapidly, and faded stubborn acne hyperpigmentation without irritating my sensitive combination skin.",
    date: "February 26, 2026",
    timestamp: 1772092800000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1011",
    productId: 9, // Pro Yoga Mat
    author: "Arjun Bhatia",
    rating: 5,
    title: "Zero slipping during hot power yoga",
    comment: "The natural rubber grip stays sticky even when sweaty. 6mm thickness offers ideal knee cushioning without losing balance.",
    date: "February 19, 2026",
    timestamp: 1771488000000,
    verifiedBuyer: true
  },
  {
    reviewId: "REV-1012",
    productId: 12, // Stainless Steel Water Bottle
    author: "Siddharth Jain",
    rating: 5,
    title: "Keeps ice water cold in hot cars",
    comment: "Left it in the car under 36°C sunshine for 6 hours; water inside was still ice cold. Leakproof cap and durable powder-coat finish.",
    date: "February 28, 2026",
    timestamp: 1772265600000,
    verifiedBuyer: true
  }
];

let currentReviewFilter = 'all';
let currentReviewSort = 'newest';

function getReviews() {
  try {
    const raw = localStorage.getItem('shopsphere_reviews');
    if (!raw) {
      saveReviews(DEFAULT_INITIAL_REVIEWS);
      return [...DEFAULT_INITIAL_REVIEWS];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      saveReviews(DEFAULT_INITIAL_REVIEWS);
      return [...DEFAULT_INITIAL_REVIEWS];
    }
    const valid = parsed.filter(r => r && typeof r === 'object' && typeof r.productId === 'number' && typeof r.rating === 'number');
    if (valid.length === 0) {
      saveReviews(DEFAULT_INITIAL_REVIEWS);
      return [...DEFAULT_INITIAL_REVIEWS];
    }
    return valid;
  } catch (e) {
    return [...DEFAULT_INITIAL_REVIEWS];
  }
}

function saveReviews(reviews) {
  try {
    localStorage.setItem('shopsphere_reviews', JSON.stringify(reviews));
  } catch (e) {
    console.error('Failed to save reviews to localStorage:', e);
  }
}

function getProductReviews(productId) {
  const reviews = getReviews();
  return reviews.filter(r => r.productId === productId);
}

function calculateProductRating(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) {
    return { rating: 5.0, reviewCount: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }, userReviewsCount: 0 };
  }

  const allReviews = getReviews();
  const productReviews = allReviews.filter(r => r.productId === productId);

  const baseCount = Math.max(0, product.reviewCount || 10);
  const baseRating = product.rating || 4.5;

  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  const base5 = Math.round(baseCount * (baseRating >= 4.5 ? 0.70 : 0.50));
  const base4 = Math.round(baseCount * (baseRating >= 4.5 ? 0.22 : 0.30));
  const base3 = Math.round(baseCount * (baseRating >= 4.5 ? 0.05 : 0.12));
  const base2 = Math.round(baseCount * 0.02);
  const base1 = Math.max(0, baseCount - base5 - base4 - base3 - base2);

  breakdown[5] = base5;
  breakdown[4] = base4;
  breakdown[3] = base3;
  breakdown[2] = base2;
  breakdown[1] = base1;

  let ugcSum = 0;
  productReviews.forEach(r => {
    const star = Math.max(1, Math.min(5, Math.round(r.rating || 5)));
    breakdown[star] = (breakdown[star] || 0) + 1;
    ugcSum += star;
  });

  const totalReviews = baseCount + productReviews.length;
  const totalScore = (baseCount * baseRating) + ugcSum;
  const averageRating = totalReviews > 0 ? parseFloat((totalScore / totalReviews).toFixed(1)) : baseRating;

  return {
    rating: averageRating,
    reviewCount: totalReviews,
    breakdown,
    userReviewsCount: productReviews.length
  };
}

function addReview(reviewData) {
  const reviews = getReviews();
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const newReview = {
    reviewId: `REV-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    productId: parseInt(reviewData.productId, 10),
    author: String(reviewData.author || 'Verified Shopper').trim(),
    rating: Math.max(1, Math.min(5, parseInt(reviewData.rating, 10) || 5)),
    title: String(reviewData.title || 'Great Product').trim(),
    comment: String(reviewData.comment || '').trim(),
    date: dateStr,
    timestamp: now.getTime(),
    verifiedBuyer: true
  };

  reviews.unshift(newReview);
  saveReviews(reviews);
  return newReview;
}

function setStarRating(stars) {
  const count = Math.max(1, Math.min(5, parseInt(stars, 10) || 5));
  const input = document.getElementById('reviewRatingInput');
  if (input) input.value = count;

  const starBtns = document.querySelectorAll('#starRatingPicker .star-pick');
  starBtns.forEach(btn => {
    const val = parseInt(btn.getAttribute('data-val'), 10);
    btn.classList.toggle('active', val <= count);
  });

  const labelEl = document.getElementById('ratingPickLabel');
  if (labelEl) {
    const labels = {
      5: '5 Stars — Excellent',
      4: '4 Stars — Very Good',
      3: '3 Stars — Average',
      2: '2 Stars — Fair',
      1: '1 Star — Poor'
    };
    labelEl.textContent = labels[count] || `${count} Stars`;
  }
}

function toggleReviewForm(forceState) {
  const form = document.getElementById('writeReviewForm');
  const btn = document.getElementById('toggleWriteReviewBtn');
  if (!form) return;

  const isCurrentlyOpen = form.style.display !== 'none';
  const nextState = (typeof forceState === 'boolean') ? forceState : !isCurrentlyOpen;

  if (nextState) {
    form.style.display = 'block';
    if (btn) btn.innerHTML = `<span>✕ Close Form</span>`;
    const authorInput = document.getElementById('reviewAuthorInput');
    if (authorInput) authorInput.focus();
  } else {
    form.style.display = 'none';
    if (btn) btn.innerHTML = `<span>✍️ Write a Review</span>`;
  }
}

function filterReviewsByRating(filter) {
  currentReviewFilter = filter;
  const pills = document.querySelectorAll('#reviewsFilterPills .review-filter-pill');
  pills.forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-filter') === filter);
  });
  if (currentDetailProductId) {
    renderProductReviews(currentDetailProductId, currentReviewFilter, currentReviewSort);
  }
}

function sortReviews(sort) {
  currentReviewSort = sort;
  if (currentDetailProductId) {
    renderProductReviews(currentDetailProductId, currentReviewFilter, currentReviewSort);
  }
}

function renderProductReviews(productId, filter = 'all', sort = 'newest') {
  const ratingData = calculateProductRating(productId);
  const reviewsContainer = document.getElementById('productReviewsList');
  const aggScoreEl = document.getElementById('reviewsAggregateRating');
  const aggStarsEl = document.getElementById('reviewsAggregateStars');
  const totalCountEl = document.getElementById('reviewsTotalCount');
  const breakdownBarsEl = document.getElementById('ratingBreakdownBars');

  if (aggScoreEl) aggScoreEl.textContent = ratingData.rating.toFixed(1);
  if (aggStarsEl) aggStarsEl.textContent = '★'.repeat(Math.round(ratingData.rating)) + '☆'.repeat(5 - Math.round(ratingData.rating));
  if (totalCountEl) totalCountEl.textContent = `Based on ${ratingData.reviewCount} customer reviews`;

  // Render 5-Star Breakdown Bars
  if (breakdownBarsEl) {
    const total = Math.max(1, ratingData.reviewCount);
    let breakdownHtml = '';
    for (let star = 5; star >= 1; star--) {
      const count = ratingData.breakdown[star] || 0;
      const pct = Math.min(100, Math.round((count / total) * 100));
      breakdownHtml += `
        <div class="breakdown-row">
          <span class="breakdown-star-label">${star} ★</span>
          <div class="breakdown-bar-track">
            <div class="breakdown-bar-fill" style="width: ${pct}%;"></div>
          </div>
          <span class="breakdown-count-label">${pct}%</span>
        </div>
      `;
    }
    breakdownBarsEl.innerHTML = breakdownHtml;
  }

  if (!reviewsContainer) return;

  const productReviews = getProductReviews(productId);

  // Filter
  let filtered = [...productReviews];
  if (filter === '5') filtered = filtered.filter(r => r.rating === 5);
  else if (filter === '4') filtered = filtered.filter(r => r.rating === 4);
  else if (filter === '3') filtered = filtered.filter(r => r.rating === 3);
  else if (filter === 'critical') filtered = filtered.filter(r => r.rating <= 2);

  // Sort
  if (sort === 'newest') {
    filtered.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  } else if (sort === 'highest') {
    filtered.sort((a, b) => b.rating - a.rating || (b.timestamp || 0) - (a.timestamp || 0));
  } else if (sort === 'lowest') {
    filtered.sort((a, b) => a.rating - b.rating || (b.timestamp || 0) - (a.timestamp || 0));
  }

  if (filtered.length === 0) {
    reviewsContainer.innerHTML = `
      <div class="reviews-empty-box">
        <p>No customer reviews match this filter. Be the first to share your thoughts!</p>
      </div>
    `;
    return;
  }

  reviewsContainer.innerHTML = filtered.map(rev => {
    const initials = rev.author ? rev.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'SS';
    const starsHtml = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
    return `
      <article class="review-card" data-review-id="${rev.reviewId}">
        <div class="review-card-header">
          <div class="review-author-wrap">
            <div class="review-author-avatar">${initials}</div>
            <span class="review-author-name">${escapeHtml(rev.author)}</span>
            ${rev.verifiedBuyer ? `<span class="review-verified-tag">✓ Verified Purchase</span>` : ''}
          </div>
          <span class="review-date">${rev.date}</span>
        </div>
        <div class="review-stars-row">
          <span class="review-stars">${starsHtml}</span>
          <h4 class="review-title">${escapeHtml(rev.title)}</h4>
        </div>
        <p class="review-body-text">${escapeHtml(rev.comment)}</p>
      </article>
    `;
  }).join('');
}

function handleReviewSubmit(event) {
  if (event) event.preventDefault();

  if (!currentDetailProductId) {
    showToast('No active product selected for review.', '⚠️');
    return;
  }

  const ratingInput = document.getElementById('reviewRatingInput');
  const authorInput = document.getElementById('reviewAuthorInput');
  const titleInput = document.getElementById('reviewTitleInput');
  const commentInput = document.getElementById('reviewCommentInput');

  const authorErr = document.getElementById('reviewAuthorError');
  const titleErr = document.getElementById('reviewTitleError');
  const commentErr = document.getElementById('reviewCommentError');

  const rating = parseInt(ratingInput ? ratingInput.value : 5, 10);
  const author = authorInput ? authorInput.value.trim() : '';
  const title = titleInput ? titleInput.value.trim() : '';
  const comment = commentInput ? commentInput.value.trim() : '';

  let isValid = true;

  if (isNaN(rating) || rating < 1 || rating > 5) {
    showToast('Please select a star rating between 1 and 5.', '⚠️');
    isValid = false;
  }

  if (!author || author.length < 2) {
    if (authorErr) authorErr.textContent = 'Please enter your name (at least 2 characters).';
    if (authorInput) authorInput.classList.add('invalid');
    isValid = false;
  } else {
    if (authorErr) authorErr.textContent = '';
    if (authorInput) authorInput.classList.remove('invalid');
  }

  if (!title || title.length < 3) {
    if (titleErr) titleErr.textContent = 'Please provide a headline (at least 3 characters).';
    if (titleInput) titleInput.classList.add('invalid');
    isValid = false;
  } else {
    if (titleErr) titleErr.textContent = '';
    if (titleInput) titleInput.classList.remove('invalid');
  }

  if (!comment || comment.length < 10) {
    if (commentErr) commentErr.textContent = 'Review text must be at least 10 characters.';
    if (commentInput) commentInput.classList.add('invalid');
    isValid = false;
  } else {
    if (commentErr) commentErr.textContent = '';
    if (commentInput) commentInput.classList.remove('invalid');
  }

  if (!isValid) {
    showToast('Please fix the errors in the review form.', '⚠️');
    return;
  }

  addReview({
    productId: currentDetailProductId,
    rating,
    author,
    title,
    comment
  });

  // Reset form
  if (authorInput) authorInput.value = '';
  if (titleInput) titleInput.value = '';
  if (commentInput) commentInput.value = '';
  setStarRating(5);
  toggleReviewForm(false);

  showToast('Thank you! Your review has been published. ⭐', '🎉');

  // Dynamically update Product Details view and Catalog
  const product = PRODUCTS.find(p => p.id === currentDetailProductId);
  if (product) {
    const ratingData = calculateProductRating(product.id);
    const detailScore = document.getElementById('detailRatingScore');
    const detailCount = document.getElementById('detailReviewCount');
    const detailStars = document.getElementById('detailProductStars');
    if (detailScore) detailScore.textContent = ratingData.rating.toFixed(1);
    if (detailCount) detailCount.textContent = `(${ratingData.reviewCount} customer reviews)`;
    if (detailStars) detailStars.textContent = '★'.repeat(Math.round(ratingData.rating)) + '☆'.repeat(5 - Math.round(ratingData.rating));
  }

  renderProductReviews(currentDetailProductId, currentReviewFilter, currentReviewSort);
  filterProducts(); // refresh catalog cards with dynamic rating
  renderPersonalizedRecommendations();
}

// -----------------------------------------------------------------------------
// 4D. PHASE 6.3 — SAVED ADDRESS BOOK & CHECKOUT AUTO-FILL SYSTEM
// -----------------------------------------------------------------------------
const DEFAULT_INITIAL_ADDRESSES = [
  {
    id: "ADDR-101",
    label: "Home",
    fullName: "Aarav Sharma",
    phone: "9876543210",
    addressLine: "Flat 402, Green Glen Residency, Outer Ring Road, Bellandur",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560103",
    country: "India",
    isDefault: true
  },
  {
    id: "ADDR-102",
    label: "Office",
    fullName: "Aarav Sharma",
    phone: "9876543211",
    addressLine: "Floor 5, Global Tech Park, Whitefield Main Road",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560066",
    country: "India",
    isDefault: false
  }
];

let selectedCheckoutAddressId = null;

function getAddresses() {
  try {
    const raw = localStorage.getItem('shopsphere_addresses');
    if (!raw) {
      saveAddresses(DEFAULT_INITIAL_ADDRESSES);
      return [...DEFAULT_INITIAL_ADDRESSES];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      saveAddresses(DEFAULT_INITIAL_ADDRESSES);
      return [...DEFAULT_INITIAL_ADDRESSES];
    }
    const valid = parsed.filter(a => a && typeof a === 'object' && a.id && a.fullName && a.addressLine && a.city);
    if (valid.length === 0) {
      saveAddresses(DEFAULT_INITIAL_ADDRESSES);
      return [...DEFAULT_INITIAL_ADDRESSES];
    }
    return valid;
  } catch (e) {
    return [...DEFAULT_INITIAL_ADDRESSES];
  }
}

function saveAddresses(addresses) {
  try {
    localStorage.setItem('shopsphere_addresses', JSON.stringify(addresses));
  } catch (e) {
    console.error('Failed to save addresses to localStorage:', e);
  }
}

function getDefaultAddress() {
  const addresses = getAddresses();
  const def = addresses.find(a => a.isDefault);
  return def || (addresses.length > 0 ? addresses[0] : null);
}

function addAddress(addressData) {
  const addresses = getAddresses();
  const id = `ADDR-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const isDefault = Boolean(addressData.isDefault) || addresses.length === 0;

  if (isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }

  const newAddress = {
    id,
    label: String(addressData.label || 'Home').trim(),
    fullName: String(addressData.fullName || '').trim(),
    phone: String(addressData.phone || '').trim(),
    addressLine: String(addressData.addressLine || '').trim(),
    city: String(addressData.city || '').trim(),
    state: String(addressData.state || '').trim(),
    postalCode: String(addressData.postalCode || '').trim(),
    country: String(addressData.country || 'India').trim(),
    isDefault
  };

  addresses.push(newAddress);
  saveAddresses(addresses);
  renderAddressBook();
  renderCheckoutAddressChips();
  return newAddress;
}

function updateAddress(id, addressData) {
  const addresses = getAddresses();
  const index = addresses.findIndex(a => a.id === id);
  if (index === -1) return null;

  const isDefault = Boolean(addressData.isDefault);
  if (isDefault) {
    addresses.forEach(a => a.isDefault = false);
  }

  addresses[index] = {
    ...addresses[index],
    label: String(addressData.label || addresses[index].label).trim(),
    fullName: String(addressData.fullName || addresses[index].fullName).trim(),
    phone: String(addressData.phone || addresses[index].phone).trim(),
    addressLine: String(addressData.addressLine || addresses[index].addressLine).trim(),
    city: String(addressData.city || addresses[index].city).trim(),
    state: String(addressData.state || addresses[index].state).trim(),
    postalCode: String(addressData.postalCode || addresses[index].postalCode).trim(),
    country: String(addressData.country || addresses[index].country).trim(),
    isDefault: isDefault || addresses[index].isDefault
  };

  saveAddresses(addresses);
  renderAddressBook();
  renderCheckoutAddressChips();
  return addresses[index];
}

function deleteAddress(id) {
  let addresses = getAddresses();
  const toDelete = addresses.find(a => a.id === id);
  addresses = addresses.filter(a => a.id !== id);

  if (toDelete && toDelete.isDefault && addresses.length > 0) {
    addresses[0].isDefault = true;
  }

  if (selectedCheckoutAddressId === id) {
    selectedCheckoutAddressId = null;
  }

  saveAddresses(addresses);
  renderAddressBook();
  renderCheckoutAddressChips();
  showToast('Address removed from address book.', '🗑️');
}

function setDefaultAddress(id) {
  const addresses = getAddresses();
  addresses.forEach(a => {
    a.isDefault = (a.id === id);
  });
  saveAddresses(addresses);
  renderAddressBook();
  renderCheckoutAddressChips();
  showToast('Default delivery address updated! ⭐', '📍');
}

function selectCheckoutAddress(addressId) {
  const addresses = getAddresses();
  const addr = addresses.find(a => a.id === addressId);
  if (!addr) return;

  selectedCheckoutAddressId = addressId;

  const nameInput = document.getElementById('checkoutName');
  const phoneInput = document.getElementById('checkoutPhone');
  const addressInput = document.getElementById('checkoutAddress');
  const cityInput = document.getElementById('checkoutCity');
  const stateInput = document.getElementById('checkoutState');
  const zipInput = document.getElementById('checkoutZip');

  if (nameInput) nameInput.value = addr.fullName || '';
  if (phoneInput) phoneInput.value = addr.phone || '';
  if (addressInput) addressInput.value = addr.addressLine || '';
  if (cityInput) cityInput.value = addr.city || '';
  if (stateInput) stateInput.value = addr.state || '';
  if (zipInput) zipInput.value = addr.postalCode || '';

  renderCheckoutAddressChips();
  showToast(`Auto-filled address: ${addr.label} (${addr.city})`, '📍');
}

function renderCheckoutAddressChips() {
  const container = document.getElementById('checkoutAddressChips');
  if (!container) return;

  const addresses = getAddresses();
  if (addresses.length === 0) {
    container.innerHTML = `<span style="font-size:0.8rem;color:var(--text-muted);">No saved addresses yet. Enter your address below.</span>`;
    return;
  }

  if (!selectedCheckoutAddressId) {
    const def = getDefaultAddress();
    if (def) selectedCheckoutAddressId = def.id;
  }

  container.innerHTML = addresses.map(addr => {
    const isSelected = selectedCheckoutAddressId === addr.id;
    return `
      <button 
        type="button" 
        class="address-chip ${isSelected ? 'active' : ''}" 
        onclick="window.selectCheckoutAddress('${addr.id}')"
        title="${escapeHtml(addr.fullName)} • ${escapeHtml(addr.addressLine)}, ${escapeHtml(addr.city)}"
      >
        <span class="chip-label">${escapeHtml(addr.label)}</span>
        ${addr.isDefault ? `<span class="chip-badge-default">Default</span>` : ''}
      </button>
    `;
  }).join('');
}

function openAddressBookModal() {
  renderAddressBook();
  toggleAddressForm(false);
  const modal = document.getElementById('addressBookModal');
  const overlay = document.getElementById('addressBookOverlay');
  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAddressBookModal() {
  const modal = document.getElementById('addressBookModal');
  const overlay = document.getElementById('addressBookOverlay');
  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderAddressBook() {
  const container = document.getElementById('savedAddressesGrid');
  const countEl = document.getElementById('addressBookCountInfo');
  if (!container) return;

  const addresses = getAddresses();
  if (countEl) {
    countEl.textContent = `${addresses.length} Saved Address${addresses.length === 1 ? '' : 'es'}`;
  }

  if (addresses.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <p>Your address book is empty. Click <strong>+ Add New Address</strong> to get started.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = addresses.map(addr => {
    return `
      <article class="address-card ${addr.isDefault ? 'is-default' : ''}" data-id="${addr.id}">
        <div class="address-card-header">
          <div class="address-card-title-wrap">
            <span class="address-card-label">📍 ${escapeHtml(addr.label)}</span>
            ${addr.isDefault ? `<span class="address-card-default-badge">● Default</span>` : ''}
          </div>
        </div>
        <div class="address-card-name">${escapeHtml(addr.fullName)}</div>
        <p class="address-card-text">${escapeHtml(addr.addressLine)}, ${escapeHtml(addr.city)}, ${escapeHtml(addr.state)} — ${escapeHtml(addr.postalCode)}</p>
        <div class="address-card-phone">📞 ${escapeHtml(addr.phone)}</div>
        <div class="address-card-actions">
          ${!addr.isDefault ? `<button type="button" class="btn-xs" onclick="window.setDefaultAddress('${addr.id}')">Set Default</button>` : ''}
          <button type="button" class="btn-xs" onclick="window.editAddress('${addr.id}')">Edit</button>
          <button type="button" class="btn-xs btn-danger" onclick="window.deleteAddress('${addr.id}')">Delete</button>
          <button type="button" class="btn-xs btn-primary" onclick="window.useAddressForCheckout('${addr.id}')">Deliver Here</button>
        </div>
      </article>
    `;
  }).join('');
}

function useAddressForCheckout(id) {
  selectCheckoutAddress(id);
  closeAddressBookModal();
  openCheckout();
}

function toggleAddressForm(forceState, editId = null) {
  const formBox = document.getElementById('addressFormBox');
  const btn = document.getElementById('toggleAddAddressBtn');
  const titleEl = document.getElementById('addressFormTitle');
  const editIdInput = document.getElementById('addressEditId');
  if (!formBox) return;

  const isCurrentlyOpen = formBox.style.display !== 'none';
  const nextState = (typeof forceState === 'boolean') ? forceState : !isCurrentlyOpen;

  if (nextState) {
    formBox.style.display = 'block';
    if (btn) btn.innerHTML = `<span>✕ Close Form</span>`;

    if (editId) {
      const addresses = getAddresses();
      const addr = addresses.find(a => a.id === editId);
      if (addr) {
        if (titleEl) titleEl.textContent = `Edit Address (${addr.label})`;
        if (editIdInput) editIdInput.value = addr.id;
        document.getElementById('addressLabelInput').value = addr.label || '';
        document.getElementById('addressFullNameInput').value = addr.fullName || '';
        document.getElementById('addressPhoneInput').value = addr.phone || '';
        document.getElementById('addressLineInput').value = addr.addressLine || '';
        document.getElementById('addressCityInput').value = addr.city || '';
        document.getElementById('addressStateInput').value = addr.state || '';
        document.getElementById('addressZipInput').value = addr.postalCode || '';
        document.getElementById('addressIsDefaultInput').checked = Boolean(addr.isDefault);
      }
    } else {
      if (titleEl) titleEl.textContent = 'Add New Address';
      if (editIdInput) editIdInput.value = '';
      document.getElementById('addressLabelInput').value = '';
      document.getElementById('addressFullNameInput').value = '';
      document.getElementById('addressPhoneInput').value = '';
      document.getElementById('addressLineInput').value = '';
      document.getElementById('addressCityInput').value = '';
      document.getElementById('addressStateInput').value = '';
      document.getElementById('addressZipInput').value = '';
      document.getElementById('addressIsDefaultInput').checked = false;
    }
  } else {
    formBox.style.display = 'none';
    if (btn) btn.innerHTML = `<span>+ Add New Address</span>`;
  }
}

function editAddress(id) {
  toggleAddressForm(true, id);
}

function handleAddressFormSubmit(event) {
  if (event) event.preventDefault();

  const editId = document.getElementById('addressEditId')?.value;
  const label = document.getElementById('addressLabelInput')?.value.trim();
  const fullName = document.getElementById('addressFullNameInput')?.value.trim();
  const phone = document.getElementById('addressPhoneInput')?.value.trim();
  const addressLine = document.getElementById('addressLineInput')?.value.trim();
  const city = document.getElementById('addressCityInput')?.value.trim();
  const state = document.getElementById('addressStateInput')?.value.trim();
  const postalCode = document.getElementById('addressZipInput')?.value.trim();
  const isDefault = document.getElementById('addressIsDefaultInput')?.checked || false;

  let isValid = true;
  if (!label || label.length < 2) {
    showToast('Please provide an address label (e.g. Home, Work).', '⚠️');
    isValid = false;
  }
  if (!fullName || fullName.length < 2) {
    showToast('Please provide the recipient\'s full name.', '⚠️');
    isValid = false;
  }
  if (!phone || phone.replace(/\D/g, '').length < 10) {
    showToast('Please provide a valid 10-digit phone number.', '⚠️');
    isValid = false;
  }
  if (!addressLine || addressLine.length < 5) {
    showToast('Please enter a complete street address.', '⚠️');
    isValid = false;
  }
  if (!city || city.length < 2) {
    showToast('Please enter a city name.', '⚠️');
    isValid = false;
  }
  if (!state || state.length < 2) {
    showToast('Please enter a state name.', '⚠️');
    isValid = false;
  }
  if (!postalCode || postalCode.length < 3) {
    showToast('Please enter a valid PIN code.', '⚠️');
    isValid = false;
  }

  if (!isValid) return;

  const payload = {
    label,
    fullName,
    phone,
    addressLine,
    city,
    state,
    postalCode,
    country: 'India',
    isDefault
  };

  if (editId) {
    updateAddress(editId, payload);
    showToast(`Address "${label}" updated! ✅`, '🎉');
  } else {
    addAddress(payload);
    showToast(`New address "${label}" saved to Address Book! 📍`, '🎉');
  }

  toggleAddressForm(false);
}

function toggleCheckoutAddressLabel(checked) {
  const wrap = document.getElementById('addressLabelInputWrap');
  if (wrap) {
    wrap.style.display = checked ? 'block' : 'none';
    if (checked) {
      const input = document.getElementById('checkoutNewAddressLabel');
      if (input) input.focus();
    }
  }
}

// -----------------------------------------------------------------------------
// 4E. PHASE 6.4 — SPHERE REWARDS LOYALTY & POINTS SYSTEM
// -----------------------------------------------------------------------------
const DEFAULT_INITIAL_REWARDS = {
  balance: 250,
  lifetimePoints: 450,
  tier: "Silver",
  history: [
    {
      id: "RWD-TXN-101",
      type: "EARNED",
      points: 250,
      description: "Welcome bonus & starter rewards",
      orderId: null,
      date: "March 1, 2026",
      timestamp: 1772323200000
    }
  ]
};

let checkoutRedeemedPoints = 0;

function getRewards() {
  try {
    const raw = localStorage.getItem('shopsphere_rewards');
    if (!raw) {
      saveRewards(DEFAULT_INITIAL_REWARDS);
      return JSON.parse(JSON.stringify(DEFAULT_INITIAL_REWARDS));
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || typeof parsed.balance !== 'number' || typeof parsed.lifetimePoints !== 'number' || isNaN(parsed.balance) || isNaN(parsed.lifetimePoints)) {
      saveRewards(DEFAULT_INITIAL_REWARDS);
      return JSON.parse(JSON.stringify(DEFAULT_INITIAL_REWARDS));
    }
    if (!Array.isArray(parsed.history)) {
      parsed.history = [...DEFAULT_INITIAL_REWARDS.history];
    }
    parsed.tier = calculateTier(parsed.lifetimePoints);
    return parsed;
  } catch (e) {
    saveRewards(DEFAULT_INITIAL_REWARDS);
    return JSON.parse(JSON.stringify(DEFAULT_INITIAL_REWARDS));
  }
}

function saveRewards(rewards) {
  try {
    localStorage.setItem('shopsphere_rewards', JSON.stringify(rewards));
  } catch (e) {
    console.error('Failed to save rewards to localStorage:', e);
  }
}

function calculateTier(lifetimePoints) {
  if (lifetimePoints >= 1500) return 'Platinum';
  if (lifetimePoints >= 500) return 'Gold';
  return 'Silver';
}

function getTierProgress(lifetimePoints) {
  if (lifetimePoints >= 1500) {
    return {
      tier: 'Platinum',
      nextTier: null,
      progress: 100,
      pointsNeeded: 0,
      min: 1500,
      next: 1500
    };
  }
  if (lifetimePoints >= 500) {
    const currentInTier = lifetimePoints - 500;
    const progress = Math.min(100, Math.round((currentInTier / 1000) * 100));
    return {
      tier: 'Gold',
      nextTier: 'Platinum',
      progress,
      pointsNeeded: 1500 - lifetimePoints,
      min: 500,
      next: 1500
    };
  }
  const progress = Math.min(100, Math.round((lifetimePoints / 500) * 100));
  return {
    tier: 'Silver',
    nextTier: 'Gold',
    progress,
    pointsNeeded: 500 - lifetimePoints,
    min: 0,
    next: 500
  };
}

function calculateEarnedPoints(finalPayableTotal, tier) {
  let multiplier = 1.0;
  if (tier === 'Gold') multiplier = 1.25;
  if (tier === 'Platinum') multiplier = 1.5;
  const numTotal = Number(finalPayableTotal);
  const safeTotal = (!isNaN(numTotal) && isFinite(numTotal)) ? Math.max(0, numTotal) : 0;
  return Math.floor((safeTotal / 10) * multiplier);
}

function awardOrderPoints(orderIdOrObj, finalTotal) {
  let orderId = orderIdOrObj;
  let total = finalTotal;

  // Support both awardOrderPoints(orderId, finalTotal) and awardOrderPoints(orderObject)
  if (orderIdOrObj && typeof orderIdOrObj === 'object') {
    orderId = orderIdOrObj.orderId || orderIdOrObj.id;
    total = orderIdOrObj.total !== undefined
      ? orderIdOrObj.total
      : (orderIdOrObj.finalTotal !== undefined
          ? orderIdOrObj.finalTotal
          : (orderIdOrObj.pointsEarned ? orderIdOrObj.pointsEarned * 10 : 0));
  }

  if (orderId === undefined || orderId === null) return 0;
  orderId = String(orderId).trim();
  if (!orderId) return 0;

  total = Number(total);
  if (isNaN(total) || !isFinite(total) || total < 0) {
    total = 0;
  }

  const rewards = getRewards();

  // Prevent double awarding for the same orderId
  const alreadyAwarded = rewards.history.some(tx => String(tx.orderId) === orderId && tx.type === 'EARNED');
  if (alreadyAwarded) return 0;

  const tier = calculateTier(rewards.lifetimePoints);
  let earned = calculateEarnedPoints(total, tier);
  earned = Number(earned);
  if (isNaN(earned) || !isFinite(earned) || earned < 0) {
    earned = 0;
  }

  rewards.balance += earned;
  rewards.lifetimePoints += earned;
  rewards.tier = calculateTier(rewards.lifetimePoints);

  const now = new Date();
  rewards.history.unshift({
    id: `RWD-TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'EARNED',
    points: earned,
    description: `Earned from Order ${orderId} (${tier} tier bonus applied)`,
    orderId,
    date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    timestamp: now.getTime()
  });

  saveRewards(rewards);
  renderRewardsNavBadge();
  renderRewardsDashboard();
  return earned;
}

function applyRewardsRedemption(requestedPoints) {
  const rewards = getRewards();
  let pointsToRedeem = parseInt(requestedPoints, 10);
  if (isNaN(pointsToRedeem)) {
    const input = document.getElementById('checkoutRewardsPointsInput');
    pointsToRedeem = input ? parseInt(input.value, 10) : 0;
  }

  if (isNaN(pointsToRedeem) || pointsToRedeem <= 0) {
    showToast('Please enter a valid positive number of points.', '⚠️');
    return false;
  }

  if (pointsToRedeem > rewards.balance) {
    showToast(`Cannot redeem ${pointsToRedeem} points. You only have ${rewards.balance} available!`, '⚠️');
    return false;
  }

  const totals = calculateCartTotals();
  const payableBeforeRewards = Math.max(0, totals.subtotal - totals.discount);
  const maxRedeemablePoints = Math.floor(payableBeforeRewards * 10);

  if (maxRedeemablePoints <= 0) {
    showToast('Your order is already fully discounted!', 'ℹ️');
    return false;
  }

  if (pointsToRedeem > maxRedeemablePoints) {
    pointsToRedeem = maxRedeemablePoints;
    showToast(`Redemption adjusted to ${pointsToRedeem} points to cover your order subtotal.`, 'ℹ️');
  }

  checkoutRedeemedPoints = pointsToRedeem;
  renderCheckoutPreview();
  showToast(`Applied ${pointsToRedeem} SphereRewards points (−${formatCurrency(pointsToRedeem / 10)})! ✨`, '🎉');
  return true;
}

function removeRewardsRedemption() {
  checkoutRedeemedPoints = 0;
  const input = document.getElementById('checkoutRewardsPointsInput');
  if (input) input.value = '';
  renderCheckoutPreview();
  showToast('Rewards redemption removed.', 'ℹ️');
}

function quickSetRewardsPoints(amountOrMax) {
  const rewards = getRewards();
  const totals = calculateCartTotals();
  const payableBeforeRewards = Math.max(0, totals.subtotal - totals.discount);
  const maxRedeemablePoints = Math.min(rewards.balance, Math.floor(payableBeforeRewards * 10));

  let pts = 0;
  if (amountOrMax === 'max') {
    pts = maxRedeemablePoints;
  } else {
    pts = Math.min(parseInt(amountOrMax, 10), maxRedeemablePoints);
  }

  const input = document.getElementById('checkoutRewardsPointsInput');
  if (input) input.value = pts;
  applyRewardsRedemption(pts);
}

function renderRewardsNavBadge() {
  const badge = document.getElementById('rewardsNavBtn');
  const tierEl = document.getElementById('navRewardsTier');
  const ptsEl = document.getElementById('navRewardsPts');
  if (!badge || !tierEl || !ptsEl) return;

  const rewards = getRewards();
  tierEl.textContent = rewards.tier;
  ptsEl.textContent = `${rewards.balance} pts`;

  badge.classList.remove('tier-silver', 'tier-gold', 'tier-platinum');
  badge.classList.add(`tier-${rewards.tier.toLowerCase()}`);
}

function renderRewardsDashboard() {
  const rewards = getRewards();
  const balanceEl = document.getElementById('rewardsBalance');
  const cashValEl = document.getElementById('rewardsCashValue');
  const lifetimeEl = document.getElementById('rewardsLifetime');
  const nextMilestoneEl = document.getElementById('rewardsNextTierMilestone');
  const pointsNeededEl = document.getElementById('rewardsPointsNeeded');
  const tierBadgeEl = document.getElementById('rewardsDashboardTierBadge');
  const currentTierNameEl = document.getElementById('rewardsCurrentTierName');

  const progressFromEl = document.getElementById('tierProgressFrom');
  const progressPercentEl = document.getElementById('tierProgressPercent');
  const progressToEl = document.getElementById('tierProgressTo');
  const progressBarFill = document.getElementById('tierProgressBarFill');
  const historyListEl = document.getElementById('rewardsHistoryList');
  const historyCountEl = document.getElementById('rewardsHistoryCount');

  if (balanceEl) balanceEl.textContent = rewards.balance;
  if (cashValEl) cashValEl.textContent = `≈ ${formatCurrency(rewards.balance / 10)}`;
  if (lifetimeEl) lifetimeEl.textContent = rewards.lifetimePoints;

  const info = getTierProgress(rewards.lifetimePoints);
  if (currentTierNameEl) currentTierNameEl.textContent = `${rewards.tier} Member`;
  if (tierBadgeEl) {
    tierBadgeEl.className = `rewards-tier-badge tier-${rewards.tier.toLowerCase()}`;
  }

  if (info.nextTier) {
    if (nextMilestoneEl) nextMilestoneEl.textContent = `${info.next} pts`;
    if (pointsNeededEl) pointsNeededEl.textContent = `${info.pointsNeeded} pts to ${info.nextTier}`;
    if (progressFromEl) progressFromEl.textContent = `${rewards.tier} (${info.min} pts)`;
    if (progressToEl) progressToEl.textContent = `${info.nextTier} (${info.next} pts)`;
  } else {
    if (nextMilestoneEl) nextMilestoneEl.textContent = 'Top Tier';
    if (pointsNeededEl) pointsNeededEl.textContent = 'Maximum tier unlocked!';
    if (progressFromEl) progressFromEl.textContent = 'Platinum (1500 pts)';
    if (progressToEl) progressToEl.textContent = 'VIP Elite';
  }

  if (progressPercentEl) progressPercentEl.textContent = `${info.progress}%`;
  if (progressBarFill) progressBarFill.style.width = `${info.progress}%`;

  ['Silver', 'Gold', 'Platinum'].forEach(t => {
    const perkEl = document.getElementById(`perk${t}`);
    if (perkEl) {
      perkEl.classList.toggle('active-tier', rewards.tier === t);
    }
  });

  if (historyCountEl) {
    historyCountEl.textContent = `${rewards.history.length} transaction${rewards.history.length === 1 ? '' : 's'}`;
  }
  if (historyListEl) {
    if (rewards.history.length === 0) {
      historyListEl.innerHTML = `<div style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.8rem;">No points transactions yet.</div>`;
    } else {
      historyListEl.innerHTML = rewards.history.map(tx => `
        <div class="history-item-row">
          <div class="history-item-left">
            <span class="history-type-tag ${tx.type === 'EARNED' ? 'earned' : 'redeemed'}">${tx.type}</span>
            <div>
              <div class="history-desc">${escapeHtml(tx.description)}</div>
              <div class="history-date">${escapeHtml(tx.date || 'Recent')}</div>
            </div>
          </div>
          <div class="history-points ${tx.type === 'EARNED' ? 'earned' : 'redeemed'}">
            ${tx.type === 'EARNED' ? `+${tx.points}` : `−${tx.points}`} pts
          </div>
        </div>
      `).join('');
    }
  }
}

function scrollToRewardsOrOpenModal() {
  const el = document.getElementById('sphereRewardsDashboard');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('highlight-pulse');
    setTimeout(() => el.classList.remove('highlight-pulse'), 1500);
  }
}

// -----------------------------------------------------------------------------
// 4F. PHASE 6.5 — LIVE ORDER TRACKING STEPPER & SIMULATOR
// -----------------------------------------------------------------------------
const TRACKING_STAGES = [
  {
    stage: 0,
    name: 'Order Placed',
    icon: '📝',
    heading: 'Order Placed & Received',
    description: 'Your order has been recorded in the ShopSphere fulfillment queue.',
    location: 'ShopSphere Digital HQ'
  },
  {
    stage: 1,
    name: 'Order Confirmed',
    icon: '✅',
    heading: 'Order Confirmed & Verified',
    description: 'Payment authorization and stock allocation completed.',
    location: 'Fulfillment Center, Bengaluru'
  },
  {
    stage: 2,
    name: 'Packed',
    icon: '📦',
    heading: 'Quality Inspected & Packed',
    description: 'Items securely sealed in eco-friendly packaging and barcoded.',
    location: 'Warehouse Hub Dock 4'
  },
  {
    stage: 3,
    name: 'Shipped',
    icon: '🚚',
    heading: 'Shipped & In Transit',
    description: 'Handed over to carrier partner. Package is moving toward destination address.',
    location: 'Express Logistics Transit Facility'
  },
  {
    stage: 4,
    name: 'Delivered',
    icon: '🎉',
    heading: 'Delivered Successfully',
    description: 'Package received and signed for at customer doorstep.',
    location: 'Customer Delivery Address'
  }
];

let currentTrackingOrderId = null;

function generateTrackingNumber(orderId) {
  const cleanId = (orderId || '').replace(/[^0-9]/g, '') || String(Math.floor(10000 + Math.random() * 90000));
  return `TRK-SPHERE-${cleanId}-${Math.floor(100 + Math.random() * 900)}`;
}

function ensureOrderTracking(order) {
  if (!order || typeof order !== 'object') return order;
  if (!order.trackingNumber) {
    order.trackingNumber = generateTrackingNumber(order.orderId);
  }
  if (!order.carrier) {
    order.carrier = 'BlueDart Express';
  }
  if (typeof order.trackingStage !== 'number') {
    order.trackingStage = order.status === 'Delivered' ? 4 : 1;
  }
  if (!order.trackingStatus) {
    order.trackingStatus = TRACKING_STAGES[order.trackingStage]?.name || 'Order Confirmed';
  }
  if (!Array.isArray(order.trackingHistory) || order.trackingHistory.length < 5) {
    const orderDate = order.date || 'March 3, 2026';
    order.trackingHistory = TRACKING_STAGES.map((st, idx) => ({
      stage: st.stage,
      title: st.name,
      description: st.description,
      location: st.location,
      completed: idx <= order.trackingStage,
      date: idx <= order.trackingStage ? `${orderDate}` : null
    }));
  }
  return order;
}

function openOrderTracking(orderId) {
  const orders = getOrders();
  if (orders.length === 0) {
    showToast('No orders found to track.', 'ℹ️');
    return;
  }

  let order = orders.find(o => o.orderId === orderId);
  if (!order) {
    order = orders[0];
  }

  ensureOrderTracking(order);
  currentTrackingOrderId = order.orderId;
  renderTrackingModal(order);

  const modal = document.getElementById('orderTrackingModal');
  const overlay = document.getElementById('orderTrackingOverlay');
  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderTracking() {
  const modal = document.getElementById('orderTrackingModal');
  const overlay = document.getElementById('orderTrackingOverlay');
  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  currentTrackingOrderId = null;
}

function trackCurrentDetailOrder() {
  const detailIdEl = document.getElementById('detailOrderId');
  const orderId = detailIdEl ? detailIdEl.textContent.trim() : null;
  closeOrderDetails();
  if (orderId) {
    openOrderTracking(orderId);
  } else {
    openOrderTracking();
  }
}

function renderTrackingModal(order) {
  if (!order) return;
  ensureOrderTracking(order);

  const titleEl = document.getElementById('trackingModalTitle');
  const carrierEl = document.getElementById('trackingCarrierInfo');
  const heroIconEl = document.getElementById('trackingHeroIcon');
  const heroHeadingEl = document.getElementById('trackingCurrentStatus');
  const heroDescEl = document.getElementById('trackingCurrentDesc');
  const stepperEl = document.getElementById('trackingStepper');

  const orderIdEl = document.getElementById('trackingOrderId');
  const itemsCountEl = document.getElementById('trackingItemsCount');
  const destEl = document.getElementById('trackingDestination');
  const totalEl = document.getElementById('trackingPaidTotal');
  const advanceBtn = document.getElementById('advanceTrackingStageBtn');

  if (titleEl) titleEl.textContent = `Tracking Order ${order.orderId}`;
  if (carrierEl) carrierEl.textContent = `Carrier: ${order.carrier} • Tracking #: ${order.trackingNumber}`;

  const currentStageInfo = TRACKING_STAGES[order.trackingStage] || TRACKING_STAGES[1];
  if (heroIconEl) heroIconEl.textContent = currentStageInfo.icon;
  if (heroHeadingEl) heroHeadingEl.textContent = currentStageInfo.heading;
  if (heroDescEl) heroDescEl.textContent = `${currentStageInfo.description} (${currentStageInfo.location})`;

  if (orderIdEl) orderIdEl.textContent = order.orderId;
  if (itemsCountEl) {
    const count = (order.items || []).reduce((sum, i) => sum + (i.qty || 1), 0);
    itemsCountEl.textContent = `${count} item${count !== 1 ? 's' : ''}`;
  }
  if (destEl) destEl.textContent = order.address || 'Bengaluru, India';
  if (totalEl) totalEl.textContent = formatCurrency(order.total);

  // Render 5-Stage Stepper
  if (stepperEl) {
    stepperEl.innerHTML = TRACKING_STAGES.map((stage, idx) => {
      let stateClass = 'upcoming';
      let iconContent = `${idx + 1}`;
      if (idx < order.trackingStage) {
        stateClass = 'completed';
        iconContent = '✓';
      } else if (idx === order.trackingStage) {
        stateClass = 'current';
        iconContent = stage.icon;
      }

      const historyItem = (order.trackingHistory || [])[idx];
      const timeStr = historyItem && historyItem.date ? historyItem.date : (idx <= order.trackingStage ? order.date : 'Upcoming');

      return `
        <div class="step-node ${stateClass}">
          <div class="step-circle" title="${escapeHtml(stage.name)}">${iconContent}</div>
          <span class="step-title">${escapeHtml(stage.name)}</span>
          <span class="step-time">${escapeHtml(timeStr)}</span>
        </div>
      `;
    }).join('');
  }

  // Configure advance stage button
  if (advanceBtn) {
    if (order.trackingStage >= 4) {
      advanceBtn.disabled = true;
      advanceBtn.classList.add('disabled');
      advanceBtn.innerHTML = `<span>Order Delivered ✅</span>`;
    } else {
      advanceBtn.disabled = false;
      advanceBtn.classList.remove('disabled');
      const nextStage = TRACKING_STAGES[order.trackingStage + 1]?.name || 'Next Stage';
      advanceBtn.innerHTML = `<span>Advance to "${nextStage}" 🚀</span>`;
    }
  }
}

function advanceOrderTrackingStage(targetOrderId = null) {
  const orderId = targetOrderId || currentTrackingOrderId;
  if (!orderId) return;

  const orders = getOrders();
  const orderIndex = orders.findIndex(o => o.orderId === orderId);
  if (orderIndex === -1) return;

  const order = orders[orderIndex];
  ensureOrderTracking(order);

  if (order.trackingStage >= 4) {
    showToast('Package has already been delivered! ✅', '📦');
    return;
  }

  order.trackingStage++;
  const stageInfo = TRACKING_STAGES[order.trackingStage];
  order.trackingStatus = stageInfo.name;
  order.status = (order.trackingStage === 4) ? 'Delivered' : stageInfo.name;

  const now = new Date();
  const timeStr = `${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  if (!Array.isArray(order.trackingHistory)) {
    order.trackingHistory = [];
  }
  if (order.trackingHistory[order.trackingStage]) {
    order.trackingHistory[order.trackingStage].completed = true;
    order.trackingHistory[order.trackingStage].date = timeStr;
  }

  orders[orderIndex] = order;
  localStorage.setItem('shopsphere_orders', JSON.stringify(orders));

  renderTrackingModal(order);
  renderOrderHistory();

  if (order.trackingStage === 4) {
    showToast(`Order ${order.orderId} delivered! 📦🎉`, '🎉');
  } else {
    showToast(`Shipment updated to "${stageInfo.name}" 🚚`, '📦');
  }
}

// -----------------------------------------------------------------------------
// 4G. PHASE 6.6 — PRINTABLE & DOWNLOADABLE INVOICE GENERATOR
// -----------------------------------------------------------------------------
let currentInvoiceOrderId = null;

function openInvoiceModal(orderId) {
  const orders = getOrders();
  if (orders.length === 0) {
    showToast('No orders found to generate invoice.', 'ℹ️');
    return;
  }

  let order = orders.find(o => o.orderId === orderId);
  if (!order) {
    order = orders[0];
  }

  ensureOrderTracking(order);
  currentInvoiceOrderId = order.orderId;

  // Fill Header & Screen Action Bar
  const screenPill = document.getElementById('invoiceScreenOrderId');
  const invNumberEl = document.getElementById('invoiceNumber');
  const orderIdEl = document.getElementById('invOrderId');
  const dateEl = document.getElementById('invDate');
  const payEl = document.getElementById('invPaymentMethod');
  const trackingRow = document.getElementById('invTrackingRow');
  const trackingNumEl = document.getElementById('invTrackingNumber');

  if (screenPill) screenPill.textContent = order.orderId;
  if (invNumberEl) invNumberEl.textContent = `INV-${order.orderId.replace(/[^a-zA-Z0-9]/g, '')}`;
  if (orderIdEl) orderIdEl.textContent = order.orderId;
  if (dateEl) dateEl.textContent = order.date || 'March 3, 2026';
  if (payEl) payEl.textContent = order.paymentMethod || 'Credit / Debit Card';

  if (trackingRow && trackingNumEl) {
    if (order.trackingNumber) {
      trackingRow.style.display = '';
      trackingNumEl.textContent = order.trackingNumber;
    } else {
      trackingRow.style.display = 'none';
    }
  }

  // Fill Recipient & Fulfillment Details
  const customerNameEl = document.getElementById('invCustomerName');
  const addressTextEl = document.getElementById('invAddressText');
  const statusPill = document.getElementById('invFulfillmentStatus');
  const carrierLine = document.getElementById('invCarrierLine');
  const carrierNameEl = document.getElementById('invCarrierName');

  if (customerNameEl) customerNameEl.textContent = order.customerName || 'Valued Customer';
  if (addressTextEl) addressTextEl.textContent = order.address || 'Bengaluru, Karnataka 560038, India';
  if (statusPill) statusPill.textContent = order.status || 'Confirmed';

  if (carrierLine && carrierNameEl) {
    if (order.carrier) {
      carrierLine.style.display = '';
      carrierNameEl.textContent = order.carrier;
    } else {
      carrierLine.style.display = 'none';
    }
  }

  // Populate Items Table
  const tbody = document.getElementById('invItemsTableBody');
  if (tbody) {
    const items = Array.isArray(order.items) && order.items.length > 0 ? order.items : [];
    tbody.innerHTML = items.map((item, idx) => {
      const qty = item.qty || 1;
      const price = item.price || 0;
      const lineTotal = price * qty;
      return `
        <tr>
          <td>${idx + 1}</td>
          <td>
            <strong>${escapeHtml(item.name || 'Product')}</strong>
            <span class="invoice-item-cat">${escapeHtml(item.category || 'General')}</span>
          </td>
          <td style="text-align: center;">${qty}</td>
          <td style="text-align: right;">${formatCurrency(price)}</td>
          <td style="text-align: right;">${formatCurrency(lineTotal)}</td>
        </tr>
      `;
    }).join('');
  }

  // Populate Totals
  const subtotalEl = document.getElementById('invSubtotal');
  const couponRow = document.getElementById('invCouponDiscountRow');
  const couponEl = document.getElementById('invCouponDiscount');
  const rewardsRow = document.getElementById('invRewardsDiscountRow');
  const rewardsEl = document.getElementById('invRewardsDiscount');
  const deliveryEl = document.getElementById('invDeliveryFee');
  const grandTotalEl = document.getElementById('invGrandTotal');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(order.subtotal || order.total || 0);

  if (couponRow && couponEl) {
    if (order.discount && order.discount > 0) {
      couponRow.style.display = '';
      couponEl.textContent = `−${formatCurrency(order.discount)}`;
    } else {
      couponRow.style.display = 'none';
    }
  }

  if (rewardsRow && rewardsEl) {
    if (order.rewardsDiscount && order.rewardsDiscount > 0) {
      rewardsRow.style.display = '';
      rewardsEl.textContent = `−${formatCurrency(order.rewardsDiscount)}`;
    } else {
      rewardsRow.style.display = 'none';
    }
  }

  if (deliveryEl) {
    deliveryEl.textContent = (order.delivery === 0 || !order.delivery) ? 'FREE' : formatCurrency(order.delivery);
  }

  if (grandTotalEl) grandTotalEl.textContent = formatCurrency(order.total || 0);

  // Points Note
  const pointsNote = document.getElementById('invPointsEarnedNote');
  const pointsVal = document.getElementById('invPointsEarnedVal');
  if (pointsNote && pointsVal) {
    if (order.pointsEarned && order.pointsEarned > 0) {
      pointsNote.style.display = 'block';
      pointsVal.textContent = order.pointsEarned;
    } else {
      pointsNote.style.display = 'none';
    }
  }

  // Open Modal
  const modal = document.getElementById('invoiceModal');
  const overlay = document.getElementById('invoiceOverlay');
  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeInvoiceModal() {
  const modal = document.getElementById('invoiceModal');
  const overlay = document.getElementById('invoiceOverlay');
  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  currentInvoiceOrderId = null;
}

function printInvoice() {
  window.print();
}

function printCurrentDetailOrderInvoice() {
  const detailIdEl = document.getElementById('detailOrderId');
  const orderId = detailIdEl ? detailIdEl.textContent.trim() : null;
  closeOrderDetails();
  if (orderId) {
    openInvoiceModal(orderId);
  } else {
    openInvoiceModal();
  }
}

// -----------------------------------------------------------------------------
// 5. ADVANCED PRODUCT CATALOG ENGINE (Search, Filter, Sort, Render)
// -----------------------------------------------------------------------------

/**
 * Filter products based on search, category, maxPrice, and minRating
 */
function filterProducts() {
  const query = catalogState.searchQuery.toLowerCase().trim();

  let filtered = PRODUCTS.filter(product => {
    // 1. Search filter
    if (query) {
      const matchName = product.name.toLowerCase().includes(query);
      const matchCat = product.category.toLowerCase().includes(query);
      const matchDesc = product.description.toLowerCase().includes(query);
      if (!matchName && !matchCat && !matchDesc) {
        return false;
      }
    }

    // 2. Category filter
    if (catalogState.category !== 'all') {
      if (product.category.toLowerCase() !== catalogState.category.toLowerCase()) {
        return false;
      }
    }

    // 3. Price filter
    if (product.price > catalogState.maxPrice) {
      return false;
    }

    // 4. Rating filter
    if (catalogState.minRating > 0 && product.rating < catalogState.minRating) {
      return false;
    }

    return true;
  });

  filtered = sortProducts(filtered);

  updateProductCount(filtered.length, PRODUCTS.length);
  renderActiveFilterChips();
  updateMobileBadge();
  renderProducts(filtered);

  return filtered;
}

/**
 * Instant Search Handler
 */
function searchProducts(query) {
  catalogState.searchQuery = query;

  const clearBtn = document.getElementById('searchClearBtn');
  if (clearBtn) {
    clearBtn.classList.toggle('visible', query.length > 0);
  }

  filterProducts();
}

/**
 * Sorting Engine
 */
function sortProducts(productsList) {
  const list = [...productsList];

  switch (catalogState.sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating-desc':
      return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'discount-desc':
      return list.sort((a, b) => {
        const discA = parseInt(a.discount, 10) || Math.round((1 - a.price / a.originalPrice) * 100);
        const discB = parseInt(b.discount, 10) || Math.round((1 - b.price / b.originalPrice) * 100);
        return discB - discA;
      });
    case 'featured':
    default:
      return list.sort((a, b) => a.id - b.id);
  }
}

/**
 * Update the Result Information
 */
function updateProductCount(showingCount, totalCount) {
  const counterEl = document.getElementById('resultsCounter');
  if (counterEl) {
    counterEl.textContent = `Showing ${showingCount} of ${totalCount} products`;
  }
}

/**
 * Render Active Filter Chips
 */
function renderActiveFilterChips() {
  const container = document.getElementById('activeFilterChips');
  if (!container) return;

  const chips = [];

  if (catalogState.searchQuery) {
    chips.push({
      label: `"${catalogState.searchQuery}"`,
      onRemove: () => {
        catalogState.searchQuery = '';
        const input = document.getElementById('searchInput');
        if (input) input.value = '';
        const clearBtn = document.getElementById('searchClearBtn');
        if (clearBtn) clearBtn.classList.remove('visible');
        filterProducts();
      }
    });
  }

  if (catalogState.category !== 'all') {
    chips.push({
      label: catalogState.category,
      onRemove: () => {
        window.filterProductsByCategory('all');
      }
    });
  }

  if (catalogState.maxPrice < 500) {
    chips.push({
      label: `≤ ${formatCurrency(catalogState.maxPrice)}`,
      onRemove: () => {
        catalogState.maxPrice = 500;
        syncPriceControls(500);
        filterProducts();
      }
    });
  }

  if (catalogState.minRating > 0) {
    chips.push({
      label: `★ ${catalogState.minRating}+`,
      onRemove: () => {
        catalogState.minRating = 0;
        syncRatingControls('all');
        filterProducts();
      }
    });
  }

  container.innerHTML = chips.map((chip, index) => `
    <span class="filter-chip">
      <span>${chip.label}</span>
      <span class="chip-remove-btn" onclick="window.removeActiveFilterChip(${index})">✕</span>
    </span>
  `).join('');

  window._activeChipRemovers = chips.map(c => c.onRemove);
}

window.removeActiveFilterChip = function(index) {
  if (window._activeChipRemovers && window._activeChipRemovers[index]) {
    window._activeChipRemovers[index]();
  }
};

/**
 * Render Dynamic Product Cards
 */
function renderProducts(productsToRender) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const wishlist = getWishlist();

  if (!productsToRender || productsToRender.length === 0) {
    grid.innerHTML = `
      <div class="catalog-empty-state">
        <span class="empty-state-icon">🔍</span>
        <h3 class="empty-state-title">No products found</h3>
        <p class="empty-state-desc">
          We couldn't find any items matching your current filters. Try changing keywords, extending price ranges, or clearing filters.
        </p>
        <button class="btn btn-primary" onclick="window.clearAllFilters()">
          <span>Clear Filters</span>
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = productsToRender.map(product => {
    const isWishlisted = wishlist.includes(product.id);
    const stock = getProductStock(product.id);
    const isOutOfStock = stock === 0;
    const isLowStock = stock > 0 && stock <= 5;
    const ratingData = calculateProductRating(product.id);

    let stockBadgeHtml = '';
    if (isOutOfStock) {
      stockBadgeHtml = `<span class="product-badge-stock out-of-stock">Out of Stock</span>`;
    } else if (isLowStock) {
      stockBadgeHtml = `<span class="product-badge-stock low-stock">🔥 Only ${stock} left!</span>`;
    }

    return `
      <article class="product-card ${isOutOfStock ? 'is-out-of-stock' : ''}" data-id="${product.id}" onclick="window.handleProductCardClick(event, ${product.id})" tabindex="0">
        <div class="product-media">
          <div class="product-badge-group">
            <span class="product-badge-discount">${product.discount}</span>
            ${product.badge ? `<span class="product-badge-tag">${product.badge}</span>` : ''}
            ${stockBadgeHtml}
          </div>
          <button 
            class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" 
            onclick="event.stopPropagation(); window.toggleWishlist(${product.id})" 
            aria-label="${isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}"
            title="${isWishlisted ? 'Wishlisted' : 'Save to Wishlist'}"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="product-img"
            loading="lazy"
            onerror="this.src='${product.fallbackImage}'"
          >
        </div>
        <div class="product-body">
          <span class="product-cat">${product.category}</span>
          <h3 class="product-name" title="${product.name}">${product.name}</h3>
          <p class="product-desc-text" title="${product.description}">${product.description}</p>
          <div class="product-rating">
            <span class="star">★</span>
            <span class="rating-score">${ratingData.rating.toFixed(1)}</span>
            <span class="rating-count">(${ratingData.reviewCount} reviews)</span>
          </div>
          <div class="product-bottom-row">
            <div class="product-price-box">
              <span class="product-current-price">${formatCurrency(product.price)}</span>
              <span class="product-old-price">${formatCurrency(product.originalPrice)}</span>
            </div>
            <button 
              class="add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}" 
              id="cartBtn-${product.id}"
              ${isOutOfStock ? 'disabled' : ''}
              onclick="event.stopPropagation(); window.addToCart(${product.id})"
              aria-label="${isOutOfStock ? 'Product out of stock' : 'Add ' + product.name + ' to cart'}"
            >
              ${isOutOfStock ? `
                <span>Sold Out</span>
              ` : `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>Add</span>
              `}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Handle Card Click to open Product Details (ignoring button clicks)
 */
window.handleProductCardClick = function(event, productId) {
  if (event.target.closest('.add-to-cart-btn') || event.target.closest('.product-wishlist-btn')) {
    return;
  }
  openProductDetails(productId);
};

// -----------------------------------------------------------------------------
// 6. PHASE 3 — PRODUCT DETAILS MODAL
// -----------------------------------------------------------------------------
function openProductDetails(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  trackRecentlyViewed(productId);

  currentDetailProductId = productId;
  renderProductDetails(product);

  const modal = document.getElementById('productDetailsModal');
  const overlay = document.getElementById('productDetailsOverlay');

  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeProductDetails() {
  const modal = document.getElementById('productDetailsModal');
  const overlay = document.getElementById('productDetailsOverlay');

  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderProductDetails(product) {
  const nameEl = document.getElementById('detailProductName');
  const catEl = document.getElementById('detailProductCategory');
  const imgEl = document.getElementById('detailProductImage');
  const ratingEl = document.getElementById('detailRatingScore');
  const reviewsEl = document.getElementById('detailReviewCount');
  const currPriceEl = document.getElementById('detailCurrentPrice');
  const origPriceEl = document.getElementById('detailOriginalPrice');
  const discBadgeEl = document.getElementById('detailDiscountBadge');
  const savingsEl = document.getElementById('detailSavingsBadge');
  const customBadgeEl = document.getElementById('detailCustomBadge');
  const descEl = document.getElementById('detailProductDescription');
  const qtyInput = document.getElementById('detailQtyInput');
  const wishlistBtn = document.getElementById('detailWishlistBtn');
  const wishlistText = document.getElementById('detailWishlistText');

  if (nameEl) nameEl.textContent = product.name;
  if (catEl) catEl.textContent = product.category;
  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
    imgEl.onerror = () => { imgEl.src = product.fallbackImage; };
  }
  const ratingData = calculateProductRating(product.id);
  if (ratingEl) ratingEl.textContent = ratingData.rating.toFixed(1);
  if (reviewsEl) reviewsEl.textContent = `(${ratingData.reviewCount} customer reviews)`;
  const starsEl = document.getElementById('detailProductStars');
  if (starsEl) starsEl.textContent = '★'.repeat(Math.round(ratingData.rating)) + '☆'.repeat(5 - Math.round(ratingData.rating));

  if (currPriceEl) currPriceEl.textContent = formatCurrency(product.price);
  if (origPriceEl) origPriceEl.textContent = formatCurrency(product.originalPrice);
  if (discBadgeEl) discBadgeEl.textContent = product.discount;
  if (savingsEl) {
    const savings = product.originalPrice - product.price;
    savingsEl.textContent = `Save ${formatCurrency(savings)}`;
  }
  if (customBadgeEl) {
    if (product.badge) {
      customBadgeEl.textContent = product.badge;
      customBadgeEl.style.display = 'inline-block';
    } else {
      customBadgeEl.style.display = 'none';
    }
  }
  if (descEl) descEl.textContent = product.description;

  // Phase 6.1: Stock Management in Product Details
  const stock = getProductStock(product.id);
  const stockStatusEl = document.getElementById('detailStockStatus');
  const addCartBtn = document.getElementById('detailAddToCartBtn');

  if (stockStatusEl) {
    if (stock === 0) {
      stockStatusEl.className = 'stock-status out-of-stock';
      stockStatusEl.textContent = '● Out of Stock';
    } else if (stock <= 5) {
      stockStatusEl.className = 'stock-status low-stock';
      stockStatusEl.textContent = `● Low Stock: Only ${stock} left!`;
    } else {
      stockStatusEl.className = 'stock-status in-stock';
      stockStatusEl.textContent = `● In Stock (${stock} available)`;
    }
  }

  if (addCartBtn) {
    if (stock === 0) {
      addCartBtn.disabled = true;
      addCartBtn.classList.add('disabled');
      addCartBtn.innerHTML = `<span>Out of Stock</span>`;
    } else {
      addCartBtn.disabled = false;
      addCartBtn.classList.remove('disabled');
      addCartBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
        <span>Add to Cart</span>
      `;
    }
  }

  // Reset Quantity to 1 (or 0 if out of stock)
  if (qtyInput) {
    qtyInput.value = stock > 0 ? 1 : 0;
    qtyInput.max = Math.max(1, stock);
  }

  // Update Wishlist button in details modal
  const isWishlisted = getWishlist().includes(product.id);
  if (wishlistBtn) {
    wishlistBtn.classList.toggle('active', isWishlisted);
    if (wishlistText) {
      wishlistText.textContent = isWishlisted ? 'Saved' : 'Wishlist';
    }
  }

  // Phase 6.2: Render reviews section and collapse form
  renderProductReviews(product.id, currentReviewFilter, currentReviewSort);
  toggleReviewForm(false);
}

// -----------------------------------------------------------------------------
// 7. PHASE 3 — CART SYSTEM & DRAWER
// -----------------------------------------------------------------------------
function openCart() {
  renderCart();
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/**
 * Add product with custom quantity (preserves single entry, increments qty)
 */
window.addToCart = function(productId, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const stock = getProductStock(productId);
  if (stock <= 0) {
    showToast(`Sorry, "${product.name}" is currently out of stock!`, '⚠️');
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  const currentInCart = existingItem ? (existingItem.qty || 1) : 0;
  const addQty = Math.max(1, parseInt(quantity, 10) || 1);

  if (currentInCart + addQty > stock) {
    const remainingCanAdd = stock - currentInCart;
    if (remainingCanAdd <= 0) {
      showToast(`You already have all ${stock} available units of "${product.name}" in your cart!`, '⚠️');
      return;
    } else {
      showToast(`Only ${stock} units available in stock. Added ${remainingCanAdd} to your cart.`, '⚠️');
      if (existingItem) {
        existingItem.qty = stock;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          qty: remainingCanAdd
        });
      }
    }
  } else {
    if (existingItem) {
      existingItem.qty = currentInCart + addQty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        category: product.category,
        qty: addQty
      });
    }
    showToast(`Added ${addQty > 1 ? addQty + '× ' : ''}"${product.name}" to cart! 🛍️`);
  }

  saveCart(cart);

  // Button click feedback on product card
  const btn = document.getElementById(`cartBtn-${productId}`);
  if (btn && !btn.disabled) {
    const originalHtml = btn.innerHTML;
    btn.classList.add('added');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>Added</span>
    `;
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = originalHtml;
    }, 1500);
  }

  // If details modal add button clicked
  const detailBtn = document.getElementById('detailAddToCartBtn');
  if (detailBtn && currentDetailProductId === productId && !detailBtn.disabled) {
    const origDetailHtml = detailBtn.innerHTML;
    detailBtn.innerHTML = `<span>✓ Added to Bag</span>`;
    setTimeout(() => {
      detailBtn.innerHTML = origDetailHtml;
    }, 1500);
  }

  renderCart();
};

/**
 * Update Cart Item Quantity (prevents <= 0 and respects stock)
 */
window.updateCartQuantity = function(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  const currentStock = getProductStock(productId);
  const newQty = (item.qty || 1) + delta;
  if (newQty < 1) {
    return; // minimum quantity is 1
  }

  if (delta > 0 && newQty > currentStock) {
    showToast(`Only ${currentStock} unit(s) available in stock for "${item.name}"`, '⚠️');
    return;
  }

  item.qty = newQty;
  saveCart(cart);
  renderCart();
};

/**
 * Remove Item from Cart
 */
window.removeFromCart = function(productId) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
  renderCart();
  showToast(`Removed "${item ? item.name : 'item'}" from cart.`, '🗑️');
};

/**
 * Calculate Cart Totals (subtotal, discount, delivery, total)
 */
function calculateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);

  let discount = 0;
  if (activeCoupon === 'SAVE10') {
    discount = Math.round(subtotal * 0.10);
  } else if (activeCoupon === 'SHOP20' || activeCoupon === 'SMART20') {
    discount = Math.round(subtotal * 0.20);
  }

  let deliveryFee = 99;
  if (subtotal === 0 || subtotal >= 2000) {
    deliveryFee = 0;
  }

  const finalTotal = Math.max(0, subtotal - discount) + deliveryFee;

  return {
    subtotal,
    discount,
    deliveryFee,
    total: finalTotal,
    isFreeDelivery: subtotal >= 2000
  };
}

/**
 * Render Cart Drawer
 */
function renderCart() {
  const cartBody = document.getElementById('cartDrawerBody');
  const itemsBadge = document.getElementById('cartItemsBadge');
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('cartDiscountRow');
  const discountEl = document.getElementById('cartDiscount');
  const deliveryEl = document.getElementById('cartDelivery');
  const totalEl = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  const freeDeliveryText = document.getElementById('freeDeliveryText');
  const deliveryProgressFill = document.getElementById('deliveryProgressFill');

  if (!cartBody) return;

  const cart = getCart();
  const totals = calculateCartTotals();
  const totalItemCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  if (itemsBadge) {
    itemsBadge.textContent = `${totalItemCount} item${totalItemCount !== 1 ? 's' : ''}`;
  }

  // Update Free Delivery Banner
  if (freeDeliveryText && deliveryProgressFill) {
    if (totals.subtotal >= 2000) {
      freeDeliveryText.innerHTML = `🎉 You've unlocked <strong>FREE Delivery</strong>!`;
      deliveryProgressFill.style.width = '100%';
    } else {
      const remaining = 2000 - totals.subtotal;
      freeDeliveryText.innerHTML = `Add <strong>${formatCurrency(remaining)}</strong> more for <strong>FREE Delivery</strong>!`;
      const pct = Math.min(100, Math.round((totals.subtotal / 2000) * 100));
      deliveryProgressFill.style.width = `${pct}%`;
    }
  }

  // Empty Cart View
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty-state">
        <span class="cart-empty-icon">🛍️</span>
        <h4 class="cart-empty-title">Your cart is empty</h4>
        <p class="cart-empty-sub">Discover something you'll love from our curated essentials.</p>
        <button class="btn btn-primary cart-continue-btn" id="cartContinueShoppingBtn" onclick="closeCart(); scrollToProducts();">
          <span>Continue Shopping</span>
        </button>
      </div>
    `;

    if (subtotalEl) subtotalEl.textContent = formatCurrency(0);
    if (discountRow) discountRow.style.display = 'none';
    if (deliveryEl) deliveryEl.textContent = formatCurrency(99);
    if (totalEl) totalEl.textContent = formatCurrency(0);
    if (checkoutBtn) {
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = '0.5';
      checkoutBtn.style.cursor = 'not-allowed';
    }
    return;
  }

  // Populated Cart Items
  if (checkoutBtn) {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = '1';
    checkoutBtn.style.cursor = 'pointer';
  }

  cartBody.innerHTML = cart.map(item => {
    const itemSubtotal = item.price * (item.qty || 1);
    return `
      <div class="cart-item-card" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-info">
          <div class="cart-item-title-row">
            <h4 class="cart-item-name">${item.name}</h4>
            <button class="cart-item-remove-btn" onclick="window.removeFromCart(${item.id})" aria-label="Remove ${item.name} from cart" title="Remove item">✕</button>
          </div>
          <div class="cart-item-pricing">
            <span>${formatCurrency(item.price)} each</span>
          </div>
          <div class="cart-item-bottom-row">
            <div class="cart-qty-counter">
              <button class="cart-qty-btn cart-qty-minus" onclick="window.updateCartQuantity(${item.id}, -1)" ${item.qty <= 1 ? 'disabled' : ''} aria-label="Decrease quantity">−</button>
              <span class="cart-qty-val">${item.qty}</span>
              <button class="cart-qty-btn cart-qty-plus" onclick="window.updateCartQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-item-subtotal">${formatCurrency(itemSubtotal)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Update Summary Rows
  if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);

  if (discountRow && discountEl) {
    if (totals.discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `−${formatCurrency(totals.discount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (deliveryEl) {
    deliveryEl.textContent = totals.deliveryFee === 0 ? 'FREE' : formatCurrency(totals.deliveryFee);
  }

  if (totalEl) totalEl.textContent = formatCurrency(totals.total);
}

// -----------------------------------------------------------------------------
// 8. PHASE 3 — COUPON SYSTEM
// -----------------------------------------------------------------------------
function applyCoupon(code) {
  const cleanCode = (code || '').toUpperCase().trim();
  const feedbackEl = document.getElementById('couponFeedback');
  const activeTag = document.getElementById('activeCouponTag');
  const activeText = document.getElementById('activeCouponText');

  if (!cleanCode) {
    if (feedbackEl) {
      feedbackEl.className = 'coupon-feedback-message error';
      feedbackEl.textContent = 'Please enter a coupon code.';
    }
    return false;
  }

  if (activeCoupon === cleanCode) {
    if (feedbackEl) {
      feedbackEl.className = 'coupon-feedback-message error';
      feedbackEl.textContent = `Coupon ${cleanCode} is already applied.`;
    }
    return false;
  }

  if (cleanCode === 'SAVE10') {
    activeCoupon = 'SAVE10';
    if (activeTag) activeTag.style.display = 'inline-flex';
    if (activeText) activeText.textContent = 'SAVE10 Applied (10% OFF)';
    if (feedbackEl) {
      feedbackEl.className = 'coupon-feedback-message success';
      feedbackEl.textContent = '10% discount applied to your order! 🎉';
    }
    renderCart();
    showToast('Applied 10% coupon SAVE10! 🎉');
    return true;
  }

  if (cleanCode === 'SHOP20' || cleanCode === 'SMART20') {
    activeCoupon = cleanCode;
    if (activeTag) activeTag.style.display = 'inline-flex';
    if (activeText) activeText.textContent = `${cleanCode} Applied (20% OFF)`;
    if (feedbackEl) {
      feedbackEl.className = 'coupon-feedback-message success';
      feedbackEl.textContent = '20% discount applied to your order! 🎉';
    }
    renderCart();
    showToast(`Applied 20% coupon ${cleanCode}! 🎉`);
    return true;
  }

  // Invalid Coupon
  if (feedbackEl) {
    feedbackEl.className = 'coupon-feedback-message error';
    feedbackEl.textContent = 'Invalid coupon code. Try SAVE10 or SHOP20.';
  }
  return false;
}

function removeCoupon() {
  activeCoupon = null;
  const feedbackEl = document.getElementById('couponFeedback');
  const activeTag = document.getElementById('activeCouponTag');
  const couponInput = document.getElementById('couponInput');

  if (activeTag) activeTag.style.display = 'none';
  if (feedbackEl) {
    feedbackEl.className = 'coupon-feedback-message';
    feedbackEl.textContent = '';
  }
  if (couponInput) couponInput.value = '';

  renderCart();
  showToast('Coupon removed.');
}

// -----------------------------------------------------------------------------
// 9. PHASE 3 — CHECKOUT & VALIDATION
// -----------------------------------------------------------------------------
function openCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty. Add items first!', '🛍️');
    return;
  }

  closeCart();
  checkoutRedeemedPoints = 0;
  const ptsInput = document.getElementById('checkoutRewardsPointsInput');
  if (ptsInput) ptsInput.value = '';
  renderCheckoutPreview();

  // Phase 6.3: Render saved address chips and auto-fill default
  renderCheckoutAddressChips();
  const def = getDefaultAddress();
  if (def && (!selectedCheckoutAddressId || selectedCheckoutAddressId === def.id)) {
    selectCheckoutAddress(def.id);
  }

  const modal = document.getElementById('checkoutModal');
  const overlay = document.getElementById('checkoutOverlay');
  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckout() {
  const modal = document.getElementById('checkoutModal');
  const overlay = document.getElementById('checkoutOverlay');
  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderCheckoutPreview() {
  const previewContainer = document.getElementById('checkoutItemsPreview');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const discountRow = document.getElementById('checkoutDiscountRow');
  const discountEl = document.getElementById('checkoutDiscount');
  const rewardsRow = document.getElementById('checkoutRewardsDiscountRow');
  const rewardsDiscountEl = document.getElementById('checkoutRewardsDiscount');
  const redeemedPtsEl = document.getElementById('checkoutRedeemedPtsCount');
  const deliveryEl = document.getElementById('checkoutDelivery');
  const totalEl = document.getElementById('checkoutTotal');
  const btnAmount = document.getElementById('placeOrderBtnAmount');

  const cart = getCart();
  const totals = calculateCartTotals();

  // Phase 6.4: Rewards redemption discount calculation
  const rewards = getRewards();
  const payableBeforeRewards = Math.max(0, totals.subtotal - totals.discount);
  const maxPossiblePoints = Math.min(rewards.balance, Math.floor(payableBeforeRewards * 10));

  if (checkoutRedeemedPoints > maxPossiblePoints) {
    checkoutRedeemedPoints = maxPossiblePoints;
  }

  const rewardsDiscountAmount = checkoutRedeemedPoints / 10;
  const finalPayableTotal = Math.max(0, totals.subtotal - totals.discount - rewardsDiscountAmount + totals.deliveryFee);

  if (previewContainer) {
    previewContainer.innerHTML = cart.map(item => `
      <div class="checkout-mini-item">
        <span class="checkout-mini-item-name">${item.qty}× ${item.name}</span>
        <span class="checkout-mini-item-price">${formatCurrency(item.price * item.qty)}</span>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);

  if (discountRow && discountEl) {
    if (totals.discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `−${formatCurrency(totals.discount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  if (rewardsRow && rewardsDiscountEl && redeemedPtsEl) {
    if (checkoutRedeemedPoints > 0) {
      rewardsRow.style.display = 'flex';
      redeemedPtsEl.textContent = checkoutRedeemedPoints;
      rewardsDiscountEl.textContent = `−${formatCurrency(rewardsDiscountAmount)}`;
    } else {
      rewardsRow.style.display = 'none';
    }
  }

  if (deliveryEl) {
    deliveryEl.textContent = totals.deliveryFee === 0 ? 'FREE' : formatCurrency(totals.deliveryFee);
  }

  if (totalEl) totalEl.textContent = formatCurrency(finalPayableTotal);
  if (btnAmount) btnAmount.textContent = `(${formatCurrency(finalPayableTotal)})`;

  // Update checkout rewards box elements
  const availLabel = document.getElementById('checkoutAvailPointsLabel');
  if (availLabel) {
    availLabel.textContent = `${rewards.balance} pts available (${formatCurrency(rewards.balance / 10)})`;
  }

  const statusWrap = document.getElementById('rewardsAppliedStatus');
  const statusText = document.getElementById('rewardsAppliedText');
  const redeemControls = document.getElementById('rewardsRedeemControls');
  if (statusWrap && statusText && redeemControls) {
    if (checkoutRedeemedPoints > 0) {
      statusWrap.style.display = 'flex';
      statusText.textContent = `✅ ${checkoutRedeemedPoints} Points Applied (−${formatCurrency(rewardsDiscountAmount)})`;
      redeemControls.style.display = 'none';
    } else {
      statusWrap.style.display = 'none';
      redeemControls.style.display = 'flex';
    }
  }

  // Update live points earn preview
  const earnPreviewEl = document.getElementById('checkoutPointsEarnPreview');
  if (earnPreviewEl) {
    const tier = calculateTier(rewards.lifetimePoints);
    const potentialEarn = calculateEarnedPoints(finalPayableTotal, tier);
    earnPreviewEl.textContent = `+${potentialEarn} pts`;
  }
}

function validateCheckout() {
  let isValid = true;

  const nameInput = document.getElementById('checkoutName');
  const emailInput = document.getElementById('checkoutEmail');
  const phoneInput = document.getElementById('checkoutPhone');
  const addressInput = document.getElementById('checkoutAddress');
  const cityInput = document.getElementById('checkoutCity');
  const stateInput = document.getElementById('checkoutState');
  const zipInput = document.getElementById('checkoutZip');

  const nameErr = document.getElementById('nameError');
  const emailErr = document.getElementById('emailError');
  const phoneErr = document.getElementById('phoneError');
  const addressErr = document.getElementById('addressError');
  const cityErr = document.getElementById('cityError');
  const stateErr = document.getElementById('stateError');
  const zipErr = document.getElementById('zipError');

  // 1. Name
  if (!nameInput || !nameInput.value.trim()) {
    setFieldError(nameInput, nameErr, 'Please enter your name');
    isValid = false;
  } else {
    clearFieldError(nameInput, nameErr);
  }

  // 2. Email
  const emailVal = emailInput ? emailInput.value.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailRegex.test(emailVal)) {
    setFieldError(emailInput, emailErr, 'Please enter a valid email');
    isValid = false;
  } else {
    clearFieldError(emailInput, emailErr);
  }

  // 3. Phone
  const phoneVal = phoneInput ? phoneInput.value.trim() : '';
  const phoneRegex = /^\d{10}$/;
  if (!phoneVal || !phoneRegex.test(phoneVal.replace(/\D/g, ''))) {
    setFieldError(phoneInput, phoneErr, 'Please enter your phone number');
    isValid = false;
  } else {
    clearFieldError(phoneInput, phoneErr);
  }

  // 4. Address
  if (!addressInput || !addressInput.value.trim()) {
    setFieldError(addressInput, addressErr, 'Please enter your address');
    isValid = false;
  } else {
    clearFieldError(addressInput, addressErr);
  }

  // 5. City
  if (!cityInput || !cityInput.value.trim()) {
    setFieldError(cityInput, cityErr, 'Please enter your city');
    isValid = false;
  } else {
    clearFieldError(cityInput, cityErr);
  }

  // 6. State
  if (!stateInput || !stateInput.value.trim()) {
    setFieldError(stateInput, stateErr, 'Please enter your state');
    isValid = false;
  } else {
    clearFieldError(stateInput, stateErr);
  }

  // 7. PIN Code
  const zipVal = zipInput ? zipInput.value.trim() : '';
  if (!zipVal || zipVal.length < 4) {
    setFieldError(zipInput, zipErr, 'Please enter your PIN code');
    isValid = false;
  } else {
    clearFieldError(zipInput, zipErr);
  }

  return isValid;
}

function setFieldError(input, errorEl, message) {
  if (input) input.classList.add('invalid');
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(input, errorEl) {
  if (input) input.classList.remove('invalid');
  if (errorEl) errorEl.textContent = '';
}

let isPlacingOrder = false;

function placeOrder() {
  if (isPlacingOrder) return;

  if (!validateCheckout()) {
    showToast('Please fix the errors in the form.', '⚠️');
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty.', '⚠️');
    return;
  }

  // Phase 6.1: Validate stock before placing order
  for (const item of cart) {
    const available = getProductStock(item.id);
    if (available < item.qty) {
      if (available === 0) {
        showToast(`Cannot place order: "${item.name}" is out of stock!`, '⚠️');
      } else {
        showToast(`Cannot place order: Only ${available} unit(s) of "${item.name}" available!`, '⚠️');
      }
      return;
    }
  }

  isPlacingOrder = true;
  const submitBtn = document.getElementById('checkoutSubmitBtn');
  if (submitBtn) submitBtn.disabled = true;

  // Phase 6.1: Deduct inventory upon order placement
  const inv = getInventory();
  cart.forEach(item => {
    inv[item.id] = Math.max(0, (inv[item.id] !== undefined ? inv[item.id] : 15) - item.qty);
  });
  saveInventory(inv);

  const totals = calculateCartTotals();
  const orderId = `#SS-${Math.floor(10000 + Math.random() * 90000)}`;

  const nameInput = document.getElementById('checkoutName');
  const cityInput = document.getElementById('checkoutCity');
  const selectedPayRadio = document.querySelector('input[name="paymentMethod"]:checked');

  let payText = 'Credit / Debit Card';
  if (selectedPayRadio) {
    if (selectedPayRadio.value === 'upi') payText = 'UPI / QR Code';
    if (selectedPayRadio.value === 'cod') payText = 'Cash on Delivery';
  }

  const now = new Date();
  const orderDateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Phase 6.4: Rewards deduction & points awarding
  const rewards = getRewards();
  const redeemedPts = checkoutRedeemedPoints;
  const rewardsDiscountAmount = redeemedPts / 10;
  const finalPaidTotal = Math.max(0, totals.subtotal - totals.discount - rewardsDiscountAmount + totals.deliveryFee);

  if (redeemedPts > 0) {
    rewards.balance = Math.max(0, rewards.balance - redeemedPts);
    rewards.history.unshift({
      id: `RWD-TXN-${Date.now()}-RED`,
      type: 'REDEEMED',
      points: redeemedPts,
      description: `Redeemed for ${formatCurrency(rewardsDiscountAmount)} discount on Order ${orderId}`,
      orderId,
      date: orderDateStr,
      timestamp: now.getTime()
    });
    saveRewards(rewards);
  }

  const earnedPts = awardOrderPoints(orderId, finalPaidTotal);

  // Phase 5 & Phase 6.4: Persist full completed order to localStorage
  const completedOrder = {
    orderId,
    date: orderDateStr,
    timestamp: now.getTime(),
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice || item.price,
      discount: item.discount || '0%',
      image: item.image,
      category: item.category || 'General',
      qty: item.qty || 1
    })),
    subtotal: totals.subtotal,
    discount: totals.discount,
    rewardsDiscount: rewardsDiscountAmount,
    pointsEarned: earnedPts,
    pointsRedeemed: redeemedPts,
    delivery: totals.deliveryFee,
    total: finalPaidTotal,
    paymentMethod: payText,
    estimatedDelivery: '3–5 Business Days',
    status: 'Confirmed',
    trackingNumber: generateTrackingNumber(orderId),
    carrier: 'BlueDart Express',
    trackingStage: 1,
    trackingStatus: 'Order Confirmed',
    trackingHistory: [
      { stage: 0, title: 'Order Placed', location: 'ShopSphere Digital HQ', completed: true, date: `${orderDateStr}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` },
      { stage: 1, title: 'Order Confirmed', location: 'Fulfillment Center, Bengaluru', completed: true, date: `${orderDateStr}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` },
      { stage: 2, title: 'Packed', location: 'Warehouse Hub Dock 4', completed: false, date: null },
      { stage: 3, title: 'Shipped', location: 'Express Logistics Transit Facility', completed: false, date: null },
      { stage: 4, title: 'Delivered', location: 'Customer Delivery Address', completed: false, date: null }
    ]
  };

  saveOrder(completedOrder);

  const orderDetails = {
    orderId,
    total: finalPaidTotal,
    customerName: nameInput ? nameInput.value.trim() : 'Valued Customer',
    address: `${cityInput ? cityInput.value.trim() : 'Bengaluru'}, India`,
    paymentMethod: payText,
    pointsEarned: earnedPts,
    pointsRedeemed: redeemedPts
  };

  // Phase 6.3: Save new address from checkout if requested
  const saveCheckbox = document.getElementById('checkoutSaveNewAddressCheckbox');
  if (saveCheckbox && saveCheckbox.checked) {
    const labelInput = document.getElementById('checkoutNewAddressLabel');
    const label = (labelInput && labelInput.value.trim()) || 'Saved Address';
    const phoneInput = document.getElementById('checkoutPhone');
    const addressInput = document.getElementById('checkoutAddress');
    const stateInput = document.getElementById('checkoutState');
    const zipInput = document.getElementById('checkoutZip');

    addAddress({
      label,
      fullName: nameInput ? nameInput.value.trim() : 'Valued Customer',
      phone: phoneInput ? phoneInput.value.trim() : '9876543210',
      addressLine: addressInput ? addressInput.value.trim() : '',
      city: cityInput ? cityInput.value.trim() : '',
      state: stateInput ? stateInput.value.trim() : '',
      postalCode: zipInput ? zipInput.value.trim() : '',
      country: 'India',
      isDefault: false
    });
    saveCheckbox.checked = false;
    toggleCheckoutAddressLabel(false);
  }

  // Clear Cart & Coupon & Reset Redeemed Points
  saveCart([]);
  activeCoupon = null;
  checkoutRedeemedPoints = 0;

  closeCheckout();
  showOrderConfirmation(orderDetails);
  showToast('Order placed successfully! 🎉', '🎉');

  // Update catalog, rewards & Phase 5 UI views
  filterProducts();
  renderOrderHistory();
  renderAnalytics();
  renderPersonalizedRecommendations();
  renderRewardsNavBadge();
  renderRewardsDashboard();

  isPlacingOrder = false;
  if (submitBtn) submitBtn.disabled = false;
}

// -----------------------------------------------------------------------------
// 10. PHASE 3 — ORDER CONFIRMATION
// -----------------------------------------------------------------------------
function showOrderConfirmation(details) {
  const modal = document.getElementById('orderConfirmationModal');
  const overlay = document.getElementById('orderConfirmationOverlay');

  const idEl = document.getElementById('confirmOrderId');
  const totalEl = document.getElementById('confirmOrderTotal');
  const addrEl = document.getElementById('confirmOrderAddress');
  const payEl = document.getElementById('confirmOrderPayment');
  const rewardsEl = document.getElementById('confirmOrderRewards');

  if (idEl) idEl.textContent = details.orderId;
  if (totalEl) totalEl.textContent = formatCurrency(details.total);
  if (addrEl) addrEl.textContent = `${details.customerName}, ${details.address}`;
  if (payEl) payEl.textContent = details.paymentMethod;
  if (rewardsEl) {
    rewardsEl.textContent = `✨ +${details.pointsEarned || 0} pts Earned`;
  }

  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderConfirmation() {
  const modal = document.getElementById('orderConfirmationModal');
  const overlay = document.getElementById('orderConfirmationOverlay');

  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  scrollToProducts();
}

// -----------------------------------------------------------------------------
// 11. PHASE 5 — ANALYTICS, ORDER HISTORY & PERSONALIZATION
// -----------------------------------------------------------------------------

// 1. Order History Storage
function getOrders() {
  try {
    const raw = localStorage.getItem('shopsphere_orders');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveOrder(order) {
  const orders = getOrders();
  // Ensure newest orders appear first
  orders.unshift(order);
  localStorage.setItem('shopsphere_orders', JSON.stringify(orders));
}

// 2. Order History View
function renderOrderHistory() {
  const container = document.getElementById('ordersList');
  if (!container) return;

  const orders = getOrders();
  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box">
        <div class="empty-state-icon">📦</div>
        <h4 class="empty-state-title">Your order history is empty</h4>
        <p class="empty-state-sub">When you complete an order, you can review its status and reorder items here.</p>
        <button class="btn btn-primary" onclick="scrollToProducts()">Start Shopping</button>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const items = Array.isArray(order.items) ? order.items : [];
    const totalItemsCount = items.reduce((sum, i) => sum + (i.qty || 1), 0);
    const thumbsHtml = items.slice(0, 4).map(i => `
      <img src="${i.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=60'}" alt="${escapeHtml(i.name || 'Product')}" class="order-thumb-mini" title="${escapeHtml(i.name || 'Product')} × ${i.qty || 1}">
    `).join('');
    const extraCount = items.length > 4 ? `<div class="order-thumb-more">+${items.length - 4}</div>` : '';

    return `
      <div class="order-card" data-order-id="${order.orderId}">
        <div class="order-card-header">
          <div class="order-card-id-row">
            <span class="order-card-id">${order.orderId}</span>
            <span class="order-status-badge">● ${order.status || 'Confirmed'}</span>
          </div>
          <span class="order-card-date">Placed on ${order.date}</span>
        </div>
        <div class="order-card-body">
          <div class="order-card-thumbs">
            ${thumbsHtml}
            ${extraCount}
          </div>
          <div class="order-card-summary">
            <span class="order-card-items-count">${totalItemsCount} item${totalItemsCount !== 1 ? 's' : ''}</span>
            <span class="order-card-total">${formatCurrency(order.total)}</span>
          </div>
        </div>
        <div class="order-card-actions">
          <button class="btn btn-secondary btn-sm" onclick="showOrderDetails('${order.orderId}')">View Details</button>
          <button class="btn btn-secondary btn-sm track-order-btn" onclick="openOrderTracking('${order.orderId}')">📍 Track</button>
          <button class="btn btn-secondary btn-sm print-invoice-btn" onclick="openInvoiceModal('${order.orderId}')">🖨️ Invoice</button>
          <button class="btn btn-primary btn-sm" onclick="reorderItems('${order.orderId}')">Reorder 🛒</button>
        </div>
      </div>
    `;
  }).join('');
}

// 3. Order Details Modal
function showOrderDetails(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (!order) {
    showToast(`Order ${orderId} not found.`, '⚠️');
    return;
  }

  const modal = document.getElementById('orderDetailsModal');
  const overlay = document.getElementById('orderDetailsOverlay');

  const idEl = document.getElementById('detailOrderId');
  const statusEl = document.getElementById('detailOrderStatus');
  const dateEl = document.getElementById('detailOrderDate');
  const itemsListEl = document.getElementById('detailOrderItemsList');
  const subtotalEl = document.getElementById('detailOrderSubtotal');
  const discountRow = document.getElementById('detailOrderDiscountRow');
  const discountEl = document.getElementById('detailOrderDiscount');
  const deliveryEl = document.getElementById('detailOrderDelivery');
  const totalEl = document.getElementById('detailOrderTotal');
  const payEl = document.getElementById('detailOrderPayment');
  const estimateEl = document.getElementById('detailOrderEstimate');
  const reorderBtn = document.getElementById('detailOrderReorderBtn');

  if (idEl) idEl.textContent = order.orderId;
  if (statusEl) statusEl.textContent = order.status || 'Confirmed';
  if (dateEl) dateEl.textContent = `Placed on ${order.date}`;
  if (subtotalEl) subtotalEl.textContent = formatCurrency(order.subtotal);
  if (discountEl && discountRow) {
    if (order.discount > 0) {
      discountEl.textContent = `−${formatCurrency(order.discount)}`;
      discountRow.style.display = 'flex';
    } else {
      discountRow.style.display = 'none';
    }
  }
  if (deliveryEl) deliveryEl.textContent = order.delivery === 0 ? 'FREE' : formatCurrency(order.delivery);
  if (totalEl) totalEl.textContent = formatCurrency(order.total);
  if (payEl) payEl.textContent = order.paymentMethod || 'Credit / Debit Card';
  if (estimateEl) estimateEl.textContent = order.estimatedDelivery || '3–5 Business Days';

  if (itemsListEl) {
    itemsListEl.innerHTML = order.items.map(item => `
      <div class="order-detail-item-row">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" class="order-detail-item-thumb">
        <div class="order-detail-item-info">
          <span class="order-detail-item-name">${escapeHtml(item.name)}</span>
          <span class="order-detail-item-meta">Qty: ${item.qty} × ${formatCurrency(item.price)}</span>
        </div>
        <span class="order-detail-item-total">${formatCurrency(item.price * item.qty)}</span>
      </div>
    `).join('');
  }

  if (reorderBtn) {
    reorderBtn.onclick = () => {
      closeOrderDetails();
      reorderItems(order.orderId);
    };
  }

  if (modal && overlay) {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderDetails() {
  const modal = document.getElementById('orderDetailsModal');
  const overlay = document.getElementById('orderDetailsOverlay');
  if (modal && overlay) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 4. Reorder Logic
function reorderItems(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.orderId === orderId);
  if (!order) {
    showToast(`Order ${orderId} not found.`, '⚠️');
    return;
  }

  let reorderedCount = 0;
  let missingItemsCount = 0;
  let outOfStockCount = 0;

  order.items.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) {
      missingItemsCount++;
      return;
    }
    const stock = getProductStock(item.id);
    if (stock <= 0) {
      outOfStockCount++;
      return;
    }
    const qtyToAdd = Math.min(item.qty, stock);
    window.addToCart(item.id, qtyToAdd);
    reorderedCount += qtyToAdd;
  });

  if (missingItemsCount > 0) {
    showToast('Note: An archived item is no longer available and was skipped.', '⚠️');
  }
  if (outOfStockCount > 0) {
    showToast('Note: Some items from this order are currently out of stock and were skipped.', '⚠️');
  }

  if (reorderedCount > 0) {
    showToast(`Reordered ${reorderedCount} items from ${order.orderId}! 🛒`, '🎉');
    openCart();
  }
}

// 5. Recently Viewed Products
function getRecentlyViewed() {
  try {
    const raw = localStorage.getItem('shopsphere_recently_viewed');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveRecentlyViewed(list) {
  localStorage.setItem('shopsphere_recently_viewed', JSON.stringify(list));
}

function trackRecentlyViewed(productId) {
  let list = getRecentlyViewed();
  // Remove if already present (no duplicates)
  list = list.filter(id => id !== productId);
  // Prepend to front (most recent first)
  list.unshift(productId);
  // Cap at 6
  if (list.length > 6) {
    list = list.slice(0, 6);
  }
  saveRecentlyViewed(list);
  renderRecentlyViewed();
  renderPersonalizedRecommendations();
}

function renderRecentlyViewed() {
  const container = document.getElementById('recentlyViewedGrid');
  if (!container) return;

  const ids = getRecentlyViewed();
  if (ids.length === 0) {
    container.innerHTML = `
      <div class="empty-state-box" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">👀</div>
        <h4 class="empty-state-title">No recently viewed products</h4>
        <p class="empty-state-sub">Products you inspect will appear here for quick access.</p>
        <button class="btn btn-primary" onclick="scrollToProducts()">Explore Catalog</button>
      </div>
    `;
    return;
  }

  const products = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  container.innerHTML = products.map(prod => `
    <div class="recent-product-card" onclick="openProductDetails(${prod.id})" tabindex="0" role="button" aria-label="View ${escapeHtml(prod.name)}">
      <div class="recent-product-thumb-wrap">
        <img src="${prod.image}" alt="${escapeHtml(prod.name)}" class="recent-product-thumb" onerror="this.src='${prod.fallbackImage}'">
      </div>
      <span class="recent-product-cat">${escapeHtml(prod.category)}</span>
      <h4 class="recent-product-title">${escapeHtml(prod.name)}</h4>
      <div class="recent-product-pricing">
        <span class="recent-product-price">${formatCurrency(prod.price)}</span>
        <span class="chat-discount-badge">${prod.discount}</span>
      </div>
    </div>
  `).join('');
}

// 6. Analytics Computations
function calculateAnalytics() {
  const orders = getOrders();
  const totalOrders = orders.length;
  const totalSpending = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalSpending / totalOrders) : 0;
  const itemsPurchased = orders.reduce((sum, o) => sum + o.items.reduce((iSum, i) => iSum + (i.qty || 1), 0), 0);

  return {
    totalOrders,
    totalSpending,
    avgOrderValue,
    itemsPurchased
  };
}

function calculateCategoryStats() {
  const orders = getOrders();
  const catCounts = {};
  let totalUnits = 0;

  orders.forEach(order => {
    order.items.forEach(item => {
      const cat = item.category || 'General';
      catCounts[cat] = (catCounts[cat] || 0) + (item.qty || 1);
      totalUnits += (item.qty || 1);
    });
  });

  const stats = Object.entries(catCounts).map(([category, count]) => ({
    category,
    count,
    percent: totalUnits > 0 ? Math.round((count / totalUnits) * 100) : 0
  })).sort((a, b) => b.count - a.count);

  const topCategory = stats.length > 0 ? stats[0] : null;

  return {
    totalUnits,
    topCategory,
    stats
  };
}

function getTopProducts(limit = 5) {
  const orders = getOrders();
  const productCounts = {};

  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productCounts[item.id]) {
        productCounts[item.id] = {
          id: item.id,
          name: item.name,
          category: item.category,
          image: item.image,
          count: 0
        };
      }
      productCounts[item.id].count += (item.qty || 1);
    });
  });

  return Object.values(productCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

// 7. Analytics Dashboard Rendering
function renderAnalytics() {
  const orders = getOrders();
  const { totalOrders, totalSpending, avgOrderValue, itemsPurchased } = calculateAnalytics();

  const totalOrdersEl = document.getElementById('kpiTotalOrders');
  const totalSpendingEl = document.getElementById('kpiTotalSpending');
  const avgOrderValueEl = document.getElementById('kpiAvgOrderValue');
  const itemsPurchasedEl = document.getElementById('kpiItemsPurchased');

  if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
  if (totalSpendingEl) totalSpendingEl.textContent = formatCurrency(totalSpending);
  if (avgOrderValueEl) avgOrderValueEl.textContent = formatCurrency(avgOrderValue);
  if (itemsPurchasedEl) itemsPurchasedEl.textContent = itemsPurchased;

  const chartBox = document.getElementById('spendingChartContainer');
  const categoryBox = document.getElementById('categoryAnalyticsContainer');
  const topProductsBox = document.getElementById('topProductsContainer');

  if (orders.length === 0) {
    const emptyMsg = `
      <div class="empty-state-box" style="padding: 2rem 1rem; width: 100%;">
        <div class="empty-state-icon">📊</div>
        <h4 class="empty-state-title">No analytics yet</h4>
        <p class="empty-state-sub">Complete your first order to unlock shopping insights.</p>
        <button class="btn btn-primary btn-sm" onclick="scrollToProducts()">Browse Shop</button>
      </div>
    `;
    if (chartBox) chartBox.innerHTML = emptyMsg;
    if (categoryBox) categoryBox.innerHTML = emptyMsg;
    if (topProductsBox) topProductsBox.innerHTML = emptyMsg;
    return;
  }

  // Monthly Spending Chart
  if (chartBox) {
    const monthSpending = {};
    orders.forEach(o => {
      const d = new Date(o.timestamp || o.date);
      const mName = isNaN(d.getTime()) ? 'Recent' : d.toLocaleString('en-US', { month: 'short' });
      monthSpending[mName] = (monthSpending[mName] || 0) + o.total;
    });

    const entries = Object.entries(monthSpending);
    const maxVal = Math.max(...entries.map(([, amt]) => amt), 1);

    chartBox.innerHTML = entries.map(([mName, amt]) => {
      const barHeightPct = Math.max(12, Math.round((amt / maxVal) * 100));
      return `
        <div class="chart-bar-col">
          <span class="chart-bar-amount">${formatCurrency(amt)}</span>
          <div class="chart-bar-fill-wrap">
            <div class="chart-bar-fill" style="height: ${barHeightPct}%;"></div>
          </div>
          <span class="chart-bar-label">${mName}</span>
        </div>
      `;
    }).join('');
  }

  // Category Breakdown
  if (categoryBox) {
    const { topCategory, stats } = calculateCategoryStats();
    let bannerHtml = '';
    if (topCategory) {
      bannerHtml = `
        <div class="top-category-banner">
          <span class="top-cat-icon">🏆</span>
          <div class="top-cat-info">
            <span class="top-cat-title">Top Category: ${topCategory.category}</span>
            <span class="top-cat-sub">${topCategory.percent}% of purchases (${topCategory.count} items)</span>
          </div>
        </div>
      `;
    }

    const rowsHtml = stats.map(st => `
      <div class="cat-stat-row">
        <div class="cat-stat-header">
          <span class="cat-stat-name">${st.category} (${st.count})</span>
          <span class="cat-stat-share">${st.percent}%</span>
        </div>
        <div class="cat-stat-track">
          <div class="cat-stat-bar" style="width: ${st.percent}%;"></div>
        </div>
      </div>
    `).join('');

    categoryBox.innerHTML = bannerHtml + rowsHtml;
  }

  // Top Products
  if (topProductsBox) {
    const topProducts = getTopProducts(5);
    topProductsBox.innerHTML = topProducts.map((p, idx) => `
      <div class="top-product-row">
        <div class="top-product-rank rank-${idx + 1}">${idx + 1}</div>
        <img src="${p.image}" alt="${escapeHtml(p.name)}" class="top-product-thumb">
        <div class="top-product-details">
          <span class="top-product-name">${escapeHtml(p.name)}</span>
          <span class="top-product-cat">${p.category}</span>
        </div>
        <span class="top-product-badge">${p.count} purchased</span>
      </div>
    `).join('');
  }
}

// -----------------------------------------------------------------------------
// 8. PHASE 7.1 — MULTI-MODAL SMART RECOMMENDATION ENGINE
// -----------------------------------------------------------------------------
let currentRecommendationMode = 'curated';

function getCuratedRecommendations() {
  const { topCategory } = calculateCategoryStats();
  const recentIds = getRecentlyViewed();
  let candidateCategory = null;
  let rationale = 'Hand-picked for your lifestyle';

  if (topCategory && topCategory.category) {
    candidateCategory = topCategory.category;
    rationale = `Based on your frequent orders in ${candidateCategory}`;
  } else if (recentIds.length > 0) {
    const firstProd = PRODUCTS.find(p => p.id === recentIds[0]);
    if (firstProd) {
      candidateCategory = firstProd.category;
      rationale = `Based on your browsing in ${candidateCategory}`;
    }
  }

  let candidates = [];
  if (candidateCategory) {
    candidates = PRODUCTS.filter(p => p.category.toLowerCase() === candidateCategory.toLowerCase());
  }

  if (candidates.length < 4) {
    const others = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
    candidates = [...candidates, ...others.filter(p => !candidates.some(c => c.id === p.id))];
  }

  return {
    mode: 'curated',
    tag: 'Curated For You',
    title: 'Recommended For You',
    subtitle: `Personalized selections — ${rationale}`,
    products: candidates.slice(0, 4),
    isEmpty: false
  };
}

function getViewedRecommendations() {
  const recentIds = getRecentlyViewed();
  if (!recentIds || recentIds.length === 0) {
    return {
      mode: 'viewed',
      tag: 'Browsing Affinity',
      title: 'Because You Viewed',
      subtitle: 'Matches inspired by your browsing history',
      products: [],
      isEmpty: true,
      emptyIcon: '👁️',
      emptyTitle: 'No Browsing History Yet',
      emptySub: 'Explore our catalog and inspect products. We will instantly craft tailored recommendations based on what catches your eye!',
      emptyBtnText: 'Browse Catalog',
      emptyBtnAction: "document.getElementById('products').scrollIntoView({behavior:'smooth'})"
    };
  }

  const viewedProds = recentIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  const primaryViewed = viewedProds[0];
  const viewedCategories = [...new Set(viewedProds.map(p => p.category.toLowerCase()))];

  let candidates = PRODUCTS.filter(p => viewedCategories.includes(p.category.toLowerCase()) && !recentIds.includes(p.id));
  if (candidates.length < 4) {
    const sameCat = PRODUCTS.filter(p => viewedCategories.includes(p.category.toLowerCase()));
    candidates = [...candidates, ...sameCat.filter(p => !candidates.some(c => c.id === p.id))];
  }
  if (candidates.length < 4) {
    const others = [...PRODUCTS].sort((a, b) => b.rating - a.rating);
    candidates = [...candidates, ...others.filter(p => !candidates.some(c => c.id === p.id))];
  }

  const rationale = primaryViewed ? `Inspired by your interest in ${primaryViewed.name}` : 'Inspired by your recent views';

  return {
    mode: 'viewed',
    tag: 'Browsing Affinity',
    title: 'Because You Viewed',
    subtitle: `Personalized matches — ${rationale}`,
    products: candidates.slice(0, 4),
    isEmpty: false
  };
}

function getBuyAgainRecommendations() {
  const orders = getOrders();
  if (!orders || orders.length === 0) {
    return {
      mode: 'buy-again',
      tag: 'Repurchase Hub',
      title: 'Buy Again',
      subtitle: 'Quickly restock your past orders in one click',
      products: [],
      isEmpty: true,
      emptyIcon: '🔄',
      emptyTitle: 'No Past Orders to Reorder',
      emptySub: 'Items you purchase will appear here so you can reorder your favorite essentials in a single click.',
      emptyBtnText: 'Explore Trending Essentials',
      emptyBtnAction: "window.switchRecommendationMode('trending')"
    };
  }

  const itemMap = new Map();
  orders.forEach(order => {
    (order.items || []).forEach(item => {
      if (!itemMap.has(item.id)) {
        itemMap.set(item.id, {
          id: item.id,
          count: 0,
          totalQty: 0,
          lastOrderDate: order.date
        });
      }
      const entry = itemMap.get(item.id);
      entry.count += 1;
      entry.totalQty += (item.qty || 1);
    });
  });

  const sortedEntries = Array.from(itemMap.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return b.totalQty - a.totalQty;
  });

  const candidates = sortedEntries.map(entry => {
    const prod = PRODUCTS.find(p => p.id === entry.id);
    if (!prod) return null;
    return {
      ...prod,
      reorderBadge: entry.count > 1 ? `Ordered ${entry.count}x` : 'Purchased before'
    };
  }).filter(Boolean);

  if (candidates.length === 0) {
    return {
      mode: 'buy-again',
      tag: 'Repurchase Hub',
      title: 'Buy Again',
      subtitle: 'Quickly restock your past orders in one click',
      products: [],
      isEmpty: true,
      emptyIcon: '🔄',
      emptyTitle: 'No Past Orders to Reorder',
      emptySub: 'Items you purchase will appear here so you can reorder your favorite essentials in a single click.',
      emptyBtnText: 'Explore Trending Essentials',
      emptyBtnAction: "window.switchRecommendationMode('trending')"
    };
  }

  return {
    mode: 'buy-again',
    tag: 'Repurchase Hub',
    title: 'Buy Again',
    subtitle: 'Reorder your trusted favorites with rapid 1-click checkout',
    products: candidates.slice(0, 4),
    isEmpty: false
  };
}

function getTrendingRecommendations() {
  const orders = getOrders();
  const orderCountMap = {};
  orders.forEach(order => {
    (order.items || []).forEach(item => {
      orderCountMap[item.id] = (orderCountMap[item.id] || 0) + (item.qty || 1);
    });
  });

  const scored = PRODUCTS.map(product => {
    const ratingScore = (product.rating || 4.5) * 20;
    const reviewScore = Math.min(30, (product.reviewCount || 100) / 10);
    const badgeBonus = (product.badge === 'Trending' || product.badge === 'Best Seller') ? 15 : (product.badge ? 8 : 0);
    const orderBonus = (orderCountMap[product.id] || 0) * 10;
    const totalScore = ratingScore + reviewScore + badgeBonus + orderBonus;
    return { product, totalScore };
  });

  scored.sort((a, b) => b.totalScore - a.totalScore);
  const candidates = scored.slice(0, 4).map(s => s.product);

  return {
    mode: 'trending',
    tag: 'Community Favorites',
    title: 'Trending Essentials',
    subtitle: 'Top-rated, verified essentials most loved by our shoppers this week',
    products: candidates,
    isEmpty: false
  };
}

function getPersonalizedRecommendations() {
  return getCuratedRecommendations();
}

function switchRecommendationMode(mode) {
  const validModes = ['curated', 'viewed', 'buy-again', 'trending'];
  if (!validModes.includes(mode)) {
    mode = 'curated';
  }
  currentRecommendationMode = mode;

  const tabIds = {
    'curated': 'recTabCurated',
    'viewed': 'recTabViewed',
    'buy-again': 'recTabBuyAgain',
    'trending': 'recTabTrending'
  };

  Object.entries(tabIds).forEach(([m, id]) => {
    const tabEl = document.getElementById(id);
    if (tabEl) {
      const isActive = m === mode;
      tabEl.classList.toggle('active', isActive);
      tabEl.setAttribute('aria-selected', isActive ? 'true' : 'false');
      tabEl.setAttribute('tabindex', isActive ? '0' : '-1');
    }
  });

  renderPersonalizedRecommendations();
}

function initRecommendationTabs() {
  const wrapper = document.querySelector('.rec-tabs-wrapper');
  if (!wrapper) return;

  const modeOrder = ['curated', 'viewed', 'buy-again', 'trending'];
  const tabIds = ['recTabCurated', 'recTabViewed', 'recTabBuyAgain', 'recTabTrending'];

  tabIds.forEach((id, idx) => {
    const tab = document.getElementById(id);
    if (tab) {
      const isActive = modeOrder[idx] === currentRecommendationMode;
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    }
  });

  wrapper.addEventListener('keydown', (e) => {
    const activeIndex = modeOrder.indexOf(currentRecommendationMode);
    if (activeIndex === -1) return;

    let newIndex = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = (activeIndex + 1) % modeOrder.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = (activeIndex - 1 + modeOrder.length) % modeOrder.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = modeOrder.length - 1;
    }

    if (newIndex !== null) {
      const nextMode = modeOrder[newIndex];
      switchRecommendationMode(nextMode);
      const nextTab = document.getElementById(tabIds[newIndex]);
      if (nextTab) nextTab.focus();
    }
  });
}

function renderPersonalizedRecommendations() {
  const grid = document.getElementById('recommendedGrid');
  const subtitle = document.getElementById('recommendedSubtitle');
  const tag = document.getElementById('recommendedTag');
  if (!grid) return;

  let result;
  switch (currentRecommendationMode) {
    case 'viewed':
      result = getViewedRecommendations();
      break;
    case 'buy-again':
      result = getBuyAgainRecommendations();
      break;
    case 'trending':
      result = getTrendingRecommendations();
      break;
    case 'curated':
    default:
      result = getCuratedRecommendations();
      break;
  }

  if (subtitle) subtitle.textContent = result.subtitle;
  if (tag) tag.textContent = result.tag;

  if (result.isEmpty) {
    grid.innerHTML = `
      <div class="rec-empty-state">
        <div class="rec-empty-icon">${result.emptyIcon || '✨'}</div>
        <h4 class="rec-empty-title">${result.emptyTitle || 'No recommendations found'}</h4>
        <p class="rec-empty-sub">${result.emptySub || ''}</p>
        <button type="button" class="btn btn-primary rec-empty-btn" onclick="${result.emptyBtnAction}">
          ${result.emptyBtnText}
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = result.products.map(product => {
    const isWishlisted = getWishlist().includes(product.id);
    const wishlistClass = isWishlisted ? 'active' : '';
    const stock = getProductStock(product.id);
    const isOutOfStock = stock === 0;
    const isLowStock = stock > 0 && stock <= 5;
    const ratingData = calculateProductRating(product.id);

    let stockBadgeHtml = '';
    if (isOutOfStock) {
      stockBadgeHtml = `<span class="badge badge-stock out-of-stock" style="background:#ef4444;color:#fff;">Out of Stock</span>`;
    } else if (isLowStock) {
      stockBadgeHtml = `<span class="badge badge-stock low-stock" style="background:#f59e0b;color:#fff;">🔥 Only ${stock} left!</span>`;
    }

    let extraBadgeHtml = '';
    if (product.reorderBadge) {
      extraBadgeHtml = `<span class="badge badge-repurchase">${escapeHtml(product.reorderBadge)}</span>`;
    } else if (product.badge) {
      extraBadgeHtml = `<span class="badge badge-custom">${escapeHtml(product.badge)}</span>`;
    }

    const btnText = currentRecommendationMode === 'buy-again'
      ? (isOutOfStock ? 'Sold Out' : '🔄 Buy Again')
      : (isOutOfStock ? 'Sold Out' : '+ Add to Cart');

    return `
      <article class="product-card ${isOutOfStock ? 'is-out-of-stock' : ''}" data-id="${product.id}" onclick="handleCardClick(event, ${product.id})">
        <div class="card-image-wrap">
          <img 
            src="${product.image}" 
            alt="${escapeHtml(product.name)}" 
            class="product-image"
            loading="lazy"
            onerror="this.src='${product.fallbackImage}'"
          >
          <div class="card-badges">
            <span class="badge badge-discount">${product.discount}</span>
            ${extraBadgeHtml}
            ${stockBadgeHtml}
          </div>
          <button 
            type="button"
            class="card-wishlist-btn ${wishlistClass}" 
            onclick="event.stopPropagation(); toggleWishlist(${product.id})"
            aria-label="Add ${escapeHtml(product.name)} to wishlist"
            title="Add to Wishlist"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div class="card-content">
          <span class="card-category">${escapeHtml(product.category)}</span>
          <h3 class="card-title">${escapeHtml(product.name)}</h3>
          <div class="card-rating">
            <span class="stars">${'★'.repeat(Math.round(ratingData.rating))}${'☆'.repeat(5 - Math.round(ratingData.rating))}</span>
            <span class="rating-score">${ratingData.rating.toFixed(1)}</span>
            <span class="review-count">(${ratingData.reviewCount})</span>
          </div>
          <div class="card-price-row">
            <span class="current-price">${formatCurrency(product.price)}</span>
            <span class="original-price">${formatCurrency(product.originalPrice)}</span>
          </div>
          <button 
            type="button"
            class="btn btn-primary add-to-cart-btn ${isOutOfStock ? 'disabled' : ''}" 
            ${isOutOfStock ? 'disabled' : ''}
            onclick="event.stopPropagation(); addToCart(${product.id})"
            aria-label="${isOutOfStock ? 'Product out of stock' : (currentRecommendationMode === 'buy-again' ? 'Buy ' + escapeHtml(product.name) + ' again' : 'Add ' + escapeHtml(product.name) + ' to cart')}"
          >
            <span>${btnText}</span>
          </button>
        </div>
      </article>
    `;
  }).join('');
}

// -----------------------------------------------------------------------------
// 12. ADVANCED SHOPBOT AI (PHASE 4 & 5 ARCHITECTURE)
// -----------------------------------------------------------------------------

// Lightweight Conversation Context
const conversationContext = {
  lastResults: [],
  lastRecommendedProduct: null,
  lastMentionedProduct: null,
  lastIntent: null
};

/**
 * 1. Intent Detection System
 */
function detectIntent(rawQuery, context) {
  const query = rawQuery.toLowerCase().trim();

  // Follow-up: "which one is best?", "which is best?", "recommend one", "pick one", "which one?"
  if (
    query === 'which one is best?' ||
    query === 'which one is best' ||
    query === 'which is best?' ||
    query === 'which is best' ||
    query === 'which one is better?' ||
    query === 'which one is better' ||
    query === 'which is better?' ||
    query === 'which is better' ||
    query === 'recommend one' ||
    query === 'pick one' ||
    query === 'what do you recommend?' ||
    query === 'what do you recommend'
  ) {
    return { intent: 'follow_up_best' };
  }

  // Follow-up: "add it to cart", "add that to cart", "add this", "add to cart"
  if (
    query === 'add it to cart' ||
    query === 'add that to cart' ||
    query === 'add this to cart' ||
    query === 'add it' ||
    query === 'add this' ||
    query === 'add that' ||
    query === 'add to cart'
  ) {
    return { intent: 'follow_up_add' };
  }

  // Product Comparison: "compare these products", "compare Aura Sound Pro and ZenPods", "compare headphones and watch"
  if (
    query.startsWith('compare') ||
    query.includes(' vs ') ||
    query.includes(' versus ') ||
    query.includes('difference between')
  ) {
    return { intent: 'product_comparison', query };
  }

  // Clear Cart
  if (
    (query.includes('clear') || query.includes('empty')) &&
    (query.includes('cart') || query.includes('bag'))
  ) {
    return { intent: 'clear_cart' };
  }

  // Cart Total: "how much is my cart?", "cart total"
  if (
    query.includes('how much is my cart') ||
    query.includes('cart total') ||
    query.includes('total of my cart') ||
    query === 'how much is cart' ||
    query === 'total price'
  ) {
    return { intent: 'cart_total' };
  }

  // Cart Status: "show my cart", "what's in my cart?", "view cart"
  if (
    query.includes("what's in my cart") ||
    query.includes('what is in my cart') ||
    query.includes('show my cart') ||
    query.includes('show cart') ||
    query.includes('view cart') ||
    query === 'my cart' ||
    query === 'cart'
  ) {
    return { intent: 'cart_status' };
  }

  // Add to Cart: "add [product] to cart", "add [product]"
  const addMatch = query.match(/^add\s+(.+?)(?:\s+to\s+cart)?$/i);
  if (addMatch && !query.includes('wishlist') && !query.includes('coupon')) {
    const target = addMatch[1].replace(/to\s+cart/i, '').trim();
    if (target && !['it', 'this', 'that'].includes(target)) {
      return { intent: 'add_to_cart', targetTerm: target };
    }
  }

  // Remove from Cart: "remove [product] from cart", "remove [product]"
  const removeMatch = query.match(/^remove\s+(.+?)(?:\s+from\s+cart)?$/i);
  if (removeMatch && !query.includes('wishlist')) {
    const target = removeMatch[1].replace(/from\s+cart/i, '').trim();
    return { intent: 'remove_from_cart', targetTerm: target };
  }

  // Wishlist Commands
  if (query.match(/^(?:add|save)\s+(.+?)\s+to\s+wishlist$/i)) {
    const m = query.match(/^(?:add|save)\s+(.+?)\s+to\s+wishlist$/i);
    return { intent: 'wishlist_add', targetTerm: m[1].trim() };
  }
  if (query.match(/^remove\s+(.+?)\s+from\s+wishlist$/i)) {
    const m = query.match(/^remove\s+(.+?)\s+from\s+wishlist$/i);
    return { intent: 'wishlist_remove', targetTerm: m[1].trim() };
  }
  if (query.includes('wishlist')) {
    return { intent: 'wishlist_status' };
  }

  // Checkout Commands
  if (
    query === 'checkout' ||
    query.includes('take me to checkout') ||
    query.includes('place my order') ||
    query.includes('proceed to checkout') ||
    query.includes('go to checkout') ||
    query === 'pay'
  ) {
    return { intent: 'checkout' };
  }

  // Phase 5: Reorder Commands
  const reorderMatch = query.match(/^reorder\s+(?:order\s+)?(#?ss-?\d+)/i);
  if (reorderMatch) {
    return { intent: 'reorder_specific', orderId: reorderMatch[1] };
  }
  if (
    query.includes('reorder my last order') ||
    query.includes('reorder last order') ||
    query === 'reorder'
  ) {
    return { intent: 'reorder_last' };
  }

  // Phase 6.7: Order Tracking & Live Shipping
  if (
    query.includes('where is my order') ||
    query.includes('track my order') ||
    query.includes('track order') ||
    query.includes('track shipment') ||
    query.includes('where is my package') ||
    query.includes('order status')
  ) {
    return { intent: 'order_tracking' };
  }

  // Phase 6.7: Tracking Number
  if (
    query.includes('what is my tracking number') ||
    query.includes('tracking number') ||
    query.includes('show tracking number') ||
    query.includes('my tracking code')
  ) {
    return { intent: 'tracking_number' };
  }

  // Phase 6.7: Recent Orders
  if (
    query.includes('show my recent orders') ||
    query.includes('recent orders') ||
    query.includes('what did i order recently') ||
    query.includes('latest order')
  ) {
    return { intent: 'recent_orders' };
  }

  // Phase 6.7: Rewards & Points Balance
  if (
    query.includes('show my rewards') ||
    query.includes('my rewards') ||
    query.includes('how many points do i have') ||
    query.includes('what is my points balance') ||
    query.includes('check points') ||
    query.includes('points balance')
  ) {
    return { intent: 'rewards_points' };
  }

  // Phase 6.7: Loyalty Tier
  if (
    query.includes('what is my loyalty tier') ||
    query.includes('my tier') ||
    query.includes('loyalty tier') ||
    query.includes('am i gold or platinum') ||
    query.includes('membership tier')
  ) {
    return { intent: 'loyalty_tier' };
  }

  // Phase 6.7: How to Redeem Points
  if (
    query.includes('how can i redeem points') ||
    query.includes('how to redeem points') ||
    query.includes('redeem points') ||
    query.includes('how to use points') ||
    query.includes('how to use rewards') ||
    query.includes('how do points work')
  ) {
    return { intent: 'rewards_redeem_info' };
  }

  // Phase 6.7: Saved Addresses
  if (
    query.includes('show my saved addresses') ||
    query.includes('saved addresses') ||
    query.includes('my addresses') ||
    query.includes('what addresses do i have') ||
    query.includes('address book')
  ) {
    return { intent: 'saved_addresses' };
  }

  // Phase 6.7: Default Address
  if (
    query.includes('what is my default address') ||
    query.includes('default address') ||
    query.includes('where will my orders ship') ||
    query.includes('primary address')
  ) {
    return { intent: 'default_address' };
  }

  // Phase 6.7: Review Guide
  if (
    query.includes('how do i write a review') ||
    query.includes('how to write a review') ||
    query.includes('write a review') ||
    query.includes('submit review')
  ) {
    return { intent: 'write_review_guide' };
  }

  // Phase 6.7: Show Reviews
  if (
    query.includes('show my reviews') ||
    query.includes('my reviews') ||
    query.includes('product reviews')
  ) {
    return { intent: 'show_reviews' };
  }

  // Phase 6.7: Product Rating
  if (
    query.includes('rating of') ||
    query.includes('rating for') ||
    (query.includes('how is') && query.includes('rated'))
  ) {
    return { intent: 'product_rating', query };
  }

  // Phase 6.7: Product Stock / Inventory
  if (
    query.includes('in stock') ||
    query.includes('are left') ||
    query.includes('stock of') ||
    query.includes('is available')
  ) {
    return { intent: 'product_stock', query };
  }

  // Phase 6.7: Invoice / Receipt
  if (
    query.includes('print my invoice') ||
    query.includes('show my invoice') ||
    query.includes('print invoice') ||
    query.includes('download receipt') ||
    query.includes('my invoice') ||
    query.includes('view invoice') ||
    query.includes('get invoice')
  ) {
    return { intent: 'show_invoice' };
  }

  // Phase 5: Order History
  if (
    query.includes('order history') ||
    query.includes('my orders') ||
    query.includes('show my orders') ||
    query.includes('what have i bought') ||
    query.includes('what have i ordered') ||
    query === 'orders'
  ) {
    return { intent: 'order_history' };
  }

  // Phase 5: Spending Query
  if (
    query.includes('how much have i spent') ||
    query.includes('how much did i spend') ||
    query.includes('total spending') ||
    query.includes('my spending') ||
    query === 'spending'
  ) {
    return { intent: 'analytics_spending' };
  }

  // Phase 5: Favorite Category
  if (
    query.includes('favorite category') ||
    query.includes('favourite category') ||
    query.includes('top category') ||
    query.includes('what category do i buy most') ||
    query.includes("what's my favorite category")
  ) {
    return { intent: 'analytics_favorite_category' };
  }

  // Phase 5: Most Purchased Products
  if (
    query.includes('what do i buy most') ||
    query.includes('top products') ||
    query.includes('most purchased') ||
    query.includes('what have i bought the most')
  ) {
    return { intent: 'analytics_top_products' };
  }

  // Phase 5: Recently Viewed
  if (
    query.includes('recently viewed') ||
    query.includes('what did i view') ||
    query.includes('show recently viewed') ||
    query.includes('viewed products')
  ) {
    return { intent: 'recently_viewed' };
  }

  // Phase 5: Personalized Recommendations
  if (
    query.includes('recommend something for me') ||
    query.includes('personalized recommendation') ||
    query.includes('recommend for me') ||
    query.includes('recommendations for me') ||
    query.includes('recommended for you')
  ) {
    return { intent: 'personalized_recommendations' };
  }

  // Budget Search: "headphones under ₹3000", "shoes below 2000", "under 1000", "budget of 5000"
  const budget = extractBudget(query);
  if (budget !== null) {
    return { intent: 'budget_search', budget, query };
  }

  // Best Deal / Highest Savings
  if (
    query.includes('best deal') ||
    query.includes('best deals') ||
    query.includes('highest discount') ||
    query.includes('biggest savings') ||
    query.includes('discounts')
  ) {
    return { intent: 'best_deal', query };
  }

  // Best Rated / Top Rated Recommendations
  if (
    query.includes('best rated') ||
    query.includes('highest rated') ||
    query.includes('top rated') ||
    query.includes('best product') ||
    query.match(/\bbest\s+\w+\b/i) ||
    query.includes('what should i buy') ||
    query.includes('recommend')
  ) {
    return { intent: 'best_rated', query };
  }

  // Category Search
  const catMatch = query.match(/(electronics|fashion|home|beauty|sports|accessories)/i);
  if (catMatch && (query.includes('show') || query.includes('find') || query.includes('browse') || query.includes('products') || query.includes('something for'))) {
    return { intent: 'category_search', category: catMatch[1] };
  }

  // General Product Search: "show me headphones", "find running shoes", "do you have..."
  const searchMatch = query.match(/^(?:show\s+me|find|search\s+for|search|look\s+for|do\s+you\s+have|i\s+want)\s+(.+)$/i);
  if (searchMatch) {
    return { intent: 'product_search', searchTerm: searchMatch[1].trim() };
  }

  // Help / Capabilities
  if (query === 'help' || query.includes('what can you do') || query.includes('commands')) {
    return { intent: 'help' };
  }

  // Greetings
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query.startsWith('good morning') ||
    query.startsWith('good afternoon') ||
    query.startsWith('good evening')
  ) {
    return { intent: 'greeting' };
  }

  // Default natural search attempt if query contains letters
  if (query.length > 2) {
    return { intent: 'product_search', searchTerm: query };
  }

  return { intent: 'fallback' };
}

/**
 * 2. Budget Extractor
 */
function extractBudget(query) {
  const match = query.match(/(?:under|below|less than|budget of|max(?:imum)?)\s*₹?\$?(\d+)/i) ||
                query.match(/₹?\$?(\d+)\s*(?:budget|or less|max)\b/i) ||
                query.match(/(?:₹|\$)\s*(\d+)/i);
  return match ? parseFloat(match[1]) : null;
}

/**
 * 3. Intelligent Product Matcher
 */
function findProductByName(searchTerm) {
  if (!searchTerm) return null;
  const cleanTerm = searchTerm.toLowerCase().trim();

  // 1. Exact match
  let match = PRODUCTS.find(p => p.name.toLowerCase() === cleanTerm);
  if (match) return match;

  // 2. Direct inclusion
  match = PRODUCTS.find(p => p.name.toLowerCase().includes(cleanTerm) || cleanTerm.includes(p.name.toLowerCase()));
  if (match) return match;

  // 3. Token-based scoring
  const words = cleanTerm.split(/\s+/).filter(w => w.length > 2 && !['and', 'for', 'with', 'the', 'item', 'product'].includes(w));
  if (words.length === 0) return null;

  let bestProd = null;
  let bestScore = 0;

  for (const prod of PRODUCTS) {
    const pName = prod.name.toLowerCase();
    const pCat = prod.category.toLowerCase();
    const pDesc = prod.description.toLowerCase();
    let score = 0;

    for (const w of words) {
      if (pName.includes(w)) score += 3;
      else if (w.length >= 4 && pName.includes(w.substring(0, 4))) score += 2;
      else if (pCat.includes(w)) score += 2;
      else if (pDesc.includes(w)) score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestProd = prod;
    }
  }

  return bestScore >= 2 ? bestProd : null;
}

/**
 * 4. Natural Product Search Engine
 */
function searchProductsFromChat(query) {
  const clean = query.toLowerCase().replace(/^(?:show\s+me|find|search\s+for|look\s+for|do\s+you\s+have|i\s+want|something\s+for)\s+/i, '').trim();
  const words = clean.split(/\s+/).filter(w => w.length > 2);

  const matched = PRODUCTS.filter(prod => {
    const text = `${prod.name} ${prod.category} ${prod.description}`.toLowerCase();
    if (text.includes(clean)) return true;
    return words.some(w => text.includes(w));
  });

  return matched;
}

/**
 * 5. Best-Rated Products
 */
function getBestRatedProducts(category = null) {
  let list = [...PRODUCTS];
  if (category) {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
}

/**
 * 6. Best Deals (Highest Discount)
 */
function getBestDeals(category = null) {
  let list = [...PRODUCTS];
  if (category) {
    list = list.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  return list.sort((a, b) => {
    const discA = parseInt(a.discount, 10) || Math.round((1 - a.price / a.originalPrice) * 100);
    const discB = parseInt(b.discount, 10) || Math.round((1 - b.price / b.originalPrice) * 100);
    return discB - discA;
  });
}

/**
 * 7. Product Comparison Engine
 */
function compareProducts(prodA, prodB) {
  let verdict = '';
  if (prodA.price < prodB.price && prodA.rating >= prodB.rating) {
    verdict = `<strong>${prodA.name}</strong> offers superior value at <strong>${formatCurrency(prodA.price)}</strong> with an outstanding <strong>★ ${prodA.rating}</strong> rating!`;
  } else if (prodB.price < prodA.price && prodB.rating >= prodA.rating) {
    verdict = `<strong>${prodB.name}</strong> is the more cost-effective option at <strong>${formatCurrency(prodB.price)}</strong> with top-tier <strong>★ ${prodB.rating}</strong> reviews.`;
  } else if (prodA.rating > prodB.rating) {
    verdict = `<strong>${prodA.name}</strong> leads in quality with <strong>★ ${prodA.rating}</strong> (${prodA.reviewCount} reviews).`;
  } else {
    verdict = `Both are outstanding. If budget is key, <strong>${prodA.price <= prodB.price ? prodA.name : prodB.name}</strong> is the smarter choice.`;
  }

  return `
    <div class="chat-compare-wrapper">
      <table class="chat-compare-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>${prodA.name}</th>
            <th>${prodB.name}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Price</td>
            <td><strong>${formatCurrency(prodA.price)}</strong></td>
            <td><strong>${formatCurrency(prodB.price)}</strong></td>
          </tr>
          <tr>
            <td>Rating</td>
            <td>⭐ ${prodA.rating}</td>
            <td>⭐ ${prodB.rating}</td>
          </tr>
          <tr>
            <td>Reviews</td>
            <td>${prodA.reviewCount} reviews</td>
            <td>${prodB.reviewCount} reviews</td>
          </tr>
          <tr>
            <td>Discount</td>
            <td><span class="chat-discount-badge">${prodA.discount}</span></td>
            <td><span class="chat-discount-badge">${prodB.discount}</span></td>
          </tr>
          <tr>
            <td>Category</td>
            <td>${prodA.category}</td>
            <td>${prodB.category}</td>
          </tr>
        </tbody>
      </table>
      <div class="chat-compare-verdict">
        🏆 <strong>Verdict:</strong> ${verdict}
      </div>
    </div>
  `;
}

/**
 * Render Chatbot Order Cards (Phase 5)
 */
function renderChatOrderCards(orders) {
  if (!orders || orders.length === 0) return '';
  return orders.map(order => {
    const itemsCount = order.items.reduce((s, i) => s + (i.qty || 1), 0);
    return `
      <div class="chat-order-card" data-order-id="${order.orderId}">
        <div class="chat-order-header">
          <span class="chat-order-id">${order.orderId}</span>
          <span class="order-status-badge">● ${order.status || 'Confirmed'}</span>
        </div>
        <div class="chat-order-summary">
          <span>${order.date} · ${itemsCount} item${itemsCount !== 1 ? 's' : ''}</span>
          <strong style="color:var(--primary); font-weight:800;">${formatCurrency(order.total)}</strong>
        </div>
        <div class="chat-order-actions">
          <button class="chat-order-btn chat-order-view-btn" onclick="showOrderDetails('${order.orderId}')">View Details</button>
          <button class="chat-order-btn chat-order-reorder-btn" onclick="reorderItems('${order.orderId}')">Reorder 🛒</button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 8. Render Product Recommendation Cards
 */
function renderRecommendationCards(products) {
  if (!products || products.length === 0) return '';
  return products.map(prod => `
    <div class="chat-product-card" data-id="${prod.id}">
      <img src="${prod.image}" alt="${prod.name}" class="chat-product-thumb" onerror="this.src='${prod.fallbackImage}'">
      <div class="chat-product-info">
        <div class="chat-product-name">${prod.name}</div>
        <div class="chat-product-rating">★ ${prod.rating} <span style="color:var(--text-muted);font-weight:400;">(${prod.reviewCount})</span></div>
        <div class="chat-product-pricing">
          <span class="chat-product-price">${formatCurrency(prod.price)}</span>
          <span class="chat-discount-badge">${prod.discount}</span>
        </div>
      </div>
      <div class="chat-card-actions">
        <button class="chat-view-btn" onclick="openProductDetails(${prod.id})" aria-label="View ${prod.name}">View</button>
        <button class="chat-add-btn" onclick="window.handleChatAddToCart(${prod.id})" aria-label="Add ${prod.name} to cart">+ Cart</button>
      </div>
    </div>
  `).join('');
}

/**
 * 9. Render Quick Reply Buttons
 */
function renderQuickReplies(suggestions) {
  if (!suggestions || suggestions.length === 0) return '';
  return `
    <div class="chat-quick-replies">
      ${suggestions.map(s => `
        <button class="quick-reply-btn" onclick="ShopBot.sendUserMessage('${s.replace(/'/g, "\\'")}')">
          ${s}
        </button>
      `).join('')}
    </div>
  `;
}

/**
 * 10. Update Conversation Context
 */
function updateConversationContext(intent, products = [], topProduct = null, mentionedProduct = null) {
  conversationContext.lastIntent = intent;
  if (products && products.length > 0) {
    conversationContext.lastResults = products;
  }
  if (topProduct) {
    conversationContext.lastRecommendedProduct = topProduct;
  } else if (products && products.length > 0) {
    conversationContext.lastRecommendedProduct = products[0];
  }
  if (mentionedProduct) {
    conversationContext.lastMentionedProduct = mentionedProduct;
  } else if (topProduct) {
    conversationContext.lastMentionedProduct = topProduct;
  }
}

/**
 * Global Chat Add to Cart Action
 */
window.handleChatAddToCart = function(productId) {
  const prod = PRODUCTS.find(p => p.id === productId);
  if (!prod) return;
  window.addToCart(productId, 1);
  ShopBot.appendMessage('bot', `✓ Added <strong>${prod.name}</strong> to your cart. 🛒`, [], [
    'View Cart',
    'Checkout',
    'Show Best Deals'
  ]);
};

/**
 * Phase 5 Modular Helper: Recommendations Generator
 */
function generateRecommendations() {
  return getPersonalizedRecommendations();
}

/**
 * Phase 5 Modular Helper: Order Chat Intent Handler
 */
function handleOrderChatIntent(analysis) {
  if (analysis.intent === 'order_history') {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `Your order history is currently <strong>empty</strong>. When you complete an order, you can review its status and reorder items here!`,
        products: [],
        quickReplies: ['Show Electronics', 'Best Deals', 'Under ₹1000']
      };
    }
    return {
      html: `📦 Here is your order history (${orders.length} order${orders.length > 1 ? 's' : ''} placed):`,
      products: [],
      orders: orders.slice(0, 3),
      quickReplies: ['How much have I spent?', 'Reorder last order', "What's my favorite category?", 'View Cart']
    };
  }

  if (analysis.intent === 'reorder_last') {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `You don't have any past orders to reorder yet!`,
        products: [],
        quickReplies: ['Show Electronics', 'Best Deals']
      };
    }
    const latest = orders[0];
    reorderItems(latest.orderId);
    return {
      html: `I've reordered your last order (<strong>${latest.orderId}</strong>) and added its items to your cart! 🛒`,
      products: [],
      quickReplies: ['View Cart', 'Checkout', 'Show my orders']
    };
  }

  if (analysis.intent === 'reorder_specific') {
    const targetId = analysis.orderId.startsWith('#') ? analysis.orderId : `#${analysis.orderId}`;
    const orders = getOrders();
    const matched = orders.find(o => o.orderId.toLowerCase() === targetId.toLowerCase());
    if (matched) {
      reorderItems(matched.orderId);
      return {
        html: `I've reordered order <strong>${matched.orderId}</strong> and added its items to your cart! 🛒`,
        products: [],
        quickReplies: ['View Cart', 'Checkout', 'Show my orders']
      };
    } else {
      return {
        html: `I couldn't find order <strong>${escapeHtml(targetId)}</strong> in your order history.`,
        products: [],
        quickReplies: ['Show my orders', 'Show Electronics']
      };
    }
  }

  return null;
}

/**
 * Phase 5 Modular Helper: Analytics Chat Intent Handler
 */
function handleAnalyticsChatIntent(analysis) {
  if (analysis.intent === 'analytics_spending') {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `You haven't placed any orders yet. Complete your first order to unlock spending insights!`,
        products: [],
        quickReplies: ['Show Electronics', 'Best Deals', 'Under ₹2000']
      };
    }
    const { totalOrders, totalSpending, avgOrderValue } = calculateAnalytics();
    return {
      html: `You've placed <strong>${totalOrders}</strong> order${totalOrders > 1 ? 's' : ''} and spent <strong>${formatCurrency(totalSpending)}</strong> in total. Your average order value is <strong>${formatCurrency(avgOrderValue)}</strong>. 📊`,
      products: [],
      quickReplies: ["What's my favorite category?", 'Show my orders', 'What do I buy most?']
    };
  }

  if (analysis.intent === 'analytics_favorite_category') {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `You haven't placed any orders yet. Explore our categories like Electronics, Fashion, and Home to get started!`,
        products: [],
        quickReplies: ['Show Electronics', 'Show Fashion', 'Best Deals']
      };
    }
    const { topCategory } = calculateCategoryStats();
    if (!topCategory) {
      return {
        html: `You don't have a top category yet. Keep exploring the catalog!`,
        products: [],
        quickReplies: ['Show Electronics', 'Best Deals']
      };
    }
    return {
      html: `🏆 Your favorite category is <strong>${topCategory.category}</strong>, accounting for <strong>${topCategory.percent}%</strong> of your purchases (${topCategory.count} items)!`,
      products: [],
      quickReplies: [`Show ${topCategory.category}`, 'How much have I spent?', 'Show my orders']
    };
  }

  if (analysis.intent === 'analytics_top_products') {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `You haven't made any purchases yet! Discover our top-rated products to start.`,
        products: [],
        quickReplies: ['Best Rated', 'Best Deals', 'Show Electronics']
      };
    }
    const topProds = getTopProducts(3);
    const listHtml = topProds.map(p => `<li><strong>${escapeHtml(p.name)}</strong> (${p.count} purchased)</li>`).join('');
    return {
      html: `🛍️ Here are the products you purchase most:<ul style="margin:0.4rem 0 0.4rem 1.2rem;font-size:0.82rem;">${listHtml}</ul>`,
      products: topProds.map(p => PRODUCTS.find(prod => prod.id === p.id)).filter(Boolean),
      quickReplies: ['Reorder last order', 'Show my orders', 'Best Deals']
    };
  }

  return null;
}

/**
 * Phase 6.7 Modular Helper: Phase 6 Intents Handler (Tracking, Rewards, Addresses, Reviews, Inventory, Invoice)
 */
function handlePhase6ChatIntent(analysis, rawQuery) {
  const query = rawQuery.toLowerCase().trim();

  // 1. Order Tracking & Live Shipping
  if (
    analysis.intent === 'order_tracking' ||
    query.includes('where is my order') ||
    query.includes('track my order') ||
    query.includes('track order') ||
    query.includes('track shipment') ||
    query.includes('where is my package') ||
    query.includes('order status')
  ) {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `You don't have any placed orders yet! Place an order and you can track its real-time shipping status here. 📦`,
        products: [],
        quickReplies: ['Show Electronics', 'Best Deals', 'Help']
      };
    }
    const latest = orders[0];
    ensureOrderTracking(latest);
    return {
      html: `
        📍 <strong>Tracking Order ${latest.orderId}:</strong>
        <div style="margin: 0.4rem 0; font-size: 0.84rem; line-height: 1.5;">
          <div>📦 <strong>Status:</strong> ${latest.trackingStatus || latest.status || 'Confirmed'}</div>
          <div>🚚 <strong>Carrier:</strong> ${latest.carrier || 'BlueDart Express'}</div>
          <div>🔖 <strong>Tracking #:</strong> ${latest.trackingNumber || 'TRK-SPHERE-00000'}</div>
          <div>⏱️ <strong>Estimated Delivery:</strong> 3–5 Business Days</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.openOrderTracking('${latest.orderId}')" style="margin-top:0.4rem;">Open Live Tracking Stepper 🚀</button>
      `,
      products: [],
      quickReplies: ['What is my tracking number?', 'Show my recent orders', 'Print my invoice']
    };
  }

  // 2. Tracking Number
  if (
    analysis.intent === 'tracking_number' ||
    query.includes('what is my tracking number') ||
    query.includes('tracking number') ||
    query.includes('show tracking number')
  ) {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `You don't have any active orders to provide a tracking number for!`,
        products: [],
        quickReplies: ['Show Electronics', 'Best Deals']
      };
    }
    const latest = orders[0];
    ensureOrderTracking(latest);
    return {
      html: `Your latest order (<strong>${latest.orderId}</strong>) has tracking number: <strong style="color:var(--primary);">${latest.trackingNumber}</strong> via <strong>${latest.carrier}</strong>.`,
      products: [],
      quickReplies: ['Track my order', 'Show my recent orders', 'Print my invoice']
    };
  }

  // 3. Recent Orders
  if (
    analysis.intent === 'recent_orders' ||
    query.includes('show my recent orders') ||
    query.includes('recent orders') ||
    query.includes('what did i order recently')
  ) {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `You haven't placed any orders recently!`,
        products: [],
        quickReplies: ['Show Electronics', 'Best Deals']
      };
    }
    return {
      html: `📦 Here are your recent orders:`,
      products: [],
      orders: orders.slice(0, 3),
      quickReplies: ['Track my order', 'Show my rewards', 'How much have I spent?']
    };
  }

  // 4. Rewards Points Balance
  if (
    analysis.intent === 'rewards_points' ||
    query.includes('show my rewards') ||
    query.includes('my rewards') ||
    query.includes('how many points do i have') ||
    query.includes('what is my points balance') ||
    query.includes('points balance')
  ) {
    const rewards = getRewards();
    return {
      html: `
        ✨ <strong>Your SphereRewards Balance:</strong>
        <div style="margin: 0.4rem 0; font-size: 0.84rem; line-height: 1.5;">
          <div>🪙 <strong>Available Points:</strong> ${rewards.balance} pts (≈ ${formatCurrency(rewards.balance / 10)})</div>
          <div>👑 <strong>Loyalty Tier:</strong> ${rewards.tier}</div>
          <div>🌟 <strong>Lifetime Earned:</strong> ${rewards.lifetimePoints} pts</div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="window.scrollToRewardsOrOpenModal()" style="margin-top:0.4rem;">View Rewards Dashboard 👑</button>
      `,
      products: [],
      quickReplies: ['What is my loyalty tier?', 'How can I redeem points?', 'Show my recent orders']
    };
  }

  // 5. Loyalty Tier
  if (
    analysis.intent === 'loyalty_tier' ||
    query.includes('what is my loyalty tier') ||
    query.includes('my tier') ||
    query.includes('loyalty tier') ||
    query.includes('am i gold or platinum')
  ) {
    const rewards = getRewards();
    const progress = getTierProgress(rewards.lifetimePoints);
    let nextMsg = progress.nextTier
      ? `${progress.pointsNeeded} pts away from upgrading to <strong>${progress.nextTier}</strong> (${progress.progress}% complete)`
      : `You've achieved our highest VIP tier!`;
    return {
      html: `👑 You are a <strong>${rewards.tier} Member</strong> with <strong>${rewards.lifetimePoints}</strong> lifetime points. ${nextMsg}`,
      products: [],
      quickReplies: ['Show my rewards', 'How can I redeem points?', 'Best Deals']
    };
  }

  // 6. How to Redeem Points
  if (
    analysis.intent === 'rewards_redeem_info' ||
    query.includes('how can i redeem points') ||
    query.includes('how to redeem points') ||
    query.includes('redeem points') ||
    query.includes('how to use rewards')
  ) {
    return {
      html: `
        💡 <strong>How to Redeem SphereRewards:</strong>
        <p style="font-size:0.84rem; margin-top:0.3rem;">Every <strong>10 points = ₹1.00</strong> instant cash discount! During checkout, enter your desired points in the <em>Redeem SphereRewards</em> box or choose quick chips like 50, 100, or Max.</p>
      `,
      products: [],
      quickReplies: ['Show my rewards', 'What is my loyalty tier?', 'Checkout']
    };
  }

  // 7. Saved Addresses
  if (
    analysis.intent === 'saved_addresses' ||
    query.includes('show my saved addresses') ||
    query.includes('saved addresses') ||
    query.includes('my addresses') ||
    query.includes('what addresses do i have')
  ) {
    const addresses = getAddresses();
    const addrItems = addresses.map(a => `<li><strong>${escapeHtml(a.label)}</strong>: ${escapeHtml(a.addressLine)}, ${escapeHtml(a.city)}${a.isDefault ? ' (Default 📍)' : ''}</li>`).join('');
    return {
      html: `
        📍 You have <strong>${addresses.length}</strong> saved address${addresses.length > 1 ? 'es' : ''}:
        <ul style="margin:0.4rem 0 0.4rem 1.2rem; font-size:0.82rem; line-height:1.4;">${addrItems}</ul>
        <button class="btn btn-secondary btn-sm" onclick="window.openAddressBookModal()" style="margin-top:0.3rem;">Manage Address Book 📍</button>
      `,
      products: [],
      quickReplies: ['What is my default address?', 'Show my recent orders', 'Track my order']
    };
  }

  // 8. Default Address
  if (
    analysis.intent === 'default_address' ||
    query.includes('what is my default address') ||
    query.includes('default address') ||
    query.includes('where will my orders ship')
  ) {
    const def = getDefaultAddress();
    if (!def) {
      return {
        html: `You don't have a default delivery address set yet. You can add one in your Address Book!`,
        products: [],
        quickReplies: ['Show my saved addresses', 'Checkout']
      };
    }
    return {
      html: `📍 Your default shipping address is <strong>${escapeHtml(def.label)}</strong>: ${escapeHtml(def.addressLine)}, ${escapeHtml(def.city)}, ${escapeHtml(def.state)} ${escapeHtml(def.postalCode)}.`,
      products: [],
      quickReplies: ['Show my saved addresses', 'Track my order', 'Checkout']
    };
  }

  // 9. Reviews Guide & Summary
  if (
    analysis.intent === 'write_review_guide' ||
    query.includes('how do i write a review') ||
    query.includes('how to write a review') ||
    query.includes('write a review')
  ) {
    return {
      html: `⭐ To write a customer review, open any product in the catalog, click <strong>"Write a Review"</strong>, select your star rating, share your experience, and submit!`,
      products: [],
      quickReplies: ['Show Electronics', 'Best Rated', 'Show Best Deals']
    };
  }

  if (analysis.intent === 'show_reviews' || query.includes('show my reviews') || query.includes('my reviews')) {
    const reviews = getReviews();
    return {
      html: `📝 ShopSphere features <strong>${reviews.length} verified customer reviews</strong> across the catalog with an average rating of 4.8 ★!`,
      products: [],
      quickReplies: ['Best Rated', 'How do I write a review?', 'Show Electronics']
    };
  }

  // 10. Product Rating Inquiry
  if (query.includes('rating of') || query.includes('rating for') || (query.includes('how is') && query.includes('rated'))) {
    const cleanProd = query.replace(/^.*?(?:rating\s+(?:of|for)|how\s+is)\s+/i, '').replace(/\s+rated.*$/i, '').replace(/[?]/g, '').trim();
    const prod = findProductByName(cleanProd) || conversationContext.lastMentionedProduct || conversationContext.lastRecommendedProduct;
    if (prod) {
      updateConversationContext('product_rating', [prod], prod, prod);
      return {
        html: `⭐ <strong>${prod.name}</strong> has an average rating of <strong>${prod.rating} ★</strong> based on <strong>${prod.reviewCount} customer reviews</strong>!`,
        products: [prod],
        quickReplies: [`Add ${prod.name} to cart`, `Is ${prod.name} in stock?`, 'Best Rated']
      };
    }
  }

  // 11. Inventory / Stock Inquiry
  if (query.includes('in stock') || query.includes('are left') || query.includes('stock of') || query.includes('is available')) {
    const cleanProd = query
      .replace(/^.*?(?:is|stock\s+of|how\s+many)\s+/i, '')
      .replace(/\s+(?:in\s+stock|left|available).*$/i, '')
      .replace(/[?]/g, '')
      .trim();
    const prod = findProductByName(cleanProd) || conversationContext.lastMentionedProduct || conversationContext.lastRecommendedProduct;
    if (prod) {
      const stock = getProductStock(prod.id);
      let stockMsg = stock > 0 ? `In Stock (${stock} unit${stock > 1 ? 's' : ''} available)` : `Currently Out of Stock`;
      updateConversationContext('product_stock', [prod], prod, prod);
      return {
        html: `📦 <strong>${prod.name}</strong> is <strong>${stockMsg}</strong> at <strong>${formatCurrency(prod.price)}</strong>.`,
        products: [prod],
        quickReplies: stock > 0 ? [`Add ${prod.name} to cart`, 'View Cart', 'Checkout'] : ['Show Electronics', 'Best Deals']
      };
    }
  }

  // 12. Print / Show Invoice
  if (
    analysis.intent === 'show_invoice' ||
    query.includes('print my invoice') ||
    query.includes('show my invoice') ||
    query.includes('print invoice') ||
    query.includes('download receipt') ||
    query.includes('my invoice') ||
    query.includes('view invoice')
  ) {
    const orders = getOrders();
    if (orders.length === 0) {
      return {
        html: `You don't have any past orders yet to generate an invoice. Once you place an order, your official tax invoice will be available instantly! 🧾`,
        products: [],
        quickReplies: ['Show Electronics', 'Best Deals']
      };
    }
    const latest = orders[0];
    setTimeout(() => {
      window.openInvoiceModal(latest.orderId);
    }, 450);
    return {
      html: `🧾 Opening your tax invoice for Order <strong>${latest.orderId}</strong> now! You can preview and click <strong>"Print / Save PDF"</strong>.`,
      products: [],
      quickReplies: ['Track my order', 'Show my recent orders', 'Show my rewards']
    };
  }

  return null;
}

/**
 * Master ShopBot Object
 */
const ShopBot = {
  panel: null,
  triggerBtn: null,
  closeBtn: null,
  clearBtn: null,
  form: null,
  input: null,
  messagesContainer: null,
  isTyping: false,
  speechOutputEnabled: true,
  speechRecognition: null,
  isListening: false,

  init() {
    this.panel = document.getElementById('chatbotPanel');
    this.triggerBtn = document.getElementById('chatbotTrigger');
    this.closeBtn = document.getElementById('chatCloseBtn');
    this.clearBtn = document.getElementById('chatClearBtn');
    this.form = document.getElementById('chatForm');
    this.input = document.getElementById('chatInput');
    this.messagesContainer = document.getElementById('chatMessages');
    this.voiceBtn = document.getElementById('shopbotVoiceBtn');
    this.speechToggleBtn = document.getElementById('chatSpeechToggleBtn');

    const footerTrigger = document.getElementById('footerBotTrigger');
    if (footerTrigger) {
      footerTrigger.addEventListener('click', () => this.open());
    }

    if (this.triggerBtn) {
      this.triggerBtn.addEventListener('click', () => this.toggle());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => this.clear());
    }

    if (this.voiceBtn) {
      this.voiceBtn.addEventListener('click', () => this.toggleVoiceRecognition());
    }

    if (this.speechToggleBtn) {
      this.speechToggleBtn.addEventListener('click', () => this.toggleSpeechOutput());
    }

    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    // Accessible keyboard handling: Enter key sends message
    if (this.input) {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSubmit();
        }
      });
    }

    // Initial suggestion chips
    const chips = document.querySelectorAll('.chip-btn');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        if (query) {
          this.sendUserMessage(query);
        }
      });
    });

    this.initVoice();
  },

  initVoice() {
    const SpeechRec = (typeof window !== 'undefined') && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRec) {
      return;
    }
    try {
      this.speechRecognition = new SpeechRec();
      this.speechRecognition.continuous = false;
      this.speechRecognition.interimResults = true;
      this.speechRecognition.lang = 'en-US';

      this.speechRecognition.onstart = () => {
        this.isListening = true;
        this.updateVoiceUI(true);
      };

      this.speechRecognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        if (this.input) {
          this.input.value = finalTranscript || interimTranscript;
        }
        const statusText = document.getElementById('voiceStatusText');
        if (statusText && (finalTranscript || interimTranscript)) {
          statusText.textContent = `Heard: "${finalTranscript || interimTranscript}"`;
        }
        if (finalTranscript) {
          this.stopVoiceRecognition();
          setTimeout(() => {
            this.handleSubmit();
          }, 250);
        }
      };

      this.speechRecognition.onerror = (event) => {
        console.warn('Speech recognition notice:', event.error);
        this.stopVoiceRecognition();
      };

      this.speechRecognition.onend = () => {
        this.isListening = false;
        this.updateVoiceUI(false);
      };
    } catch (e) {
      console.warn('Could not initialize speech recognition:', e);
    }
  },

  toggleVoiceRecognition() {
    const SpeechRec = (typeof window !== 'undefined') && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRec) {
      showToast('Voice input is not supported in this browser. Please use text input.', 'ℹ️');
      return;
    }
    if (this.isListening) {
      this.stopVoiceRecognition();
    } else {
      this.startVoiceRecognition();
    }
  },

  startVoiceRecognition() {
    const SpeechRec = (typeof window !== 'undefined') && (window.SpeechRecognition || window.webkitSpeechRecognition);
    if (!SpeechRec) {
      showToast('Voice input is not supported in this browser.', 'ℹ️');
      return;
    }
    if (!this.speechRecognition) {
      this.initVoice();
    }
    if (!this.speechRecognition) return;

    try {
      this.speechRecognition.start();
    } catch (e) {
      console.warn('Speech recognition start error:', e);
    }
  },

  stopVoiceRecognition() {
    if (this.speechRecognition && this.isListening) {
      try {
        this.speechRecognition.stop();
      } catch (e) {}
    }
    this.isListening = false;
    this.updateVoiceUI(false);
  },

  updateVoiceUI(isListening) {
    const btn = document.getElementById('shopbotVoiceBtn');
    const statusWrap = document.getElementById('chatVoiceStatus');
    const micIcon = document.getElementById('voiceMicIcon');
    const statusText = document.getElementById('voiceStatusText');

    if (btn) {
      btn.classList.toggle('listening', isListening);
      btn.setAttribute('aria-pressed', String(isListening));
    }
    if (micIcon) {
      micIcon.textContent = isListening ? '🔴' : '🎙️';
    }
    if (statusWrap) {
      statusWrap.style.display = isListening ? 'flex' : 'none';
    }
    if (statusText && isListening) {
      statusText.textContent = 'Listening... Speak now';
    }
  },

  speak(htmlOrText) {
    if (!this.speechOutputEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const clean = htmlOrText.replace(/<[^>]*>?/gm, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
      if (!clean) return;
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      const toggleBtn = document.getElementById('chatSpeechToggleBtn');
      utterance.onstart = () => {
        if (toggleBtn) toggleBtn.classList.add('speaking');
      };
      utterance.onend = () => {
        if (toggleBtn) toggleBtn.classList.remove('speaking');
      };
      utterance.onerror = () => {
        if (toggleBtn) toggleBtn.classList.remove('speaking');
      };
      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  },

  toggleSpeechOutput() {
    this.speechOutputEnabled = !this.speechOutputEnabled;
    if (!this.speechOutputEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
    const btn = document.getElementById('chatSpeechToggleBtn');
    if (btn) {
      btn.textContent = this.speechOutputEnabled ? '🔊' : '🔇';
      btn.title = this.speechOutputEnabled ? 'Mute Voice Responses' : 'Enable Voice Responses';
    }
    showToast(`Voice responses ${this.speechOutputEnabled ? 'enabled 🔊' : 'muted 🔇'}`, 'ℹ️');
  },

  toggle() {
    if (!this.panel) return;
    const isHidden = this.panel.classList.contains('hidden');
    if (isHidden) {
      this.open();
    } else {
      this.close();
    }
  },

  open() {
    if (!this.panel) return;
    this.panel.classList.remove('hidden');
    if (this.input) {
      setTimeout(() => this.input.focus(), 150);
    }
  },

  close() {
    if (!this.panel) return;
    this.panel.classList.add('hidden');
  },

  clear() {
    if (!this.messagesContainer) return;
    this.messagesContainer.innerHTML = `
      <div class="chat-bubble bot-bubble">
        <div class="bubble-avatar">🤖</div>
        <div class="bubble-content">
          <p>Hi! I'm <strong>ShopBot</strong> with voice assist. You can type or tap the microphone to speak!</p>
          <div class="bubble-time">${this.formatTime()}</div>
        </div>
      </div>
    `;
    // Reset conversation context
    conversationContext.lastResults = [];
    conversationContext.lastRecommendedProduct = null;
    conversationContext.lastMentionedProduct = null;
    conversationContext.lastIntent = null;
    showToast('Conversation cleared 🧹');
  },

  formatTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  },

  handleSubmit() {
    if (!this.input) return;
    const query = this.input.value.trim();
    if (!query || this.isTyping) return;
    this.input.value = '';
    this.sendUserMessage(query);
  },

  sendUserMessage(text) {
    this.appendMessage('user', text);
    this.showTypingIndicator();

    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.generateResponse(text);
      this.appendMessage('bot', response.html, response.products, response.quickReplies, response.orders);
      if (this.speechOutputEnabled && response.html) {
        this.speak(response.html);
      }
    }, 400);
  },

  appendMessage(sender, contentHtml, productList = [], quickReplies = [], orderList = []) {
    if (!this.messagesContainer) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}-bubble`;

    if (sender === 'bot') {
      const cardsHtml = renderRecommendationCards(productList);
      const ordersHtml = renderChatOrderCards(orderList);
      const repliesHtml = renderQuickReplies(quickReplies);

      bubble.innerHTML = `
        <div class="bubble-avatar">🤖</div>
        <div class="bubble-content">
          <div>${contentHtml}</div>
          ${ordersHtml}
          ${cardsHtml}
          ${repliesHtml}
          <div class="bubble-time">${this.formatTime()}</div>
        </div>
      `;
    } else {
      bubble.innerHTML = `
        <div class="bubble-content">
          <div>${escapeHtml(contentHtml)}</div>
          <div class="bubble-time">${this.formatTime()}</div>
        </div>
      `;
    }

    this.messagesContainer.appendChild(bubble);
    this.scrollToBottom();
  },

  showTypingIndicator() {
    this.isTyping = true;
    const indicator = document.createElement('div');
    indicator.id = 'botTypingIndicator';
    indicator.className = 'chat-bubble bot-bubble';
    indicator.innerHTML = `
      <div class="bubble-avatar">🤖</div>
      <div class="bubble-content">
        <div class="typing-indicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    this.messagesContainer.appendChild(indicator);
    this.scrollToBottom();
  },

  hideTypingIndicator() {
    this.isTyping = false;
    const indicator = document.getElementById('botTypingIndicator');
    if (indicator) {
      indicator.remove();
    }
  },

  scrollToBottom() {
    if (!this.messagesContainer) return;
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  },

  /**
   * Main Intent Dispatcher & Response Generator
   */
  generateResponse(rawQuery) {
    const analysis = detectIntent(rawQuery, conversationContext);
    const query = rawQuery.toLowerCase().trim();

    // Phase 6.7: Check Phase 6 Assistant Intents (Tracking, Rewards, Addresses, Reviews, Inventory, Invoice)
    const phase6Resp = handlePhase6ChatIntent(analysis, rawQuery);
    if (phase6Resp) {
      updateConversationContext(analysis.intent);
      return phase6Resp;
    }

    // 1. INTENT: FOLLOW-UP BEST ("which one is best?", "which is best?")
    if (analysis.intent === 'follow_up_best') {
      const candidates = (conversationContext.lastResults && conversationContext.lastResults.length > 0)
        ? conversationContext.lastResults
        : PRODUCTS;

      const sorted = [...candidates].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
      const topPick = sorted[0];

      updateConversationContext('follow_up_best', sorted, topPick, topPick);

      return {
        html: `
          <p>🎧 <strong>My top pick is ${topPick.name}.</strong></p>
          <div style="margin: 0.4rem 0; font-size: 0.84rem; line-height: 1.5;">
            <div>⭐ <strong>${topPick.rating} rating</strong> (${topPick.reviewCount} reviews)</div>
            <div>💰 <strong>${formatCurrency(topPick.price)}</strong> <span style="text-decoration:line-through;color:var(--text-muted);font-size:0.75rem;">${formatCurrency(topPick.originalPrice)}</span></div>
            <div>🏷️ <strong>${topPick.discount}</strong></div>
          </div>
          <p style="font-size:0.82rem; color:var(--text-secondary);">It's currently one of the highest-rated choices in your catalog.</p>
        `,
        products: [topPick],
        quickReplies: ['Add to Cart', 'Compare', 'View Cart', 'Checkout']
      };
    }

    // 2. INTENT: FOLLOW-UP ADD ("add it to cart", "add that to cart", "add to cart")
    if (analysis.intent === 'follow_up_add') {
      const target = conversationContext.lastRecommendedProduct ||
                     conversationContext.lastMentionedProduct ||
                     (conversationContext.lastResults && conversationContext.lastResults[0]);

      if (target) {
        window.addToCart(target.id, 1);
        updateConversationContext('add_to_cart', [target], target, target);
        return {
          html: `Done! <strong>${target.name}</strong> has been added to your cart. 🛒`,
          products: [target],
          quickReplies: ['View Cart', 'Checkout', 'Show Best Deals']
        };
      } else {
        return {
          html: `Which product would you like to add? Let me know the item name or browse our featured categories!`,
          products: [],
          quickReplies: ['Show Electronics', 'Show Fashion', 'Best Deals']
        };
      }
    }

    // 3. INTENT: PRODUCT COMPARISON
    if (analysis.intent === 'product_comparison') {
      let prodA = null;
      let prodB = null;

      // Check if user specifically named two products
      const cleanCompare = query.replace(/^compare\s+/i, '');
      const parts = cleanCompare.split(/\s+(?:and|vs|versus|with)\s+/i);

      if (parts.length >= 2) {
        prodA = findProductByName(parts[0]);
        prodB = findProductByName(parts[1]);
      }

      // If user said "compare these products" or one product was not found, fallback to last results
      if (!prodA || !prodB) {
        if (conversationContext.lastResults && conversationContext.lastResults.length >= 2) {
          prodA = conversationContext.lastResults[0];
          prodB = conversationContext.lastResults[1];
        } else {
          // Compare first two products in catalog as a realistic fallback
          prodA = PRODUCTS[0];
          prodB = PRODUCTS[2];
        }
      }

      updateConversationContext('product_comparison', [prodA, prodB], prodA, prodB);

      return {
        html: `
          <p>⚖️ <strong>Product Comparison:</strong></p>
          ${compareProducts(prodA, prodB)}
        `,
        products: [prodA, prodB],
        quickReplies: ['Add to Cart', 'View Cart', 'Show Best Deals']
      };
    }

    // 4. INTENT: ADD TO CART BY NAME
    if (analysis.intent === 'add_to_cart') {
      const matched = findProductByName(analysis.targetTerm);
      if (matched) {
        window.addToCart(matched.id, 1);
        updateConversationContext('add_to_cart', [matched], matched, matched);
        return {
          html: `Done! <strong>${matched.name}</strong> has been added to your cart. 🛒`,
          products: [matched],
          quickReplies: ['View Cart', 'Checkout', 'Show Best Deals']
        };
      } else {
        return {
          html: `I couldn't find a product matching "<em>${escapeHtml(analysis.targetTerm)}</em>". Try checking the name or ask me for recommendations!`,
          products: [],
          quickReplies: ['Show Electronics', 'Show Fashion', 'Best Deals']
        };
      }
    }

    // 5. INTENT: REMOVE FROM CART
    if (analysis.intent === 'remove_from_cart') {
      const cart = getCart();
      const cleanTerm = analysis.targetTerm.toLowerCase().trim();
      const matchedItem = cart.find(i => i.name.toLowerCase().includes(cleanTerm) || cleanTerm.includes(i.name.toLowerCase()));

      if (matchedItem) {
        window.removeFromCart(matchedItem.id);
        updateConversationContext('remove_from_cart', [], null, null);
        return {
          html: `Removed <strong>${matchedItem.name}</strong> from your cart. 🗑️`,
          products: [],
          quickReplies: ['View Cart', 'Checkout', 'Best Deals']
        };
      } else {
        return {
          html: `I couldn't find "${escapeHtml(analysis.targetTerm)}" in your cart right now.`,
          products: [],
          quickReplies: ['View Cart', 'Show Best Deals']
        };
      }
    }

    // 6. INTENT: CLEAR CART
    if (analysis.intent === 'clear_cart') {
      saveCart([]);
      renderCart();
      updateConversationContext('clear_cart', [], null, null);
      return {
        html: `Your shopping cart has been cleared! 🛒`,
        products: [],
        quickReplies: ['Browse Electronics', 'Best Deals', 'Under ₹1000']
      };
    }

    // 7. INTENT: CART TOTAL
    if (analysis.intent === 'cart_total') {
      const totals = calculateCartTotals();
      const cart = getCart();

      if (cart.length === 0) {
        return {
          html: `Your cart is currently <strong>empty</strong>. Total is <strong>${formatCurrency(0)}</strong>.`,
          products: [],
          quickReplies: ['Show Electronics', 'Best Deals', 'Under ₹2000']
        };
      }

      return {
        html: `Your cart total is <strong>${formatCurrency(totals.total)}</strong> (Items: ${formatCurrency(totals.subtotal)}, Delivery: ${totals.deliveryFee === 0 ? 'FREE' : formatCurrency(totals.deliveryFee)}). Ready to checkout?`,
        products: [],
        quickReplies: ['Checkout', 'View Cart', 'Continue Shopping']
      };
    }

    // 8. INTENT: CART STATUS
    if (analysis.intent === 'cart_status') {
      openCart();
      const cart = getCart();

      if (cart.length === 0) {
        return {
          html: `Your cart is currently <strong>empty</strong>. Discover something you'll love from our catalog!`,
          products: [],
          quickReplies: ['Show Electronics', 'Best Deals', 'Under ₹1000']
        };
      }

      const totals = calculateCartTotals();
      const itemsList = cart.map(i => `<li><strong>${i.name}</strong> × ${i.qty} — ${formatCurrency(i.price * i.qty)}</li>`).join('');

      return {
        html: `
          <p>🛒 <strong>Here is what is in your cart (${cart.length} unique items):</strong></p>
          <ul style="margin: 0.4rem 0 0.4rem 1.2rem; font-size: 0.82rem;">${itemsList}</ul>
          <p><strong>Total: ${formatCurrency(totals.total)}</strong></p>
        `,
        products: [],
        quickReplies: ['Checkout', 'Clear Cart', 'Continue Shopping']
      };
    }

    // 9. INTENT: WISHLIST COMMANDS
    if (analysis.intent === 'wishlist_add') {
      const prod = findProductByName(analysis.targetTerm);
      if (prod) {
        let wishlist = getWishlist();
        if (!wishlist.includes(prod.id)) {
          wishlist.push(prod.id);
          saveWishlist(wishlist);
        }
        updateConversationContext('wishlist_add', [prod], prod, prod);
        return {
          html: `Saved <strong>${prod.name}</strong> to your Wishlist! ❤️`,
          products: [prod],
          quickReplies: ['Show Wishlist', 'View Cart', 'Best Deals']
        };
      }
    }

    if (analysis.intent === 'wishlist_remove') {
      const prod = findProductByName(analysis.targetTerm);
      if (prod) {
        let wishlist = getWishlist().filter(id => id !== prod.id);
        saveWishlist(wishlist);
        return {
          html: `Removed <strong>${prod.name}</strong> from your Wishlist.`,
          products: [],
          quickReplies: ['Show Wishlist', 'Show Best Deals']
        };
      }
    }

    if (analysis.intent === 'wishlist_status') {
      const wishlist = getWishlist();
      if (wishlist.length === 0) {
        return {
          html: `Your Wishlist is currently <strong>empty</strong>. Click the heart icon on any product to save it! ❤️`,
          products: [],
          quickReplies: ['Show Electronics', 'Best Deals']
        };
      }
      const wishProducts = PRODUCTS.filter(p => wishlist.includes(p.id));
      updateConversationContext('wishlist_status', wishProducts, wishProducts[0], wishProducts[0]);
      return {
        html: `❤️ Here are your <strong>${wishlist.length}</strong> saved item${wishlist.length > 1 ? 's' : ''}:`,
        products: wishProducts,
        quickReplies: ['View Cart', 'Checkout', 'Best Deals']
      };
    }

    // 10. INTENT: CHECKOUT
    if (analysis.intent === 'checkout') {
      const cart = getCart();
      if (cart.length === 0) {
        return {
          html: `Your cart is currently <strong>empty</strong>! Add an item before checking out.`,
          products: [],
          quickReplies: ['Show Electronics', 'Best Deals']
        };
      }
      openCheckout();
      const totals = calculateCartTotals();
      return {
        html: `Opening checkout for you! Your order total is <strong>${formatCurrency(totals.total)}</strong>. 💳`,
        products: [],
        quickReplies: ['View Cart', 'Continue Shopping']
      };
    }

    // 11. INTENT: BUDGET SEARCH
    if (analysis.intent === 'budget_search') {
      const budget = analysis.budget;
      let matches = PRODUCTS.filter(p => p.price <= budget);

      // Check if also searching for category or keyword (e.g. "headphones under 3000")
      const catMatch = query.match(/(headphones|shoes|electronics|fashion|home|beauty|sports|accessories)/i);
      if (catMatch) {
        const kw = catMatch[1].toLowerCase();
        const refined = matches.filter(p => p.name.toLowerCase().includes(kw) || p.category.toLowerCase().includes(kw) || p.description.toLowerCase().includes(kw));
        if (refined.length > 0) {
          matches = refined;
        }
      }

      // Sync page controls and update catalog
      if (budget <= 500) {
        catalogState.maxPrice = budget;
        syncPriceControls(budget);
      } else {
        catalogState.maxPrice = 500;
        syncPriceControls(500);
      }
      filterProducts();
      scrollToProducts();

      if (matches.length === 0) {
        return {
          html: `I couldn't find any products under <strong>${formatCurrency(budget)}</strong>. Our most affordable item is the <strong>Braided Leather Keychain</strong> at ${formatCurrency(22)}.`,
          products: [],
          quickReplies: ['Under ₹1000', 'Best Deals', 'Show Electronics']
        };
      }

      const topThree = matches.slice(0, 3);
      updateConversationContext('budget_search', topThree, topThree[0], topThree[0]);

      return {
        html: `💰 Found <strong>${matches.length}</strong> product${matches.length > 1 ? 's' : ''} under <strong>${formatCurrency(budget)}</strong>! Here are top recommendations:`,
        products: topThree,
        quickReplies: ['Which one is best?', 'Compare', 'Add to Cart', 'View Cart']
      };
    }

    // 12. INTENT: BEST RATED
    if (analysis.intent === 'best_rated') {
      // Check if category is mentioned
      let category = null;
      if (query.includes('headphone')) category = 'Electronics';
      else if (query.includes('shoe') || query.includes('fashion')) category = 'Fashion';
      else if (query.includes('home')) category = 'Home';
      else if (query.includes('beauty')) category = 'Beauty';
      else if (query.includes('sport')) category = 'Sports';

      const topRated = getBestRatedProducts(category);
      const topPick = topRated[0];

      catalogState.sortBy = 'rating-desc';
      syncSortControls('rating-desc');
      filterProducts();
      scrollToProducts();

      updateConversationContext('best_rated', topRated.slice(0, 3), topPick, topPick);

      return {
        html: `
          <p>🌟 <strong>My top recommendation is ${topPick.name}.</strong></p>
          <div style="margin: 0.4rem 0; font-size: 0.84rem; line-height: 1.5;">
            <div>⭐ <strong>${topPick.rating} rating</strong> from ${topPick.reviewCount} verified buyers</div>
            <div>💰 <strong>${formatCurrency(topPick.price)}</strong> <span style="text-decoration:line-through;color:var(--text-muted);font-size:0.75rem;">${formatCurrency(topPick.originalPrice)}</span></div>
            <div>🏷️ <strong>${topPick.discount}</strong> savings</div>
          </div>
          <p style="font-size:0.82rem; color:var(--text-secondary);">It's currently one of the highest-rated products in your catalog.</p>
        `,
        products: topRated.slice(0, 3),
        quickReplies: ['Add to Cart', 'Compare', 'View Cart', 'Best Deals']
      };
    }

    // 13. INTENT: BEST DEAL
    if (analysis.intent === 'best_deal') {
      const deals = getBestDeals();
      const topDeal = deals[0];

      catalogState.sortBy = 'discount-desc';
      syncSortControls('discount-desc');
      filterProducts();
      scrollToProducts();

      updateConversationContext('best_deal', deals.slice(0, 3), topDeal, topDeal);

      return {
        html: `
          <p>🔥 <strong>Top Deal: ${topDeal.name}</strong> offers our biggest discount (${topDeal.discount})!</p>
          <p style="font-size:0.82rem; color:var(--text-secondary); margin-top:0.2rem;">Here are our greatest savings right now:</p>
        `,
        products: deals.slice(0, 3),
        quickReplies: ['Add to Cart', 'Which one is best?', 'Compare', 'View Cart']
      };
    }

    // 14. INTENT: CATEGORY SEARCH
    if (analysis.intent === 'category_search') {
      const cat = analysis.category.charAt(0).toUpperCase() + analysis.category.slice(1);
      window.filterProductsByCategory(cat);
      scrollToProducts();

      const items = PRODUCTS.filter(p => p.category.toLowerCase() === cat.toLowerCase());
      updateConversationContext('category_search', items, items[0], items[0]);

      return {
        html: `✨ I've filtered the catalog to <strong>${cat}</strong> (${items.length} items found):`,
        products: items.slice(0, 3),
        quickReplies: ['Which one is best?', 'Show Best Rated', 'Under ₹1000', 'View Cart']
      };
    }

    // 15. INTENT: PRODUCT SEARCH
    if (analysis.intent === 'product_search') {
      const matches = searchProductsFromChat(analysis.searchTerm);

      if (matches.length > 0) {
        // Update catalog search bar as well
        catalogState.searchQuery = analysis.searchTerm;
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = analysis.searchTerm;
        filterProducts();
        scrollToProducts();

        const topPick = matches[0];
        updateConversationContext('product_search', matches, topPick, topPick);

        return {
          html: `🔍 Found <strong>${matches.length}</strong> product${matches.length > 1 ? 's' : ''} matching "<em>${escapeHtml(analysis.searchTerm)}</em>":`,
          products: matches.slice(0, 3),
          quickReplies: ['Which one is best?', 'Compare', 'Add to Cart', 'View Cart']
        };
      } else {
        // No results handling
        return {
          html: `I couldn't find a product matching that request.`,
          products: [],
          quickReplies: ['Browse Electronics', 'Under ₹1000', 'Best Deals']
        };
      }
    }

    // Phase 5: Modular Order Intent Handling
    const orderChatResponse = handleOrderChatIntent(analysis);
    if (orderChatResponse) return orderChatResponse;

    // Phase 5: Modular Analytics Intent Handling
    const analyticsChatResponse = handleAnalyticsChatIntent(analysis);
    if (analyticsChatResponse) return analyticsChatResponse;

    // Phase 5: INTENT - RECENTLY VIEWED
    if (analysis.intent === 'recently_viewed') {
      const ids = getRecentlyViewed();
      if (ids.length === 0) {
        return {
          html: `You haven't viewed any products recently. Click on any product card in the catalog to inspect it!`,
          products: [],
          quickReplies: ['Show Electronics', 'Best Deals', 'Under ₹1000']
        };
      }
      const viewedProducts = ids.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
      return {
        html: `👀 Here are products you recently inspected:`,
        products: viewedProducts.slice(0, 4),
        quickReplies: ['Which one is best?', 'Compare', 'View Cart']
      };
    }

    // Phase 5: INTENT - PERSONALIZED RECOMMENDATIONS
    if (analysis.intent === 'personalized_recommendations') {
      const { rationale, products } = getPersonalizedRecommendations();
      return {
        html: `✨ <strong>Personalized Recommendations</strong> (${rationale}):`,
        products: products,
        quickReplies: ['Which one is best?', 'Compare', 'Add to Cart', 'View Cart']
      };
    }

    // 16. INTENT: HELP
    if (analysis.intent === 'help') {
      return {
        html: `
          <p>🤖 <strong>Here's what I can do for you:</strong></p>
          <ul style="margin: 0.4rem 0 0.4rem 1.2rem; font-size: 0.82rem; line-height: 1.5;">
            <li><strong>Natural Search:</strong> "find running shoes", "show electronics"</li>
            <li><strong>Budget Search:</strong> "headphones under ₹3000", "shoes below 2000"</li>
            <li><strong>Recommendations:</strong> "best headphones", "recommend something for me"</li>
            <li><strong>Comparisons:</strong> "compare Aura Sound Pro and PulseTech Smartwatch"</li>
            <li><strong>Orders &amp; Reorder:</strong> "show my orders", "reorder my last order"</li>
            <li><strong>Spending &amp; Analytics:</strong> "how much have I spent?", "what's my favorite category?"</li>
            <li><strong>Cart Management:</strong> "add it to cart", "remove headphones", "clear cart", "checkout"</li>
          </ul>
        `,
        products: [],
        quickReplies: ['Show my orders', 'How much have I spent?', 'Best Deals', 'View Cart']
      };
    }

    // 17. INTENT: GREETING
    if (analysis.intent === 'greeting') {
      return {
        html: `Hello there! 👋 I am <strong>ShopBot</strong>, your smart AI shopping assistant. What can I find for you today?`,
        products: [],
        quickReplies: ['Show Electronics', 'Show my orders', 'How much have I spent?', 'Best Deals']
      };
    }

    // 18. NO-RESULT FALLBACK
    return {
      html: `I couldn't find a product matching that request.`,
      products: [],
      quickReplies: ['Browse Electronics', 'Under ₹1000', 'Best Deals']
    };
  }
};

function scrollToProducts() {
  const productsSection = document.getElementById('products');
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// -----------------------------------------------------------------------------
// 12. CONTROLS, EVENTS & INITIALIZATION
// -----------------------------------------------------------------------------
function syncPriceControls(val) {
  const priceSlider = document.getElementById('priceRange');
  const priceDisplay = document.getElementById('priceDisplay');
  const drawerSlider = document.getElementById('drawerPriceRange');
  const drawerDisplay = document.getElementById('drawerPriceDisplay');

  if (priceSlider) priceSlider.value = val;
  if (priceDisplay) priceDisplay.textContent = formatCurrency(val);
  if (drawerSlider) drawerSlider.value = val;
  if (drawerDisplay) drawerDisplay.textContent = formatCurrency(val);
}

function syncRatingControls(val) {
  const ratingSelect = document.getElementById('ratingFilter');
  const drawerRatingSelect = document.getElementById('drawerRatingFilter');

  if (ratingSelect) ratingSelect.value = val;
  if (drawerRatingSelect) drawerRatingSelect.value = val;
}

function syncSortControls(val) {
  const sortSelect = document.getElementById('sortBy');
  const drawerSortSelect = document.getElementById('drawerSortBy');

  if (sortSelect) sortSelect.value = val;
  if (drawerSortSelect) drawerSortSelect.value = val;
}

function updateMobileBadge() {
  const badge = document.getElementById('mobileFilterBadge');
  if (!badge) return;

  let activeCount = 0;
  if (catalogState.searchQuery) activeCount++;
  if (catalogState.category !== 'all') activeCount++;
  if (catalogState.maxPrice < 500) activeCount++;
  if (catalogState.minRating > 0) activeCount++;
  if (catalogState.sortBy !== 'featured') activeCount++;

  if (activeCount > 0) {
    badge.textContent = activeCount;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

window.filterProductsByCategory = function(categoryName) {
  catalogState.category = categoryName;

  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    const filterVal = tab.getAttribute('data-filter');
    const isActive = filterVal.toLowerCase() === categoryName.toLowerCase();
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  const drawerPills = document.querySelectorAll('.drawer-pill');
  drawerPills.forEach(pill => {
    const filterVal = pill.getAttribute('data-drawer-cat');
    const isActive = filterVal.toLowerCase() === categoryName.toLowerCase();
    pill.classList.toggle('active', isActive);
  });

  filterProducts();
};

window.clearAllFilters = function() {
  catalogState.searchQuery = '';
  catalogState.category = 'all';
  catalogState.maxPrice = 500;
  catalogState.minRating = 0;
  catalogState.sortBy = 'featured';

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  const searchClearBtn = document.getElementById('searchClearBtn');
  if (searchClearBtn) searchClearBtn.classList.remove('visible');

  syncPriceControls(500);
  syncRatingControls('all');
  syncSortControls('featured');

  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    const isAll = tab.getAttribute('data-filter') === 'all';
    tab.classList.toggle('active', isAll);
    tab.setAttribute('aria-selected', isAll ? 'true' : 'false');
  });

  const drawerPills = document.querySelectorAll('.drawer-pill');
  drawerPills.forEach(pill => {
    const isAll = pill.getAttribute('data-drawer-cat') === 'all';
    pill.classList.toggle('active', isAll);
  });

  filterProducts();
  showToast('All filters cleared 🧹');
};

window.toggleWishlist = function(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showToast(`Removed from Wishlist.`, '💔');
  } else {
    wishlist.push(productId);
    showToast(`Saved "${product.name}" to Wishlist! ❤️`);
  }

  saveWishlist(wishlist);
  filterProducts();

  // If details modal open, update wishlist button in details
  if (currentDetailProductId === productId) {
    const isWishlisted = wishlist.includes(productId);
    const wishlistBtn = document.getElementById('detailWishlistBtn');
    const wishlistText = document.getElementById('detailWishlistText');
    if (wishlistBtn) {
      wishlistBtn.classList.toggle('active', isWishlisted);
      if (wishlistText) wishlistText.textContent = isWishlisted ? 'Saved' : 'Wishlist';
    }
  }
};

function initCatalogControls() {
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchProducts(e.target.value);
    });
  }

  if (searchClearBtn) {
    searchClearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchProducts('');
      if (searchInput) searchInput.focus();
    });
  }

  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.getAttribute('data-filter');
      window.filterProductsByCategory(cat);
    });
  });

  const priceRange = document.getElementById('priceRange');
  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      catalogState.maxPrice = val;
      syncPriceControls(val);
      filterProducts();
    });
  }

  const ratingFilter = document.getElementById('ratingFilter');
  if (ratingFilter) {
    ratingFilter.addEventListener('change', (e) => {
      const val = e.target.value;
      catalogState.minRating = val === 'all' ? 0 : parseFloat(val);
      syncRatingControls(val);
      filterProducts();
    });
  }

  const sortBy = document.getElementById('sortBy');
  if (sortBy) {
    sortBy.addEventListener('change', (e) => {
      catalogState.sortBy = e.target.value;
      syncSortControls(e.target.value);
      filterProducts();
    });
  }

  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
      window.clearAllFilters();
    });
  }

  // Mobile Filter Drawer
  const mobileFilterTriggerBtn = document.getElementById('mobileFilterTriggerBtn');
  const mobileFilterDrawer = document.getElementById('mobileFilterDrawer');
  const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerApplyBtn = document.getElementById('drawerApplyBtn');
  const drawerResetBtn = document.getElementById('drawerResetBtn');
  const drawerPriceRange = document.getElementById('drawerPriceRange');
  const drawerRatingFilter = document.getElementById('drawerRatingFilter');
  const drawerSortBy = document.getElementById('drawerSortBy');

  function openMobileFilter() {
    if (mobileFilterDrawer) mobileFilterDrawer.classList.add('active');
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.add('active');
  }

  function closeMobileFilter() {
    if (mobileFilterDrawer) mobileFilterDrawer.classList.remove('active');
    if (mobileDrawerOverlay) mobileDrawerOverlay.classList.remove('active');
  }

  if (mobileFilterTriggerBtn) mobileFilterTriggerBtn.addEventListener('click', openMobileFilter);
  if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileFilter);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileFilter);

  if (drawerApplyBtn) {
    drawerApplyBtn.addEventListener('click', () => {
      closeMobileFilter();
      showToast('Filters applied! 🎯');
    });
  }

  if (drawerResetBtn) {
    drawerResetBtn.addEventListener('click', () => {
      window.clearAllFilters();
      closeMobileFilter();
    });
  }

  const drawerPills = document.querySelectorAll('.drawer-pill');
  drawerPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-drawer-cat');
      window.filterProductsByCategory(cat);
    });
  });

  if (drawerPriceRange) {
    drawerPriceRange.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      catalogState.maxPrice = val;
      syncPriceControls(val);
      filterProducts();
    });
  }

  if (drawerRatingFilter) {
    drawerRatingFilter.addEventListener('change', (e) => {
      const val = e.target.value;
      catalogState.minRating = val === 'all' ? 0 : parseFloat(val);
      syncRatingControls(val);
      filterProducts();
    });
  }

  if (drawerSortBy) {
    drawerSortBy.addEventListener('change', (e) => {
      const val = e.target.value;
      catalogState.sortBy = val;
      syncSortControls(val);
      filterProducts();
    });
  }
}

function initPhase3Modals() {
  // 1. Product Details Modal Listeners
  const detailOverlay = document.getElementById('productDetailsOverlay');
  const detailCloseBtn = document.getElementById('productDetailsCloseBtn');
  const detailMinus = document.getElementById('detailQtyMinus');
  const detailPlus = document.getElementById('detailQtyPlus');
  const detailQtyInput = document.getElementById('detailQtyInput');
  const detailAddBtn = document.getElementById('detailAddToCartBtn');
  const detailWishBtn = document.getElementById('detailWishlistBtn');

  if (detailOverlay) detailOverlay.addEventListener('click', closeProductDetails);
  if (detailCloseBtn) detailCloseBtn.addEventListener('click', closeProductDetails);

  if (detailMinus) {
    detailMinus.addEventListener('click', () => {
      if (!detailQtyInput) return;
      const current = parseInt(detailQtyInput.value, 10) || 1;
      if (current > 1) {
        detailQtyInput.value = current - 1;
      }
    });
  }

  if (detailPlus) {
    detailPlus.addEventListener('click', () => {
      if (!detailQtyInput) return;
      const current = parseInt(detailQtyInput.value, 10) || 1;
      const stock = currentDetailProductId ? getProductStock(currentDetailProductId) : 99;
      if (current < stock && current < 99) {
        detailQtyInput.value = current + 1;
      } else {
        showToast(`Maximum available quantity reached (${stock})`, '⚠️');
      }
    });
  }

  if (detailAddBtn) {
    detailAddBtn.addEventListener('click', () => {
      if (!currentDetailProductId) return;
      const qty = parseInt(detailQtyInput ? detailQtyInput.value : 1, 10) || 1;
      window.addToCart(currentDetailProductId, qty);
    });
  }

  if (detailWishBtn) {
    detailWishBtn.addEventListener('click', () => {
      if (!currentDetailProductId) return;
      window.toggleWishlist(currentDetailProductId);
    });
  }

  // 2. Cart Drawer Listeners
  const cartBtn = document.getElementById('cartBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  const couponForm = document.getElementById('cartCouponForm');
  const couponInput = document.getElementById('couponInput');
  const removeCouponBtn = document.getElementById('removeCouponBtn');
  const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');

  if (cartBtn) {
    cartBtn.addEventListener('click', openCart);
  }

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  if (couponForm) {
    couponForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (couponInput) {
        applyCoupon(couponInput.value);
      }
    });
  }

  if (removeCouponBtn) {
    removeCouponBtn.addEventListener('click', removeCoupon);
  }

  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', openCheckout);
  }

  // 3. Checkout Modal Listeners
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');

  if (checkoutOverlay) checkoutOverlay.addEventListener('click', closeCheckout);
  if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', closeCheckout);

  paymentRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const selected = e.target.value;
      const cardLabel = document.getElementById('cardOptionLabel');
      const upiLabel = document.getElementById('upiOptionLabel');
      const codLabel = document.getElementById('codOptionLabel');
      const cardBox = document.getElementById('cardDetailsBox');
      const upiBox = document.getElementById('upiDetailsBox');
      const codBox = document.getElementById('codDetailsBox');

      if (cardLabel) cardLabel.classList.toggle('active', selected === 'card');
      if (upiLabel) upiLabel.classList.toggle('active', selected === 'upi');
      if (codLabel) codLabel.classList.toggle('active', selected === 'cod');

      if (cardBox) cardBox.style.display = selected === 'card' ? 'block' : 'none';
      if (upiBox) upiBox.style.display = selected === 'upi' ? 'block' : 'none';
      if (codBox) codBox.style.display = selected === 'cod' ? 'block' : 'none';
    });
  });

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      placeOrder();
    });
  }

  // 4. Order Confirmation Modal Listeners
  const confirmOverlay = document.getElementById('orderConfirmationOverlay');
  const confirmBtn = document.getElementById('confirmationContinueBtn');

  if (confirmOverlay) confirmOverlay.addEventListener('click', closeOrderConfirmation);
  if (confirmBtn) confirmBtn.addEventListener('click', closeOrderConfirmation);

  // 5. Order Details Modal Listeners (Phase 5)
  const orderDetailsOverlay = document.getElementById('orderDetailsOverlay');
  const orderDetailsCloseBtn = document.getElementById('orderDetailsCloseBtn');
  const detailOrderCloseBottomBtn = document.getElementById('detailOrderCloseBottomBtn');

  if (orderDetailsOverlay) orderDetailsOverlay.addEventListener('click', closeOrderDetails);
  if (orderDetailsCloseBtn) orderDetailsCloseBtn.addEventListener('click', closeOrderDetails);
  if (detailOrderCloseBottomBtn) detailOrderCloseBottomBtn.addEventListener('click', closeOrderDetails);

  // Global Escape Key to close open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductDetails();
      closeCart();
      closeCheckout();
      closeOrderConfirmation();
      closeOrderDetails();
    }
  });
}

function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDropdown = document.getElementById('mobileNavDropdown');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavDropdown) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavDropdown.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDropdown.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      const wishlist = getWishlist();
      if (wishlist.length === 0) {
        showToast('Your Wishlist is empty. Click the heart on any product to save it!', '❤️');
      } else {
        showToast(`You have ${wishlist.length} item(s) in your Wishlist.`, '❤️');
      }
    });
  }

  const copyCouponBtn = document.getElementById('copyCouponBtn');
  if (copyCouponBtn) {
    copyCouponBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('SMART20').then(() => {
        showToast('Coupon SMART20 copied to clipboard! 📋', '🎉');
      }).catch(() => {
        showToast('Coupon code: SMART20', '🏷️');
      });
    });
  }

  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      if (cat) {
        window.filterProductsByCategory(cat);
        scrollToProducts();
      }
    });
  });
}

// Expose core functions on window for external / modal access
window.filterProducts = filterProducts;
window.openProductDetails = openProductDetails;
window.closeProductDetails = closeProductDetails;
window.handleCardClick = window.handleProductCardClick;
window.openCart = openCart;
window.closeCart = closeCart;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.placeOrder = placeOrder;
window.detectIntent = detectIntent;
window.extractBudget = extractBudget;
window.compareProducts = compareProducts;
window.searchProductsFromChat = searchProductsFromChat;
window.getBestRatedProducts = getBestRatedProducts;
window.getBestDeals = getBestDeals;
window.findProductByName = findProductByName;
window.conversationContext = conversationContext;
window.ShopBot = ShopBot;
window.PRODUCTS = PRODUCTS;
window.getCart = getCart;
window.saveCart = saveCart;
window.getWishlist = getWishlist;
window.saveWishlist = saveWishlist;
window.calculateCartTotals = calculateCartTotals;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.filterProducts = filterProducts;

// Phase 5 window exposures
window.saveOrder = saveOrder;
window.getOrders = getOrders;
window.renderOrderHistory = renderOrderHistory;
window.showOrderDetails = showOrderDetails;
window.closeOrderDetails = closeOrderDetails;
window.reorderItems = reorderItems;
window.trackRecentlyViewed = trackRecentlyViewed;
window.getRecentlyViewed = getRecentlyViewed;
window.saveRecentlyViewed = saveRecentlyViewed;
window.renderRecentlyViewed = renderRecentlyViewed;
window.calculateAnalytics = calculateAnalytics;
window.calculateCategoryStats = calculateCategoryStats;
window.getTopProducts = getTopProducts;
window.renderAnalytics = renderAnalytics;
window.getPersonalizedRecommendations = getPersonalizedRecommendations;
window.generateRecommendations = generateRecommendations;
window.renderPersonalizedRecommendations = renderPersonalizedRecommendations;
window.handleOrderChatIntent = handleOrderChatIntent;
window.handleAnalyticsChatIntent = handleAnalyticsChatIntent;

// Phase 6.1 window exposures
window.DEFAULT_INITIAL_INVENTORY = DEFAULT_INITIAL_INVENTORY;
window.getInventory = getInventory;
window.saveInventory = saveInventory;
window.getProductStock = getProductStock;
window.isProductInStock = isProductInStock;
window.decrementStock = decrementStock;
window.restockProduct = restockProduct;

// Phase 6.2 window exposures
window.DEFAULT_INITIAL_REVIEWS = DEFAULT_INITIAL_REVIEWS;
window.getReviews = getReviews;
window.saveReviews = saveReviews;
window.getProductReviews = getProductReviews;
window.calculateProductRating = calculateProductRating;
window.addReview = addReview;
window.setStarRating = setStarRating;
window.toggleReviewForm = toggleReviewForm;
window.filterReviewsByRating = filterReviewsByRating;
window.sortReviews = sortReviews;
window.renderProductReviews = renderProductReviews;
window.handleReviewSubmit = handleReviewSubmit;

// Phase 6.3 window exposures
window.DEFAULT_INITIAL_ADDRESSES = DEFAULT_INITIAL_ADDRESSES;
window.getAddresses = getAddresses;
window.saveAddresses = saveAddresses;
window.getDefaultAddress = getDefaultAddress;
window.addAddress = addAddress;
window.updateAddress = updateAddress;
window.deleteAddress = deleteAddress;
window.setDefaultAddress = setDefaultAddress;
window.selectCheckoutAddress = selectCheckoutAddress;
window.renderCheckoutAddressChips = renderCheckoutAddressChips;
window.openAddressBookModal = openAddressBookModal;
window.closeAddressBookModal = closeAddressBookModal;
window.renderAddressBook = renderAddressBook;
window.useAddressForCheckout = useAddressForCheckout;
window.toggleAddressForm = toggleAddressForm;
window.editAddress = editAddress;
window.handleAddressFormSubmit = handleAddressFormSubmit;
window.toggleCheckoutAddressLabel = toggleCheckoutAddressLabel;

// Phase 6.4 window exposures
window.DEFAULT_INITIAL_REWARDS = DEFAULT_INITIAL_REWARDS;
window.getRewards = getRewards;
window.saveRewards = saveRewards;
window.calculateTier = calculateTier;
window.getTierProgress = getTierProgress;
window.calculateEarnedPoints = calculateEarnedPoints;
window.awardOrderPoints = awardOrderPoints;
window.applyRewardsRedemption = applyRewardsRedemption;
window.removeRewardsRedemption = removeRewardsRedemption;
window.quickSetRewardsPoints = quickSetRewardsPoints;
window.renderRewardsNavBadge = renderRewardsNavBadge;
window.renderRewardsDashboard = renderRewardsDashboard;
window.scrollToRewardsOrOpenModal = scrollToRewardsOrOpenModal;

// Phase 6.5 window exposures
window.TRACKING_STAGES = TRACKING_STAGES;
window.generateTrackingNumber = generateTrackingNumber;
window.ensureOrderTracking = ensureOrderTracking;
window.openOrderTracking = openOrderTracking;
window.closeOrderTracking = closeOrderTracking;
window.trackCurrentDetailOrder = trackCurrentDetailOrder;
window.renderTrackingModal = renderTrackingModal;
window.advanceOrderTrackingStage = advanceOrderTrackingStage;

// Phase 6.6 window exposures
window.openInvoiceModal = openInvoiceModal;
window.closeInvoiceModal = closeInvoiceModal;
window.printInvoice = printInvoice;
window.printCurrentDetailOrderInvoice = printCurrentDetailOrderInvoice;

// Phase 6.7 window exposures
window.ShopBot = ShopBot;
window.handlePhase6ChatIntent = handlePhase6ChatIntent;

// Phase 7.1 window exposures
window.switchRecommendationMode = switchRecommendationMode;
window.getCuratedRecommendations = getCuratedRecommendations;
window.getViewedRecommendations = getViewedRecommendations;
window.getBuyAgainRecommendations = getBuyAgainRecommendations;
window.getTrendingRecommendations = getTrendingRecommendations;
window.initRecommendationTabs = initRecommendationTabs;

// -----------------------------------------------------------------------------
// 13. INITIALIZATION ON DOM READY
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  getInventory();
  getReviews();
  getAddresses();
  getRewards();
  initCatalogControls();
  initPhase3Modals();
  filterProducts();
  updateCartCounter();
  updateWishlistCounter();
  renderCart();
  renderRecentlyViewed();
  initRecommendationTabs();
  renderPersonalizedRecommendations();
  renderOrderHistory();
  renderAnalytics();
  renderRewardsNavBadge();
  renderRewardsDashboard();
  ShopBot.init();
  initNavigation();
  console.log('ShopSphere AI Phase 7.1 initialized successfully.');
});
