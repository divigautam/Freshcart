import React, { useState, useEffect, useMemo } from "react";
import {
  Search, MapPin, ShoppingCart, User, Menu, X, Heart, Star, Plus, Minus,
  ChevronRight, ChevronLeft, Truck, ShieldCheck, RotateCcw, Leaf, Tag,
  Trash2, CheckCircle2, CreditCard, Wallet, Banknote, ArrowLeft, Home,
  Grid3x3, Package, LogOut, MapPinned, Clock, Eye, EyeOff, SlidersHorizontal
} from "lucide-react";

/* ---------------------------------------------------------------
   DESIGN TOKENS
   bg cream #FAF8F2 · ink #22291F · forest #1E3F30 · leaf #3C8D5A
   citrus #E8935A · sage-tint #EAF3E5 · line #E5E0D3
   display: Fraunces (organic serif) · body: Inter
----------------------------------------------------------------*/

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=Inter:wght@400;500;600;700;800&display=swap');
.ff-display{font-family:'Fraunces',serif;}
.ff-body{font-family:'Inter',sans-serif;}
`;

/* ---------------------------------------------------------------
   MOCK DATA
----------------------------------------------------------------*/

const CATEGORIES = [
  { id: "fruits-veg", name: "Fruits & Vegetables", emoji: "🥬", tint: "#EAF3E5" },
  { id: "dairy-eggs", name: "Dairy & Eggs", emoji: "🥛", tint: "#FFF6DA" },
  { id: "bakery", name: "Bakery", emoji: "🍞", tint: "#FBEAD6" },
  { id: "beverages", name: "Beverages", emoji: "🥤", tint: "#E1EEF7" },
  { id: "snacks", name: "Snacks", emoji: "🍿", tint: "#FDE7D4" },
  { id: "meat-seafood", name: "Meat & Seafood", emoji: "🍗", tint: "#FBE1E1" },
  { id: "household", name: "Household", emoji: "🧺", tint: "#DEF1EB" },
  { id: "personal-care", name: "Personal Care", emoji: "🧴", tint: "#F1E6F8" },
];

const catOf = (id) => CATEGORIES.find((c) => c.id === id);

const PRODUCTS = [
  { id: 1, name: "Fresh Apples", brand: "Nature's Basket", category: "fruits-veg", emoji: "🍎", unit: "1 kg", price: 180, mrp: 220, rating: 4.5, reviews: 320, popular: true, desc: "Crisp, hand-picked apples with a sweet-tart bite. Great for snacking, baking or juicing.", nutrition: "52 kcal, 0.3g protein, 14g carbs, 2.4g fiber per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 2, name: "Bananas", brand: "Farm Fresh", category: "fruits-veg", emoji: "🍌", unit: "1 dozen", price: 60, mrp: 70, rating: 4.3, reviews: 210, popular: true, desc: "Naturally ripened bananas, rich in potassium and perfect for a quick energy boost.", nutrition: "89 kcal, 1.1g protein, 23g carbs, 2.6g fiber per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 3, name: "Tomatoes", brand: "Farm Fresh", category: "fruits-veg", emoji: "🍅", unit: "1 kg", price: 40, mrp: 50, rating: 4.1, reviews: 150, desc: "Juicy, farm-grown tomatoes ideal for curries, salads and chutneys.", nutrition: "18 kcal, 0.9g protein, 3.9g carbs, 1.2g fiber per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 4, name: "Potatoes", brand: "Farm Fresh", category: "fruits-veg", emoji: "🥔", unit: "1 kg", price: 35, mrp: 40, rating: 4.2, reviews: 180, desc: "All-purpose potatoes, great for curries, fries and mashing.", nutrition: "77 kcal, 2g protein, 17g carbs, 2.2g fiber per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 5, name: "Spinach", brand: "Farm Fresh", category: "fruits-veg", emoji: "🥬", unit: "250 g", price: 25, mrp: 30, rating: 4.0, reviews: 90, desc: "Tender, deep-green spinach leaves, washed and ready to cook.", nutrition: "23 kcal, 2.9g protein, 3.6g carbs, 2.2g fiber per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 6, name: "Onions", brand: "Farm Fresh", category: "fruits-veg", emoji: "🧅", unit: "1 kg", price: 45, mrp: 50, rating: 4.2, reviews: 140, desc: "Everyday staple onions with a strong flavour base for any dish.", nutrition: "40 kcal, 1.1g protein, 9.3g carbs, 1.7g fiber per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 7, name: "Milk", brand: "Amul", category: "dairy-eggs", emoji: "🥛", unit: "1 L", price: 62, mrp: 65, rating: 4.6, reviews: 540, popular: true, deal: true, desc: "Pasteurized toned milk, a daily essential for the whole family.", nutrition: "60 kcal, 3.2g protein, 4.7g carbs, 3.4g fat per 100ml", delivery: "Delivered fresh within 45 minutes." },
  { id: 8, name: "Eggs", brand: "Farm Fresh", category: "dairy-eggs", emoji: "🥚", unit: "12 pcs", price: 84, mrp: 96, rating: 4.5, reviews: 410, popular: true, desc: "Protein-rich, farm-fresh eggs sourced from free-range hens.", nutrition: "155 kcal, 13g protein, 1.1g carbs, 11g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 9, name: "Cheese Slices", brand: "Amul", category: "dairy-eggs", emoji: "🧀", unit: "200 g", price: 110, mrp: 130, rating: 4.4, reviews: 260, desc: "Creamy processed cheese slices, perfect for sandwiches and burgers.", nutrition: "300 kcal, 18g protein, 4g carbs, 24g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 10, name: "Paneer", brand: "Mother Dairy", category: "dairy-eggs", emoji: "🧈", unit: "200 g", price: 90, mrp: 100, rating: 4.5, reviews: 190, deal: true, desc: "Soft, fresh paneer cubes made from pure milk. Ideal for curries and grilling.", nutrition: "265 kcal, 18g protein, 1.2g carbs, 20g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 11, name: "Bread", brand: "Britannia", category: "bakery", emoji: "🍞", unit: "400 g", price: 45, mrp: 50, rating: 4.3, reviews: 320, popular: true, desc: "Soft, fluffy white bread baked daily, perfect for toast and sandwiches.", nutrition: "265 kcal, 9g protein, 49g carbs, 3.3g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 12, name: "Butter Croissants", brand: "Modern Bakery", category: "bakery", emoji: "🥐", unit: "4 pcs", price: 120, mrp: 140, rating: 4.2, reviews: 95, desc: "Flaky, buttery croissants baked fresh every morning.", nutrition: "406 kcal, 8g protein, 45g carbs, 21g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 13, name: "Orange Juice", brand: "Real", category: "beverages", emoji: "🧃", unit: "1 L", price: 110, mrp: 130, rating: 4.1, reviews: 160, desc: "100% fruit juice with no added sugar, packed with vitamin C.", nutrition: "45 kcal, 0.5g protein, 11g carbs, 0g fat per 100ml", delivery: "Delivered fresh within 45 minutes." },
  { id: 14, name: "Instant Coffee", brand: "Nescafé", category: "beverages", emoji: "☕", unit: "200 g", price: 260, mrp: 300, rating: 4.6, reviews: 410, popular: true, desc: "Rich, aromatic instant coffee granules for the perfect morning cup.", nutrition: "0 kcal per serving (before milk/sugar)", delivery: "Delivered fresh within 45 minutes." },
  { id: 15, name: "Green Tea", brand: "Lipton", category: "beverages", emoji: "🍵", unit: "25 bags", price: 150, mrp: 180, rating: 4.3, reviews: 120, deal: true, desc: "Light, antioxidant-rich green tea bags for a refreshing everyday brew.", nutrition: "0 kcal per bag (unsweetened)", delivery: "Delivered fresh within 45 minutes." },
  { id: 16, name: "Potato Chips", brand: "Lay's", category: "snacks", emoji: "🍟", unit: "90 g", price: 20, mrp: 25, rating: 4.4, reviews: 620, popular: true, desc: "Crispy, classic salted potato chips — the go-to snack for any time.", nutrition: "536 kcal, 6.6g protein, 53g carbs, 34g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 17, name: "Glucose Biscuits", brand: "Parle-G", category: "snacks", emoji: "🍪", unit: "200 g", price: 25, mrp: 28, rating: 4.5, reviews: 780, popular: true, desc: "India's favourite glucose biscuits, light, crunchy and lightly sweet.", nutrition: "462 kcal, 7g protein, 74g carbs, 15g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 18, name: "Dairy Milk Chocolate", brand: "Cadbury", category: "snacks", emoji: "🍫", unit: "100 g", price: 95, mrp: 110, rating: 4.6, reviews: 540, deal: true, desc: "Smooth, creamy milk chocolate bar — a classic treat for any craving.", nutrition: "534 kcal, 7.6g protein, 58g carbs, 30g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 19, name: "Chicken Curry Cut", brand: "Licious", category: "meat-seafood", emoji: "🍗", unit: "500 g", price: 220, mrp: 250, rating: 4.4, reviews: 210, popular: true, desc: "Antibiotic-free, tender chicken curry cut, cleaned and ready to cook.", nutrition: "165 kcal, 31g protein, 0g carbs, 3.6g fat per 100g", delivery: "Delivered fresh within 60 minutes." },
  { id: 20, name: "Tiger Prawns", brand: "Licious", category: "meat-seafood", emoji: "🦐", unit: "250 g", price: 280, mrp: 320, rating: 4.3, reviews: 95, deal: true, desc: "Deveined, cleaned tiger prawns sourced fresh from the coast.", nutrition: "99 kcal, 24g protein, 0.2g carbs, 0.3g fat per 100g", delivery: "Delivered fresh within 60 minutes." },
  { id: 21, name: "Basmati Rice", brand: "India Gate", category: "household", emoji: "🍚", unit: "5 kg", price: 320, mrp: 360, rating: 4.5, reviews: 260, popular: true, desc: "Long-grain, aromatic basmati rice that stays fluffy and separate on cooking.", nutrition: "350 kcal, 7g protein, 78g carbs, 0.5g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 22, name: "Wheat Flour", brand: "Aashirvaad", category: "household", emoji: "🌾", unit: "5 kg", price: 260, mrp: 290, rating: 4.6, reviews: 410, popular: true, desc: "Stone-ground whole wheat flour (atta) for soft rotis every day.", nutrition: "340 kcal, 12g protein, 72g carbs, 1.7g fat per 100g", delivery: "Delivered fresh within 45 minutes." },
  { id: 23, name: "Cooking Oil", brand: "Fortune", category: "household", emoji: "🛢️", unit: "1 L", price: 160, mrp: 180, rating: 4.4, reviews: 350, deal: true, desc: "Light, refined sunflower oil suitable for everyday cooking and frying.", nutrition: "884 kcal, 0g protein, 0g carbs, 100g fat per 100ml", delivery: "Delivered fresh within 45 minutes." },
  { id: 24, name: "Dishwash Liquid", brand: "Vim", category: "household", emoji: "🧽", unit: "500 ml", price: 95, mrp: 110, rating: 4.2, reviews: 230, desc: "Grease-cutting dishwash gel with a refreshing lemon fragrance.", nutrition: "Not applicable — cleaning product.", delivery: "Delivered fresh within 45 minutes." },
  { id: 25, name: "Detergent Powder", brand: "Surf Excel", category: "household", emoji: "🧺", unit: "1 kg", price: 180, mrp: 210, rating: 4.4, reviews: 320, popular: true, desc: "Stain-removing detergent powder that's tough on dirt, gentle on fabric.", nutrition: "Not applicable — cleaning product.", delivery: "Delivered fresh within 45 minutes." },
  { id: 26, name: "Shampoo", brand: "Dove", category: "personal-care", emoji: "🧴", unit: "340 ml", price: 280, mrp: 320, rating: 4.3, reviews: 190, deal: true, desc: "Nourishing shampoo with micro-moisture serum for smooth, frizz-free hair.", nutrition: "Not applicable — personal care product.", delivery: "Delivered fresh within 45 minutes." },
  { id: 27, name: "Toothpaste", brand: "Colgate", category: "personal-care", emoji: "🪥", unit: "150 g", price: 85, mrp: 95, rating: 4.5, reviews: 410, popular: true, desc: "Cavity-protection toothpaste that keeps teeth strong and breath fresh.", nutrition: "Not applicable — personal care product.", delivery: "Delivered fresh within 45 minutes." },
];

const REVIEWS = [
  { name: "Ananya R.", rating: 5, text: "Always fresh and delivered right on time. My go-to for weekly groceries now." },
  { name: "Karthik M.", rating: 4, text: "Good quality overall, packaging could be a little sturdier for fragile items." },
  { name: "Priya S.", rating: 5, text: "Loved the quality, tastes exactly like what I'd pick myself at the market." },
];

const MOCK_ORDERS = [
  { id: "FC-93481", date: "12 Aug 2026", status: "Delivered", total: 486, items: ["Fresh Apples", "Milk", "Bread", "Eggs"] },
  { id: "FC-92110", date: "03 Aug 2026", status: "Delivered", total: 312, items: ["Basmati Rice", "Cooking Oil"] },
  { id: "FC-90876", date: "27 Jul 2026", status: "Cancelled", total: 145, items: ["Chicken Curry Cut"] },
];

const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
const pct = (mrp, price) => Math.round(((mrp - price) / mrp) * 100);

/* ---------------------------------------------------------------
   SMALL REUSABLE UI
----------------------------------------------------------------*/

function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "ff-body inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#2F6B45] text-white hover:bg-[#25532F] shadow-sm hover:shadow-md px-6 py-3",
    secondary: "bg-white text-[#2F6B45] border-2 border-[#2F6B45] hover:bg-[#EAF3E5] px-6 py-3",
    ghost: "text-[#2F6B45] hover:bg-[#EAF3E5] px-4 py-2",
    citrus: "bg-[#E8935A] text-white hover:bg-[#D97F44] shadow-sm hover:shadow-md px-6 py-3",
    dark: "bg-[#1E3F30] text-white hover:bg-[#16302A] px-6 py-3",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Rating({ value, reviews, size = 14 }) {
  return (
    <div className="flex items-center gap-1 ff-body">
      <Star size={size} className="fill-[#E8935A] text-[#E8935A]" />
      <span className="text-sm font-semibold text-[#22291F]">{value}</span>
      {reviews != null && <span className="text-xs text-[#7A8073]">({reviews})</span>}
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#1E3F30] text-white ff-body font-medium px-5 py-3 rounded-full shadow-xl flex items-center gap-2 animate-[fadeIn_0.2s_ease-out]">
      <CheckCircle2 size={18} className="text-[#8FD9A8]" />
      {message}
    </div>
  );
}

function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-[#EAF3E5] flex items-center justify-center mb-5">
        <Icon size={32} className="text-[#2F6B45]" />
      </div>
      <h3 className="ff-display text-xl font-semibold text-[#1E3F30] mb-1">{title}</h3>
      <p className="ff-body text-sm text-[#7A8073] max-w-xs mb-5">{subtitle}</p>
      {action}
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-[#EDE9DC] overflow-hidden animate-pulse">
      <div className="h-32 bg-[#EDE9DC]" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-[#EDE9DC] rounded w-1/2" />
        <div className="h-4 bg-[#EDE9DC] rounded w-3/4" />
        <div className="h-3 bg-[#EDE9DC] rounded w-1/3" />
        <div className="h-8 bg-[#EDE9DC] rounded-full w-full mt-2" />
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PRODUCT CARD
----------------------------------------------------------------*/

function ProductCard({ product, cartQty, onAdd, onInc, onDec, wished, onToggleWish, onOpen }) {
  const cat = catOf(product.category);
  const discount = pct(product.mrp, product.price);
  return (
    <div className="group rounded-2xl bg-white border border-[#EDE9DC] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col">
      <div
        className="relative h-32 flex items-center justify-center cursor-pointer"
        style={{ backgroundColor: cat.tint }}
        onClick={() => onOpen(product.id)}
      >
        <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{product.emoji}</span>
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#E8935A] text-white text-[10px] font-bold ff-body px-2 py-1 rounded-full -rotate-3">
            {discount}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWish(product.id); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={15} className={wished ? "fill-[#E8935A] text-[#E8935A]" : "text-[#7A8073]"} />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1 ff-body">
        <p className="text-[11px] uppercase tracking-wide text-[#7A8073] font-medium">{product.brand}</p>
        <h3
          className="text-sm font-semibold text-[#22291F] leading-snug mt-0.5 cursor-pointer hover:text-[#2F6B45] line-clamp-2"
          onClick={() => onOpen(product.id)}
        >
          {product.name}
        </h3>
        <p className="text-xs text-[#7A8073] mt-0.5">{product.unit}</p>
        <div className="mt-1.5"><Rating value={product.rating} reviews={product.reviews} /></div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="font-bold text-[#1E3F30]">{fmt(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-xs text-[#B0AB9B] line-through">{fmt(product.mrp)}</span>
          )}
        </div>
        <div className="mt-3">
          {cartQty > 0 ? (
            <div className="flex items-center justify-between bg-[#EAF3E5] rounded-full px-1 py-1">
              <button onClick={() => onDec(product.id)} className="w-7 h-7 rounded-full bg-white text-[#2F6B45] flex items-center justify-center shadow-sm active:scale-90 transition-transform"><Minus size={14} /></button>
              <span className="font-semibold text-sm text-[#1E3F30]">{cartQty}</span>
              <button onClick={() => onInc(product.id)} className="w-7 h-7 rounded-full bg-[#2F6B45] text-white flex items-center justify-center shadow-sm active:scale-90 transition-transform"><Plus size={14} /></button>
            </div>
          ) : (
            <button
              onClick={() => onAdd(product.id)}
              className="w-full rounded-full border-2 border-[#2F6B45] text-[#2F6B45] font-semibold text-sm py-1.5 hover:bg-[#2F6B45] hover:text-white transition-colors duration-200"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   NAVBAR + FOOTER + BOTTOM NAV
----------------------------------------------------------------*/

function Navbar({ page, go, cartCount, wishCount, search, setSearch, menuOpen, setMenuOpen, isAuthed }) {
  const NavLink = ({ label, target, icon: Icon }) => (
    <button
      onClick={() => go(target)}
      className={`ff-body text-sm font-medium transition-colors ${page === target ? "text-[#2F6B45]" : "text-[#4B5142] hover:text-[#2F6B45]"}`}
    >
      {label}
    </button>
  );
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F2]/95 backdrop-blur border-b border-[#EDE9DC]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-[#1E3F30]" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <button onClick={() => go("home")} className="flex items-center gap-1.5">
              <div className="w-8 h-8 rounded-full bg-[#2F6B45] flex items-center justify-center">
                <Leaf size={16} className="text-white" />
              </div>
              <span className="ff-display text-xl font-semibold text-[#1E3F30]">FreshCart</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <NavLink label="Home" target="home" />
            <NavLink label="Products" target="products" />
            <NavLink label="Deals" target="deals" />
            <NavLink label="Wishlist" target="wishlist" />
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-sm bg-white border border-[#EDE9DC] rounded-full px-4 py-2 gap-2">
            <Search size={16} className="text-[#7A8073]" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); go("products"); }}
              placeholder="Search for groceries..."
              className="ff-body bg-transparent outline-none text-sm w-full placeholder:text-[#B0AB9B]"
            />
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <button className="hidden lg:flex items-center gap-1 text-xs text-[#4B5142] ff-body px-2">
              <MapPin size={14} /> Ghaziabad, UP
            </button>
            <button onClick={() => go("wishlist")} className="relative p-2 hover:bg-[#EAF3E5] rounded-full hidden md:inline-flex">
              <Heart size={19} className="text-[#1E3F30]" />
              {wishCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-[#E8935A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishCount}</span>}
            </button>
            <button onClick={() => go("cart")} className="relative p-2 hover:bg-[#EAF3E5] rounded-full">
              <ShoppingCart size={19} className="text-[#1E3F30]" />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-[#E8935A] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </button>
            <button onClick={() => go(isAuthed ? "profile" : "login")} className="p-2 hover:bg-[#EAF3E5] rounded-full">
              <User size={19} className="text-[#1E3F30]" />
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center bg-white border border-[#EDE9DC] rounded-full px-4 py-2 gap-2 mb-3">
          <Search size={16} className="text-[#7A8073]" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); go("products"); }}
            placeholder="Search for groceries..."
            className="ff-body bg-transparent outline-none text-sm w-full placeholder:text-[#B0AB9B]"
          />
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-[#EDE9DC] bg-white px-4 py-3 flex flex-col gap-3">
          {[["Home", "home"], ["Categories", "categories"], ["Products", "products"], ["Deals", "deals"], ["Wishlist", "wishlist"], ["Profile", isAuthed ? "profile" : "login"]].map(([label, target]) => (
            <button key={target} onClick={() => { go(target); setMenuOpen(false); }} className="text-left ff-body text-sm font-medium text-[#22291F] py-1">
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function BottomNav({ page, go, cartCount }) {
  const items = [
    { key: "home", icon: Home, label: "Home" },
    { key: "categories", icon: Grid3x3, label: "Categories" },
    { key: "cart", icon: ShoppingCart, label: "Cart", badge: cartCount },
    { key: "wishlist", icon: Heart, label: "Wishlist" },
    { key: "profile", icon: User, label: "Profile" },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[#EDE9DC] flex items-center justify-around py-2">
      {items.map(({ key, icon: Icon, label, badge }) => (
        <button key={key} onClick={() => go(key)} className="flex flex-col items-center gap-0.5 px-2 relative">
          <Icon size={19} className={page === key ? "text-[#2F6B45]" : "text-[#7A8073]"} />
          {badge > 0 && <span className="absolute -top-0.5 right-0 bg-[#E8935A] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">{badge}</span>}
          <span className={`ff-body text-[10px] font-medium ${page === key ? "text-[#2F6B45]" : "text-[#7A8073]"}`}>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function Footer({ go }) {
  return (
    <footer className="bg-[#1E3F30] text-[#DCE7DC] mt-16 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-7 h-7 rounded-full bg-[#3C8D5A] flex items-center justify-center"><Leaf size={14} className="text-white" /></div>
            <span className="ff-display text-lg font-semibold text-white">FreshCart</span>
          </div>
          <p className="ff-body text-sm text-[#AEC1AE]">Fresh groceries, delivered to your door — every single day.</p>
        </div>
        <div>
          <h4 className="ff-body font-semibold text-white text-sm mb-3">Shop</h4>
          <div className="flex flex-col gap-2 ff-body text-sm text-[#AEC1AE]">
            <button onClick={() => go("products")} className="text-left hover:text-white">All Products</button>
            <button onClick={() => go("deals")} className="text-left hover:text-white">Best Deals</button>
            <button onClick={() => go("categories")} className="text-left hover:text-white">Categories</button>
          </div>
        </div>
        <div>
          <h4 className="ff-body font-semibold text-white text-sm mb-3">Account</h4>
          <div className="flex flex-col gap-2 ff-body text-sm text-[#AEC1AE]">
            <button onClick={() => go("login")} className="text-left hover:text-white">Login / Sign Up</button>
            <button onClick={() => go("profile")} className="text-left hover:text-white">My Orders</button>
            <button onClick={() => go("wishlist")} className="text-left hover:text-white">Wishlist</button>
          </div>
        </div>
        <div>
          <h4 className="ff-body font-semibold text-white text-sm mb-3">Support</h4>
          <div className="flex flex-col gap-2 ff-body text-sm text-[#AEC1AE]">
            <span>help@freshcart.in</span>
            <span>1800-123-4567</span>
            <span>Mon–Sun, 7am – 11pm</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center ff-body text-xs text-[#8DA48D]">© 2026 FreshCart. All rights reserved.</div>
    </footer>
  );
}

/* ---------------------------------------------------------------
   HOME PAGE
----------------------------------------------------------------*/

function Hero({ go }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pt-8 md:pt-14 pb-10">
      <div className="relative rounded-[2rem] bg-[#EAF3E5] overflow-hidden">
        <div className="grid md:grid-cols-2 items-center gap-6 px-6 md:px-14 py-12 md:py-20">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white text-[#2F6B45] text-xs font-semibold ff-body px-3 py-1.5 rounded-full mb-4">
              <Leaf size={13} /> Farm-fresh, every order
            </span>
            <h1 className="ff-display text-4xl md:text-5xl font-semibold text-[#1E3F30] leading-[1.1]">
              Fresh Groceries, <br /> Delivered to Your Door
            </h1>
            <p className="ff-body text-[#4B5142] mt-4 text-base md:text-lg max-w-md">
              Hand-picked fruits, vegetables, dairy and daily essentials — packed with care and on your doorstep in under an hour.
            </p>
            <div className="flex items-center gap-3 mt-7">
              <Button onClick={() => go("products")}>Shop Now <ChevronRight size={16} /></Button>
              <Button variant="secondary" onClick={() => go("deals")}>See Deals</Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {["🍎", "🥦", "🍓", "🥕", "🍇", "🥑"].map((e, i) => (
                <div
                  key={i}
                  className="w-16 h-16 md:w-24 md:h-24 bg-white rounded-3xl shadow-md flex items-center justify-center text-3xl md:text-4xl"
                  style={{ transform: `translateY(${i % 2 === 0 ? "-8px" : "8px"}) rotate(${(i - 2.5) * 3}deg)` }}
                >
                  {e}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategorySection({ go, setActiveCategory }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="ff-display text-2xl font-semibold text-[#1E3F30]">Shop by Category</h2>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActiveCategory(c.id); go("products"); }}
            className="group flex flex-col items-center gap-2"
          >
            <div
              className="w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center text-2xl md:text-3xl border-2 border-dashed border-[#C9D9C2] group-hover:border-[#2F6B45] group-hover:scale-105 transition-all duration-200"
              style={{ backgroundColor: c.tint }}
            >
              {c.emoji}
            </div>
            <span className="ff-body text-[11px] md:text-xs font-medium text-[#22291F] text-center leading-tight">{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductRow({ title, products, ...cardProps }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="ff-display text-2xl font-semibold text-[#1E3F30]">{title}</h2>
        <button onClick={() => cardProps.go("products")} className="ff-body text-sm font-semibold text-[#2F6B45] flex items-center gap-1 hover:gap-2 transition-all">
          View all <ChevronRight size={15} />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((p) => <ProductCard key={p.id} product={p} {...cardProps} cartQty={cardProps.cart[p.id] || 0} wished={cardProps.wishlist.includes(p.id)} />)}
      </div>
    </section>
  );
}

function DiscountBanner({ go }) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-6">
      <div className="rounded-[2rem] bg-[#1E3F30] px-8 md:px-14 py-10 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="absolute -right-6 -top-6 w-40 h-40 rounded-full bg-[#2F6B45]/40" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 bg-[#E8935A] text-white text-xs font-bold ff-body px-3 py-1.5 rounded-full mb-3">
            <Tag size={12} /> LIMITED TIME
          </span>
          <h3 className="ff-display text-2xl md:text-3xl font-semibold text-white">Flat 20% off on your first order</h3>
          <p className="ff-body text-[#C7D6C7] text-sm mt-1">Use code <span className="font-semibold text-white">FRESH20</span> at checkout · min. order ₹299</p>
        </div>
        <Button variant="citrus" onClick={() => go("products")} className="relative shrink-0">Grab the Deal</Button>
      </div>
    </section>
  );
}

function WhyChoose() {
  const items = [
    { icon: Leaf, title: "Fresh Products", text: "Sourced daily from trusted local farms and vendors." },
    { icon: Truck, title: "Fast Delivery", text: "Most orders reach you in under 45 minutes." },
    { icon: ShieldCheck, title: "Secure Payments", text: "UPI, cards and cash — all encrypted and safe." },
    { icon: RotateCcw, title: "Easy Returns", text: "Not happy? Get a hassle-free refund or replacement." },
  ];
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
      <h2 className="ff-display text-2xl font-semibold text-[#1E3F30] mb-8 text-center">Why Choose FreshCart?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="text-center flex flex-col items-center px-2">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF3E5] flex items-center justify-center mb-3">
              <Icon size={22} className="text-[#2F6B45]" />
            </div>
            <h4 className="ff-body font-semibold text-[#1E3F30] text-sm">{title}</h4>
            <p className="ff-body text-xs text-[#7A8073] mt-1">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomePage({ go, setActiveCategory, ...cardProps }) {
  const popular = PRODUCTS.filter((p) => p.popular).slice(0, 5);
  const deals = PRODUCTS.filter((p) => p.deal).slice(0, 5);
  return (
    <>
      <Hero go={go} />
      <CategorySection go={go} setActiveCategory={setActiveCategory} />
      <ProductRow title="Popular Products" products={popular} go={go} {...cardProps} />
      <DiscountBanner go={go} />
      <ProductRow title="Best Deals" products={deals} go={go} {...cardProps} />
      <WhyChoose />
    </>
  );
}

/* ---------------------------------------------------------------
   CATEGORIES PAGE (mobile bottom-nav target)
----------------------------------------------------------------*/

function CategoriesPage({ go, setActiveCategory }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="ff-display text-3xl font-semibold text-[#1E3F30] mb-6">All Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => { setActiveCategory(c.id); go("products"); }}
            className="rounded-2xl p-6 flex flex-col items-center gap-3 border border-[#EDE9DC] hover:shadow-md hover:-translate-y-0.5 transition-all"
            style={{ backgroundColor: c.tint }}
          >
            <span className="text-4xl">{c.emoji}</span>
            <span className="ff-body font-semibold text-sm text-[#1E3F30] text-center">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PRODUCTS PAGE
----------------------------------------------------------------*/

function ProductsPage({ search, setSearch, activeCategory, setActiveCategory, dealsOnly, ...cardProps }) {
  const [sort, setSort] = useState("popularity");
  const [priceMax, setPriceMax] = useState(400);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [search, activeCategory, sort, priceMax, dealsOnly]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price <= priceMax);
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (dealsOnly) list = list.filter((p) => p.deal);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || catOf(p.category).name.toLowerCase().includes(q));
    }
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: list = [...list].sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    return list;
  }, [search, activeCategory, sort, priceMax, dealsOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="ff-display text-3xl font-semibold text-[#1E3F30]">{dealsOnly ? "Best Deals" : "All Products"}</h1>
          <p className="ff-body text-sm text-[#7A8073] mt-1">{filtered.length} products found</p>
        </div>
        <button onClick={() => setFilterOpen(!filterOpen)} className="md:hidden flex items-center gap-1.5 border border-[#EDE9DC] bg-white rounded-full px-4 py-2 text-sm font-medium text-[#1E3F30]">
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <aside className={`${filterOpen ? "block" : "hidden"} md:block`}>
          <div className="bg-white border border-[#EDE9DC] rounded-2xl p-5 sticky top-24">
            <h3 className="ff-body font-semibold text-sm text-[#1E3F30] mb-3">Category</h3>
            <div className="flex flex-col gap-2 mb-6">
              <button onClick={() => setActiveCategory(null)} className={`text-left ff-body text-sm px-2 py-1.5 rounded-lg ${!activeCategory ? "bg-[#EAF3E5] text-[#2F6B45] font-semibold" : "text-[#4B5142]"}`}>All Categories</button>
              {CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setActiveCategory(c.id)} className={`text-left ff-body text-sm px-2 py-1.5 rounded-lg flex items-center gap-2 ${activeCategory === c.id ? "bg-[#EAF3E5] text-[#2F6B45] font-semibold" : "text-[#4B5142]"}`}>
                  <span>{c.emoji}</span>{c.name}
                </button>
              ))}
            </div>
            <h3 className="ff-body font-semibold text-sm text-[#1E3F30] mb-3">Max Price: {fmt(priceMax)}</h3>
            <input type="range" min="20" max="400" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full accent-[#2F6B45]" />
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-end mb-4">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="ff-body text-sm border border-[#EDE9DC] rounded-full px-4 py-2 bg-white text-[#1E3F30] outline-none">
              <option value="popularity">Sort: Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Sort: Rating</option>
            </select>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No products found"
              subtitle="Try a different search term or clear your filters to see more results."
              action={<Button variant="secondary" onClick={() => { setSearch(""); setActiveCategory(null); setPriceMax(400); }}>Clear Filters</Button>}
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} {...cardProps} cartQty={cardProps.cart[p.id] || 0} wished={cardProps.wishlist.includes(p.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PRODUCT DETAIL PAGE
----------------------------------------------------------------*/

function ProductDetailPage({ productId, go, cart, onAdd, onInc, onDec, wishlist, onToggleWish }) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const [qty, setQty] = useState(1);
  if (!product) return <div className="max-w-3xl mx-auto px-6 py-20 text-center ff-body">Product not found. <button onClick={() => go("products")} className="text-[#2F6B45] font-semibold">Back to products</button></div>;

  const cat = catOf(product.category);
  const discount = pct(product.mrp, product.price);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const wished = wishlist.includes(product.id);
  const inCartQty = cart[product.id] || 0;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <button onClick={() => go("products")} className="flex items-center gap-1.5 ff-body text-sm text-[#4B5142] hover:text-[#2F6B45] mb-6">
        <ArrowLeft size={16} /> Back to products
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-3xl flex items-center justify-center h-72 md:h-96 relative" style={{ backgroundColor: cat.tint }}>
          <span className="text-[7rem] md:text-[9rem]">{product.emoji}</span>
          {discount > 0 && <span className="absolute top-4 left-4 bg-[#E8935A] text-white text-xs font-bold ff-body px-3 py-1.5 rounded-full">{discount}% OFF</span>}
          <button onClick={() => onToggleWish(product.id)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <Heart size={18} className={wished ? "fill-[#E8935A] text-[#E8935A]" : "text-[#7A8073]"} />
          </button>
        </div>

        <div className="ff-body">
          <p className="text-xs uppercase tracking-wide text-[#7A8073] font-semibold">{product.brand}</p>
          <h1 className="ff-display text-3xl font-semibold text-[#1E3F30] mt-1">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
            <span className="text-sm text-[#7A8073]">· {product.unit}</span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="ff-display text-3xl font-semibold text-[#1E3F30]">{fmt(product.price)}</span>
            {product.mrp > product.price && <span className="text-base text-[#B0AB9B] line-through">{fmt(product.mrp)}</span>}
            {discount > 0 && <span className="text-sm font-semibold text-[#E8935A]">Save {discount}%</span>}
          </div>
          <p className="text-sm text-[#4B5142] mt-4 leading-relaxed">{product.desc}</p>

          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center bg-[#EAF3E5] rounded-full px-1 py-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 rounded-full bg-white text-[#2F6B45] flex items-center justify-center shadow-sm"><Minus size={15} /></button>
              <span className="w-10 text-center font-semibold text-[#1E3F30]">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 rounded-full bg-[#2F6B45] text-white flex items-center justify-center shadow-sm"><Plus size={15} /></button>
            </div>
            <span className="text-xs text-[#7A8073]">{Math.max(4, 40 - product.id)} left in stock</span>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <Button className="flex-1" onClick={() => { for (let i = 0; i < qty; i++) onAdd(product.id); }}>
              <ShoppingCart size={16} /> Add to Cart
            </Button>
            <Button variant="citrus" className="flex-1" onClick={() => { for (let i = 0; i < qty; i++) onAdd(product.id); go("checkout"); }}>
              Buy Now
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 border-t border-[#EDE9DC] pt-6">
            <div>
              <h4 className="font-semibold text-sm text-[#1E3F30] mb-1">Nutritional Info</h4>
              <p className="text-xs text-[#7A8073] leading-relaxed">{product.nutrition}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-[#1E3F30] mb-1 flex items-center gap-1.5"><Truck size={14} /> Delivery</h4>
              <p className="text-xs text-[#7A8073] leading-relaxed">{product.delivery}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="ff-display text-xl font-semibold text-[#1E3F30] mb-4">Customer Reviews</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white border border-[#EDE9DC] rounded-2xl p-4 ff-body">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-[#1E3F30]">{r.name}</span>
                <Rating value={r.rating} />
              </div>
              <p className="text-sm text-[#4B5142] leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="ff-display text-xl font-semibold text-[#1E3F30] mb-4">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} go={go} onOpen={(id) => go("productDetail", id)}
                cartQty={cart[p.id] || 0} onAdd={onAdd} onInc={onInc} onDec={onDec} wished={wishlist.includes(p.id)} onToggleWish={onToggleWish} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------
   CART PAGE
----------------------------------------------------------------*/

function CartPage({ cart, onInc, onDec, onRemove, go }) {
  const items = Object.entries(cart).map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty })).filter((i) => i.qty > 0 && i.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const savings = items.reduce((s, i) => s + (i.product.mrp - i.product.price) * i.qty, 0);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 299 ? 0 : 40;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          subtitle="Looks like you haven't added anything yet. Explore our fresh picks and get started."
          action={<Button onClick={() => go("products")}>Start Shopping</Button>}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <h1 className="ff-display text-3xl font-semibold text-[#1E3F30] mb-6">Shopping Cart</h1>
      <div className="grid md:grid-cols-[1fr_340px] gap-8">
        <div className="flex flex-col gap-3">
          {items.map(({ product, qty }) => {
            const cat = catOf(product.category);
            return (
              <div key={product.id} className="flex items-center gap-4 bg-white border border-[#EDE9DC] rounded-2xl p-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl shrink-0 cursor-pointer" style={{ backgroundColor: cat.tint }} onClick={() => go("productDetail", product.id)}>
                  {product.emoji}
                </div>
                <div className="flex-1 min-w-0 ff-body">
                  <h3 className="font-semibold text-sm text-[#1E3F30] truncate cursor-pointer" onClick={() => go("productDetail", product.id)}>{product.name}</h3>
                  <p className="text-xs text-[#7A8073]">{product.brand} · {product.unit}</p>
                  <p className="font-semibold text-sm text-[#1E3F30] mt-1">{fmt(product.price)}</p>
                </div>
                <div className="flex items-center bg-[#EAF3E5] rounded-full px-1 py-1">
                  <button onClick={() => onDec(product.id)} className="w-7 h-7 rounded-full bg-white text-[#2F6B45] flex items-center justify-center"><Minus size={13} /></button>
                  <span className="w-7 text-center text-sm font-semibold text-[#1E3F30]">{qty}</span>
                  <button onClick={() => onInc(product.id)} className="w-7 h-7 rounded-full bg-[#2F6B45] text-white flex items-center justify-center"><Plus size={13} /></button>
                </div>
                <button onClick={() => onRemove(product.id)} className="text-[#B0AB9B] hover:text-[#E8935A] p-2">
                  <Trash2 size={17} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-[#EDE9DC] rounded-2xl p-6 h-fit sticky top-24 ff-body">
          <h3 className="ff-display font-semibold text-lg text-[#1E3F30] mb-4">Order Summary</h3>
          <div className="flex justify-between text-sm text-[#4B5142] mb-2"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
          <div className="flex justify-between text-sm text-[#4B5142] mb-2"><span>Delivery Fee</span><span>{deliveryFee === 0 ? "Free" : fmt(deliveryFee)}</span></div>
          <div className="flex justify-between text-sm text-[#2F6B45] mb-2"><span>You Save</span><span>-{fmt(savings)}</span></div>
          <div className="border-t border-[#EDE9DC] my-3" />
          <div className="flex justify-between font-semibold text-[#1E3F30] mb-5"><span>Total</span><span>{fmt(total)}</span></div>
          <Button className="w-full" onClick={() => go("checkout")}>Proceed to Checkout <ChevronRight size={16} /></Button>
          {subtotal > 0 && subtotal < 299 && <p className="text-xs text-[#7A8073] mt-3 text-center">Add {fmt(299 - subtotal)} more for free delivery</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   CHECKOUT + CONFIRMATION
----------------------------------------------------------------*/

function CheckoutPage({ cart, go, placeOrder }) {
  const items = Object.entries(cart).map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === Number(id)), qty })).filter((i) => i.qty > 0 && i.product);
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const savings = items.reduce((s, i) => s + (i.product.mrp - i.product.price) * i.qty, 0);
  const deliveryFee = subtotal >= 299 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", state: "", pincode: "" });
  const [payment, setPayment] = useState("upi");
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const canPlace = form.name && form.phone && form.address && form.city && form.state && form.pincode && items.length > 0;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <h1 className="ff-display text-3xl font-semibold text-[#1E3F30] mb-6">Checkout</h1>
      <div className="grid md:grid-cols-[1fr_340px] gap-8">
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-[#EDE9DC] rounded-2xl p-6 ff-body">
            <h3 className="font-semibold text-[#1E3F30] mb-4 flex items-center gap-2"><MapPinned size={17} /> Delivery Address</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <input placeholder="Full Name" value={form.name} onChange={set("name")} className="border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
              <input placeholder="Phone Number" value={form.phone} onChange={set("phone")} className="border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
              <input placeholder="Address" value={form.address} onChange={set("address")} className="sm:col-span-2 border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
              <input placeholder="City" value={form.city} onChange={set("city")} className="border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
              <input placeholder="State" value={form.state} onChange={set("state")} className="border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
              <input placeholder="Pincode" value={form.pincode} onChange={set("pincode")} className="border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
            </div>
          </div>

          <div className="bg-white border border-[#EDE9DC] rounded-2xl p-6 ff-body">
            <h3 className="font-semibold text-[#1E3F30] mb-4 flex items-center gap-2"><CreditCard size={17} /> Payment Method</h3>
            <div className="flex flex-col gap-2">
              {[["upi", "UPI", Wallet], ["card", "Credit / Debit Card", CreditCard], ["cod", "Cash on Delivery", Banknote]].map(([val, label, Icon]) => (
                <label key={val} className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${payment === val ? "border-[#2F6B45] bg-[#EAF3E5]" : "border-[#EDE9DC]"}`}>
                  <input type="radio" name="payment" checked={payment === val} onChange={() => setPayment(val)} className="accent-[#2F6B45]" />
                  <Icon size={16} className="text-[#2F6B45]" />
                  <span className="text-sm font-medium text-[#1E3F30]">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#EDE9DC] rounded-2xl p-6 h-fit sticky top-24 ff-body">
          <h3 className="ff-display font-semibold text-lg text-[#1E3F30] mb-4">Order Summary</h3>
          <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-3 pr-1">
            {items.map(({ product, qty }) => (
              <div key={product.id} className="flex justify-between text-sm text-[#4B5142]">
                <span className="truncate">{product.name} × {qty}</span>
                <span className="shrink-0 ml-2">{fmt(product.price * qty)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#EDE9DC] pt-3 flex justify-between text-sm text-[#4B5142] mb-2"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
          <div className="flex justify-between text-sm text-[#4B5142] mb-2"><span>Delivery Fee</span><span>{deliveryFee === 0 ? "Free" : fmt(deliveryFee)}</span></div>
          <div className="flex justify-between text-sm text-[#2F6B45] mb-2"><span>Discount</span><span>-{fmt(savings)}</span></div>
          <div className="border-t border-[#EDE9DC] my-3" />
          <div className="flex justify-between font-semibold text-[#1E3F30] mb-5"><span>Total</span><span>{fmt(total)}</span></div>
          <Button className="w-full" disabled={!canPlace} onClick={() => placeOrder({ form, payment, total, items })}>Place Order</Button>
        </div>
      </div>
    </div>
  );
}

function ConfirmationPage({ order, go }) {
  if (!order) return null;
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-[#EAF3E5] flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} className="text-[#2F6B45]" />
      </div>
      <h1 className="ff-display text-3xl font-semibold text-[#1E3F30] mb-2">Order Placed!</h1>
      <p className="ff-body text-sm text-[#7A8073] mb-6">Thanks {order.form.name.split(" ")[0]}, your groceries are on the way.</p>

      <div className="bg-white border border-[#EDE9DC] rounded-2xl p-6 text-left ff-body">
        <div className="flex justify-between text-sm mb-2"><span className="text-[#7A8073]">Order ID</span><span className="font-semibold text-[#1E3F30]">{order.id}</span></div>
        <div className="flex justify-between text-sm mb-2"><span className="text-[#7A8073] flex items-center gap-1"><Clock size={13} /> Estimated Delivery</span><span className="font-semibold text-[#1E3F30]">{order.eta}</span></div>
        <div className="flex justify-between text-sm mb-4"><span className="text-[#7A8073]">Payment</span><span className="font-semibold text-[#1E3F30] capitalize">{order.payment === "cod" ? "Cash on Delivery" : order.payment.toUpperCase()}</span></div>
        <div className="border-t border-[#EDE9DC] pt-3 flex flex-col gap-1.5 mb-3 max-h-32 overflow-y-auto">
          {order.items.map(({ product, qty }) => (
            <div key={product.id} className="flex justify-between text-xs text-[#4B5142]"><span>{product.name} × {qty}</span><span>{fmt(product.price * qty)}</span></div>
          ))}
        </div>
        <div className="border-t border-[#EDE9DC] pt-3 flex justify-between font-semibold text-[#1E3F30]"><span>Total Paid</span><span>{fmt(order.total)}</span></div>
      </div>

      <Button className="mt-8" onClick={() => go("products")}>Continue Shopping</Button>
    </div>
  );
}

/* ---------------------------------------------------------------
   LOGIN / SIGNUP
----------------------------------------------------------------*/

function LoginPage({ go, onAuth }) {
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="bg-white border border-[#EDE9DC] rounded-3xl p-8">
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#2F6B45] flex items-center justify-center"><Leaf size={16} className="text-white" /></div>
          <span className="ff-display text-xl font-semibold text-[#1E3F30]">FreshCart</span>
        </div>

        <div className="flex bg-[#EAF3E5] rounded-full p-1 mb-6">
          {["login", "signup"].map((m) => (
            <button key={m} onClick={() => setMode(m)} className={`flex-1 ff-body text-sm font-semibold py-2 rounded-full capitalize transition-colors ${mode === m ? "bg-white text-[#2F6B45] shadow-sm" : "text-[#4B5142]"}`}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 ff-body">
          {mode === "signup" && (
            <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
          )}
          <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
          <div className="relative">
            <input placeholder="Password" type={showPw ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45] pr-10" />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8073]">{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>
          {mode === "signup" && (
            <input placeholder="Confirm Password" type={showPw ? "text" : "password"} value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} className="border border-[#EDE9DC] rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#2F6B45]" />
          )}
          {mode === "login" && <button className="text-xs text-[#2F6B45] font-medium text-right">Forgot password?</button>}

          <Button className="w-full mt-2" onClick={() => { onAuth(form.name || form.email.split("@")[0] || "Guest"); go("profile"); }}>
            {mode === "login" ? "Log In" : "Create Account"}
          </Button>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-[#EDE9DC]" /><span className="text-xs text-[#B0AB9B]">or</span><div className="flex-1 h-px bg-[#EDE9DC]" />
          </div>
          <button onClick={() => { onAuth("Google User"); go("profile"); }} className="border border-[#EDE9DC] rounded-xl py-2.5 text-sm font-medium text-[#1E3F30] flex items-center justify-center gap-2 hover:bg-[#FAF8F2]">
            <span className="text-base">🔍</span> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   PROFILE / ORDERS
----------------------------------------------------------------*/

function ProfilePage({ userName, go, onLogout }) {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-[#2F6B45] text-white flex items-center justify-center ff-display text-2xl font-semibold">
          {userName?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h1 className="ff-display text-2xl font-semibold text-[#1E3F30]">{userName}</h1>
          <p className="ff-body text-sm text-[#7A8073]">{userName?.toLowerCase().replace(" ", ".")}@example.com</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-[#EDE9DC] rounded-2xl p-5 ff-body">
          <h3 className="font-semibold text-sm text-[#1E3F30] mb-3 flex items-center gap-2"><MapPinned size={16} /> Saved Addresses</h3>
          <p className="text-sm text-[#4B5142]">Home — 221B, Vasundhara Sector 4, Ghaziabad, Uttar Pradesh, 201012</p>
        </div>
        <div className="bg-white border border-[#EDE9DC] rounded-2xl p-5 ff-body">
          <h3 className="font-semibold text-sm text-[#1E3F30] mb-3 flex items-center gap-2"><Package size={16} /> Total Orders</h3>
          <p className="text-2xl font-semibold text-[#1E3F30]">{MOCK_ORDERS.length}</p>
        </div>
      </div>

      <h2 className="ff-display text-xl font-semibold text-[#1E3F30] mb-4">Previous Orders</h2>
      <div className="flex flex-col gap-3 mb-8">
        {MOCK_ORDERS.map((o) => (
          <div key={o.id} className="bg-white border border-[#EDE9DC] rounded-2xl p-4 flex items-center justify-between ff-body">
            <div>
              <p className="font-semibold text-sm text-[#1E3F30]">{o.id}</p>
              <p className="text-xs text-[#7A8073] mt-0.5">{o.date} · {o.items.join(", ")}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-sm text-[#1E3F30]">{fmt(o.total)}</p>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${o.status === "Delivered" ? "bg-[#EAF3E5] text-[#2F6B45]" : "bg-[#FBE1E1] text-[#C0524F]"}`}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>

      <Button variant="secondary" onClick={() => { onLogout(); go("home"); }}>
        <LogOut size={16} /> Logout
      </Button>
    </div>
  );
}

/* ---------------------------------------------------------------
   WISHLIST PAGE
----------------------------------------------------------------*/

function WishlistPage({ wishlist, onToggleWish, ...cardProps }) {
  const products = PRODUCTS.filter((p) => wishlist.includes(p.id));
  if (products.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          subtitle="Tap the heart icon on any product to save it here for later."
          action={<Button onClick={() => cardProps.go("products")}>Browse Products</Button>}
        />
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <h1 className="ff-display text-3xl font-semibold text-[#1E3F30] mb-6">My Wishlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} {...cardProps} cartQty={cardProps.cart[p.id] || 0} wished onToggleWish={onToggleWish} />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   ROOT APP
----------------------------------------------------------------*/

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [userName, setUserName] = useState("");
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const go = (target, productId) => {
    setPage(target);
    setMenuOpen(false);
    if (target === "productDetail" && productId) setSelectedProductId(productId);
    if (target !== "products") { /* keep filters as-is */ }
  };

  const showToast = (msg) => setToast(msg);

  const addToCart = (id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const p = PRODUCTS.find((p) => p.id === id);
    showToast(`${p.name} added to cart`);
  };
  const incQty = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const decQty = (id) => setCart((c) => {
    const next = { ...c, [id]: (c[id] || 0) - 1 };
    if (next[id] <= 0) delete next[id];
    return next;
  });
  const removeFromCart = (id) => setCart((c) => { const n = { ...c }; delete n[id]; return n; });

  const toggleWish = (id) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    const p = PRODUCTS.find((p) => p.id === id);
    showToast(wishlist.includes(id) ? `${p.name} removed from wishlist` : `${p.name} added to wishlist`);
  };

  const placeOrder = ({ form, payment, total, items }) => {
    const order = {
      id: `FC-${Math.floor(10000 + Math.random() * 89999)}`,
      form, payment, total, items,
      eta: "35–45 minutes",
    };
    setLastOrder(order);
    setCart({});
    setPage("confirmation");
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cardProps = { go, cart, onAdd: addToCart, onInc: incQty, onDec: decQty, wishlist, onToggleWish: toggleWish, onOpen: (id) => go("productDetail", id) };

  let content;
  switch (page) {
    case "home":
      content = <HomePage go={go} setActiveCategory={setActiveCategory} {...cardProps} />;
      break;
    case "categories":
      content = <CategoriesPage go={go} setActiveCategory={setActiveCategory} />;
      break;
    case "products":
      content = <ProductsPage search={search} setSearch={setSearch} activeCategory={activeCategory} setActiveCategory={setActiveCategory} dealsOnly={false} {...cardProps} />;
      break;
    case "deals":
      content = <ProductsPage search={search} setSearch={setSearch} activeCategory={activeCategory} setActiveCategory={setActiveCategory} dealsOnly {...cardProps} />;
      break;
    case "productDetail":
      content = <ProductDetailPage productId={selectedProductId} go={go} cart={cart} onAdd={addToCart} onInc={incQty} onDec={decQty} wishlist={wishlist} onToggleWish={toggleWish} />;
      break;
    case "cart":
      content = <CartPage cart={cart} onInc={incQty} onDec={decQty} onRemove={removeFromCart} go={go} />;
      break;
    case "checkout":
      content = <CheckoutPage cart={cart} go={go} placeOrder={placeOrder} />;
      break;
    case "confirmation":
      content = <ConfirmationPage order={lastOrder} go={go} />;
      break;
    case "login":
      content = <LoginPage go={go} onAuth={(name) => { setIsAuthed(true); setUserName(name); }} />;
      break;
    case "profile":
      content = isAuthed
        ? <ProfilePage userName={userName} go={go} onLogout={() => { setIsAuthed(false); setUserName(""); }} />
        : <LoginPage go={go} onAuth={(name) => { setIsAuthed(true); setUserName(name); }} />;
      break;
    case "wishlist":
      content = <WishlistPage wishlist={wishlist} onToggleWish={toggleWish} {...cardProps} />;
      break;
    default:
      content = <HomePage go={go} setActiveCategory={setActiveCategory} {...cardProps} />;
  }

  return (
    <div className="min-h-screen bg-[#FAF8F2] ff-body">
      <style>{FONTS}</style>
      <Navbar
        page={page} go={go} cartCount={cartCount} wishCount={wishlist.length}
        search={search} setSearch={setSearch} menuOpen={menuOpen} setMenuOpen={setMenuOpen}
        isAuthed={isAuthed}
      />
      {content}
      <Footer go={go} />
      <BottomNav page={page} go={go} cartCount={cartCount} />
      <Toast message={toast} />
    </div>
  );
}
