# Danish Raimi — Portfolio

A cinematic developer portfolio with a **Devil May Cry** dark aesthetic, built with Next.js 16, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
cd danish-portfolio
npm install     # already done
npm run dev     # open http://localhost:3000
```

## Structure

```
src/
├── app/
│   ├── globals.css        # DMC theme, scanlines, scrollbar, custom utilities
│   ├── layout.tsx         # Cinzel + Rajdhani + Orbitron Google Fonts
│   └── page.tsx           # Composes all sections
└── components/
    ├── HeroSection.tsx    # Letterbox intro, animated name, cycling roles, particles
    ├── SocialBar.tsx      # Fixed top nav with GitHub/LinkedIn/Instagram/WhatsApp/Telegram
    ├── ParticleBackground.tsx  # Canvas particle system with mouse interaction
    ├── ProjectWheel.tsx   # GTA V-style SVG weapon wheel (2 wheels × N segments)
    ├── TechStack.tsx      # Skill badges with proficiency pips + progress bars
    ├── AudioPlayer.tsx    # Ambient music player with visualizer bars
    └── CursorCat.tsx      # Animated SVG cat that follows the cursor
```

## Add Your Audio

Place your MP3 at:
```
public/audio/relaxed.mp3
```

## Add Projects

In `ProjectWheel.tsx`, find the `WHEELS` array and replace placeholder projects
inside each segment's `projects: []` array with your real projects.

## Customise Social Links

In `SocialBar.tsx`, update the `href` values in `SOCIAL_LINKS`.
