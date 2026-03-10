# OK Language School Website

Static website for **OK Language School** (Новий Розділ, Львівська область).

## Current Phase (UI/UX Polish 1.1)

- Parent-first homepage flow
- Simplified header navigation: `Головна`, `Курси`, `Розклад`, `Контакти`
- Contact flow without email form
- Registration only via phone call
- Testimonials section removed from Home

## Tech Stack

- HTML5
- CSS3 (custom properties, mobile-first)
- Vanilla JavaScript modules
- JSON for courses and schedule
- GitHub Pages deployment

## Local Development

Use any local HTTP server (required for JSON fetch):

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Contact Flow Contract

Primary contact page: `contact.html#quick-contact`

Supported query context:

- Canonical: `contact.html?courseId=<course-id>#quick-contact`
- Legacy fallback: `contact.html?course=<course-title>#quick-contact`

Primary contact actions:

- `tel:+380678041149`
- `tel:+380931456624`

## Deploy Checklist (GitHub Pages)

1. Default branch is `main`.
2. Push changes to `main`.
3. Ensure `.github/workflows/deploy.yml` succeeds.
4. In repo settings, Pages source is `GitHub Actions`.
5. Verify published pages:
   - Home/Courses/Schedule/Contact/Blog/404
   - Favicons and OG image load correctly
   - Contact buttons open the two phone actions

## Project Structure

```text
├── index.html
├── about.html
├── courses.html
├── schedule.html
├── contact.html
├── 404.html
├── blog/
│   ├── index.html
│   └── posts/
├── assets/
│   ├── css/styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── contact-actions.js
│   │   ├── courses.js
│   │   └── schedule.js
│   ├── data/
│   │   ├── courses.json
│   │   └── schedule.json
│   └── images/
└── .github/workflows/deploy.yml
```
