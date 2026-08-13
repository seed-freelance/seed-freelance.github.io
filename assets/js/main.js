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

// Service cards deep-link into a filtered portfolio view. Without JS the
// href is a plain #portfolio anchor (all items visible).
for (const link of document.querySelectorAll('a[data-filter]')) {
  link.addEventListener('click', (event) => {
    const radio = document.querySelector(
      `input[name="portfolio-filter"][value="${link.dataset.filter}"]`
    );
    if (!radio) return;
    event.preventDefault();
    radio.checked = true;
    history.pushState(null, '', `#portfolio.${link.dataset.filter}`);
    setCurrent('portfolio');
    document
      .getElementById('portfolio')
      ?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth' });
  });
}

// The language switcher is a plain link to the translated page; fragments are
// not carried across navigations by default, so append the current one on click.
for (const langLink of document.querySelectorAll('.lang-switch')) {
  const base = langLink.href.split('#')[0];
  langLink.addEventListener('click', () => {
    langLink.href = base + location.hash;
  });
}

// --- 3. Contact form ----------------------------------------------------------
// Without JS the form POSTs to the endpoint and redirects back to the site's
// own localized thanks page. With JS: inline validation and status, no leave.

const form = document.querySelector('.contact-form');
if (form) {
  form.setAttribute('novalidate', '');
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const fields = [...form.querySelectorAll('input[required], textarea[required]')];

  const messageFor = (field) => {
    if (field.validity.valueMissing) return form.dataset.msgRequired;
    if (field.validity.typeMismatch) return form.dataset.msgEmail;
    return '';
  };

  const refreshField = (field) => {
    const slot = document.getElementById(`err-${field.name}`);
    const msg = messageFor(field);
    if (slot) slot.textContent = msg;
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  };

  for (const field of fields) {
    field.addEventListener('input', () => refreshField(field));
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const invalid = fields.filter((field) => !refreshField(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }
    const data = new FormData(form);
    data.delete('redirect'); // inline status replaces the no-JS redirect
    button.disabled = true;
    status.className = 'form-status';
    status.textContent = form.dataset.sending;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.textContent = form.dataset.success;
      status.classList.add('is-success');
    } catch {
      status.textContent = form.dataset.error;
      status.classList.add('is-error');
    } finally {
      button.disabled = false;
    }
  });
}

// --- 4. Reveal-on-scroll ------------------------------------------------------
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
