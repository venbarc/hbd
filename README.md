# Bikini Bottom Greetings

A minimalist SpongeBob-inspired greeting prompt built with React, Vite, TailwindCSS, and Framer Motion.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run the dev server:

```bash
npm run dev
```

## Assets

Place the image assets in `public/` with these exact names:

- `public/sbhouse.webp` (background)
- `public/sb1.png` (sticker 1)
- `public/sb2.png` (sticker 2)

## Music

The music toggle uses a privacy-friendly YouTube embed (`youtube-nocookie.com`).

The app attempts to start audio automatically, but browsers may still require a user tap.

## Acceptance checklist

- Fullscreen background with ocean overlay + floating bubbles.
- Name prompt validates and animates on empty submit.
- Greeting adjusts by time of day and shows fun subtext.
- Stickers float and respond to subtle parallax.
- Music toggle has clear on/off state and only plays after user interaction.
- UI is minimalist, responsive, and accessible.
