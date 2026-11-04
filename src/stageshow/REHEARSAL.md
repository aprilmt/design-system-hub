# DesignHubHero rehearsal

## Gold copied

`hero-demo` (Stageshow skill) — stage size (~720×340), corner/bottom bleed crop, cursor targets + `rest`, poster payoff, compact redesign, loop with visible undo.

## What changed for DesignHub

- Story: Tokens → components (select `brand-primary` → Button links → Dialog → Toast “Token linked” → close/undo).
- Look: `.look-designhub` maps DesignHub CSS variables onto `--ss-*` kit tokens; cool greys, product indigo accent kept.
- Chrome: browser `Window` with sandbox URL; kit `Button` + `Toast`; dialog surface kept mounted for exit animation.
- Page: Home is brand-first with the stage as the hero visual; Sandbox sections use hairline dividers instead of equal card shells.

## Checked

- [x] Still/poster readable (Dialog + Toast + linked button).
- [x] Wide framing: window bleeds past right and bottom; transparent stage (page is ground).
- [x] Compact design at phone width (`below: 420`, 358×320) with tighter token rail.
- [x] Desktop hero uses `xl` two-column with stage `minmax(520px, …)` so wide layout stays above the compact breakpoint.
- [x] Home + Sandbox + nav load without console module errors.
- [ ] `film.mjs --gate` not run here (Playwright not wired in this host); visual loop pass in a focused browser tab required — automation tabs stay `document.hidden`, which pauses the Stage script by design.

## Not checked

- Contact sheet / jump detection against gold stills.
- Dark-theme Stage look (demo stays `theme="light"` for product chrome contrast on both page themes).
