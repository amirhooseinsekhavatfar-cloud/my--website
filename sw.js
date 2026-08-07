// ══════════════════════════════════════════════
//  SERVICE WORKER — کارکرد آفلاین سایت (PWA)
//  این فایل خودکار کش می‌کنه تا سایت بدون اینترنت هم باز بشه.
//
//  اگه فایل‌های اصلی سایت رو عوض کردی (CSS/JS/HTML) و می‌خوای
//  کاربرها نسخه‌ی جدید رو بگیرن، فقط عدد CACHE_VERSION رو
//  یکی زیاد کن — بقیه‌ش خودکاره.
// ══════════════════════════════════════════════
const CACHE_VERSION = 'v2';
const CACHE_NAME = 'ahs-portfolio-' + CACHE_VERSION;

// فایل‌های اصلی که همیشه باید برای کارکرد آفلاین کش بشن
const CORE_ASSETS = [
  './',
  './index.html',
  './css/main.css',
  './css/redesign-industrial.css',
  './css/simlink.css',
  './css/features.css',
  './js/app.js',
  './js/interactions.js',
  './js/shatter-glass.js',
  './js/features.js',
  './js/pwa-manifest.js',
  './js/data/site-config.js',
  './js/data/skills.js',
  './js/data/projects.js',
  './js/data/achievements.js',
  './js/data/posts.js',
  './js/data/posts-settings.js',
  './js/data/blog-posts.js',
  './js/data/latest-activity.js',
  './js/data/experience.js',
  './js/data/journey-resume.js',
  './js/data/codes.js',
  './js/data/pdfs.js',
  './js/data/videos.js',
  './js/data/simlink-posts.js',
  './js/data/chatbot-knowledge.js',
  './js/data/faq-knowledge.js',
  './js/data/testimonials.js',
  './js/chatbot/config.js',
  './js/chatbot/utils.js',
  './js/chatbot/normalizer.js',
  './js/chatbot/synonyms.js',
  './js/chatbot/search.js',
  './js/chatbot/ranking.js',
  './js/chatbot/intent.js',
  './js/chatbot/memory.js',
  './js/chatbot/context.js',
  './js/chatbot/history.js',
  './js/chatbot/answer.js',
  './js/chatbot/engine.js',
  './js/chatbot/faq-slider.js',
  './js/chatbot/pdf-knowledge.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .catch(() => {}) // یه فایل ناموجود نباید کل نصب رو خراب کنه
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// استراتژی: network-first برای HTML (تا محتوای جدید همیشه اولویت داشته باشه)
// و cache-first برای بقیه‌ی فایل‌های هم‌مبدأ (CSS/JS/تصاویر)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  if (isSameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
            }
            return res;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
  // درخواست‌های برون‌مبدأ (فونت‌ها، آیکون‌ها) از شبکه‌ی معمولی رد می‌شن
});
