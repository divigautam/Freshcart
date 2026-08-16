
# FreshCart 🥬

A modern, responsive grocery shopping web app frontend — built with React, Tailwind CSS, and Lucide icons. No backend required; all data is mocked and cart/wishlist state lives in React state for the session.

## Tech Stack

- **React.js** — component-based UI, hooks only (`useState`, `useEffect`, `useMemo`)
- **Tailwind CSS** — utility-first styling
- **Lucide React** — icon set
- **Mock/local JSON data** — 27 realistic grocery products, no backend or database
- **Google Fonts** — Fraunces (display/serif) + Inter (body)

## Project Structure

Everything lives in a single component file, `freshcart.jsx`, organized top-to-bottom into clear sections:

```
freshcart.jsx
├── Design tokens & fonts        (color palette, typography)
├── Mock data                    (CATEGORIES, PRODUCTS, REVIEWS, MOCK_ORDERS)
├── Helpers                      (fmt, pct — currency & discount formatting)
├── Reusable UI                  (Button, Rating, Toast, EmptyState, ProductCardSkeleton)
├── ProductCard
├── Navbar / BottomNav / Footer
├── Page components               (Home, Categories, Products, ProductDetail,
│                                  Cart, Checkout, Confirmation, Login, Profile, Wishlist)
└── App (root)                   (routing/state, renders the active page)
```

There's no React Router — page navigation is handled by a simple `page` state variable and a `go(target, id)` function, which keeps the whole app in one portable file.

## Pages & Features

| Page | What it does |
|---|---|
| **Home** | Hero, category grid, popular products, deals, discount banner, "Why Choose FreshCart" |
| **Products** | Search, category filter, price range slider, sort (popularity / price / rating), loading skeletons, empty state |
| **Product Detail** | Large view, quantity selector, add to cart / buy now, nutrition & delivery info, reviews, related products |
| **Cart** | Quantity controls, remove item, subtotal, delivery fee (free over ₹299), savings, total, empty-cart state |
| **Checkout** | Address form, payment method (UPI / Card / COD), order summary, validated "Place Order" |
| **Confirmation** | Order ID, ETA, itemized summary, "Continue Shopping" |
| **Login / Signup** | Toggle between modes, password visibility, Google login UI (mocked) |
| **Profile / Orders** | User info, saved address, past orders with status, logout |
| **Wishlist** | Heart-toggle from any product card, dedicated page with empty state |

Also included: toast notifications on add-to-cart/wishlist, responsive hamburger menu, mobile bottom nav, and hover/transition animations throughout.

## Design Direction

- **Palette:** cream background, deep forest green (`#1E3F30`) and leaf green (`#2F6B45`) as primary, citrus orange (`#E8935A`) for deals/accents
- **Type:** Fraunces for headings (organic, farm-market feel), Inter for body text
- **Signature elements:** dashed "crate-label" category stamps, rotated discount badges, illustrated emoji product tiles instead of stock photos (keeps things fast and nothing ever fails to load)

## Running It

This file is meant to run as a single React component (e.g. dropped into a Vite/CRA app as `App.jsx`, or used directly inside the Claude.ai artifact preview). Requirements:

- React 18+
- Tailwind CSS configured in the project
- `lucide-react` installed (`npm i lucide-react`)

```bash
npm install lucide-react
```

Then import and render `App` as your root component.

## ⚠️ Known Limitation: No Persistent Storage

The brief asks for cart/wishlist data to persist via `localStorage`. **Browser storage APIs don't work inside Claude.ai's artifact preview**, so this build keeps cart and wishlist in plain React state instead — meaning a page refresh will reset them.

If you run this file in your own project (outside Claude.ai), you can restore real persistence by swapping the `cart`/`wishlist` `useState` calls in `App` for a small wrapper that reads/writes `localStorage` on change, e.g.:

```js
const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart") || "{}"));
useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);
```

Do the same for `wishlist`.

## Customizing

- **Add products:** extend the `PRODUCTS` array — each item needs `id`, `name`, `brand`, `category`, `emoji`, `unit`, `price`, `mrp`, `rating`, `reviews`, `desc`, `nutrition`, `delivery` (and optionally `popular: true` / `deal: true` to surface it on the homepage rows).
- **Add categories:** extend `CATEGORIES` with `id`, `name`, `emoji`, `tint` (a hex background color).
- **Change colors/fonts:** edit the `FONTS` string and the Tailwind arbitrary-value classes (e.g. `bg-[#2F6B45]`) — all color values are defined inline for easy find-and-replace.
