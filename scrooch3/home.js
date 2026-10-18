// Persistent white home icon for Cattymod menu
function addHomeIcon() {
  const menu = document.querySelector('.menu-bar_main-menu_3wjWH');
  if (!menu || menu.querySelector('.home-favicon')) return;

  const link = document.createElement('a');
  link.href = 'https://cattymod.app';
  link.target = '_self';
  link.style.display = 'flex';
  link.style.alignItems = 'center';
  link.style.justifyContent = 'center';
  link.style.height = '100%';
  link.style.padding = '0 6px';
  link.style.borderRadius = '0';

  // ✨ smooth hover transition
  link.style.transition = 'background 0.15s ease';

  const icon = document.createElement('img');
  icon.src = 'https://cattymod.app/assets/home.png';
  icon.className = 'home-favicon';
  icon.style.filter = 'brightness(0) invert(1)'; // pure white
  icon.style.maxHeight = '100%';
  icon.style.maxWidth = '24px';
  icon.style.objectFit = 'contain';

  link.appendChild(icon);

  // ✅ 15% white overlay hover effect
  link.onmouseover = () => link.style.background = 'rgba(255, 255, 255, 0.15)';
  link.onmouseout = () => link.style.background = 'transparent';

  menu.prepend(link);
}

// Keep icon added even if menu re-renders
const observer = new MutationObserver(addHomeIcon);
observer.observe(document.body, { childList: true, subtree: true });

// Initial run
addHomeIcon();
