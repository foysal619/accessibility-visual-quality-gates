const button = document.querySelector('#details');
const panel = document.querySelector('#quality-details');
button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!expanded));
  button.textContent = expanded ? 'Show quality details' : 'Hide quality details';
  panel.hidden = expanded;
});
