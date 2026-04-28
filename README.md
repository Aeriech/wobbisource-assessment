# Wobbisource Assessment

A modern Next.js + React map pin app with location search, interactive Leaflet mapping, and persistent pin state.

## Features

- Click anywhere on the map to drop a pin
- Search for addresses, cities, or landmarks
- Click a search result to add a pin and recenter the map
- Drag existing pins to update their coordinates
- View and delete saved pins in a live sidebar
- Mobile-friendly layout with bottom sheet pin list

## Stack

- Next.js 16.2.4 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Leaflet + react-leaflet
- Zustand for state management and persistence
- OpenStreetMap / Nominatim geocoding

## Getting Started

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Project Structure

- `app/` — main Next.js app router pages and layout
- `components/` — UI and map components
- `store/` — Zustand pin state management
- `types/` — shared TypeScript types
- `public/` — static assets

## Map Behavior

- Uses a dynamic client-only `Map` component to avoid SSR issues with Leaflet
- Saves pin data in local storage through Zustand persistence
- Re-centers the map when a pin address is clicked or a search result is selected

## Notes

- Search uses the free OpenStreetMap Nominatim API, so usage may be rate-limited.
- Leaflet map styling is loaded via the package and client-only rendering.

## License

This project is provided as-is for assessment and demo purposes.
