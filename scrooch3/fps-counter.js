(function () {
  const counter = document.createElement('div');
  counter.textContent = 'FPS: --';
  counter.setAttribute('aria-live', 'off');
  counter.style.cssText = [
    'position:fixed',
    'top:calc(2.75rem + 8px)',
    'left:8px',
    'z-index:10000',
    'padding:4px 7px',
    'border-radius:4px',
    'background:rgba(0,0,0,.7)',
    'color:#fff',
    'font:12px/1.2 monospace',
    'pointer-events:none'
  ].join(';');

  document.body.appendChild(counter);

  let runtime = null;
  let stepCount = 0;
  let lastUpdate = performance.now();

  function countFrame(now) {
    const nextRuntime = window.vm && window.vm.runtime;
    if (nextRuntime && nextRuntime !== runtime && typeof nextRuntime._step === 'function') {
      const originalStep = nextRuntime._step;
      nextRuntime._step = function () {
        stepCount += 1;
        return originalStep.apply(this, arguments);
      };
      runtime = nextRuntime;
      lastUpdate = now;
      counter.textContent = 'FPS: --';
    }

    if (now - lastUpdate >= 500) {
      const fps = Math.round(stepCount * 1000 / (now - lastUpdate));
      counter.textContent = `FPS: ${fps}`;
      stepCount = 0;
      lastUpdate = now;
    }
    requestAnimationFrame(countFrame);
  }

  requestAnimationFrame(countFrame);
})();
