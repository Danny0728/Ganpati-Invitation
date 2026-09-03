# Ganpati Aagman Invitation — ढोले कुटुंब

An interactive Ganesh Chaturthi invitation website. The visitor sees a closed
green-leaf-and-coin card first; tapping it opens (with a golden flash) to
reveal the invitation — a "बाप्पाचे आगमन" title, an arched golden frame
around Ganpati artwork, dates, venue with an embedded Google Map, and
background music that starts on tap.

## Files

- `index.html` — page structure and content (all text in Marathi)
- `style.css` — styling and animations
- `script.js` — open interaction, falling petals, music, photo auto-swap
- `assets/` — put your song and/or Canva-exported photo here (see below)

## Adding the background song

1. Save your track as `assets/song.mp3` (exactly that name/path).
2. That's it — `script.js` already points `<audio id="bgm">` at
   `assets/song.mp3` and calls `.play()` the moment the leaf/coin is tapped.
   It loops automatically. If the file is missing, the site just stays
   silent (no error shown to visitors).
3. There's also a small 🔊 mute button in the top-right corner of the
   opened invitation card, wired up already.

Note: some mobile browsers block audio from starting without a direct user
tap — since playback is triggered from the leaf-tap click handler itself,
this should satisfy that requirement in all major browsers.

## Using your own Ganpati photo (from Canva)

Right now the arch shows a hand-drawn placeholder illustration of Ganpati.

1. Export your Canva design as a PNG (a square or portrait crop works best;
   it gets cropped into the arch shape automatically).
2. Save it as `assets/ganpati.png` (exactly that name/path).
3. That's it — `script.js` automatically detects the file and swaps the
   drawn placeholder for your photo inside the same gold arch frame. No
   HTML/CSS edits needed.

## Editing details

- **Title**: "बाप्पाचे आगमन" — edit `.hero-title` text in `index.html`.
- **Family name / text**: edit the Marathi text directly in `index.html`.
- **Dates**: currently 14–16 September 2026, in `.dates-row`.
- **Venue / map**: address text is in `.venue-block`; the "दिशादर्शन उघडा"
  button links to the actual Google Maps share link; the embedded map
  preview (`iframe`) uses a text-address query — update both if the venue
  changes.

## Deploying with GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   pick the `main` branch and `/ (root)` folder, then save.
4. GitHub will publish the site at
   `https://<username>.github.io/<repo-name>/` within a minute or two.
