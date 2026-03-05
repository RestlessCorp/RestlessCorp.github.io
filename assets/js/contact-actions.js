/**
 * Contact page interactions:
 * - Show selected course context from URL query params
 * - Handle Viber desktop fallback
 */

import { fetchJSON } from './main.js';

const MOBILE_UA_REGEX = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i;

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

function initViberFallback() {
  const links = document.querySelectorAll('[data-viber-link]');
  if (links.length === 0) return;

  const isMobile = MOBILE_UA_REGEX.test(navigator.userAgent);
  if (isMobile) return;

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      const fallback = link.dataset.viberFallback || 'https://www.viber.com/';
      let pageHidden = false;
      const onVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
          pageHidden = true;
        }
      };

      event.preventDefault();
      document.addEventListener('visibilitychange', onVisibilityChange);
      window.location.href = link.href;

      window.setTimeout(() => {
        document.removeEventListener('visibilitychange', onVisibilityChange);
        if (!pageHidden) {
          window.open(fallback, '_blank', 'noopener,noreferrer');
        }
      }, 900);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initCourseContext();
  initViberFallback();
});
