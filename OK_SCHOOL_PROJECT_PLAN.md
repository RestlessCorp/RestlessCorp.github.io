# OK Language School — План Проєкту Вебсайту

## Загальна Інформація про Клієнта

| Параметр | Значення |
|---|---|
| **Назва** | Language School OK (Мовна школа OK) |
| **Місто** | Новий Розділ, Львівська область, Україна |
| **Адреса** | просп. Шевченка (уточнити повну адресу) |
| **Instagram** | [@language_school_ok](https://instagram.com/language_school_ok) (374 підписники, 152 пости) |
| **Facebook** | [Language-School-OK](https://www.facebook.com/p/Language-School-OK-100034650894394/) |
| **Логотип** | Щит у стилі Супермена з літерами "OK" (червоно-жовтий) |
| **Слоган** | "Everything will be OK" (пропозиція) |

### Послуги школи

- Англійська для дітей та дорослих
- Підготовка до ЗНО, ДПА, IELTS
- Розмовні клуби (Speaking Clubs)
- Групові та індивідуальні заняття

### Соцмережі — Активність

Школа дуже активна в Instagram та Facebook: регулярні фото з занять, відео, рілси, тематичні заходи (St. Valentine's Day, тощо), English classes promo-контент. Контент орієнтований на молодіжну аудиторію та батьків.

---

## Дизайн-Система

### Кольорова палітра

| Колір | HEX | Використання |
|---|---|---|
| Червоний | `#DC2626` | Основний бренд, CTA-кнопки |
| Жовтий | `#FACC15` | Акценти, іконки, highlights |
| Темний | `#1E293B` | Текст, фони |
| Білий | `#FFFFFF` | Фон, текст на темному |
| Синій | `#2563EB` | Посилання, допоміжний CTA |
| Світло-сірий | `#F8FAFC` | Секції з альтернативним фоном |

### Типографіка

- **Заголовки:** Montserrat (Bold, SemiBold)
- **Основний текст:** Open Sans (Regular, SemiBold)
- **Розміри:** H1: 2.5rem, H2: 2rem, H3: 1.5rem, body: 1rem

### Стиль

Сучасний, яскравий, дружній. Елементи "супергеройської" тематики з логотипу використовуються як візуальний лейтмотив (щит-форми, динамічні кути, bold-типографіка).

---

## Архітектура Проєкту — 3 Етапи

---

### ЕТАП 1: Статичний Сайт (GitHub Pages) — MVP / Демо

**Мета:** Швидко опублікувати робочий прототип для презентації клієнту та збору фідбеку.

**Технології:**

- HTML5 + CSS3 (кастомні стилі або Tailwind CDN)
- Vanilla JavaScript (ES6+, без фреймворків)
- GitHub Pages для хостингу
- JSON-файли для імітації даних (розклад, курси, відгуки)
- Formspree для обробки форм

**Сторінки та секції:**

#### 1. Головна (`index.html`)
- **Hero Section:** логотип, заголовок, слоган, CTA "Записатися на пробний урок", фонове зображення
- **Переваги:** 3-4 картки (малі групи, досвідчені викладачі, сучасні методики, дружня атмосфера)
- **Курси (preview):** горизонтальний скрол карток курсів з посиланням на `/courses`
- **Відгуки:** слайдер з 4-6 відгуками студентів
- **CTA-блок:** "Залишились питання? Запишіться на безкоштовну консультацію"
- **Соцмережі:** вбудований Instagram-фід (embed або статичні скріншоти)

#### 2. Про нас (`about.html`)
- Історія школи та місія
- Фото команди / викладачів з короткими біо
- Підхід до навчання (комунікативна методика)
- Досягнення та цифри (скільки випускників, роки роботи)

#### 3. Курси (`courses.html`)
- Картки курсів з фільтрами (вікова група, рівень)
- Кожна картка: назва, іконка, опис, вікова група, рівні, формат, кнопка "Детальніше"
- Розгорнутий опис курсу (accordion або модальне вікно)

#### 4. Розклад (`schedule.html`) — КЛЮЧОВА СТОРІНКА
- Інтерактивна таблиця розкладу, дані з `schedule.json`
- Фільтри: день тижня, вікова група, рівень, тип (група/клуб)
- Desktop: таблиця з кольоровим кодуванням
- Mobile: вертикальні картки згруповані по днях
- Індикатор вільних місць (зелений/жовтий/червоний)
- Кнопка "Записатися" біля кожного заняття

#### 5. Блог (`blog/index.html`)
- Сітка карток з 3-4 демо-постами
- Категорії: Tips, News, Events
- Кожен пост — окрема HTML-сторінка (`blog/posts/slug.html`)

#### 6. Контакти (`contact.html`)
- Адреса, телефон, email
- Google Maps embed з маркером школи
- Посилання на Instagram, Facebook, Viber, Telegram
- Форма зворотного зв'язку (Formspree): ім'я, телефон, email, повідомлення, вибір курсу

#### 7. Додаткове
- `404.html` — кастомна сторінка помилки
- Спільний header (навігація) та footer
- Favicon (з логотипу)

**Структура файлів:**

```
ok-school-website/
├── index.html
├── about.html
├── courses.html
├── schedule.html
├── contact.html
├── 404.html
├── blog/
│   ├── index.html
│   └── posts/
│       ├── why-start-english-early.html
│       ├── ielts-tips.html
│       └── speaking-club-review.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js          (навігація, анімації, shared)
│   │   ├── schedule.js       (завантаження JSON, фільтри, рендер)
│   │   ├── courses.js        (фільтри курсів)
│   │   └── contact-form.js   (валідація, відправка Formspree)
│   ├── images/
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   ├── hero-bg.jpg
│   │   ├── og-image.jpg      (Open Graph)
│   │   ├── favicon.ico
│   │   ├── courses/
│   │   └── team/
│   └── data/
│       ├── schedule.json
│       ├── courses.json
│       └── testimonials.json
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── README.md
└── CNAME                     (для кастомного домену)
```

---

### ЕТАП 2: Динамічний Сайт з Бекендом

**Мета:** Повноцінний сайт з базою даних, авторизацією та API для реального управління контентом.

**Технології:**

- **Frontend:** Next.js 14+ (App Router, SSR/SSG для SEO)
- **Backend:** Next.js API Routes або окремий Node.js (Fastify)
- **База даних:** PostgreSQL (Neon / Supabase / self-hosted)
- **ORM:** Prisma
- **Auth:** NextAuth.js з credentials provider (для адмінів)
- **Хостинг:** Vercel (frontend) + Railway/Supabase (DB)
- **Стилі:** Tailwind CSS

**Нові можливості порівняно з Етапом 1:**

- Динамічний розклад — дані з PostgreSQL, реальний час оновлення
- REST API для CRUD (розклад, курси, пости блогу, викладачі, заявки)
- Авторизація адміна для захищених маршрутів
- Форма запису → збереження в БД + email/Telegram нотифікація
- Динамічний блог з markdown-контентом
- SEO: авто-генерація sitemap.xml, robots.txt, Open Graph meta
- Мультимовність (UA / EN) через next-intl або next-i18n
- Instagram API фід (останні 12 постів на головній)
- Facebook Reviews інтеграція

**Схема бази даних:**

```sql
-- Користувачі (адміни)
Users (
  id            UUID PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin', 'editor') DEFAULT 'editor',
  name          VARCHAR(255),
  created_at    TIMESTAMP DEFAULT NOW()
)

-- Курси
Courses (
  id          UUID PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  subtitle    VARCHAR(255),
  slug        VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  age_group   VARCHAR(100),
  levels      VARCHAR(100)[],
  format      VARCHAR(50),
  price       DECIMAL(10,2),
  icon        VARCHAR(10),
  features    TEXT[],
  image_url   VARCHAR(500),
  is_active   BOOLEAN DEFAULT true,
  sort_order  INTEGER DEFAULT 0,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
)

-- Викладачі
Teachers (
  id             UUID PRIMARY KEY,
  name           VARCHAR(255) NOT NULL,
  slug           VARCHAR(255) UNIQUE NOT NULL,
  bio            TEXT,
  photo_url      VARCHAR(500),
  specialization VARCHAR(255)[],
  is_active      BOOLEAN DEFAULT true,
  sort_order     INTEGER DEFAULT 0
)

-- Розклад
Schedule (
  id          UUID PRIMARY KEY,
  course_id   UUID REFERENCES Courses(id),
  teacher_id  UUID REFERENCES Teachers(id),
  day_of_week SMALLINT NOT NULL,        -- 1=Пн, 7=Нд
  start_time  TIME NOT NULL,
  end_time    TIME NOT NULL,
  room        VARCHAR(100),
  type        ENUM('group', 'individual', 'club') DEFAULT 'group',
  spots_total SMALLINT DEFAULT 8,
  spots_taken SMALLINT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
)

-- Блог
BlogPosts (
  id           UUID PRIMARY KEY,
  title        VARCHAR(500) NOT NULL,
  slug         VARCHAR(500) UNIQUE NOT NULL,
  content      TEXT NOT NULL,
  excerpt      TEXT,
  cover_image  VARCHAR(500),
  author_id    UUID REFERENCES Users(id),
  category     VARCHAR(100),
  tags         VARCHAR(100)[],
  status       ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW()
)

-- Відгуки
Testimonials (
  id           UUID PRIMARY KEY,
  student_name VARCHAR(255) NOT NULL,
  text         TEXT NOT NULL,
  rating       SMALLINT CHECK (rating BETWEEN 1 AND 5),
  course_id    UUID REFERENCES Courses(id),
  status       ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  created_at   TIMESTAMP DEFAULT NOW()
)

-- Заявки на запис
Inquiries (
  id         UUID PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  phone      VARCHAR(50),
  email      VARCHAR(255),
  message    TEXT,
  course_id  UUID REFERENCES Courses(id),
  source     VARCHAR(100) DEFAULT 'website',
  status     ENUM('new', 'contacted', 'enrolled', 'rejected') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

-- Медіа
MediaGallery (
  id         UUID PRIMARY KEY,
  type       ENUM('photo', 'video', 'reel') NOT NULL,
  url        VARCHAR(500) NOT NULL,
  thumbnail  VARCHAR(500),
  caption    TEXT,
  category   VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
)
```

**API Ендпоінти (REST):**

```
GET    /api/courses              — список курсів
GET    /api/courses/:slug        — деталі курсу
POST   /api/courses              — створити курс (admin)
PUT    /api/courses/:id          — оновити курс (admin)
DELETE /api/courses/:id          — видалити курс (admin)

GET    /api/schedule             — розклад (з фільтрами ?day=&level=&age=)
POST   /api/schedule             — додати заняття (admin)
PUT    /api/schedule/:id         — оновити заняття (admin)
DELETE /api/schedule/:id         — видалити заняття (admin)

GET    /api/blog                 — пости (pagination, ?category=&status=)
GET    /api/blog/:slug           — окремий пост
POST   /api/blog                 — створити пост (admin)
PUT    /api/blog/:id             — оновити пост (admin)
DELETE /api/blog/:id             — видалити пост (admin)

GET    /api/teachers             — список викладачів
POST   /api/teachers             — додати викладача (admin)

GET    /api/testimonials         — відгуки (approved)
POST   /api/testimonials         — надіслати відгук (public)
PUT    /api/testimonials/:id     — модерація (admin)

POST   /api/inquiries            — нова заявка (public)
GET    /api/inquiries            — список заявок (admin)
PUT    /api/inquiries/:id        — оновити статус (admin)

POST   /api/auth/login           — авторизація
POST   /api/auth/logout          — вихід
GET    /api/auth/me              — поточний користувач

GET    /api/media                — галерея
POST   /api/media/upload         — завантажити файл (admin)
```

---

### ЕТАП 3: CMS Адмін-Панель + Production Хостинг

**Мета:** Адміністратор школи самостійно управляє контентом без допомоги розробника.

#### Варіанти CMS

| Варіант | Технологія | Плюси | Мінуси |
|---|---|---|---|
| **A (рек.)** | Strapi (self-hosted) | Open source, гнучкий, REST+GraphQL | Потребує сервер |
| **B** | Payload CMS | TypeScript, modern, вбудований в Next.js | Новіший, менше спільнота |
| **C** | Кастомна панель (React-Admin) | Повний контроль | Більше часу на розробку |
| **D** | WordPress headless | Знайомий інтерфейс для клієнта | Overhead, безпека |

#### Функціонал адмін-панелі

**1. Dashboard**
- Кількість нових заявок (за тиждень/місяць)
- Статистика відвідувачів (Google Analytics widget)
- Останні коментарі/відгуки на модерації
- Швидкі дії: додати заняття, написати пост, переглянути заявки

**2. Управління розкладом**
- Drag-and-drop таблиця (тиждень / день)
- Створення / редагування / видалення / дублювання занять
- Прив'язка до курсу та викладача (dropdown)
- Статус: активний / призупинений / завершений
- Масове редагування (канікули, зміна часу для групи)
- Зміни публікуються в реальному часі на сайті

**3. Блог / Новини**
- WYSIWYG-редактор (TipTap або Slate)
- Завантаження зображень з drag-and-drop
- Категорії та теги
- Draft / Published / Archived статуси
- SEO-поля: meta title, meta description, OG image
- Попередній перегляд перед публікацією
- Запланована публікація (scheduled)

**4. Медіа-галерея**
- Завантаження фото та відео (drag-and-drop, bulk upload)
- Embed Instagram Reels / YouTube / Facebook відео
- Організація по альбомам / категоріям / тегам
- Авто-генерація thumbnails
- Інтеграція з Instagram API для автоматичного імпорту нових постів

**5. Управління курсами**
- Повне CRUD для курсів
- Опис, ціни, розклад, вікова група, рівні
- Прив'язка до викладачів
- Статус: активний / набір відкрито / набір закрито / архів

**6. Заявки та студенти**
- Список заявок з фільтрами (статус, дата, курс)
- Статуси: нова → зв'язались → записано → відхилено
- Email та Telegram нотифікації при новій заявці
- Експорт в CSV/Excel

**7. Управління викладачами**
- Профілі з фото та біо
- Прив'язка до курсів та розкладу
- Публічна/приватна видимість

**8. Налаштування сайту**
- Контактна інформація (адреса, телефони, email)
- Посилання на соціальні мережі
- Банери та промо-акції на головній
- Робочі години школи

#### Production-хостинг

| Компонент | Рішення | Примітки |
|---|---|---|
| **Сервер** | DigitalOcean Droplet / Hetzner VPS | 2 CPU, 4GB RAM мінімум |
| **Домен** | ok-school.com.ua (перевірити) | .ua або .com.ua |
| **SSL** | Let's Encrypt | Безкоштовно, авто-оновлення через Certbot |
| **CDN** | Cloudflare (Free plan) | Кешування, DDoS-захист |
| **CI/CD** | GitHub Actions | Push to main → auto deploy |
| **Бекап БД** | Щоденний cron → S3/Backblaze | Ротація 30 днів |
| **Моніторинг** | UptimeRobot (free) + Sentry | Uptime + error tracking |
| **Файли** | Cloudflare R2 / AWS S3 | Медіа-файли |

---

## Приклади Даних

### schedule.json

```json
{
  "lastUpdated": "2026-03-05",
  "schedule": [
    {
      "id": 1,
      "course": "English for Kids",
      "level": "Starter",
      "ageGroup": "6-9 років",
      "teacher": "Оксана П.",
      "day": "Понеділок",
      "startTime": "15:00",
      "endTime": "16:00",
      "room": "Аудиторія 1",
      "type": "group",
      "spotsTotal": 8,
      "spotsTaken": 5
    },
    {
      "id": 2,
      "course": "Підготовка до ЗНО",
      "level": "B1-B2",
      "ageGroup": "15-17 років",
      "teacher": "Марія К.",
      "day": "Вівторок",
      "startTime": "16:30",
      "endTime": "18:00",
      "room": "Аудиторія 2",
      "type": "group",
      "spotsTotal": 10,
      "spotsTaken": 8
    },
    {
      "id": 3,
      "course": "Speaking Club",
      "level": "B1+",
      "ageGroup": "Дорослі",
      "teacher": "Ігор Т.",
      "day": "Середа",
      "startTime": "19:00",
      "endTime": "20:30",
      "room": "Аудиторія 1",
      "type": "club",
      "spotsTotal": 12,
      "spotsTaken": 7
    },
    {
      "id": 4,
      "course": "IELTS Preparation",
      "level": "B2-C1",
      "ageGroup": "Дорослі",
      "teacher": "Марія К.",
      "day": "Четвер",
      "startTime": "18:00",
      "endTime": "19:30",
      "room": "Аудиторія 2",
      "type": "group",
      "spotsTotal": 6,
      "spotsTaken": 4
    },
    {
      "id": 5,
      "course": "English for Teens",
      "level": "A2",
      "ageGroup": "10-14 років",
      "teacher": "Оксана П.",
      "day": "П'ятниця",
      "startTime": "15:30",
      "endTime": "17:00",
      "room": "Аудиторія 1",
      "type": "group",
      "spotsTotal": 8,
      "spotsTaken": 6
    },
    {
      "id": 6,
      "course": "English for Kids",
      "level": "A1",
      "ageGroup": "6-9 років",
      "teacher": "Оксана П.",
      "day": "Середа",
      "startTime": "15:00",
      "endTime": "16:00",
      "room": "Аудиторія 1",
      "type": "group",
      "spotsTotal": 8,
      "spotsTaken": 3
    },
    {
      "id": 7,
      "course": "Англійська для дорослих",
      "level": "A2-B1",
      "ageGroup": "Дорослі",
      "teacher": "Ігор Т.",
      "day": "Понеділок",
      "startTime": "18:30",
      "endTime": "20:00",
      "room": "Аудиторія 2",
      "type": "group",
      "spotsTotal": 10,
      "spotsTaken": 7
    },
    {
      "id": 8,
      "course": "Підготовка до ЗНО",
      "level": "B1-B2",
      "ageGroup": "15-17 років",
      "teacher": "Марія К.",
      "day": "Четвер",
      "startTime": "16:00",
      "endTime": "17:30",
      "room": "Аудиторія 2",
      "type": "group",
      "spotsTotal": 10,
      "spotsTaken": 8
    }
  ]
}
```

### courses.json

```json
{
  "courses": [
    {
      "id": "kids",
      "title": "Англійська для дітей",
      "subtitle": "English for Kids",
      "ageGroup": "6-9 років",
      "levels": ["Starter", "A1"],
      "description": "Ігрові заняття для наймолодших учнів. Вивчаємо англійську через пісні, ігри та творчі проєкти.",
      "features": ["Малі групи до 8 осіб", "Ігровий формат", "Творчі проєкти", "Сертифікат після курсу"],
      "schedule": "2 рази на тиждень по 60 хв",
      "icon": "🎮"
    },
    {
      "id": "teens",
      "title": "Англійська для підлітків",
      "subtitle": "English for Teens",
      "ageGroup": "10-14 років",
      "levels": ["A1", "A2", "B1"],
      "description": "Сучасні теми та матеріали, які цікаві підліткам. Розмовна практика, проєктна робота, підготовка до DPA.",
      "features": ["Актуальні теми", "Проєктна робота", "Підготовка до ДПА", "Розмовні ігри"],
      "schedule": "2 рази на тиждень по 90 хв",
      "icon": "🎓"
    },
    {
      "id": "adults",
      "title": "Англійська для дорослих",
      "subtitle": "English for Adults",
      "ageGroup": "18+ років",
      "levels": ["A1", "A2", "B1", "B2", "C1"],
      "description": "Від нуля до вільного спілкування. Комунікативна методика з фокусом на розмовну практику.",
      "features": ["Комунікативний підхід", "Гнучкий графік", "Бізнес-англійська", "Індивідуальний підхід"],
      "schedule": "2 рази на тиждень по 90 хв",
      "icon": "💼"
    },
    {
      "id": "zno",
      "title": "Підготовка до ЗНО / НМТ",
      "subtitle": "Exam Preparation",
      "ageGroup": "15-17 років",
      "levels": ["B1", "B2"],
      "description": "Системна підготовка до зовнішнього незалежного оцінювання. Всі формати завдань, стратегії та практика.",
      "features": ["Всі формати ЗНО", "Пробні тестування", "Аналіз помилок", "Гарантія результату"],
      "schedule": "2-3 рази на тиждень по 90 хв",
      "icon": "📝"
    },
    {
      "id": "ielts",
      "title": "Підготовка до IELTS",
      "subtitle": "IELTS Preparation",
      "ageGroup": "16+ років",
      "levels": ["B2", "C1"],
      "description": "Комплексна підготовка до всіх секцій IELTS: Listening, Reading, Writing, Speaking.",
      "features": ["Всі 4 секції", "Mock exams", "Стратегії складання", "Індивідуальний feedback"],
      "schedule": "2 рази на тиждень по 90 хв",
      "icon": "🌍"
    },
    {
      "id": "speaking-club",
      "title": "Розмовний клуб",
      "subtitle": "Speaking Club",
      "ageGroup": "16+ років",
      "levels": ["B1+"],
      "description": "Невимушене спілкування англійською на актуальні теми. Долаємо мовний бар'єр разом!",
      "features": ["Актуальні теми", "Дружня атмосфера", "Дебати та дискусії", "Носії мови (гості)"],
      "schedule": "1 раз на тиждень по 90 хв",
      "icon": "💬"
    }
  ]
}
```

### testimonials.json

```json
{
  "testimonials": [
    {
      "id": 1,
      "name": "Олена М.",
      "course": "Англійська для дорослих",
      "text": "Нарешті знайшла школу, де не страшно говорити англійською! Атмосфера дуже дружня, а викладачі терплячі та професійні.",
      "rating": 5
    },
    {
      "id": 2,
      "name": "Андрій К.",
      "course": "Підготовка до IELTS",
      "text": "Завдяки OK School отримав 7.5 на IELTS з першої спроби. Стратегії та практика, які дали на курсі — безцінні.",
      "rating": 5
    },
    {
      "id": 3,
      "name": "Марина Д. (мама учня)",
      "course": "English for Kids",
      "text": "Мій син ходить із задоволенням! Раніше не хотів вчити англійську, а тепер сам просить їхати на заняття. Дякую!",
      "rating": 5
    },
    {
      "id": 4,
      "name": "Ірина В.",
      "course": "Speaking Club",
      "text": "Розмовний клуб — це саме те, чого мені не вистачало. Живе спілкування, цікаві теми, і жодного осуду за помилки.",
      "rating": 5
    },
    {
      "id": 5,
      "name": "Дмитро Л.",
      "course": "Підготовка до ЗНО",
      "text": "Склав ЗНО на 192 бали! Курс дуже структурований, багато практики та пробних тестів. Рекомендую!",
      "rating": 5
    }
  ]
}
```

---

## Чеклісти

### Етап 1 — Готовність до публікації на GitHub Pages

- [x] Всі сторінки створені та зв'язані між собою (навігація)
- [ ] Responsive дизайн перевірено (mobile 375px, tablet 768px, desktop 1280px)
- [ ] Логотип SVG та брендінг відповідають палітрі
- [x] Розклад завантажується з JSON та фільтрується коректно
- [x] Курси рендеряться з JSON з працюючими фільтрами
- [x] Відгуки відображаються у слайдері
- [x] Форма зворотного зв'язку працює через Formspree (endpoint configurable; requires real Formspree ID)
- [x] Google Maps embed на сторінці контактів
- [x] Посилання на Instagram та Facebook (коректні URL)
- [ ] Lighthouse score > 90 (Performance, SEO, Accessibility, Best Practices)
- [x] GitHub Actions workflow для деплою налаштовано
- [x] CNAME файл для кастомного домену (якщо є) (N/A ? custom domain not used in Phase 1)
- [x] Favicon (ico + png) та Apple Touch Icon
- [x] Open Graph мета-теги на всіх сторінках
- [x] 404 сторінка з навігацією назад
- [x] Alt-тексти для всіх зображень
- [x] Анімації при скролі працюють плавно
- [x] Шрифти Google Fonts підключені з `display=swap`

### Етап 2 — Готовність бекенду

- [ ] PostgreSQL розгорнута та seed-дані завантажені
- [ ] Prisma schema відповідає плану БД
- [ ] Всі API ендпоінти працюють (Postman/Thunder Client тести)
- [ ] Авторизація адміна через NextAuth.js
- [ ] CRUD розклад: створення, редагування, видалення, фільтрація
- [ ] CRUD блог: створення, редагування, публікація, архівування
- [ ] CRUD курси: повне управління
- [ ] Форма заявки зберігає в БД + нотифікація
- [ ] Instagram API фід підключено
- [ ] Email нотифікації при нових заявках
- [ ] Sitemap.xml та robots.txt генеруються автоматично
- [ ] Мультимовність (UA / EN) працює
- [ ] Error handling та валідація на всіх ендпоінтах
- [ ] Rate limiting на публічних ендпоінтах

### Етап 3 — Production готовність

- [ ] CMS адмін-панель повністю функціональна
- [ ] WYSIWYG редактор блогу з завантаженням зображень
- [ ] Drag-and-drop управління розкладом
- [ ] Медіа-менеджер з bulk upload
- [ ] SSL сертифікат встановлено та авто-оновлюється
- [ ] CDN (Cloudflare) налаштовано
- [ ] Щоденні бекапи БД автоматизовано
- [ ] Моніторинг uptime + error tracking працює
- [ ] CI/CD pipeline: push → test → deploy
- [ ] Документація для адміна школи (PDF-інструкція)
- [ ] Передача клієнту: логіни, паролі, доступи, інструкції
- [ ] Тест навантаження (мінімум 100 одночасних користувачів)
- [ ] GDPR-compliance (політика приватності, cookie consent)

---

## Changelog

| Дата | Етап | Зміни |
|---|---|---|
| 2026-03-05 | Планування | Створено початковий план проєкту та AI-промпт |
| — | — | — |

---

## Відомі Проблеми / TODO

_Секція для фіксації відомих проблем, багів та задач на доробку. AI-агент оновлює цю секцію автоматично._

<!-- Формат: - [ ] Опис проблеми (дата виявлення, етап) -->
- [ ] Responsive QA pass in real browsers (375px / 768px / 1280px) (2026-03-05, Phase 1)
- [ ] Lighthouse verification >90 across key pages (2026-03-05, Phase 1)

---

## Архітектурні Рішення

_Секція для документування ключових рішень з поясненнями._

<!-- Формат: ### Дата — Рішення \n Опис та причина -->

---

## Примітки

- Всі імена викладачів, ціни та розклад — **placeholder-дані**. Реальну інформацію потрібно отримати від клієнта.
- Фото з Instagram/Facebook використовувати тільки з дозволу школи.
- Для Етапу 1 — stock-фото з Unsplash (education, language learning, classroom themes).
- Перевірити доступність доменів: ok-school.com.ua, okschool-nr.com.ua, ok-school.ua.
- Розглянути інтеграцію з месенджерами (Viber, Telegram) для прямого зв'язку.
- Можливе розширення: онлайн-оплата через LiqPay або Wayforpay.
- Можливе розширення: особистий кабінет студента (домашні завдання, прогрес).
