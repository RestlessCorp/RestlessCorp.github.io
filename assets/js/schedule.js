/**
 * OK Language School — Schedule Page
 * Loads schedule from JSON, dual view (table/cards), filtering
 */



let allSchedule = [];
const DAY_ORDER = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', "П'ятниця", 'Субота', 'Неділя'];

async function initSchedule() {
  const tableContainer = document.getElementById('schedule-table-container');
  const cardsContainer = document.getElementById('schedule-cards-container');
  if (!tableContainer && !cardsContainer) return;

  try {
    const data = await fetchJSON('assets/data/schedule.json');
    allSchedule = data.schedule;
    renderSchedule();
    initFilters();
    initViewSwitch();
  } catch (error) {
    console.error('Failed to load schedule:', error);
    const msg = '<p class="schedule__empty">Не вдалося завантажити розклад. Спробуйте пізніше.</p>';
    if (tableContainer) tableContainer.innerHTML = msg;
    if (cardsContainer) cardsContainer.innerHTML = msg;
  }
}

function getFilteredSchedule() {
  const dayFilter = document.getElementById('filter-day')?.value || 'all';
  const ageFilter = document.getElementById('filter-age')?.value || 'all';
  const levelFilter = document.getElementById('filter-level')?.value || 'all';
  const typeFilter = document.getElementById('filter-type')?.value || 'all';

  return allSchedule
    .filter(item => {
      if (dayFilter !== 'all' && item.day !== dayFilter) return false;
      if (ageFilter !== 'all' && !item.ageGroup.includes(ageFilter)) return false;
      if (levelFilter !== 'all' && !item.level.includes(levelFilter)) return false;
      if (typeFilter !== 'all' && item.type !== typeFilter) return false;
      return true;
    })
    .sort((a, b) => {
      const dayDiff = DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day);
      if (dayDiff !== 0) return dayDiff;
      return a.startTime.localeCompare(b.startTime);
    });
}

function getSpotsInfo(item) {
  const free = item.spotsTotal - item.spotsTaken;
  if (free <= 0) return { text: 'Немає місць', class: 'spots-badge--red' };
  if (free <= 3) return { text: `${free} місць`, class: 'spots-badge--yellow' };
  return { text: `${free} місць`, class: 'spots-badge--green' };
}

function getContactURL(item) {
  const params = new URLSearchParams();
  if (item.courseId) params.set('courseId', item.courseId);
  if (item.course) params.set('course', item.course);
  const query = params.toString();
  return query ? `contact.html?${query}#quick-contact` : 'contact.html#quick-contact';
}

function renderSchedule() {
  const filtered = getFilteredSchedule();
  renderTable(filtered);
  renderCards(filtered);
}

function renderTable(items) {
  const container = document.getElementById('schedule-table-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = '<p class="schedule__empty">Занять за обраними фільтрами не знайдено.</p>';
    return;
  }

  container.innerHTML = `
    <table class="schedule-table">
      <thead>
        <tr>
          <th>День</th>
          <th>Час</th>
          <th>Курс</th>
          <th>Рівень</th>
          <th>Вік</th>
          <th>Викладач</th>
          <th>Аудиторія</th>
          <th>Місця</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${items.map(item => {
    const spots = getSpotsInfo(item);
    return `
            <tr data-type="${item.type}">
              <td>${item.day}</td>
              <td>${item.startTime} - ${item.endTime}</td>
              <td><strong>${item.course}</strong></td>
              <td><span class="badge badge--gray">${item.level}</span></td>
              <td>${item.ageGroup}</td>
              <td>${item.teacher}</td>
              <td>${item.room}</td>
              <td><span class="spots-badge ${spots.class}">${spots.text}</span></td>
              <td>
                <a href="${getContactURL(item)}" class="btn btn--primary btn--small">
                  Записатися
                </a>
              </td>
            </tr>
          `;
  }).join('')}
      </tbody>
    </table>
  `;
}

function renderCards(items) {
  const container = document.getElementById('schedule-cards-container');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = '<p class="schedule__empty">Занять за обраними фільтрами не знайдено.</p>';
    return;
  }

  container.innerHTML = items.map(item => {
    const spots = getSpotsInfo(item);
    return `
      <div class="schedule-card" data-type="${item.type}">
        <div class="schedule-card__day">${item.day}</div>
        <div class="schedule-card__course">${item.course}</div>
        <div class="schedule-card__details">
          <span class="schedule-card__detail-label">Час:</span>
          <span>${item.startTime} - ${item.endTime}</span>
          <span class="schedule-card__detail-label">Рівень:</span>
          <span>${item.level}</span>
          <span class="schedule-card__detail-label">Вік:</span>
          <span>${item.ageGroup}</span>
          <span class="schedule-card__detail-label">Викладач:</span>
          <span>${item.teacher}</span>
          <span class="schedule-card__detail-label">Аудиторія:</span>
          <span>${item.room}</span>
        </div>
        <div class="schedule-card__footer">
          <span class="spots-badge ${spots.class}">${spots.text}</span>
          <a href="${getContactURL(item)}" class="btn btn--primary btn--small">
            Записатися
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function initFilters() {
  const filters = document.querySelectorAll('.schedule-filters select');
  filters.forEach(select => {
    select.addEventListener('change', renderSchedule);
  });
}

function initViewSwitch() {
  const mql = window.matchMedia('(min-width: 768px)');

  function handleViewChange(e) {
    const tableContainer = document.getElementById('schedule-table-container');
    const cardsContainer = document.getElementById('schedule-cards-container');
    if (!tableContainer || !cardsContainer) return;

    if (e.matches) {
      tableContainer.style.display = 'block';
      cardsContainer.style.display = 'none';
    } else {
      tableContainer.style.display = 'none';
      cardsContainer.style.display = 'grid';
    }
  }

  mql.addEventListener('change', handleViewChange);
  handleViewChange(mql);
}

document.addEventListener('DOMContentLoaded', initSchedule);

