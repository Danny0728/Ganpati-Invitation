# Ganpati Aagman Invitation — ढोले कुटुंब

An interactive Ganesh Chaturthi invitation website. The visitor sees a closed
green-leaf-and-coin card first; clicking/tapping it opens to reveal the
invitation with Ganpati artwork, dates, and venue (with an embedded Google
Map).

## Files

- `index.html` — page structure and content (all text in Marathi)
- `style.css` — styling and animations
- `script.js` — click-to-open interaction
- `assets/` — put your Canva-exported images here (see below)

## Using your own Canva design

Right now the closed card (leaf + coin) is drawn with CSS/SVG, and the
opened invitation uses a simple placeholder SVG illustration of Ganpati.

To swap in your Canva-exported artwork:

1. Export your Canva design(s) as PNG (transparent background works best).
2. Save them into the `assets/` folder, e.g. `assets/ganpati.png` and/or
   `assets/leaf-coin.png`.
3. In `index.html`:
   - To replace the Ganpati illustration, find the `<svg class="ganpati-art">`
     block inside `<div class="ganpati-frame">` and replace it with:
     `<img src="assets/ganpati.png" alt="श्री गणपती बाप्पा">`
   - To replace the closed-card leaf+coin graphic, find `<div class="closed-wrap">`
     and swap the `<svg class="leaf">` and `.coin` block for:
     `<img src="assets/leaf-coin.png" alt="निमंत्रण" class="leaf-coin-img">`
     (add a matching CSS rule sizing `.leaf-coin-img` if needed).

## Editing details

- **Family name / text**: edit the Marathi text directly in `index.html`.
- **Dates**: currently शो 14–16 September 2026, in `.dates-row`.
- **Venue / map**: address text is in `.venue-block`; the map uses a Google
  Maps embed URL built from the address — update the `query=` parameter in
  the `iframe src` and the `href` on `.map-btn` if the address changes.

## Deploying with GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   pick the `main` branch and `/ (root)` folder, then save.
4. GitHub will publish the site at
   `https://<username>.github.io/<repo-name>/` within a minute or two.
