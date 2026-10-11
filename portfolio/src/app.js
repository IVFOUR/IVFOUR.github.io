const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', '메뉴 열기');
  nav?.classList.remove('is-open');
}
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  nav.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.header-inner')) closeMenu();
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const filterButtons = document.querySelectorAll('[data-filter]');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  let count = 0;
  filterButtons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  document.querySelectorAll('.project-card').forEach(card => {
    const visible = filter === 'all' || card.dataset.category === filter;
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('.filter-status').textContent = `프로젝트 ${count}개를 표시합니다.`;
}));

document.querySelector('#print-resume')?.addEventListener('click', () => window.print());

const demo = document.querySelector('#spatial-demo');
if (demo) {
  const path = demo.querySelector('#demo-path');
  const marker = demo.querySelector('#demo-marker');
  const pause = demo.querySelector('.demo-pause');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pathLength = path.getTotalLength();
  let running = !reduced.matches;
  let inView = true;
  let elapsed = 3000;
  let lastTime = null;
  let animation = null;

  function moveMarker() {
    const point = path.getPointAtLength(((elapsed % 16000) / 16000) * pathLength);
    marker.setAttribute('transform', `translate(${point.x} ${point.y})`);
  }
  function updatePause() {
    pause.setAttribute('aria-label', running ? '시각화 일시정지' : '시각화 재생');
    pause.setAttribute('aria-pressed', String(!running));
    pause.querySelector('span').textContent = running ? 'Ⅱ' : '▷';
  }
  function tick(time) {
    animation = null;
    if (lastTime !== null) elapsed += Math.min(time-lastTime, 100);
    lastTime = time;
    moveMarker();
    schedule();
  }
  function schedule() {
    const shouldRun = running && inView && !document.hidden && demo.dataset.mode === 'tracks';
    if (!shouldRun) {
      if (animation !== null) cancelAnimationFrame(animation);
      animation = null;
      lastTime = null;
    } else if (animation === null) animation = requestAnimationFrame(tick);
  }
  demo.querySelectorAll('.demo-tab').forEach(button => button.addEventListener('click', () => {
    demo.dataset.mode = button.dataset.mode;
    demo.querySelectorAll('.demo-tab').forEach(b => b.setAttribute('aria-pressed', String(b===button)));
    pause.hidden = button.dataset.mode !== 'tracks';
    schedule();
  }));
  pause.addEventListener('click', () => { running=!running; updatePause(); schedule(); });
  reduced.addEventListener('change', () => { running=!reduced.matches; updatePause(); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { inView=entries[0].isIntersecting; schedule(); }).observe(demo);
  moveMarker();
  updatePause();
  schedule();
}

if ('IntersectionObserver' in window) {
  const sections = document.querySelectorAll('main > section[id]');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) document.querySelectorAll('[data-nav]').forEach(link => {
        const current = link.dataset.nav === entry.target.id;
        link.classList.toggle('is-current', current);
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -65% 0px' });
  sections.forEach(section => sectionObserver.observe(section));
}
