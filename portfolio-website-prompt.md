
## 0. Role & Mandate

You are a senior product design engineer — the kind who ships at Linear, Vercel, Stripe, or Arc Browser. Build a premium, animation-rich personal portfolio website for a computer science student. This is NOT a template. This is NOT a "developer portfolio starter kit" reskinned with a new name. Every layout decision, spacing choice, and motion curve should feel deliberate and custom-built for this specific person.

**Hard bans (non-negotiable):**
- ❌ No gradients. Not on backgrounds, not on text, not on buttons, not on borders. Flat, confident color only.
- ❌ No purple/blue "AI startup" aesthetic, no glassmorphism blobs, no floating 3D shapes, no generic hero illustrations from Undraw/Storyset.
- ❌ No centered-everything layout with a big rounded-pill CTA button and an emoji in the headline.
- ❌ No Inter font used exactly like every other AI-generated site (pick something with more character — see Typography).
- ❌ No fake testimonials, no fake stats ("500+ happy clients"), no filler Lorem Ipsum sections.
- ❌ No cookie-cutter card grids with identical drop shadows on everything.

**What "premium" means here:** restraint, intentional whitespace, a strong grid, one or two signature interactions done exceptionally well rather than ten mediocre ones, and typography that carries the design instead of decoration doing the work.

---

## 1. Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (utility-first, but with a fully custom design-token config — no default Tailwind palette)
- **Animation:** Framer Motion for component transitions, scroll-triggered reveals, and shared-layout animations; native CSS transitions for micro-interactions (hover, focus) to keep them instant and cheap
- **Scroll:** Lenis (or Framer Motion's `useScroll`) for smooth/inertial scrolling
- **Routing:** React Router (or single-page with anchor sections + scroll-spy nav — prefer single-page for a portfolio this size)
- **Icons:** Lucide React (outline style, consistent stroke width — no mixed icon packs)
- **Fonts:** Self-hosted via `@font-face` or `next/font`-equivalent, not Google Fonts CDN (for performance)
- **Deployment target:** Vercel (the person already uses Vercel + Firebase + GitHub)
- **Forms/backend (contact form):** Firebase Firestore or a simple serverless function — no third-party form spam widgets that look cheap

---

## 2. Design System

### Color
No gradients, ever. Use a restrained palette:
- **Base:** near-black (`#0A0A0B`) and off-white (`#FAFAF8`) — **dark-first is the default mode** (loads dark on first visit), with a proper light-mode toggle that's a real second theme (distinct surface/border/text values), not just an inverted filter
- **Accent:** exactly ONE confident accent color used sparingly (for links, active states, the cursor-follow dot, key CTA) — something with character, not default Tailwind blue. Consider a warm amber (`#F4A340`), a deep signal orange (`#FF5A1F`), or an electric lime (`#C6FF3D`) — pick one that feels intentional, not corporate.
- **Neutrals:** a full gray ramp (9–10 steps) for text hierarchy, borders, and surfaces — most of the UI should live in these neutrals, not in color.
- Borders are 1px hairlines, not shadows, for card separation. Use shadow only for elevated/floating elements (nav on scroll, modals).

### Typography
- **Display/headline font:** something with real personality and weight contrast — e.g. **Söhne**, **General Sans**, **Neue Montreal**, **Clash Display**, or **Bricolage Grotesque**. Avoid Inter/Poppins/Roboto for headlines.
- **Body font:** a clean, highly legible grotesk or a well-paired serif for contrast (e.g. pairing a grotesk headline with **Fraunces** or **Source Serif** for pull-quotes/section labels adds instant "designed by a human" credibility).
- **Mono font:** JetBrains Mono or IBM Plex Mono for code snippets, tags, timestamps, and small metadata labels (e.g. project stack tags) — this reinforces the engineering identity.
- Use a real type scale (e.g. 1.25 or 1.333 ratio), not arbitrary px values. Headlines should be large and confident (64–120px on desktop hero), with tight letter-spacing on display sizes and generous line-height on body copy.

### Layout & Grid
- 12-column grid on desktop, with intentional asymmetry (content doesn't need to be centered — off-center hero text, project images that bleed to the edge, etc.)
- Generous margins (don't fight for every pixel — let things breathe)
- Consistent spacing scale (4/8px base unit)
- A visible, subtle grid or baseline structure that a careful eye picks up (optional: a faint dotted grid overlay toggle, common in engineer portfolios, done tastefully)

---

## 3. Motion & Interaction Spec

This is the section that separates "nice site" from "premium site." Be specific and implement all of these:

### Page load
- Staggered entrance: nav fades in first, then hero headline reveals word-by-word or line-by-line (mask/clip-path reveal, not opacity-only), then subtext, then CTA — 60–100ms stagger between elements.
- A brief (under 1s) loading/intro sequence is optional but if used, must be fast and skippable, not a gratuitous logo animation.

### Scroll
- Section headers reveal with a clip-path wipe or a subtle Y-translate + fade as they enter viewport (use `whileInView` with `once: true`, threshold ~0.2).
- Parallax on project images (subtle, 5–15% offset max — nothing seasick).
- A scroll-progress indicator (thin line in nav or side rail).
- Numbers/stats (years of experience, GitHub stats, project count) count up when they enter view.

### Cursor & hover
- Custom cursor: a small dot that scales up and becomes a colored ring when hovering interactive elements; on project cards, the cursor can morph into a "View" label that follows the mouse.
- Magnetic buttons: primary CTAs and nav links subtly pull toward the cursor within a small radius (classic Awwwards technique — implement with a small spring-based offset, not too strong).
- Project cards: on hover, image scales slightly (1.03–1.06), a thin border animates in, and metadata (tech stack tags) slides up from below the image.
- Text links: underline draws in from left-to-right on hover using a `transform: scaleX` trick, not a background-position hack.

### Section transitions
- Sections should not just stack — use shared-layout transitions where a project card in the grid can morph into the detail view (Framer Motion `layoutId`) if you build project detail modals/pages.
- Smooth anchor-scroll with easing (no instant jump), nav active-state updates via scroll-spy with a sliding indicator pill under the active link.

### Micro-interactions
- Buttons: press state (scale down 0.97 on `:active`), not just hover color change.
- Form inputs: label floats up on focus, border color transitions, subtle focus ring in the accent color.
- Theme toggle (dark/light): animate with a circular reveal (`clip-path: circle()`) expanding from the toggle button, not a flat instant swap.
- Copy-to-clipboard on email: icon morphs to a checkmark with a spring animation for 1.5s.

### Performance discipline
- All animations respect `prefers-reduced-motion`.
- Animate `transform` and `opacity` only — never `top/left/width/height` for motion.
- Lazy-load below-the-fold images and heavy sections (Intersection Observer).
- Target Lighthouse performance 90+ despite the animation density — this is the mark of a senior engineer, not just a designer.

---

### iOS-Inspired Motion Language

The person wants the interaction feel of iPhone/iOS — not a literal iOS-style UI (no skeuomorphic app icons, no iOS nav bars), just Apple's *physics and restraint*. Borrow specifically from Apple's Human Interface Guidelines vocabulary:

- **Spring animations, not eased curves.** Every transform-based animation (card hover, modal open, button press, nav pill sliding to the active link) should use spring physics, not `ease-in-out` timing functions. In Framer Motion: `transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}` as the baseline "snappy but soft" feel — tune stiffness up (400–500) for small UI elements like buttons and toggles, and down (150–200) for large elements like the project-detail modal, so bigger things feel weightier. Nothing should linearly ease; it should settle with a very slight, natural overshoot-and-catch, the way iOS sheets and app icons do.
- **Symbol effects on icons.** Treat icons (Lucide) the way SF Symbols behave: a subtle bounce-scale (1 → 1.15 → 1) on click for icon buttons (copy email, theme toggle, social links), a gentle pulse on the "available for opportunities" status dot (opacity/scale breathing loop, 2s cycle), and icons that morph state-to-state (sun↔moon on theme toggle, copy↔checkmark on email) rather than hard-cutting.
- **Sheet-style transitions for project detail.** When a project card is opened (via the shared-layout `layoutId` transition already specified), it should feel like an iOS modal sheet: rises from where it was clicked, scales from the card's exact bounds into a larger surface, with the background dimming and the corner radius animating down slightly as it expands — spring physics, not fade.
- **Continuous corner radius ("squircles").** Where feasible, use a superellipse/squircle corner treatment (via SVG mask or the `corner-shape: squircle` / manual clip-path approach) on cards, the photo frame, and buttons instead of plain `border-radius` — this is the actual geometry behind why iOS icons feel different from a standard rounded rectangle. If a squircle implementation is too heavy, at minimum use consistent, slightly larger corner radii (16–24px) applied uniformly.
- **Frosted nav bar.** The fixed nav, once scrolled, should use a translucent blurred surface (`backdrop-filter: blur(20px)` over a semi-transparent neutral, e.g. `rgba(10,10,11,0.72)`) with a hairline bottom border — Apple's "material" effect. This is blur/opacity, not a gradient, so it stays within the no-gradient rule.
- **Tap/press feedback everywhere tappable.** Every interactive element (buttons, project cards, nav links, social icons) gets an immediate `scale: 0.96` spring-back on press (`whileTap` in Framer Motion) — this is the single biggest thing that makes a web UI feel like a native iOS app instead of a website, so do not skip it on any clickable element.
- **Momentum scrolling feel.** Pair with the Lenis smooth-scroll setup already specified — the goal is scroll that decelerates naturally (inertia) rather than the abrupt stop of default browser scroll.

## 4. Site Structure & Sections

Single-page scroll experience with a fixed/floating nav, in this order:

### Nav (fixed, transforms on scroll)
- Logo/monogram (e.g. a custom "DI" wordmark — design it as SVG, not a generic favicon-style logo)
- Links: Work, About, Skills, Contact — with the sliding active-indicator described above
- Theme toggle
- Resume download button (secondary style, not competing with primary CTA)
- Nav background is transparent over hero, becomes a blurred/solid bar with a hairline border after scrolling past hero height

### Hero
- Not a generic "Hi, I'm X 👋" — write it with a stronger, more specific opening. Suggested direction (adapt tone, keep it grounded and not over-hyped since he's a first-year student — confidence without overclaiming):

  > **Building things at the intersection of code and curiosity.**
  > First-year CSE student at MRIIRS, shipping full-stack products and exploring AI/ML while learning the fundamentals properly — one data structure at a time.

- Include: name, one-line role ("CSE Student · Full-Stack Builder · Aspiring SWE & AI Engineer"), a short CTA pair ("View Work" primary / "Get in Touch" secondary), and a subtle live element — e.g. a real-time GitHub contribution indicator, a "currently learning: DSA in C++" status chip, or a small terminal-style animated text cycling through his stack (React → Python → C++ → Firebase).
- No stock photography, no generic illustration. A real personal photo will be provided — treat it with intention: a subtle duotone/monochrome tint matching the accent color (not full color, which tends to clash with the flat palette), placed asymmetrically (not centered in a circle/blob), with a thin hairline border or offset frame, and a small reveal animation on load (clip-path wipe or mask reveal, matching the headline's entrance timing). Leave a clearly marked placeholder (`/* PHOTO: hero-portrait.jpg */`) sized for a portrait-orientation image so it can be dropped in directly.

### Work / Projects
Feature exactly these two real projects with real depth — no filler "coming soon" cards:

1. **Printify Notes** — printifynotes.in
   - What it is: a free, privacy-first browser tool that converts dark-background lecture notes/PDFs (from platforms like Physics Wallah, Unacademy, Vedantu) into clean, ink-saving printable PDFs — entirely client-side, no uploads, no signup required.
   - Stack tags: React, TypeScript, Tailwind CSS
   - Highlight the "100% Private — No Data Leaves Your Device" and "Instant In-Browser Engine" angle — this is a genuinely good differentiator, feature it prominently.
   - Link to live site + GitHub repo (isar-durganand/printifynotes)

2. **JoSAA College Predictor** — josaacollegepredictor.vercel.app
   - What it is: a data-driven college/branch predictor for JoSAA counseling, using historical cutoff and rank-percentile data (with NIRF rankings integrated) to help engineering aspirants estimate admission chances.
   - Stack tags: Python, Flask, data pipeline, Vercel deployment
   - Link to live site + GitHub repo (isar-durganand/josaapredictor)

Each project card: large preview image/screenshot (real screenshot in a clean browser-chrome frame, not a flat crop), title, one-sentence description, tech-stack tags in mono font, and two links (Live / Code) with icon-only buttons that expand to show the label on hover.

If a third project slot is wanted, leave it structured but clearly optional/expandable — do not fabricate a project that doesn't exist.

### About
- Short, honest, human-voiced bio — not a resume paragraph. Cover: currently a BTech CSE student at Manav Rachna International Institute of Research and Studies (MRIIRS), Faridabad; learning C/C++ and DSA from the ground up (not skipping fundamentals despite already knowing full-stack web dev); comfortable across the stack — Python, JavaScript/TypeScript, HTML/CSS, React; builds and ships real products (not just tutorials) using Git/GitHub, Vercel, and Firebase; also works with AI-assisted development tools as part of his workflow; long-term goal is a software engineering / AI role at a top company and competing in hackathons.
- Include a small "currently" strip: what he's learning right now (DSA via structured C++ study), keeping it dynamic/honest rather than a static wall of text.
- Optional: a short "how I got here" micro-timeline (Class X → Class XII, PCM → BTech CSE) rendered as a clean horizontal or vertical stepper with dates, not a generic resume timeline widget.

### Skills / Toolkit
- Avoid the cliché "skill bar with percentage" pattern entirely — percentages on skills are meaningless and read as amateur.
- Instead, group into clean categories as a tag/chip grid with subtle hover states: **Languages** (C, C++, Python, JavaScript/TypeScript), **Web** (React, HTML/CSS, Tailwind), **Tools & Platforms** (Git, GitHub, Vercel, Firebase), **Currently Learning** (Data Structures & Algorithms).
- Optionally include relevant certifications as small credential cards: "Introduction to AI" (Google), "AI Fundamentals" (Google) — with issued date, shown as understated proof points, not a bragging wall.

### Contact / Footer
- Clear, confident closing section — not a boring form buried at the bottom.
- Large closing headline (e.g. "Let's build something.") with the same reveal animation as the hero.
- Direct contact: email (with copy-to-clipboard interaction described above), LinkedIn (linkedin.com/in/durganandishar), GitHub (github.com/isar-durganand).
- Optional lightweight contact form (name, email, message) wired to Firebase or a serverless function — with the floating-label input animation.
- Footer: small, quiet, monospace credit line + current local time or a subtle "available for opportunities" status dot — small details that senior portfolios use to feel alive.

---

## 5. Content Rules for the AI

- Never invent job titles, companies, years of experience, or metrics that weren't given. He is a first-year/early-stage BTech CSE student — the copy tone should be confident about what's real (shipped products, real stack knowledge, real learning discipline) without pretending to be a 5-year industry veteran.
- Use his real links only:
  - LinkedIn: https://www.linkedin.com/in/durganandishar/
  - GitHub: https://github.com/isar-durganand
  - Printify Notes: https://www.printifynotes.in/
  - JoSAA Predictor: https://josaacollegepredictor.vercel.app/
- Keep copy plain and emotionally grounded — short sentences, no corporate buzzwords ("synergy", "passionate about leveraging"), no excessive exclamation points, no emoji in headlines.

---

## 6. Deliverable Expectations

- Fully responsive: mobile-first, but the desktop experience should be the showcase (test at 1440px primarily, then adapt down).
- Accessible: proper semantic HTML, visible focus states (don't just remove the outline), sufficient color contrast even with the dark palette, alt text on all images.
- Clean file structure: components split logically (`Hero`, `Nav`, `ProjectCard`, `SkillChip`, etc.), design tokens centralized in the Tailwind config, no inline magic numbers scattered through JSX.
- Include a `README.md` explaining how to run and deploy the project.

---

*End of prompt. If the AI building this needs project screenshots, ask for them — do not fabricate fake UI mockups of Printify Notes or JoSAA Predictor.*
