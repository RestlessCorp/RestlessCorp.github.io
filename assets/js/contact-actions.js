/**
 * Contact page interactions:
 * - Show selected course context from URL query params
 */

function normalizeText(value = '') {
  return value.trim().toLowerCase();
}

async function resolveCourseTitle(courseId, fallbackTitle) {
  if (!courseId) return fallbackTitle || '';

  try {
    const data = await fetchJSON('assets/data/courses.json');
    const found = data.courses?.find(course => course.id === courseId);
    return found?.title || fallbackTitle || '';
  } catch (error) {
    console.error('Failed to resolve course context:', error);
    return fallbackTitle || '';
  }
}

async function initCourseContext() {
  const context = document.getElementById('course-context');
  const output = document.getElementById('selected-course');
  if (!context || !output) return;

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId')?.trim() || '';
  const legacyCourse = params.get('course')?.trim() || '';

  if (!courseId && !legacyCourse) return;

  const title = await resolveCourseTitle(courseId, legacyCourse);
  if (!normalizeText(title)) return;

  output.textContent = title;
  context.hidden = false;
}

document.addEventListener('DOMContentLoaded', () => {
  initCourseContext();
});
