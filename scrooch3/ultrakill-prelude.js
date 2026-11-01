(function () {
  const settingKey = 'fernengine:ultrakill-prelude';
  const gameUrl = 'https://html5.gdata1.com/ULTRAKILL%20Prelude/?v=20250827221755';
  const settingSelector = '[data-ultrakill-prelude-setting]';
  const stageSelector = '[class*="stage-wrapper_stage-canvas-wrapper_"]';
  let enabled = localStorage.getItem(settingKey) === 'true';
  let iframe = null;
  let stageContainer = null;
  let previousPosition = '';
  let changedPosition = false;

  function restoreStagePosition() {
    if (stageContainer && changedPosition) {
      stageContainer.style.position = previousPosition;
    }
    stageContainer = null;
    changedPosition = false;
  }

  function updateStage() {
    if (!enabled) {
      if (iframe) {
        iframe.remove();
        iframe = null;
      }
      restoreStagePosition();
      return;
    }

    const container = document.querySelector(stageSelector);
    if (!container) return;

    if (stageContainer !== container) {
      restoreStagePosition();
      stageContainer = container;
      if (getComputedStyle(container).position === 'static') {
        previousPosition = container.style.position;
        container.style.position = 'relative';
        changedPosition = true;
      }
    }

    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.title = 'ULTRAKILL Prelude';
      iframe.src = gameUrl;
      iframe.allow = 'autoplay; fullscreen; gamepad; pointer-lock';
      iframe.allowFullscreen = true;
      iframe.style.cssText = [
        'position:absolute',
        'inset:0',
        'width:100%',
        'height:100%',
        'border:0',
        'z-index:9999',
        'background:#000'
      ].join(';');
    }

    if (iframe.parentElement !== container || container.lastElementChild !== iframe) {
      container.appendChild(iframe);
    }
  }

  function addSetting() {
    const body = document.querySelector('#settingsModal [class*="settings-modal_body_"]');
    if (!body || body.querySelector(settingSelector)) return;

    const row = document.createElement('div');
    row.className = 'settings-modal_setting_PxhNM';
    row.dataset.ultrakillPreludeSetting = '';

    const label = document.createElement('label');
    label.className = 'settings-modal_label_2Phuq';
    label.htmlFor = 'ultrakill-prelude-toggle';

    const checkbox = document.createElement('input');
    checkbox.id = 'ultrakill-prelude-toggle';
    checkbox.type = 'checkbox';
    checkbox.className = 'settings-modal_checkbox_1dXwG';
    checkbox.checked = enabled;
    checkbox.addEventListener('change', function () {
      enabled = checkbox.checked;
      localStorage.setItem(settingKey, String(enabled));
      updateStage();
    });

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode('ULTRAKILL Prelude'));
    row.appendChild(label);
    body.appendChild(row);
  }

  function sync() {
    addSetting();
    updateStage();
  }

  new MutationObserver(sync).observe(document.body, {
    childList: true,
    subtree: true
  });

  sync();
})();
