/**
 * OK Language School — Courses Page
 * Fetches courses from JSON, renders cards, handles filtering and accordion
 */



let allCourses = [];
let activeAgeFilter = 'all';
let activeLevelFilter = 'all';

const ageCategoryMatchers = {
  kids: (ageGroup = '') => /6-9/.test(ageGroup),
  teens: (ageGroup = '') => /10-14|15-17/.test(ageGroup),
  adults: (ageGroup = '') => /16\+|18\+/.test(ageGroup)
};

async function initCourses() {
  const container = document.getElementById('courses-list');
  if (!container) return;

  try {
    const data = await fetchJSON('assets/data/courses.json');
    allCourses = data.courses;
    renderCourses(container);
    initFilters();
  } catch (error) {
    console.error('Failed to load courses:', error);
    container.innerHTML = '<p class="courses__empty">Не вдалося завантажити курси. Спробуйте пізніше.</p>';
  }
}

function getFilteredCourses() {
  return allCourses.filter(course => {
    const ageMatch = activeAgeFilter === 'all'
      ? true
      : (ageCategoryMatchers[activeAgeFilter]?.(course.ageGroup) ?? true);
    const levelMatch = activeLevelFilter === 'all' || course.levels.some(l => l === activeLevelFilter);
    return ageMatch && levelMatch;
  });
}

function renderCourses(container) {
  const filtered = getFilteredCourses();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="courses__empty">
        <p>Курсів за обраними фільтрами не знайдено.</p>
        <button class="btn btn--secondary btn--small" onclick="document.querySelectorAll('.filter__btn--active').forEach(b => b.click())">Скинути фільтри</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(course => `
    <div class="course-card animate-on-scroll animate-on-scroll--visible" data-course-id="${course.id}">
      <div class="course-card__header">
        <div class="course-card__info">
          <h3 class="course-card__title">${course.title}</h3>
          <p class="course-card__subtitle">${course.subtitle}</p>
        </div>
      </div>
      <div class="course-card__meta">
        <span class="badge badge--blue">${course.ageGroup}</span>
        ${course.levels.map(l => `<span class="badge badge--gray">${l}</span>`).join('')}
      </div>
      <p class="course-card__description">${course.description}</p>
      <div class="course-card__details" id="details-${course.id}">
        <ul class="course-card__features">
          ${course.features.map(f => `<li class="course-card__feature">${f}</li>`).join('')}
        </ul>
      </div>
      <div class="course-card__footer">
        <span class="course-card__schedule">📅 ${course.schedule}</span>
        <button class="btn btn--small btn--secondary" data-toggle="details-${course.id}" aria-expanded="false">
          Детальніше ▾
        </button>
      </div>
    </div>
  `).join('');

  // Attach accordion toggle handlers
  container.querySelectorAll('[data-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const detailsId = btn.dataset.toggle;
      const details = document.getElementById(detailsId);
      const isOpen = details.classList.toggle('course-card__details--open');
      btn.setAttribute('aria-expanded', isOpen);
      btn.textContent = isOpen ? 'Згорнути ▴' : 'Детальніше ▾';
    });
  });
}

function initFilters() {
  // Age group filter
  document.querySelectorAll('[data-filter-age]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-age]').forEach(b => b.classList.remove('filter__btn--active'));
      btn.classList.add('filter__btn--active');
      activeAgeFilter = btn.dataset.filterAge;
      renderCourses(document.getElementById('courses-list'));
    });
  });

  // Level filter
  document.querySelectorAll('[data-filter-level]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter-level]').forEach(b => b.classList.remove('filter__btn--active'));
      btn.classList.add('filter__btn--active');
      activeLevelFilter = btn.dataset.filterLevel;
      renderCourses(document.getElementById('courses-list'));
    });
  });
}

document.addEventListener('DOMContentLoaded', initCourses);
