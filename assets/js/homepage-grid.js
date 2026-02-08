/**
 * Homepage Interactive Grid — Mouse-tracking glow effect
 */
document.addEventListener('DOMContentLoaded', function () {
  const grid = document.querySelector('.homepage-grid');
  if (!grid) return;

  const tiles = grid.querySelectorAll('.grid-tile');

  grid.addEventListener('mousemove', function (e) {
    const gridRect = grid.getBoundingClientRect();

    tiles.forEach(function (tile) {
      const tileRect = tile.getBoundingClientRect();
      // Mouse position relative to tile (as percentage)
      const x = ((e.clientX - tileRect.left) / tileRect.width) * 100;
      const y = ((e.clientY - tileRect.top) / tileRect.height) * 100;
      tile.style.setProperty('--mouse-x', x + '%');
      tile.style.setProperty('--mouse-y', y + '%');

      // Check if mouse is near this tile for border glow
      const tileCenterX = tileRect.left + tileRect.width / 2;
      const tileCenterY = tileRect.top + tileRect.height / 2;
      const dist = Math.hypot(e.clientX - tileCenterX, e.clientY - tileCenterY);
      const maxDist = 250;

      if (dist < maxDist) {
        tile.setAttribute('data-glow', 'true');
        tile.querySelector('.grid-tile-icon').style.opacity = 0.5 + (1 - dist / maxDist) * 0.5;
      } else {
        tile.removeAttribute('data-glow');
      }
    });
  });

  grid.addEventListener('mouseleave', function () {
    tiles.forEach(function (tile) {
      tile.removeAttribute('data-glow');
      tile.style.removeProperty('--mouse-x');
      tile.style.removeProperty('--mouse-y');
      var icon = tile.querySelector('.grid-tile-icon');
      if (icon) icon.style.opacity = '';
    });
  });
});
