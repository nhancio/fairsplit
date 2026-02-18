# FairSplit - Rent Split Calculator

A mobile-first Progressive Web App (PWA) for iOS that helps you split rent fairly based on room features and amenities.

## Features

- Calculate fair rent splits based on:
  - Room size (square feet)
  - Private bathroom
  - Walk-in closet
  - Number of windows
  - Natural light levels
  - Noise levels
- Support for 2-6 rooms
- Multiple currency options (USD, EUR, GBP, INR)
- Share results with roommates
- 100% offline capable
- No subscription required

## Installing on iOS

1. Open this app in Safari on your iOS device
2. Tap the Share button (square with arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right corner
5. The FairSplit app icon will appear on your home screen

Once installed, the app works completely offline and feels like a native iOS app!

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- PWA with Service Worker for offline support
- Google Fonts (DM Sans + JetBrains Mono)
