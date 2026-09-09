# Durganand Ishar — Portfolio

Personal portfolio website built with React 18, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS with custom design tokens
- **Animation:** Framer Motion (spring physics, scroll-triggered reveals)
- **Icons:** Lucide React

## Design System

- **Dark-first** with a full light mode toggle
- **No gradients** — flat, confident surfaces with 1px hairline borders
- **Accent:** Signal Orange (`#FF5A1F`)
- **Typography:** Bricolage Grotesque (display), Plus Jakarta Sans (body), JetBrains Mono (code/tags)

## Deployment

Optimized for **Vercel**:

```bash
npm run build
# Deploy `dist/` directory to Vercel
```

Or connect the GitHub repo directly to Vercel for automatic deployments.

## Project Structure

```
src/
├── components/
│   ├── layout/     # Navbar, Footer, CustomCursor
│   ├── hero/       # Hero section
│   ├── projects/   # ProjectsSection with modal sheets
│   ├── about/      # AboutSection with timeline
│   ├── skills/     # SkillsSection with chip grid
│   └── contact/    # ContactSection with form
├── data/           # Projects, skills, timeline data
├── hooks/          # useTheme, useScrollSpy, useMagnetic
├── types/          # TypeScript interfaces
└── index.css       # Tailwind directives & custom styles
```

## License

MIT
