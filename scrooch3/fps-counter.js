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

  let frameCount = 0;
  let lastUpdate = performance.now();

  function countFrame(now) {
    frameCount += 1;
    if (now - lastUpdate >= 500) {
      const fps = Math.round(frameCount * 1000 / (now - lastUpdate));
      counter.textContent = `FPS: ${fps}`;
      frameCount = 0;
      lastUpdate = now;
    }
    requestAnimationFrame(countFrame);
  }

  requestAnimationFrame(countFrame);
})();
