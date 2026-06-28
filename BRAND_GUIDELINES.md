# SIGNAL BLOOM / BRAND GUIDELINES

**For:** Graphic Design & Marketing Materials  
**Version:** 1.0  
**Date:** June 2026  

---

## 1. BRAND CONCEPT

**Signal Bloom** is an experimental audiovisual performance system that treats generation as a performative event. The brand identity embodies a "machine attempting to document itself"—merging live coding, generative art, AI, and improvisational performance into a single evolving environment.

**Visual Philosophy:** Glitch is not decoration. Glitch is the argument. The aesthetic is terminal/command-line inspired but refined for legibility and impact.

---

## 2. COLOR PALETTE

All colors are derived from the visual system's core palette:

### Primary Signal Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Signal** (Cyan) | #00f0ff | rgb(0, 240, 255) | Primary accent, headings, call-to-action, highlights |
| **Corrupt** (Magenta) | #ff00ee | rgb(255, 0, 238) | Secondary accent, error states, metadata, borders |
| **Background** (Black) | #000000 | rgb(0, 0, 0) | Primary background |
| **Alert** (Amber) | #ffaa00 | rgb(255, 170, 0) | Warning, status, secondary actions |

### Text & Support Colors

| Name | Hex | RGB | Usage | Contrast |
|------|-----|-----|-------|----------|
| **Ink** (Default Text) | #d4f7fb | rgb(212, 247, 251) | Body text, primary copy | 16:1 on black |
| **Ink Dim** (Metadata) | #86a7ac | rgb(134, 167, 172) | Secondary text, captions, labels | ~6:1 (WCAG AA) |
| **Ink Faint** | #5e7c80 | rgb(94, 124, 128) | Line numbers, footnotes, subtle text | ~4:1 (legible-dim) |

### Accent Borders

| Name | Hex | Usage |
|------|-----|-------|
| **Line** (Hairline) | #16454b | Thin borders, dividers |
| **Line Hot** | #1c8d9c | Accent borders, highlight states |
| **Depth** | #1a1aff | Deep blue accent (use sparingly) |

### Overlay/Transparency
- **Overlay (85% opacity black):** `rgba(0,0,0,0.85)` — for modals, backgrounds behind text

---

## 3. TYPOGRAPHY SYSTEM

### Font Stack
```
Courier New, Courier, JetBrains Mono, IBM Plex Mono, monospace
```
**Rationale:** Monospace throughout. No serif. Terminal aesthetic is fundamental to the brand.

### Font Weight
- **All text:** `400` (Regular only)
- **No bold, no italic.** Hierarchy is achieved through color, size, letter-spacing, and positioning.

### Core Text Properties

| Property | Value | Notes |
|----------|-------|-------|
| Base Font Size | 16.5px | Optimized for terminal legibility |
| Base Line Height | 1.62 | Generous leading for reading comfort |
| Base Letter Spacing | 0.015em | Subtle spacing for monospace clarity |
| Font Smoothing | Antialiased | Maintains crisp terminal look while remaining legible |

---

## 4. TYPOGRAPHY SCALE & HIERARCHY

### Headlines

| Name | Size | Letter Spacing | Color | Usage |
|------|------|-----------------|-------|-------|
| **Hero Title** | 54–132px (clamp) | 0.01em | Signal (#00f0ff) | Main poster headline, hero statements |
| **Section Title** | 26–52px (clamp) | 0.04em | Signal (#00f0ff) | Major section headers, subsections |
| **Subsection** | 20–30px (clamp) | 0.04em | Signal (#00f0ff) | Tertiary headers |
| **Big Statement** | 24–56px (clamp) | 0.01em | Signal (#00f0ff) | Quotes, key messages, emphasis |

**All headlines:** Uppercase, line-height 1.05–1.1

### Body Text

| Type | Size | Letter Spacing | Color | Line Height | Max Width |
|------|------|-----------------|-------|-------------|-----------|
| **Body Prose** | 16.5px | 0.015em | Ink (#d4f7fb) | 1.62 | 62ch |
| **Lead / Intro** | 17–22px (clamp) | 0.015em | Ink Brighter (#eafcff) | 1.62 | 62ch |
| **Kicker** | 12.5px | 0.26em | Ink Dim (#86a7ac) | 1.62 | Varies |

### Supporting Text

| Type | Size | Letter Spacing | Color | Usage |
|------|------|-----------------|-------|-------|
| **Labels / Metadata** | 10–13px | 0.18–0.32em | Ink Dim (#86a7ac) | Section numbers, edge labels, captions |
| **Spec/Tag List** | 14px | 0.07–0.1em | Ink / Corrupt | Technical specs, actor names, capabilities |
| **Code / Terminal** | 12.5–15px | 0.05em | Ink Dim / Colors | Code blocks, command output |

---

## 5. VISUAL HIERARCHY RULES

### Do's
✓ **Use color to differentiate.** Signal (cyan) for primary, Corrupt (magenta) for accents, Alert (amber) for action.  
✓ **Combine size + spacing.** Larger text with generous letter-spacing feels premium.  
✓ **Uppercase is standard** for labels, metadata, and UI elements.  
✓ **Keep contrast high.** Minimum 4:1 for body text; 6:1 is safer for any text below 16px.  
✓ **Use monospace exclusively.** Maintains brand consistency.  

### Don'ts
✗ **No bold or italic.** Font weight is always 400.  
✗ **No serif fonts.** Terminal aesthetic requires monospace.  
✗ **Avoid low-contrast combinations.** Ink Faint (#5e7c80) should never be used for body text on black.  
✗ **Don't mix font families.** Monospace only, everywhere.  
✗ **Avoid excessive tracking** on body text—stay between 0.015–0.1em.  

---

## 6. SPACING & LAYOUT

### Horizontal Padding
- **Desktop:** 46px (left/right margins)
- **Tablet/Mobile:** 18px (left/right margins)
- **Max width:** 1180px for readable columns

### Vertical Spacing
- **Section padding:** 64–150px (vertical, responsive)
- **Element gaps:** 8–40px (contextual)
- **Line height in prose:** 1.62 (ensures readability)

### Borders & Dividers
- **Thin borders:** `1px solid var(--line)` (#16454b)
- **Accent borders:** `1px solid var(--line-hot)` (#1c8d9c) — use around key UI elements
- **No thick borders** — 1px is standard throughout

---

## 7. PRACTICAL APPLICATIONS FOR POSTER DESIGN

### Headline Treatment
```
Main Headline: 48–80px, Signal cyan, uppercase, letter-spacing 0.04em
Subheading: 24–36px, Signal cyan, uppercase, letter-spacing 0.04em
```

### Call-to-Action Text
```
Color: Signal (#00f0ff) or Corrupt (#ff00ee)
Size: 16–20px, uppercase
Letter Spacing: 0.18–0.26em
Background: Black or semi-transparent black overlay
Border: 1px solid Signal or Corrupt (optional)
```

### Body Copy Blocks
```
Size: 16.5–18px
Color: Ink (#d4f7fb)
Line Height: 1.62
Letter Spacing: 0.015em
Max Width: 62 characters (optimal reading width)
```

### Metadata / Footnotes
```
Size: 10–12px
Color: Ink Dim (#86a7ac) or Ink Faint (#5e7c80)
Letter Spacing: 0.24–0.32em
Uppercase
```

### Accent Elements (Tags, Specs, Lists)
```
Border: 1px solid Line Hot (#1c8d9c)
Padding: 8–12px (horizontal/vertical)
Color: Ink (#d4f7fb)
Size: 12–14px, uppercase, letter-spacing 0.1em
Optional Animation: Pulse between Signal and Corrupt (not required for static poster)
```

---

## 8. COLOR APPLICATION EXAMPLES

### Background Strategy
- **Primary:** Solid black (#000000)
- **Secondary:** Dark with subtle gradient/texture for depth (optional)
- **Overlay for legibility:** Semi-transparent black scrim behind text if needed (rgba(0,0,0,0.85))

### Text on Black
| Text Color | Use Case | Contrast |
|------------|----------|----------|
| Signal (#00f0ff) | Headlines, CTAs, highlights | Excellent |
| Corrupt (#ff00ee) | Accents, secondary headers | Excellent |
| Ink (#d4f7fb) | Body text, primary copy | Excellent (16:1) |
| Ink Dim (#86a7ac) | Metadata, secondary copy | Good (6:1, WCAG AA) |
| Alert (#ffaa00) | Warnings, status indicators | Good (8:1) |

### Text on Accent Backgrounds
- **Cyan background + Black text:** Limited use (can feel harsh)
- **Black text on cyan:** Use sparingly for button fills or small highlights
- **Prefer:** White/light text on colored backgrounds for better contrast

---

## 9. ANIMATION & EFFECTS (Optional for Digital Posters)

If creating digital/animated versions:

### Glitch Effect
- Slight horizontal/vertical offset
- Color separation (cyan + magenta layers)
- Brief, subtle—not distracting

### Scanlines & Grain
- Horizontal scanlines at 1–2px intervals, 0.2–0.3 opacity
- Fine film grain overlay at ~0.04 opacity
- Creates "CRT monitor" aesthetic

### Text Animation
- Typewriter reveal (character-by-character, ~100ms per char)
- Fade-in with color shift (Corrupt → normal text)
- Blink cursor on interactive elements

---

## 10. DO NOT's — BRAND VIOLATIONS

| ✗ What NOT to Do | Why |
|------------------|-----|
| Use serif fonts (Georgia, Times New Roman, etc.) | Breaks terminal aesthetic |
| Apply bold or italic | Hierarchy comes from color/size/spacing |
| Mix multiple font families | Reduces cohesion |
| Use low-contrast text | Fails accessibility; hard to read |
| Use sans-serif monospace (Monaco, Menlo) without fallback | Font availability risk |
| Thick borders (>2px) | Conflicts with minimalist terminal design |
| Warm color palettes (reds, oranges, browns) | Signal and Corrupt are the only non-neutral colors |
| Over-saturated or neon colors | Cyan/magenta are vibrant enough |
| Lowercase everything | Uppercase is standard for UI/labels |
| Justify text | Breaks in monospace look awkward |

---

## 11. FILE DELIVERY CHECKLIST

Before handing off to designer:
- [ ] Download attached color swatches (Hex codes above)
- [ ] Font: Install Courier New / JetBrains Mono
- [ ] Review all examples in original site (reference: Signal Bloom Pitch site)
- [ ] Confirm desired poster size/format
- [ ] Establish delivery format (PDF, PNG, EPS, etc.)
- [ ] Define animation timeline (if interactive/video poster)

---

## 12. CONTACT & QUESTIONS

For clarification on brand guidelines:
- Review source CSS file: `src/style.css`
- Reference live site structure for visual context
- All color values are defined in `:root` CSS variables

---

**End of Brand Guidelines**

*Last Updated: June 28, 2026*
