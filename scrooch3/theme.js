(function () {
  // Set your main color here
  const navColor = '#008000'; // Background
  
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
  const smallBtnColor = navColor;                      // for small buttons
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

    let styleEl = document.getElementById('tooltip-navcolor-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'tooltip-navcolor-style';
    }
    styleEl.textContent = `
      .action-menu_button_1qbot,
      .action-menu_button_1qbot:hover,
      .action-menu_main-button_3ccfy,
      .action-menu_main-button_3ccfy:hover,
      .action-menu_more-button_1fMGZ,
      .action-menu_more-button_1fMGZ:hover,
      .action-menu_button_1qbot.action-menu_coming-soon_2URvV:hover {
        background: ${navColor} !important;
      }
      .action-menu_main-button_3ccfy,
      .action-menu_main-button_3ccfy:hover {
        box-shadow: 0 0 0 4px ${outlineColor} !important;
        outline-color: ${outlineColor} !important;
      }
      .action-menu_tooltip_3Bkh5,
      .action-menu_coming-soon-tooltip_3jthM {
        background-color: ${navColor} !important;
        color: white !important;
      }
      .modal_full-screen_FA4cr .modal_header_1h7ps {
        background: ${navColor} !important;
        color: white !important;
      }
      .action-menu_tooltip_3Bkh5::after,
      .action-menu_coming-soon-tooltip_3jthM::after {
        background-color: ${navColor} !important;
        border-color: ${navColor} !important;
      }
      .gui_tab_27Unf.gui_is-selected_sHAiu,
      .library-item_library-item_1DcMO:hover,
      .sprite-selector-item_sprite-selector-item_kQm-i:hover,
      .sprite-selector-item_sprite-selector-item_kQm-i.sprite-selector-item_is-selected_24tQj,
      .stage-selector_stage-selector_3oWOr:hover,
      .stage-selector_stage-selector_3oWOr.stage-selector_is-selected_2x2r_ {
        border-color: ${navColor} !important;
      }
      .icon-button_container_278u5,
      .gui_tab_27Unf.gui_is-selected_sHAiu,
      .selector_new-buttons_2qHDd {
        color: ${navColor} !important;
      }
      .sprite-selector-item_sprite-selector-item_kQm-i.sprite-selector-item_is-selected_24tQj {
        box-shadow: 0 0 0 4px ${outlineColor} !important;
      }
      .sprite-selector-item_sprite-selector-item_kQm-i.sprite-selector-item_is-selected_24tQj .sprite-selector-item_sprite-info_-I0i_,
      .stage-selector_stage-selector_3oWOr.stage-selector_is-selected_2x2r_ .stage-selector_header_2GVr1,
      .action-menu_coming-soon_2URvV:hover {
        background-color: ${navColor} !important;
      }
      .checkbox_checkbox_2QbUl:checked,
      .checkbox_checkbox_2QbUl:hover,
      .checkbox_checkbox_2QbUl:focus,
      .checkbox_checkbox_2QbUl:active,
      .input_input-form_l9eYg:focus,
      .input_input-form_l9eYg:hover,
      .paint-editor_bitmap-button_keW7B,
      .paint-editor_bitmap-button_keW7B:hover {
        border-color: ${navColor} !important;
        accent-color: ${navColor} !important;
      }
      .paint-editor_bitmap-button_keW7B,
      .paint-editor_bitmap-button_keW7B:hover {
        background-color: ${navColor} !important;
      }
      .__react_component_tooltip {
        background-color: ${navColor} !important;
        color: white !important;
      }
      .__react_component_tooltip.place-top::after {
        border-top-color: ${navColor} !important;
      }
      .__react_component_tooltip.place-bottom::after {
        border-bottom-color: ${navColor} !important;
      }
      .__react_component_tooltip.place-left::after {
        border-left-color: ${navColor} !important;
      }
      .__react_component_tooltip.place-right::after {
        border-right-color: ${navColor} !important;
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
