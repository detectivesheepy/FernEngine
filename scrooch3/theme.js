(function () {
  // Set your main color here
  const navColor = 'purple'; // Background
  
  // Darken a hex color by a percentage (0-1)
  function darkenColor(hex, amount = 0.25) {
    let c = hex.slice(1);
    if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
    const num = parseInt(c, 16);
    let r = Math.floor(((num >> 16) & 0xFF) * (1 - amount));
    let g = Math.floor(((num >> 8) & 0xFF) * (1 - amount));
    let b = Math.floor((num & 0xFF) * (1 - amount));
    return `rgb(${r},${g},${b})`;
  }

  // Automatically generate shades
  const smallBtnColor = darkenColor(navColor, 0.25);   // for small buttons
  const outlineColor = darkenColor(navColor, 0.4);     // for main button outlines

  function applyColors() {
    // Navbar
    document.querySelectorAll('div.menu-bar_menu-bar_JcuHF.box_box_2jjDp')
      .forEach(el => el.style.backgroundColor = navColor);

    // Feedback button
    document.querySelectorAll('a.menu-bar_feedback-link_1BnAR')
      .forEach(link => {
        const span = link.querySelector('.button_content_3jdgj span');
        if (span) span.style.color = navColor;
      });

    // Extension buttons
    document.querySelectorAll('.gui_extension-button-container_b4rCs.box_box_2jjDp button.gui_extension-button_2T7PA')
      .forEach(b => {
        b.style.setProperty('background-color', navColor, 'important');
        b.style.setProperty('border', '2px solid ' + navColor, 'important');
        b.style.setProperty('outline', '2px solid ' + navColor, 'important');
        b.style.setProperty('box-shadow', 'none', 'important');
      });

    // Main sprite buttons
    document.querySelectorAll('.action-menu_main-button_3ccfy')
      .forEach(e => {
        e.style.background = navColor;
        e.style.outline = '4px solid ' + outlineColor;
      });

    // Small sprite buttons
    document.querySelectorAll('.action-menu_more-button_1fMGZ')
      .forEach(e => e.style.background = smallBtnColor);

    // Container behind small buttons
    document.querySelectorAll('.action-menu_more-buttons_3Bjkq,.action-menu_more-buttons-outer_3J9yZ')
      .forEach(e => {
        e.style.background = smallBtnColor;
        e.style.boxShadow = 'none';
        e.style.border = 'none';
      });
  }

  // Inject CSS to force tooltip + arrow color
  if (!document.getElementById('tooltip-navcolor-style')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'tooltip-navcolor-style';
    styleEl.innerHTML = `
      .action-menu_tooltip_3Bkh5 {
        background-color: ${navColor} !important;
        color: white !important;
        box-shadow: none !important;
      }
      .action-menu_tooltip_3Bkh5::after {
        background-color: ${navColor} !important;
        border-color: ${navColor} !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Run immediately
  applyColors();

  // Observe dynamic DOM changes
  const observer = new MutationObserver(applyColors);
  observer.observe(document.body, { childList: true, subtree: true });
})();
