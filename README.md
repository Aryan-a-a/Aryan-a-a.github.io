# Aryan Ashraf — Personal Portfolio

A single-page portfolio built with plain HTML and CSS and ~40 lines of optional
JavaScript. No frameworks, no build step, no external dependencies.

## Run it

Open `index.html` in any browser — that's it. For a local server (nicer URLs,
matches production behavior):

```
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

The site is fully static. Upload the folder as-is to any static host
(GitHub Pages, Netlify, Cloudflare Pages, Firebase Hosting…). No build step.

## Structure

```
index.html           # the whole site (single page)
styles/main.css      # all styles; palette & spacing as CSS custom properties
scripts/main.js      # mobile nav toggle only — progressive enhancement
assets/
  Ashraf_Aryan_F26.pdf   # résumé, linked from hero + footer
  favicon.svg            # "AA" monogram
```

## Accessibility notes

Targets WCAG 2.1 AA:

- Semantic landmarks; one `h1`; every section labeled via `aria-labelledby`.
- Skip link, visible focus indicators, 44px minimum touch targets.
- All text color pairs ≥ 4.5:1 (ratios noted in `main.css` comments);
  brighter oranges are reserved for large text and decoration.
- Every animation (hero entrance, marquee, scroll-reveal, hovers) is
  disabled under `prefers-reduced-motion`; scroll-reveal's hidden state is
  additionally gated on JS being active, so content can never be stuck
  invisible.
- Works fully with JavaScript disabled — the nav simply stays expanded and
  all content is visible.
- Heading font (Bricolage Grotesque) is self-hosted with `font-display: swap`
  and preloaded; body text uses the system font stack.

## Remaining nice-to-haves

- Add Bridge screenshots and a `bridge.html` case-study page.
- Add a headshot to the hero/about.

Note: the Bridge repo (`github.com/alyanany97/bridge`) is a teammate's
account and is linked only as the project repository; Aryan's own profile is
`github.com/Aryan-a-a`.
