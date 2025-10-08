// Dynamic web effects for compare.html

document.addEventListener('DOMContentLoaded', function () {
  // Dark/Light Mode Toggle
  const modeToggle = document.getElementById('mode-toggle');
  modeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    modeToggle.textContent = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
  });

  // Animated Statistic Counters
  document.querySelectorAll('.animated-counter').forEach(function (el) {
    const target = +el.getAttribute('data-value');
    let current = 0;
    const duration = 1200;
    const step = Math.ceil(target / (duration / 16));
    function update() {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = current.toLocaleString();
        requestAnimationFrame(update);
      }
    }
    update();
  });

  // Comparison Filters
  const uniFilter = document.getElementById('uni-filter');
  const statFilter = document.getElementById('stat-filter');
  const grid = document.getElementById('compare-grid');
  function filterGrid() {
    const selectedUnis = Array.from(uniFilter.selectedOptions).map(o => o.value);
    const selectedStat = statFilter.value;
    // Hide/show university columns
    grid.querySelectorAll('.compare-university').forEach((el, i) => {
      el.style.display = selectedUnis[i] ? '' : 'none';
    });
    // Hide/show stat rows
    grid.querySelectorAll('.compare-feature').forEach((el, i) => {
      if (selectedStat === 'all' || el.textContent.replace(/\s/g,'').toLowerCase().includes(selectedStat.replace(/-/g,''))) {
        el.style.display = '';
        // Show corresponding values
        for (let j = 1; j <= 3; j++) {
          const valueEl = grid.children[grid.children.length - (grid.children.length - i*4 - j)];
          if (valueEl && valueEl.classList.contains('compare-value')) {
            valueEl.style.display = '';
          }
        }
      } else {
        el.style.display = 'none';
        // Hide corresponding values
        for (let j = 1; j <= 3; j++) {
          const valueEl = grid.children[grid.children.length - (grid.children.length - i*4 - j)];
          if (valueEl && valueEl.classList.contains('compare-value')) {
            valueEl.style.display = 'none';
          }
        }
      }
    });
  }
  uniFilter.addEventListener('change', filterGrid);
  statFilter.addEventListener('change', filterGrid);
  filterGrid();

  // Page Transitions
  document.querySelectorAll('a').forEach(function (a) {
    if (a.target !== '_blank') {
      a.addEventListener('click', function (e) {
        document.body.classList.add('fade-exit');
        setTimeout(function () {
          window.location = a.href;
        }, 400);
        e.preventDefault();
      });
    }
  });
});
