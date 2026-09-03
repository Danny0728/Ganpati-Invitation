const closedCard = document.getElementById('closedCard');
const invite = document.getElementById('invite');
const flash = document.getElementById('flash');
const petalsContainer = document.getElementById('petals');
const bgm = document.getElementById('bgm');
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

// ---- if a real assets/ganpati.png has been dropped in, show it instead of the drawn fallback ----
if (ganpatiPhoto) {
  const probe = new Image();
  probe.onload = () => {
    ganpatiPhoto.style.display = 'block';
    if (ganpatiFallback) ganpatiFallback.style.display = 'none';
  };
  probe.onerror = () => {
    // no photo provided yet — keep the drawn fallback artwork visible
  };
  probe.src = 'assets/ganpati.png';
}

// ---- background music: starts the moment the leaf/coin is tapped ----
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

// ---- open sequence: golden flash, invitation reveals, music starts ----
let opened = false;
function openInvitation() {
  if (opened) return;
  opened = true;

  closedCard.classList.add('opening');
  flash.classList.add('fire');
  startMusic();

  setTimeout(() => {
    closedCard.style.display = 'none';
    invite.hidden = false;
    invite.classList.add('reveal');
    invite.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, 650);
}

closedCard.addEventListener('click', openInvitation);
closedCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});
