const closedCard = document.getElementById('closedCard');
const invite = document.getElementById('invite');
const flash = document.getElementById('flash');
const petalsContainer = document.getElementById('petals');

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

// ---- open sequence: doors slide, golden flash, invitation reveals ----
let opened = false;
function openInvitation() {
  if (opened) return;
  opened = true;

  closedCard.classList.add('opening');
  flash.classList.add('fire');

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
