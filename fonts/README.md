# Display fonts (Gill Sans)

Drop licensed web-font files here so the site matches your intended Gill Sans cut
(e.g. from a Monotype / Adobe Fonts / purchased kit — not an unauthorized mirror).

Expected filenames (woff2 preferred):

- `gill-sans-regular.woff2` (and optional `.woff`)
- `gill-sans-medium.woff2`
- `gill-sans-bold.woff2`

`src/index.css` already declares `@font-face` for these paths. Until the files
exist, the browser falls back to the system Gill Sans installed on macOS.
