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

  // Side-by-side comparison logic for new table UI
  const universities = {
    kennesaw: {
      name: 'Kennesaw State University',
      location: 'Kennesaw & Marietta, Georgia, USA',
      enrollment: '~47,845',
      in: '$7,548',
      out: '$21,616',
      acceptance: 'N/A',
      pros: 'Close to Atlanta; diverse programs; growing research profile.'
    },
    gsu: {
      name: 'Georgia State University',
      location: 'Atlanta, Georgia, USA',
      enrollment: '~52,000',
      in: '$12,500',
      out: '$33,320',
      acceptance: 'Varies',
      pros: 'Diverse student body; urban setting; strong academic reputation.'
    },
    gatech: {
      name: 'Georgia Tech',
      location: 'Atlanta, Georgia, USA',
      enrollment: '~43,000',
      in: '$10,512',
      out: '$33,596',
      acceptance: '~12–15%',
      pros: 'World-class STEM reputation; strong alumni network; Atlanta industry links.'
    }
  };

  function updateCompare() {
    const aKey = document.getElementById('compare-a').value;
    const bKey = document.getElementById('compare-b').value;
    const a = universities[aKey];
    const b = universities[bKey];
    document.getElementById('col-a').textContent = a.name;
    document.getElementById('col-b').textContent = b.name;
    document.getElementById('loc-a').textContent = a.location;
    document.getElementById('loc-b').textContent = b.location;
    document.getElementById('enr-a').textContent = a.enrollment;
    document.getElementById('enr-b').textContent = b.enrollment;
    document.getElementById('in-a').textContent = a.in;
    document.getElementById('in-b').textContent = b.in;
    document.getElementById('out-a').textContent = a.out;
    document.getElementById('out-b').textContent = b.out;
    document.getElementById('acc-a').textContent = a.acceptance;
    document.getElementById('acc-b').textContent = b.acceptance;
    document.getElementById('pros-a').textContent = a.pros;
    document.getElementById('pros-b').textContent = b.pros;
  }

  document.getElementById('compare-a').addEventListener('change', updateCompare);
  document.getElementById('compare-b').addEventListener('change', updateCompare);
  // initialize
  updateCompare();

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
