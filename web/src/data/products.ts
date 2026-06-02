export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  ratingCount: number;
  brand: string;
  category: string;
  image: string;
  description: string;
  features: string[];
  colors?: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "sony-wh-ch520",
    name: "Sony WH-CH520 Wireless On-Ear Headphones",
    price: 3490,
    originalPrice: 4990,
    discount: 30,
    rating: 4.6,
    ratingCount: 532,
    brand: "Sony",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Listen to high-quality audio with the Sony WH-CH520 wireless headphones. Perfect for daily commutes, video calls, or study sessions with up to 50 hours of battery life and support for customizable EQ settings.",
    features: [
      "50 Hours Battery Life with Quick Charge",
      "Digital Sound Enhancement Engine (DSEE)",
      "Multipoint Connection for seamless device switching",
      "Lightweight & Comfortable design for all-day wear",
      "Built-in Mic for easy hands-free calling"
    ],
    colors: ["Black", "White", "Blue"],
    inStock: true
  },
  {
    id: "boat-rockerz-450",
    name: "boAt Rockerz 450 Bluetooth On-Ear Headphones",
    price: 1299,
    originalPrice: 3990,
    discount: 67,
    rating: 4.3,
    ratingCount: 1420,
    brand: "boAt",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&q=80",
    description: "Get ready to immerse yourself in the audio bliss with boAt Rockerz 450 wireless headphones. Equipped with 40mm dynamic drivers, it offers up to 15 hours of continuous playback time.",
    features: [
      "Up to 15 Hours Playback",
      "40mm Dynamic Drivers for boAt Signature Sound",
      "Easy Access integrated controls with built-in mic",
      "Dual Modes: Bluetooth and AUX support",
      "Foldable Earcups with soft padded cushion"
    ],
    colors: ["Aqua Blue", "Carbon Black", "Hazel Beige"],
    inStock: true
  },
  {
    id: "jbl-flip-6",
    name: "JBL Flip 6 Portable Waterproof Bluetooth Speaker",
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    rating: 4.5,
    ratingCount: 310,
    brand: "JBL",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description: "Your adventure. Your soundtrack. The bold JBL Flip 6 delivers powerful JBL Original Pro Sound with exceptional clarity thanks to its 2-way speaker system.",
    features: [
      "IP67 Waterproof and Dustproof",
      "12 Hours of Playtime under single charge",
      "Bold design with powerful 2-Way Speaker System",
      "PartyBoost link to pair multiple speakers",
      "Eco-friendly packaging design"
    ],
    colors: ["Black", "Blue", "Red", "Squad Green"],
    inStock: true
  },
  {
    id: "noise-colorfit-pro-5",
    name: "Noise ColorFit Pro 5 Smartwatch with AMOLED Display",
    price: 2499,
    originalPrice: 6999,
    discount: 64,
    rating: 4.2,
    ratingCount: 890,
    brand: "Noise",
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80",
    description: "Upgrade your lifestyle with the Noise ColorFit Pro 5, featuring a stunning 1.85\" AMOLED display, Bluetooth calling capabilities, and a full suite of health trackers.",
    features: [
      "1.85\" AMOLED Always-On Display",
      "Single-chip BT Calling with Tru Sync",
      "Noise Health Suite: SpO2, Heart Rate, Stress, Sleep",
      "100+ Sports Modes with auto-detection",
      "IP68 Water Resistance"
    ],
    colors: ["Jet Black", "Mist Grey", "Classic Blue"],
    inStock: true
  },
  {
    id: "realme-narzo-70-pro",
    name: "Realme Narzo 70 Pro 5G (8GB RAM, 128GB Storage)",
    price: 18999,
    originalPrice: 24999,
    discount: 24,
    rating: 4.3,
    ratingCount: 712,
    brand: "Realme",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    description: "Capture creative brilliance with the Sony IMX890 OIS camera on the Realme Narzo 70 Pro 5G. Powered by the Dimensity 7050 processor, it offers superfast 5G speeds.",
    features: [
      "Sony IMX890 OIS Camera for premium night photography",
      "67W SuperVOOC Charge with 5000mAh Battery",
      "MediaTek Dimensity 7050 Octa-Core 5G Processor",
      "120Hz Ultra Smooth AMOLED Display",
      "Horizon Glass Design"
    ],
    colors: ["Glass Green", "Glass Gold"],
    inStock: true
  },
  {
    id: "oneplus-nord-ce-3-lite",
    name: "OnePlus Nord CE 3 Lite 5G (8GB RAM, 128GB Storage)",
    price: 17499,
    originalPrice: 19999,
    discount: 12,
    rating: 4.2,
    ratingCount: 1105,
    brand: "OnePlus",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    description: "OnePlus Nord CE 3 Lite 5G brings you a massive 108MP camera, 67W SUPERVOOC fast charging, and a smooth 120Hz display, combined with the signature clean OxygenOS experience.",
    features: [
      "108MP 3x Lossless Zoom Main Camera",
      "67W SUPERVOOC Charging with 5000mAh Battery",
      "Snapdragon 695 5G Mobile Platform",
      "6.72\" 120Hz FHD+ Display with dual speakers",
      "OxygenOS based on Android 13"
    ],
    colors: ["Pastel Lime", "Chromatic Gray"],
    inStock: true
  },
  {
    id: "samsung-galaxy-m34",
    name: "Samsung Galaxy M34 5G (8GB RAM, 128GB Storage)",
    price: 15999,
    originalPrice: 24499,
    discount: 34,
    rating: 4.1,
    ratingCount: 955,
    brand: "Samsung",
    category: "Mobiles",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    description: "The powerhouse Samsung Galaxy M34 5G features a massive 6000mAh battery, a gorgeous 120Hz sAMOLED display, and a 50MP No Shake OIS camera to capture stability on the go.",
    features: [
      "Massive 6000mAh Battery with 25W fast charging",
      "120Hz Super AMOLED Display for vivid visuals",
      "50MP OIS No Shake Camera",
      "Exynos 1280 Octa-Core Processor",
      "Up to 4 Generations of OS updates"
    ],
    colors: ["Prism Blue", "Midnight Blue", "Waterfall Blue"],
    inStock: true
  },
  {
    id: "asus-vivobook-15",
    name: "ASUS Vivobook 15 Intel Core i3 (8GB RAM, 512GB SSD)",
    price: 32990,
    originalPrice: 47990,
    discount: 31,
    rating: 4.3,
    ratingCount: 220,
    brand: "ASUS",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80",
    description: "Make everyday tasks easy with ASUS Vivobook 15, your daily tool for making things easier, anywhere. Powered by an Intel Core 12th Gen processor.",
    features: [
      "Intel Core i3 12th Gen Processor",
      "8GB DDR4 RAM and 512GB PCIe NVMe SSD",
      "15.6-inch FHD (1920 x 1080) Anti-glare Display",
      "Thin and Light Design (1.7 kg)",
      "Windows 11 Home & MS Office Pre-installed"
    ],
    colors: ["Quiet Blue", "Icelight Silver"],
    inStock: true
  },
  {
    id: "hp-laptop-15s",
    name: "HP Laptop 15s AMD Ryzen 3 (8GB RAM, 512GB SSD)",
    price: 34990,
    originalPrice: 43990,
    discount: 20,
    rating: 4.2,
    ratingCount: 185,
    brand: "HP",
    category: "Laptops",
    image: "https://images.unsplash.com/photo-1496181130204-7552cc1524e2?auto=format&fit=crop&w=600&q=80",
    description: "Stay connected to what matters most with long-lasting battery life and a thin, micro-edge bezel design. Built to keep you productive and entertained.",
    features: [
      "AMD Ryzen 3 3250U Processor",
      "8GB DDR4 RAM and 512GB SSD Storage",
      "15.6-inch diagonal FHD Micro-edge display",
      "HP True Vision 720p HD Camera",
      "Battery life up to 9 hours"
    ],
    colors: ["Natural Silver"],
    inStock: true
  },
  {
    id: "nike-air-max-systm",
    name: "Nike Air Max SYSTM Men's Shoes",
    price: 8495,
    originalPrice: 9995,
    discount: 15,
    rating: 4.4,
    ratingCount: 120,
    brand: "Nike",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "Mixed materials, max style. The Air Max SYSTM brings back everything you love about your favorite '80s vibes, complete with visible Nike Air cushioning.",
    features: [
      "Visible Max Air unit delivers lightweight cushioning",
      "Leather, textile, and synthetic upper materials",
      "Rubber Waffle outsole adds durable traction",
      "Padded, low-cut collar looks sleek and feels comfortable"
    ],
    colors: ["Black/White", "Grey/Blue", "White/Red"],
    inStock: true
  },
  {
    id: "aashirvaad-atta",
    name: "Aashirvaad Shudh Chakki Atta (10 kg)",
    price: 460,
    originalPrice: 510,
    discount: 9,
    rating: 4.6,
    ratingCount: 4200,
    brand: "Aashirvaad",
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80",
    description: "Aashirvaad Shudh Chakki Atta is made from premium grains, ground via traditional stone chakki methods to ensure you get soft, fluffy rotis with natural dietary fibers.",
    features: [
      "100% Whole Wheat Atta",
      "0% Maida, pure chakki flour",
      "Assures soft rotis for up to 6 hours",
      "Packed under strict hygienic conditions"
    ],
    inStock: true
  },
  {
    id: "tata-salt-lite",
    name: "Tata Salt Lite Low Sodium Salt (1 kg)",
    price: 28,
    originalPrice: 32,
    discount: 12,
    rating: 4.7,
    ratingCount: 890,
    brand: "Tata",
    category: "Groceries",
    image: "https://images.unsplash.com/photo-1596560548464-f01068e3c7eb?auto=format&fit=crop&w=600&q=80",
    description: "Tata Salt Lite is a low-sodium iodized salt specially designed to provide 15% less sodium than regular iodized salt, supporting overall cardiovascular health.",
    features: [
      "15% Low Sodium content",
      "Helps in managing high blood pressure",
      "Iodized salt essential for mental development",
      "Trusted quality of Tata Salt"
    ],
    inStock: true
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
};

export const getProductById = (id: string) => {
  return products.find(p => p.id === id);
};

export const categoriesList = [
  "All",
  "Mobiles",
  "Laptops",
  "Audio",
  "Wearables",
  "Fashion",
  "Groceries"
];
