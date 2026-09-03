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
let musicStarted = false;
let muted = false;

function startMusic() {
  if (!bgm || musicStarted) return;
  musicStarted = true;
  bgm.volume = 0.75;
  bgm.play().catch(() => {
    // autoplay was blocked or assets/song.mp3 hasn't been added yet — silently ignore
  });
}

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
function startWarp() {
  if (!warp) return;
  const streakCount = 34;
  for (let i = 0; i < streakCount; i++) {
    const s = document.createElement('div');
    s.className = 'streak';
    const angle = Math.random() * 360;
    const delay = Math.random() * 0.25;
    s.style.setProperty('--ang', angle + 'deg');
    s.style.setProperty('--sdelay', delay + 's');
    warp.appendChild(s);
  }
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

// ---- open sequence: door creaks, fades, warps through light-speed, invitation arrives ----
let opened = false;
function openInvitation() {
  if (opened) return;
  opened = true;

  playDoorSfx();
  closedCard.classList.add('opening');
  flash.classList.add('fire');

  setTimeout(() => {
    startWarp();
  }, 220);

  setTimeout(() => {
    closedCard.style.display = 'none';
  }, 500);

  setTimeout(() => {
    invite.hidden = false;
    invite.classList.add('reveal');
    invite.scrollIntoView({ behavior: 'instant', block: 'start' });
    startMusic();
  }, 980);
}

closedCard.addEventListener('click', openInvitation);
closedCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});
