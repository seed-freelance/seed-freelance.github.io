// Seed AI — progressive enhancements.
// Everything on this page works without JS; this file only adds:
// 1. scrollspy (nav highlights the section in view, URL tracks it)
// 2. portfolio filter state in the URL hash + language-switch preservation
// 3. a one-time reveal animation, skipped under prefers-reduced-motion

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- 1. Scrollspy -----------------------------------------------------------

const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const spied = navLinks
  .map((link) => document.getElementById(link.hash.slice(1)))
  .filter(Boolean);

function setCurrent(id) {
  for (const link of navLinks) {
    if (link.hash === `#${id}`) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  }
}

if ('IntersectionObserver' in window && spied.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = entry.target.id;
        setCurrent(id);
        // replaceState (not pushState): scrolling should not spam history;
        // explicit nav clicks still create entries natively.
        history.replaceState(null, '', `#${id}${filterSuffix()}`);
      }
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  spied.forEach((section) => spy.observe(section));
}

// --- 2. Filter state + language switch --------------------------------------
// The portfolio filter is a set of radio inputs (CSS-only mechanism). JS keeps
// the active filter in the hash as "#portfolio.<category>" so the link is
// shareable and survives a language switch.

const FILTER_RE = /^#portfolio\.([\w-]+)$/;

function activeFilter() {
  const checked = document.querySelector('input[name="portfolio-filter"]:checked');
  return checked && checked.value !== 'all' ? checked.value : '';
}

function filterSuffix() {
  const f = activeFilter();
  return f ? `.${f}` : '';
}

for (const radio of document.querySelectorAll('input[name="portfolio-filter"]')) {
  radio.addEventListener('change', () => {
    history.replaceState(null, '', `#portfolio${filterSuffix()}`);
    setCurrent('portfolio');
  });
}

// Restore a deep-linked filter on load, then jump to the portfolio section.
const restored = location.hash.match(FILTER_RE);
if (restored) {
  const radio = document.querySelector(
    `input[name="portfolio-filter"][value="${restored[1]}"]`
  );
  if (radio) {
    radio.checked = true;
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant' });
  }
}

// The language switcher is a plain link to the translated page; fragments are
// not carried across navigations by default, so append the current one on click.
for (const langLink of document.querySelectorAll('.lang-switch')) {
  const base = langLink.href.split('#')[0];
  langLink.addEventListener('click', () => {
    langLink.href = base + location.hash;
  });
}

// --- 3. Reveal-on-scroll ------------------------------------------------------
// Elements opt in with class "reveal". Final state is always in the HTML;
// the animation is purely decorative and skipped for reduced motion.

if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.3 }
  );
  for (const el of document.querySelectorAll('.reveal')) {
    el.classList.add('reveal-pending');
    revealer.observe(el);
  }
}
