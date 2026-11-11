# Design System & Visual Authority

<!-- impeccable:design-schema 1 -->

## Visual World: Modern Enterprise Minimalist

Ecreation IT Solution projects technical precision, trust, and contemporary digital craft. The aesthetic merges the restraint of enterprise-grade developer platforms (like Vercel and Linear) with the visual depth of modern technology studios.

## Color Palette & Tokens

### Base & Backgrounds
- **Background (Light):** `#FAFAFA` / `oklch(0.99 0 0)`
- **Surface Elevation (Light):** `#FFFFFF` with `1px solid oklch(0.92 0 0)`
- **Background (Dark):** `#090A0F` / `oklch(0.11 0.01 260)`
- **Surface Elevation (Dark):** `#11131C` with `1px solid rgba(255, 255, 255, 0.08)`

### Brand Accents
- **Primary Accent:** Electric Indigo `#4F46E5` (`oklch(0.55 0.24 265)`) — purposeful, vibrant, authoritative.
- **Secondary Accent:** Digital Teal / Cyan `#06B6D4` (`oklch(0.72 0.16 210)`) — innovation, speed, modern infrastructure.
- **Accent Gradients:** Subtle mesh background overlays with `opacity-15` and backdrop blur; no muddy rainbow gradients.

### Functional Colors
- **Success:** `#10B981` (Emerald)
- **Warning:** `#F59E0B` (Amber)
- **Destructive:** `#EF4444` (Ruby)
- **Muted Foreground:** `oklch(0.55 0 0)` (Light) / `oklch(0.7 0 0)` (Dark)

## Typography System

- **Display Headings (H1, H2):** Tight tracking (`tracking-tight` / `-0.025em`), bold weight (700/800), clean line-height (`leading-tight`).
- **Subheadings (H3, H4):** Semi-bold (600), comfortable spacing, sharp contrast against body copy.
- **Body Text:** Neutral-600 / Neutral-300, 16px/24px base (`leading-relaxed`), optimized for prolonged reading.
- **Micro-copy & Badges:** Uppercase tracking (`tracking-wider`), 11px-12px (`text-xs`), medium weight (500).

## Layout & Spatial Rhythm

- **Container Scale:** Max width 1280px (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Section Gutters:** `py-20 lg:py-28` for intentional breathing room between content chapters.
- **Bento Grid Patterns:** Varied cell hierarchies (2:1 and 1:1 ratios) with interactive borders, subtle corner radiuses (`rounded-2xl`), and inset padding (`p-6 sm:p-8`).

## Motion & Interactive States (React Bits)

- **Entry Animations:** Smooth upward stagger (`y: 20` to `y: 0`, `opacity: 0` to `opacity: 1`, duration `0.4s-0.6s`, `easeOut`).
- **Card Hover:** Subtle elevation scale (`translate-y-[-2px]`), border glow reveal, and smooth shadow transition (`transition-all duration-300`).
- **Buttons:** Tactile feedback on click (`active:scale-[0.98]`), clear focus-visible rings with 2px offset.
- **Micro-delights:** Interactive gradient borders, subtle pulse indicators on live status badges, and silky smooth drawer transitions.

## Quality Floor & Anti-Slop Safeguards

- NO generic purple-to-yellow gradients.
- NO unformatted walls of text; always use structured scannable hierarchy (badges, bullet cards, metric counters).
- NO fake testimonials, placeholder images, or broken external links.
- 100% genuine domain copy written specifically for Ecreation IT Solution's enterprise client base.
