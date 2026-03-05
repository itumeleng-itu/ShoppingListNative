# ShoppingListNative

A mobile shopping list app built with **React Native** and **Expo**. Browse grocery products by category, add them to your personal shopping list, and manage your shopping on the go.

---

## Features

- **Product Browsing** — View a curated catalog of grocery items with images, organized by category (Food, Bath, Wash)
- **Category Filtering** — Quickly filter products using a segmented control with animated transitions
- **Search** — Find products instantly with a floating search bar that adapts to the keyboard
- **Product Details** — Tap any item to view it in a blurred modal overlay with a full-size image
- **Shopping List** — Add items to a persistent shopping list with quantity tracking
- **Check Off Items** — Mark items as done with a checkbox; checked items move to a separate "Done" section
- **Quantity Management** — Increment or decrement item quantities directly from the list
- **Persistent Storage** — Shopping list is saved locally using AsyncStorage and persists across app restarts
- **Haptic Feedback** — Subtle haptic responses on navigation interactions (iOS)
- **Smooth Animations** — Entrance and layout animations powered by React Native Reanimated
- **FAQ & Support** — In-app feedback page with support email and app store links

---

## Screens

| Screen | Route | Description |
|---|---|---|
| **Landing** | `/` | Splash/welcome screen with app logo — tap to enter |
| **Home** | `/homePage` | Product catalog with category tabs, search, and item grid |
| **My List** | `/list` | Personal shopping list with stats, check-off, and quantity controls |
| **FAQ** | `/faq` | Feedback, support, and frequently asked questions |

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Expo SDK 54](https://expo.dev) | Managed React Native workflow |
| [Expo Router](https://docs.expo.dev/router/introduction/) | File-based navigation |
| [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) | Performant animations |
| [NativeWind](https://www.nativewind.dev/) | Tailwind CSS for React Native |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Local data persistence |
| [Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/) | Blurred modal overlays |
| [Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/) | Tactile feedback |
| TypeScript | Type-safe development |

---

## Project Structure

```
ShoppingListNative/
├── app/                        # Screens (file-based routing)
│   ├── _layout.tsx             # Root layout with providers
│   ├── index.tsx               # Landing / splash screen
│   ├── homePage.tsx            # Product browsing screen
│   ├── list.tsx                # Shopping list screen
│   ├── addItem.tsx             # Add item screen
│   └── faq.tsx                 # FAQ & support screen
├── components/                 # Reusable components
│   ├── itemGrid.tsx            # Product grid with cards
│   ├── itemDetailModal.tsx     # Product detail popup
│   └── ui/                     # Shared UI components
│       ├── bottomBar.tsx       # Bottom navigation bar
│       ├── searchBar.tsx       # Floating search input
│       └── segmentedControlFilters.tsx  # Category tabs
├── hooks/                      # Custom React hooks
│   ├── useProducts.ts          # Product data fetching hook
│   └── useShoppingList.tsx     # Shopping list context & state
├── constants/                  # App constants & services
│   ├── GroceryService.ts       # Mock API for product data
│   └── theme.ts                # Theme configuration
├── assets/images/              # App icons & images
├── ProductData.json            # Local product catalog (30 items)
├── app.json                    # Expo configuration
├── tailwind.config.js          # NativeWind / Tailwind config
└── package.json                # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — installed globally or via `npx`
- A physical device with [Expo Go](https://expo.dev/go) **or** an emulator/simulator:
  - [Android Emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
  - [iOS Simulator](https://docs.expo.dev/workflow/ios-simulator/) (macOS only)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/itumeleng-itu/ShoppingListNative.git
   cd ShoppingListNative
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npx expo start
   ```

4. **Open the app**

   - Scan the QR code with **Expo Go** on your phone
   - Press `a` to open on an Android emulator
   - Press `i` to open on an iOS simulator
   - Press `w` to open in a web browser

### Clear Cache (if needed)

If you encounter bundling issues:

```bash
npx expo start --clear
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start the Expo development server |
| `npm run android` | Start on an Android device/emulator |
| `npm run ios` | Start on an iOS simulator |
| `npm run web` | Start in a web browser |
| `npm run lint` | Run ESLint for code quality checks |
| `npm run reset-project` | Reset to a blank project structure |

---

## How It Works

1. **Browse** — Open the app and tap the grocery image on the landing screen to enter the product catalog
2. **Filter** — Use the category tabs (All, Food, Bath, Wash) to narrow down products
3. **Search** — Use the floating search bar to find specific items by name
4. **View** — Tap "View" on any product card to see a detailed modal with a full-size image
5. **Add** — Tap "Add to list" in the modal to add the item to your shopping list
6. **Manage** — Navigate to "My List" via the bottom bar to view, check off, adjust quantities, or remove items
7. **Persist** — Your list is automatically saved and will be there when you come back

---

## License

This project is private and not currently licensed for public distribution.
