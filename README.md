# Ganpati Aagman Invitation — ढोले कुटुंब

An interactive Ganesh Chaturthi invitation website. The visitor first sees a
big stone-arch castle door with a glowing gold Om coin centered on it;
tapping it plays a door-creak sound and a light-speed "warp" transition
(streaking light lines, like traveling at light speed), then arrives at the
invitation — a "बाप्पाचे आगमन" title, an arched golden frame with this
year's Ganpati photo, the festival timeline, venue with an embedded Google
Map, last year's photo, and background music.

## Files

- `index.html` — page structure and content (all text in Marathi)
- `style.css` — styling and animations
- `script.js` — open sequence (sfx, warp transition, music), falling petals,
  photo auto-swap
- `assets/` — song, door sound, and photos live here (see below)
  - `ganpati-current.jpg` — this year's photo, shown in the gold arch
  - `ganpati-previous.jpg` — last year's photo, shown at the bottom of the
    invitation under "मागील वर्षीचा सोहळा"

  I placed the two photos you sent as current-year (arch) and previous-year
  (bottom) in the order you sent them — swap the two files' names if that's
  backwards.

## Adding sound

**Door creak** (plays the instant the door is tapped): save it as
`assets/door-creak.mp3`.

**Background music** (starts right after the warp transition, once the
invitation appears): save it as `assets/song.mp3`. It loops automatically,
and there's a 🔊 mute button in the top-right corner of the invitation card.

Both are optional — if a file is missing, the site just stays silent for
that sound, no error shown to visitors. Some mobile browsers block audio
without a direct tap; since both are triggered from the door-tap handler,
this satisfies that requirement in all major browsers.

## Replacing the Ganpati photos

Just overwrite `assets/ganpati-current.jpg` and/or `assets/ganpati-previous.jpg`
with new images (keep the same filenames) — no HTML/CSS edits needed. A
portrait-ish crop works best for the arch photo since it gets cropped to
fit the arch shape.

## Editing details

- **Title**: "बाप्पाचे आगमन" — edit `.hero-title` text in `index.html`.
- **Family name / text**: edit the Marathi text directly in `index.html`.
- **Timeline**: the six event days (स्थापना, सत्यनारायण पूजा, गौरी आवाहन,
  गौरी पूजन, गौरी विसर्जन, बाप्पाचे विसर्जन) are in the `.timeline` block —
  each is a `.tl-item`; the `.tl-item.highlight` one (गौरी पूजन, 18th) is
  styled differently since that's the day you're inviting guests for.
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
