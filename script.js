const closedCard = document.getElementById('closedCard');
const invite = document.getElementById('invite');
const flash = document.getElementById('flash');
const warp = document.getElementById('warp');
const petalsContainer = document.getElementById('petals');
const bgm = document.getElementById('bgm');
const doorSfx = document.getElementById('doorSfx');
const muteBtn = document.getElementById('muteBtn');
const ganpatiPhoto = document.getElementById('ganpatiPhoto');
const ganpatiFallback = document.getElementById('ganpatiFallback');

// ---- generate ambient falling petals ----
function spawnPetals(count) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const left = Math.random() * 100;
    const duration = 7 + Math.random() * 8;
    const delay = Math.random() * 10;
    const size = 6 + Math.random() * 8;
    const hueShift = Math.random() > 0.5 ? 1 : 0;
    p.style.left = left + 'vw';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = delay + 's';
    if (hueShift) {
      p.style.background = 'radial-gradient(circle at 30% 30%, #ffd77a, #c9962f 80%)';
    }
    petalsContainer.appendChild(p);
  }
}
spawnPetals(22);

// ---- if a real assets/ganpati-current.jpg has been dropped in, show it instead of the drawn fallback ----
if (ganpatiPhoto) {
  const probe = new Image();
  probe.onload = () => {
    ganpatiPhoto.style.display = 'block';
    if (ganpatiFallback) ganpatiFallback.style.display = 'none';
  };
  probe.onerror = () => {
    // photo missing — keep the drawn fallback artwork visible
  };
  probe.src = 'assets/ganpati-current.jpg';
}

// ---- background music ----
// while the door is closed, only the first 7s of the track loop as a
// preview; the moment the door is tapped, playback jumps to 8s and
// continues normally (with the <audio loop> attribute) from there
let musicStarted = false;
let muted = false;
let previewMode = true;
const PREVIEW_LOOP_END = 7;
const PLAY_FROM_ON_OPEN = 8;

function enforcePreviewLoop() {
  if (previewMode && bgm && bgm.currentTime >= PREVIEW_LOOP_END) {
    bgm.currentTime = 0;
  }
}
if (bgm) {
  bgm.addEventListener('timeupdate', enforcePreviewLoop);
}

// called once the door is actually tapped open — hands playback off from
// the 0-7s preview loop to the full track starting at 8s
function commitFullTrack() {
  if (!bgm) return;
  previewMode = false;
  bgm.currentTime = PLAY_FROM_ON_OPEN;
}

function startMusic() {
  if (!bgm) return;
  bgm.volume = 0.6;
  bgm.muted = false;
  if (bgm.paused) {
    bgm.play().catch(() => {
      // assets/song.mp3 hasn't been added yet, or playback is still blocked — silently ignore
    });
  }
  musicStarted = true;
}

// try to play the song out loud the instant the very first screen loads —
// many mobile browsers allow this; where it's blocked, fall back to a
// silent autoplay so the track is already rolling, and unmute on the very
// first tap anywhere on the page (the door is the only tappable thing on
// this screen, so that tap is normally what unmutes it)
(function attemptAutoplay() {
  if (!bgm) return;
  bgm.volume = 0.6;
  const p = bgm.play();
  if (p && typeof p.then === 'function') {
    p.then(() => {
      musicStarted = true;
    }).catch(() => {
      bgm.muted = true;
      bgm.play().catch(() => {});
    });
  }
})();

document.addEventListener(
  'pointerdown',
  () => {
    startMusic();
  },
  { once: true, passive: true }
);

if (muteBtn) {
  muteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!bgm) return;
    muted = !muted;
    bgm.muted = muted;
    muteBtn.textContent = muted ? '🔇' : '🔊';
  });
}

// ---- door creak sound effect, fires the instant the door is tapped ----
function playDoorSfx() {
  if (!doorSfx) return;
  doorSfx.volume = 0.9;
  doorSfx.currentTime = 0;
  doorSfx.play().catch(() => {
    // assets/door-creak.mp3 hasn't been added yet — silently ignore
  });
}

// ---- light-speed "travelling to earth" warp effect ----
// layered in three depth bands (far/mid/near) so it reads as travelling
// through space rather than a flat burst of lines
function startWarp() {
  if (!warp) return;
  const layers = [
    { count: 16, dist: -300, scaleEnd: 5, width: 1, dur: 0.95, blur: 0, opacity: 0.55, colors: ['#bcd4ff', '#e8f0ff'] },
    { count: 14, dist: -460, scaleEnd: 9, width: 2, dur: 0.85, blur: 0, opacity: 0.9, colors: ['#fff3cf', '#ffe9a8'] },
    { count: 10, dist: -640, scaleEnd: 13, width: 3, dur: 0.72, blur: 0.5, opacity: 1, colors: ['#fff8e0', '#ffd67a'] },
  ];

  layers.forEach((layer) => {
    for (let i = 0; i < layer.count; i++) {
      const s = document.createElement('div');
      s.className = 'streak';
      const angle = Math.random() * 360;
      const delay = Math.random() * 0.28;
      const color = layer.colors[Math.random() > 0.5 ? 0 : 1];
      s.style.setProperty('--ang', angle + 'deg');
      s.style.setProperty('--sdelay', delay + 's');
      s.style.setProperty('--dist', layer.dist + 'px');
      s.style.setProperty('--scaleend', layer.scaleEnd);
      s.style.setProperty('--w', layer.width + 'px');
      s.style.setProperty('--dur', layer.dur + 's');
      s.style.setProperty('--blur', layer.blur + 'px');
      s.style.setProperty('--maxop', layer.opacity);
      s.style.setProperty('--clr', color);
      warp.appendChild(s);
    }
  });

  warp.classList.add('active');
  // trigger the streak-out animation on the next frame
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      warp.querySelectorAll('.streak').forEach((s) => s.classList.add('go'));
    });
  });

  // clean up once the warp has faded out
  setTimeout(() => {
    warp.classList.remove('active');
    warp.querySelectorAll('.streak').forEach((s) => s.remove());
  }, 1300);
}

// ---- replay a flash burst (used for both the door-open flash and the arrival flash) ----
function triggerFlash(className) {
  if (!flash) return;
  flash.classList.remove('fire', 'arrive');
  // force reflow so the animation restarts even if a class was already applied
  void flash.offsetWidth;
  flash.classList.add(className);
}

// ---- open sequence: door cracks open, punches into the light, warps through
// light-speed towards earth, then arrives with a second flash ----
let opened = false;
function openInvitation() {
  if (opened) return;
  opened = true;

  playDoorSfx();
  // this tap is the first real user gesture, so it's the reliable place
  // to start the background song (browsers block autoplay before this)
  startMusic();
  // hand playback off from the 0-7s preview loop to the full track at 8s
  commitFullTrack();
  // triggers the door's punch-zoom and the crack-of-light seam (see CSS)
  closedCard.classList.add('opening');

  // first flash — right as the crack of light is widest, just before the punch-zoom finishes
  setTimeout(() => {
    triggerFlash('fire');
  }, 380);

  // launch into hyperspace as the punch-zoom completes
  setTimeout(() => {
    startWarp();
  }, 650);

  // door is fully behind the flash by now — safe to remove it
  setTimeout(() => {
    closedCard.style.display = 'none';
  }, 720);

  // second flash — arriving at earth, just before the invitation fades in
  setTimeout(() => {
    triggerFlash('arrive');
  }, 1750);

  setTimeout(() => {
    // land at the very top of the window, not wherever scrollIntoView would
    // resolve mid-way through the invite's zoom-in animation
    window.scrollTo(0, 0);
    invite.hidden = false;
    invite.classList.add('reveal');
    window.scrollTo(0, 0);
    startMusic();
  }, 1820);
}

closedCard.addEventListener('click', openInvitation);
closedCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});
