/**
 * OK Language School - Main JavaScript
 * Shared functionality: header, footer, navigation, animations
 */

window.fetchJSON = async function(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return response.json();
};

window.debounce = function(fn, delay = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

function getBasePath() {
  const path = window.location.pathname;
  if (path.includes('/blog/posts/')) return '../../';
  if (path.includes('/blog/')) return '../';
  return '';
}

function isActivePage(linkHref) {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';

  if (linkHref === 'index.html') {
    return page === 'index.html' || page === '' || path.endsWith('/');
  }

  return page === linkHref;
}

function renderHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const base = getBasePath();
  const navLinks = [
    { href: 'index.html', text: 'Головна' },
    { href: 'courses.html', text: 'Курси' },
    { href: 'schedule.html', text: 'Розклад' },
    { href: 'contact.html', text: 'Контакти' }
  ];

  header.innerHTML = `
    <div class="container header__inner">
      <a href="${base}index.html" class="header__logo" aria-label="OK Language School - Головна">
        <img src="${base}assets/images/logo.png" alt="OK Language School" class="header__logo-img" width="45" height="45">
        <div class="header__logo-text"><span>OK</span> Language School</div>
      </a>
      <button class="header__menu-toggle" id="menu-toggle" type="button" aria-label="Відкрити меню" aria-expanded="false" aria-controls="header-actions">
        <span class="header__menu-line"></span>
        <span class="header__menu-line"></span>
        <span class="header__menu-line"></span>
      </button>
      <div class="header__actions" id="header-actions">
        <nav class="nav" aria-label="Основна навігація">
          <ul class="nav__list" id="nav-list" role="list">
            ${navLinks.map(link => `
              <li><a href="${base}${link.href}" class="nav__link${isActivePage(link.href) ? ' nav__link--active' : ''}">${link.text}</a></li>
            `).join('')}
          </ul>
        </nav>
        <div class="header__social" aria-label="Соцмережі школи">
          <a href="https://instagram.com/language_school_ok" target="_blank" rel="noopener noreferrer" class="header__social-link" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://www.facebook.com/p/Language-School-OK-100034650894394/" target="_blank" rel="noopener noreferrer" class="header__social-link" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
        </div>
      </div>
    </div>
  `;

  initHeaderScroll();
  initMobileMenu();
}

function renderFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const base = getBasePath();
  const currentYear = new Date().getFullYear();

  footer.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div class="footer__column">
          <a href="${base}index.html" class="header__logo" style="margin-bottom: var(--space-md);">
            <img src="${base}assets/images/logo.png" alt="OK Language School" class="header__logo-img" width="45" height="45">
            <div class="header__logo-text" style="color: var(--color-white);"><span style="color: var(--color-yellow);">OK</span> Language School</div>
          </a>
          <p class="footer__text">Мовна школа у Новому Роздолі. Англійська для дітей та дорослих, підготовка до ЗНО, IELTS та розмовні клуби.</p>
          <div class="footer__social">
            <a href="https://instagram.com/language_school_ok" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/p/Language-School-OK-100034650894394/" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer__column">
          <h3 class="footer__column-title">Навігація</h3>
          <a href="${base}index.html" class="footer__link">Головна</a>
          <a href="${base}courses.html" class="footer__link">Курси</a>
          <a href="${base}schedule.html" class="footer__link">Розклад</a>
          <a href="${base}contact.html" class="footer__link">Контакти</a>
          <a href="${base}test-level.html" class="footer__link">Тест рівня</a>
          <a href="${base}blog/index.html" class="footer__link">Блог</a>
        </div>
        <div class="footer__column">
          <h3 class="footer__column-title">Курси</h3>
          <a href="${base}courses.html" class="footer__link">Англійська для дітей</a>
          <a href="${base}courses.html" class="footer__link">Англійська для підлітків</a>
          <a href="${base}courses.html" class="footer__link">Англійська для дорослих</a>
          <a href="${base}courses.html" class="footer__link">Підготовка до ЗНО</a>
          <a href="${base}courses.html" class="footer__link">IELTS Preparation</a>
          <a href="${base}courses.html" class="footer__link">Speaking Club</a>
        </div>
        <div class="footer__column">
          <h3 class="footer__column-title">Контакти</h3>
          <p class="footer__text">📍 Новий Розділ, просп. Шевченка, 16</p>
          <p class="footer__text">📞 +38 (067) 804-11-49</p>
          <p class="footer__text">📞 +38 (093) 145-66-24</p>
          <p class="footer__text">💬 Viber: +38 (067) 804-11-49</p>
          <p class="footer__text">🕒 Пн-Пт: 10:00 - 20:00<br>Сб: 10:00 - 15:00</p>
        </div>
      </div>
      <div class="footer__bottom">
        <p>&copy; ${currentYear} OK Language School. Всі права захищені.</p>
      </div>
    </div>
  `;
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('header--scrolled', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const actions = document.getElementById('header-actions');
  if (!toggle || !actions) return;

  const closeMenu = () => {
    actions.classList.remove('header__actions--open');
    toggle.classList.remove('header__menu-toggle--active');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Відкрити меню');
    document.body.classList.remove('menu-open');
  };

  const openMenu = () => {
    actions.classList.add('header__actions--open');
    toggle.classList.add('header__menu-toggle--active');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрити меню');
    document.body.classList.add('menu-open');
  };

  toggle.addEventListener('click', () => {
    const isOpen = actions.classList.contains('header__actions--open');
    if (isOpen) {
      closeMenu();
      return;
    }
    openMenu();
  });

  actions.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth >= 768) return;
    if (!actions.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.animate-on-scroll');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(element => observer.observe(element));
}

window.initCounters = function() {
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(element => observer.observe(element));
};

function animateCounter(element) {
  const target = parseInt(element.dataset.count, 10);
  const suffix = element.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    element.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderFooter();
  initScrollAnimations();
});
