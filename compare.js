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

  // Comparison Filters (improved logic)
  const uniFilter = document.getElementById('uni-filter');
  const statFilter = document.getElementById('stat-filter');
  const grid = document.getElementById('compare-grid');
  function filterGrid() {
    const selectedUnis = Array.from(uniFilter.selectedOptions).map(o => o.value);
    const selectedStat = statFilter.value;
    // Show/hide university columns
    grid.querySelectorAll('.compare-university').forEach((el, i) => {
      el.style.display = selectedUnis.includes(['ksu','gsu','gt'][i]) ? '' : 'none';
    });
    // Show/hide stat rows and corresponding values
    let statIndex = 0;
    grid.querySelectorAll('.compare-feature').forEach((el, i) => {
      const statName = el.textContent.replace(/\s/g,'').toLowerCase();
      const showStat = selectedStat === 'all' || statName.includes(selectedStat.replace(/-/g,''));
      el.style.display = showStat ? '' : 'none';
      // Show/hide corresponding values
      let valueEls = [];
      let idx = el.nextElementSibling;
      for (let j = 0; j < 3; j++) {
        if (idx && idx.classList.contains('compare-value')) {
          valueEls.push(idx);
          idx = idx.nextElementSibling;
        }
      }
      valueEls.forEach((valueEl, colIdx) => {
        valueEl.style.display = showStat && selectedUnis.includes(['ksu','gsu','gt'][colIdx]) ? '' : 'none';
      });
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
