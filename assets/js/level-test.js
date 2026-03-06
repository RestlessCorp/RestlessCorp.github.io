

const TEST_DURATION_SECONDS = 10 * 60;
const VIBER_CHAT_URL = 'viber://chat?number=%2B380678041149';
const VIBER_FALLBACK_URL = 'https://www.viber.com/';
const MOBILE_UA_REGEX = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i;

const state = {
  data: null,
  coursesMap: new Map(),
  profile: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  remainingSeconds: TEST_DURATION_SECONDS,
  timerId: null,
  summaryMessage: ''
};

const elements = {};

function cacheElements() {
  elements.start = document.getElementById('test-start');
  elements.quiz = document.getElementById('test-quiz');
  elements.result = document.getElementById('test-result');

  elements.profileList = document.getElementById('profile-list');

  elements.quizProfile = document.getElementById('quiz-profile');
  elements.quizTimer = document.getElementById('quiz-timer');
  elements.quizProgress = document.getElementById('quiz-progress');
  elements.quizQuestion = document.getElementById('quiz-question');
  elements.quizOptions = document.getElementById('quiz-options');
  elements.quizNext = document.getElementById('quiz-next');

  elements.resultLevel = document.getElementById('result-level');
  elements.resultScore = document.getElementById('result-score');
  elements.resultFeedback = document.getElementById('result-feedback');
  elements.resultCourses = document.getElementById('result-courses');
  elements.resultViber = document.getElementById('result-viber');
  elements.resultCopy = document.getElementById('result-copy');
  elements.resultRestart = document.getElementById('result-restart');
  elements.resultNote = document.getElementById('result-note');
}

function showScreen(screen) {
  elements.start.hidden = screen !== 'start';
  elements.quiz.hidden = screen !== 'quiz';
  elements.result.hidden = screen !== 'result';
}

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function findProfile(profileId) {
  return state.data?.profiles?.find(profile => profile.id === profileId) || null;
}

function buildCoursesMap(coursesData) {
  const map = new Map();
  (coursesData.courses || []).forEach(course => {
    map.set(course.id, course.title);
  });
  return map;
}

function getCourseTitle(courseId) {
  return state.coursesMap.get(courseId) || courseId;
}

function renderProfileCards() {
  if (!elements.profileList || !state.data?.profiles) return;

  elements.profileList.innerHTML = state.data.profiles.map(profile => `
    <button type="button" class="profile-card" data-profile-id="${profile.id}">
      <span class="profile-card__badge">18 питань</span>
      <h3 class="profile-card__title">${profile.title}</h3>
      <p class="profile-card__text">${profile.description}</p>
      <span class="profile-card__meta">До 10 хвилин</span>
    </button>
  `).join('');

  elements.profileList.querySelectorAll('[data-profile-id]').forEach(button => {
    button.addEventListener('click', () => {
      startProfile(button.dataset.profileId);
    });
  });
}

function resetTestState() {
  state.questions = [];
  state.answers = [];
  state.currentIndex = 0;
  state.remainingSeconds = TEST_DURATION_SECONDS;
  state.summaryMessage = '';

  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startProfile(profileId) {
  const profile = findProfile(profileId);
  if (!profile) return;

  resetTestState();

  state.profile = profile;
  state.questions = profile.questions;
  state.answers = new Array(profile.questions.length).fill(null);

  elements.quizProfile.textContent = `Профіль: ${profile.title}`;
  elements.quizNext.disabled = true;
  elements.quizNext.textContent = 'Далі';
  elements.resultNote.textContent = '';

  showScreen('quiz');
  startTimer();
  renderCurrentQuestion();
}

function startTimer() {
  elements.quizTimer.textContent = formatTime(state.remainingSeconds);

  state.timerId = window.setInterval(() => {
    state.remainingSeconds -= 1;
    elements.quizTimer.textContent = formatTime(Math.max(state.remainingSeconds, 0));

    if (state.remainingSeconds <= 0) {
      window.clearInterval(state.timerId);
      state.timerId = null;
      finishTest(true);
    }
  }, 1000);
}

function renderCurrentQuestion() {
  const question = state.questions[state.currentIndex];
  if (!question) return;

  const questionNumber = state.currentIndex + 1;
  const total = state.questions.length;

  elements.quizProgress.textContent = `Питання ${questionNumber} з ${total}`;
  elements.quizQuestion.textContent = question.prompt;

  const selectedAnswer = state.answers[state.currentIndex];

  elements.quizOptions.innerHTML = question.options.map((option, index) => {
    const activeClass = selectedAnswer === index ? ' quiz-option--active' : '';
    return `<button type="button" class="quiz-option${activeClass}" data-answer-index="${index}">${option}</button>`;
  }).join('');

  elements.quizOptions.querySelectorAll('[data-answer-index]').forEach(button => {
    button.addEventListener('click', () => {
      const answerIndex = Number(button.dataset.answerIndex);
      state.answers[state.currentIndex] = answerIndex;

      elements.quizOptions.querySelectorAll('[data-answer-index]').forEach(item => {
        item.classList.toggle('quiz-option--active', Number(item.dataset.answerIndex) === answerIndex);
      });

      elements.quizNext.disabled = false;
    });
  });

  elements.quizNext.disabled = selectedAnswer === null;
  elements.quizNext.textContent = questionNumber === total ? 'Завершити тест' : 'Далі';
}

function scoreTest() {
  return state.questions.reduce((score, question, index) => {
    return score + (state.answers[index] === question.correctIndex ? 1 : 0);
  }, 0);
}

function resolveBand(score) {
  return state.profile.resultBands.find(band => score >= band.minScore && score <= band.maxScore) || state.profile.resultBands[0];
}

function buildRecommendedCourses(band) {
  const courseIds = [band.primaryCourseId, ...(band.secondaryCourseIds || [])].filter(Boolean);
  const uniqueIds = [...new Set(courseIds)];

  return uniqueIds.map(courseId => ({
    id: courseId,
    title: getCourseTitle(courseId)
  }));
}

function buildSummaryMessage(score, band, courses) {
  const coursesList = courses.map(course => course.title).join(', ');

  return [
    'Привіт! Я пройшов(ла) тест рівня на сайті OK Language School.',
    `Профіль: ${state.profile.title}`,
    `Результат: ${score}/${state.questions.length}`,
    `Рівень: ${band.cefr} (${band.label})`,
    `Рекомендований курс: ${coursesList}`,
    'Підкажіть, будь ласка, найкращий формат і розклад.'
  ].join('\n');
}

function renderResult(score, band, courses, timeExpired) {
  elements.resultLevel.textContent = `${band.cefr} — ${band.label}`;
  elements.resultScore.textContent = `${score}/${state.questions.length} правильних відповідей`;
  elements.resultFeedback.textContent = band.feedback;

  elements.resultCourses.innerHTML = `
    <p class="result-card__courses-title">Рекомендований курс:</p>
    <ul class="result-card__courses-list">
      ${courses.map(course => `<li>${course.title}</li>`).join('')}
    </ul>
  `;

  state.summaryMessage = buildSummaryMessage(score, band, courses);

  const encodedMessage = encodeURIComponent(state.summaryMessage);
  elements.resultViber.href = `${VIBER_CHAT_URL}&text=${encodedMessage}`;

  if (timeExpired) {
    elements.resultNote.textContent = 'Час завершився, тому ми порахували результат за вибраними відповідями.';
  } else {
    elements.resultNote.textContent = 'Готово! Можете відправити результат у Viber одним кліком.';
  }
}

async function copySummaryToClipboard() {
  if (!state.summaryMessage) return false;

  try {
    await navigator.clipboard.writeText(state.summaryMessage);
    elements.resultNote.textContent = 'Результат скопійовано. Вставте повідомлення у чат Viber за потреби.';
    return true;
  } catch (error) {
    console.error('Failed to copy summary:', error);
    elements.resultNote.textContent = 'Не вдалося скопіювати автоматично. Спробуйте ще раз.';
    return false;
  }
}

function bindResultActions() {
  elements.resultCopy.addEventListener('click', () => {
    copySummaryToClipboard();
  });

  elements.resultRestart.addEventListener('click', () => {
    resetTestState();
    showScreen('start');
  });

  elements.resultViber.addEventListener('click', async (event) => {
    const fallback = elements.resultViber.dataset.viberFallback || VIBER_FALLBACK_URL;
    const isMobile = MOBILE_UA_REGEX.test(navigator.userAgent);
    let pageHidden = false;

    await copySummaryToClipboard();

    if (!isMobile) {
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') pageHidden = true;
      };

      document.addEventListener('visibilitychange', onVisibilityChange);

      window.setTimeout(() => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (!pageHidden) {
          window.open(fallback, '_blank', 'noopener,noreferrer');
        }
      }, 900);
    }

    event.preventDefault();
    window.location.href = elements.resultViber.href;
  });
}

function finishTest(timeExpired = false) {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }

  const score = scoreTest();
  const band = resolveBand(score);
  const courses = buildRecommendedCourses(band);

  renderResult(score, band, courses, timeExpired);
  showScreen('result');
}

function bindQuizActions() {
  elements.quizNext.addEventListener('click', () => {
    if (state.answers[state.currentIndex] === null) return;

    if (state.currentIndex === state.questions.length - 1) {
      finishTest(false);
      return;
    }

    state.currentIndex += 1;
    renderCurrentQuestion();
  });
}

function initFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const profileId = params.get('profile');

  if (!profileId) return;

  const profile = findProfile(profileId);
  if (profile) {
    startProfile(profileId);
  }
}

async function initLevelTest() {
  cacheElements();

  if (!elements.profileList) return;

  try {
    const [testsData, coursesData] = await Promise.all([
      fetchJSON('assets/data/level-tests.json'),
      fetchJSON('assets/data/courses.json')
    ]);

    state.data = testsData;
    state.coursesMap = buildCoursesMap(coursesData);

    renderProfileCards();
    bindQuizActions();
    bindResultActions();
    initFromQuery();
  } catch (error) {
    console.error('Failed to initialize level test:', error);

    elements.profileList.innerHTML = `
      <div class="test-error">
        <p>Не вдалося завантажити тест. Спробуйте оновити сторінку трохи пізніше.</p>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', initLevelTest);
