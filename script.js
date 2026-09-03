const closedCard = document.getElementById('closedCard');
const invite = document.getElementById('invite');

function openInvitation() {
  if (closedCard.classList.contains('opening')) return;
  closedCard.classList.add('opening');

  setTimeout(() => {
    closedCard.style.display = 'none';
    invite.hidden = false;
  }, 600);
}

closedCard.addEventListener('click', openInvitation);
closedCard.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    openInvitation();
  }
});
