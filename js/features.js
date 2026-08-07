// ══════════════════════════════════════════════
//  FEATURES.JS — ویژگی‌های جدید سایت
//  همه‌چیز این فایل مستقل از app.js/interactions.js کار می‌کنه
//  و فقط از window.SiteData (فایل‌های js/data/) می‌خونه.
//  بدون بک‌اند/سرور — همه‌چیز کاملاً سمت کاربره.
//
//  شامل:
//    1) اسکرول‌ریویل (Scroll Reveal)
//    2) تم‌های رنگی بیشتر (Theme picker)
//    3) جستجوی سراسری (Global Search)
//    4) فیلتر و مرتب‌سازی پروژه‌ها + Case Study
//    5) بخش نظرات (Testimonials)
//    6) دکمه‌ی دانلود رزومه
//    7) رزرو جلسه با Calendly
//    8) ثبت Service Worker برای PWA/آفلاین
// ══════════════════════════════════════════════

function fLang() {
  return document.body.classList.contains('rtl') ? 'fa' : 'en';
}

function fEsc(s) {
  return (s == null ? '' : String(s)).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/* ══════════════════════════════════════════════
   1) SCROLL REVEAL — انیمیشن ورود اسکرول
   ══════════════════════════════════════════════ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.sec > .inner > *, .sec .testi-grid, .sec .ach-grid, .sec .blog-grid'
  );
  if (!targets.length || !('IntersectionObserver' in window)) return;

  targets.forEach(el => {
    if (el.closest('#global-search-overlay, #case-study-overlay')) return;
    el.classList.add('sr-reveal');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('sr-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.sr-reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════
   2) EXTRA COLOR THEMES — تم‌های رنگی بیشتر
   ══════════════════════════════════════════════ */
const THEME_PRESETS = [
  { id: 'default', label: 'Amber', color: '#FFB020' },
  { id: 'teal', label: 'Teal', color: '#29D3C7' },
  { id: 'crimson', label: 'Crimson', color: '#FF4D5E' },
  { id: 'violet', label: 'Violet', color: '#A276FF' },
  { id: 'arctic', label: 'Arctic', color: '#2F9BFF' }
];
const THEME_CLASS_PREFIX = 'theme-';

function applyColorTheme(id, persist = true) {
  THEME_PRESETS.forEach(t => document.body.classList.remove(THEME_CLASS_PREFIX + t.id));
  if (id && id !== 'default') document.body.classList.add(THEME_CLASS_PREFIX + id);
  if (persist) localStorage.setItem('colorTheme', id);
  document.querySelectorAll('.theme-swatch').forEach(sw => {
    sw.classList.toggle('active', sw.dataset.theme === id);
  });
}

/* ── دکمه‌ی ترکیبی «بیشتر» توی نویگیشن ──────────
   چون نویگیشن سایت از قبل خیلی شلوغه (لینک‌های زیاد)، به‌جای اضافه
   کردن ۲ تا دکمه‌ی جدا (جستجو + تم)، هر دو رو توی یه پاپ‌آپ جمع
   کردیم که فقط یه دکمه‌ی کوچیک به نویگیشن اضافه می‌کنه — تا دکمه‌های
   اصلی (تغییر تم دارک/لایت، تغییر زبان، منوی موبایل) هیچ‌وقت از
   صفحه بیرون نرن. */
function initNavExtrasMenu() {
  const navRight = document.querySelector('.nav-right');
  if (!navRight || document.getElementById('nav-extras-btn')) return;
  const L = fLang();

  const wrap = document.createElement('div');
  wrap.className = 'theme-picker-wrap';
  wrap.innerHTML = `
    <button class="ico-btn" id="nav-extras-btn" title="${L === 'fa' ? 'جستجو و تم' : 'Search & theme'}"><i class="fa-solid fa-ellipsis-vertical"></i></button>
    <div class="theme-picker-pop" id="nav-extras-pop">
      <button class="extras-row" id="extras-search-row"><i class="fa-solid fa-magnifying-glass"></i><span>${L === 'fa' ? 'جستجو' : 'Search'}</span><kbd>Ctrl K</kbd></button>
      <div class="extras-divider"></div>
      <div class="extras-swatches">
        ${THEME_PRESETS.map(t => `<span class="theme-swatch" data-theme="${t.id}" style="background:${t.color}" title="${t.label}"></span>`).join('')}
      </div>
    </div>`;
  navRight.insertBefore(wrap, navRight.firstChild);

  document.getElementById('nav-extras-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('nav-extras-pop').classList.toggle('open');
  });
  document.addEventListener('click', () => {
    const pop = document.getElementById('nav-extras-pop');
    if (pop) pop.classList.remove('open');
  });
  document.getElementById('extras-search-row').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('nav-extras-pop').classList.remove('open');
    openGlobalSearch();
  });
  wrap.querySelectorAll('.theme-swatch').forEach(sw => {
    sw.addEventListener('click', (e) => {
      e.stopPropagation();
      applyColorTheme(sw.dataset.theme);
    });
  });

  const saved = localStorage.getItem('colorTheme') || 'default';
  applyColorTheme(saved, false);
}

/* ══════════════════════════════════════════════
   3) GLOBAL SEARCH — جستجوی سراسری
   بین پروژه‌ها، کتابخانه کد و مقالات بلاگ
   ══════════════════════════════════════════════ */
function buildSearchIndex() {
  const L = fLang();
  const items = [];

  (window.SiteData.projects || []).forEach((p, i) => {
    items.push({
      type: 'project',
      typeLabel: { en: 'Project', fa: 'پروژه' },
      icon: 'fa-solid fa-diagram-project',
      title: L === 'fa' ? (p.titleFa || p.titleEn) : (p.titleEn || p.titleFa),
      desc: L === 'fa' ? (p.descFa || p.descEn) : (p.descEn || p.descFa),
      haystack: [p.titleEn, p.titleFa, p.descEn, p.descFa, p.tags, p.cat].filter(Boolean).join(' '),
      action: () => {
        closeGlobalSearch();
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => { if (typeof pcarGoTo === 'function') pcarGoTo(i); }, 400);
      }
    });
  });

  (window.SiteData.codes || []).forEach((c, i) => {
    items.push({
      type: 'code',
      typeLabel: { en: 'Code', fa: 'کد' },
      icon: 'fa-solid fa-code',
      title: L === 'fa' ? (c.titleFa || c.titleEn) : (c.titleEn || c.titleFa),
      desc: L === 'fa' ? (c.descFa || c.descEn) : (c.descEn || c.descFa),
      haystack: [c.titleEn, c.titleFa, c.descEn, c.descFa, c.lang].filter(Boolean).join(' '),
      action: () => {
        closeGlobalSearch();
        document.getElementById('code-lib').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  (window.SiteData.blogPosts || []).forEach((b) => {
    items.push({
      type: 'blog',
      typeLabel: { en: 'Blog', fa: 'بلاگ' },
      icon: 'fa-solid fa-newspaper',
      title: L === 'fa' ? (b.titleFa || b.titleEn) : (b.titleEn || b.titleFa),
      desc: L === 'fa' ? (b.excerptFa || b.excerptEn) : (b.excerptEn || b.excerptFa),
      haystack: [b.titleEn, b.titleFa, b.excerptEn, b.excerptFa, b.catEn, b.catFa].filter(Boolean).join(' '),
      action: () => {
        closeGlobalSearch();
        if (b.url) { window.open(b.url, '_blank'); return; }
        document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  return items;
}

function highlightMatch(text, q) {
  if (!text) return '';
  const safe = fEsc(text);
  if (!q) return safe;
  try {
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return safe.replace(re, '<mark>$1</mark>');
  } catch (e) {
    return safe;
  }
}

function ensureGlobalSearchModal() {
  if (document.getElementById('global-search-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'global-search-overlay';
  overlay.innerHTML = `
    <div class="gsearch-modal" onclick="event.stopPropagation()">
      <div class="gsearch-input-row">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="global-search-input" placeholder="Search projects, code, blog posts…" autocomplete="off">
        <button class="gsearch-close" onclick="closeGlobalSearch()"><i class="fa-solid fa-xmark"></i></button>
      </div>
      <div class="gsearch-results" id="gsearch-results"></div>
      <div class="gsearch-hint"><span>↑↓ Navigate</span><span>Enter Select</span><span>Esc Close</span></div>
    </div>`;
  overlay.addEventListener('click', closeGlobalSearch);
  document.body.appendChild(overlay);

  const input = document.getElementById('global-search-input');
  input.addEventListener('input', () => renderSearchResults(input.value));
  input.addEventListener('keydown', (e) => {
    const results = document.querySelectorAll('.gsearch-item');
    let idx = Array.from(results).findIndex(r => r.classList.contains('active'));
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      idx = Math.min(idx + 1, results.length - 1);
      results.forEach(r => r.classList.remove('active'));
      if (results[idx]) { results[idx].classList.add('active'); results[idx].scrollIntoView({ block: 'nearest' }); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      idx = Math.max(idx - 1, 0);
      results.forEach(r => r.classList.remove('active'));
      if (results[idx]) { results[idx].classList.add('active'); results[idx].scrollIntoView({ block: 'nearest' }); }
    } else if (e.key === 'Enter') {
      const active = document.querySelector('.gsearch-item.active') || results[0];
      if (active) active.click();
    }
  });
}

function renderSearchResults(query) {
  const box = document.getElementById('gsearch-results');
  if (!box) return;
  const q = (query || '').trim();
  const items = buildSearchIndex();
  const L = fLang();
  let matched = items;
  if (q) {
    const qLower = q.toLowerCase();
    matched = items.filter(it => it.haystack.toLowerCase().includes(qLower));
  }
  if (!matched.length) {
    box.innerHTML = `<div class="gsearch-empty">${L === 'fa' ? 'نتیجه‌ای پیدا نشد' : 'No results found'}</div>`;
    return;
  }
  const groups = {};
  matched.slice(0, 60).forEach(it => {
    (groups[it.type] = groups[it.type] || []).push(it);
  });
  let html = '';
  let first = true;
  Object.keys(groups).forEach(type => {
    const group = groups[type];
    html += `<div class="gsearch-group-label">${group[0].typeLabel[L]}</div>`;
    group.forEach(it => {
      html += `<div class="gsearch-item${first ? ' active' : ''}" data-action="1">
        <i class="${it.icon}"></i>
        <div>
          <div class="gsearch-item-title">${highlightMatch(it.title, q)}</div>
          <div class="gsearch-item-desc">${highlightMatch((it.desc || '').slice(0, 110), q)}</div>
        </div>
      </div>`;
      first = false;
    });
  });
  box.innerHTML = html;
  const nodes = box.querySelectorAll('.gsearch-item');
  matched.slice(0, 60).forEach((it, i) => {
    if (nodes[i]) nodes[i].addEventListener('click', it.action);
  });
}

function openGlobalSearch() {
  ensureGlobalSearchModal();
  const overlay = document.getElementById('global-search-overlay');
  overlay.classList.add('open');
  renderSearchResults('');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('global-search-input').focus(), 60);
}

function closeGlobalSearch() {
  const overlay = document.getElementById('global-search-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function initSearchKeyboardShortcut() {
  if (window._searchShortcutBound) return;
  window._searchShortcutBound = true;

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openGlobalSearch();
    } else if (e.key === 'Escape') {
      closeGlobalSearch();
    }
  });
}

/* ══════════════════════════════════════════════
   4) PROJECT FILTER / SORT + CASE STUDY MODAL
   فیلتر و مرتب‌سازی پروژه‌ها + صفحه‌ی جزئیات پروژه
   ══════════════════════════════════════════════ */
let pfActiveCat = 'all';
let pfActiveSort = 'default';

function pfApplyFilters() {
  const projects = window.SiteData.projects || [];
  let list = projects.filter(p => pfActiveCat === 'all' || p.cat === pfActiveCat);
  if (pfActiveSort === 'newest') {
    list = list.slice().sort((a, b) => new Date(b.dateISO || 0) - new Date(a.dateISO || 0));
  } else if (pfActiveSort === 'popular') {
    list = list.slice().sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  } else if (pfActiveSort === 'az') {
    list = list.slice().sort((a, b) => (a.titleEn || '').localeCompare(b.titleEn || ''));
  }
  if (!list.length) list = projects;
  if (typeof renderProjectsToPage === 'function') renderProjectsToPage(list);
}

function initProjectFilters() {
  const carousel = document.getElementById('proj-carousel');
  const projects = window.SiteData.projects || [];
  if (!carousel || projects.length < 2) return;
  const L = fLang();
  let toolbar = document.getElementById('proj-filter-toolbar');
  const cats = Array.from(new Set(projects.map(p => p.cat).filter(Boolean)));

  if (!toolbar) {
    toolbar = document.createElement('div');
    toolbar.id = 'proj-filter-toolbar';
    toolbar.className = 'proj-filter-toolbar';
    carousel.parentNode.insertBefore(toolbar, carousel);
  }

  toolbar.innerHTML = `
    <div class="pf-tabs" id="pf-tabs">
      <button class="pf-tab${pfActiveCat === 'all' ? ' active' : ''}" data-cat="all">${L === 'fa' ? 'همه' : 'All'}</button>
      ${cats.map(c => `<button class="pf-tab${pfActiveCat === c ? ' active' : ''}" data-cat="${fEsc(c)}">${fEsc(c)}</button>`).join('')}
    </div>
    <select class="video-sort-select" id="pf-sort-select">
      <option value="default"${pfActiveSort === 'default' ? ' selected' : ''}>${L === 'fa' ? 'پیش‌فرض' : 'Default'}</option>
      <option value="newest"${pfActiveSort === 'newest' ? ' selected' : ''}>${L === 'fa' ? 'جدیدترین' : 'Newest'}</option>
      <option value="popular"${pfActiveSort === 'popular' ? ' selected' : ''}>${L === 'fa' ? 'محبوب‌ترین' : 'Most popular'}</option>
      <option value="az"${pfActiveSort === 'az' ? ' selected' : ''}>A → Z</option>
    </select>`;

  toolbar.querySelectorAll('.pf-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      toolbar.querySelectorAll('.pf-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      pfActiveCat = tab.dataset.cat;
      pfApplyFilters();
    });
  });
  const sortSel = document.getElementById('pf-sort-select');
  if (sortSel) sortSel.addEventListener('change', (e) => {
    pfActiveSort = e.target.value;
    pfApplyFilters();
  });
}

// افزودن دکمه‌ی «Case Study» زیر جزئیات پروژه‌ی فعال در چرخ‌فلک
function patchProjectCarouselDetailsButton() {
  if (typeof pcarUpdateInfo !== 'function' || window._pcarPatched) return;
  window._pcarPatched = true;
  const orig = window.pcarUpdateInfo;
  window.pcarUpdateInfo = function() {
    orig();
    const linksEl = document.getElementById('pcar-links');
    const p = (typeof pcarProjects !== 'undefined') ? pcarProjects[pcarIndex] : null;
    if (!linksEl || !p) return;
    const btn = document.createElement('button');
    btn.className = 'pcar-details-btn';
    btn.type = 'button';
    btn.innerHTML = `<i class="fa-solid fa-book-open"></i><span>${fLang() === 'fa' ? 'جزئیات کامل' : 'Case Study'}</span>`;
    btn.addEventListener('click', () => openCaseStudy(pcarIndex));
    linksEl.appendChild(btn);
  };
}

function ensureCaseStudyModal() {
  if (document.getElementById('case-study-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'case-study-overlay';
  overlay.innerHTML = `
    <div class="cs-modal" onclick="event.stopPropagation()">
      <div class="cs-hero" id="cs-hero">
        <button class="cs-close" onclick="closeCaseStudy()"><i class="fa-solid fa-xmark"></i></button>
        <div class="cs-title" id="cs-title"></div>
      </div>
      <div class="cs-body">
        <div class="cs-tags" id="cs-tags"></div>
        <div class="cs-desc" id="cs-desc"></div>
        <div class="cs-gallery" id="cs-gallery"></div>
        <div class="cs-links" id="cs-links"></div>
      </div>
    </div>`;
  overlay.addEventListener('click', closeCaseStudy);
  document.body.appendChild(overlay);
}

function openCaseStudy(index) {
  ensureCaseStudyModal();
  const projects = window.SiteData.projects || [];
  const p = (typeof pcarProjects !== 'undefined' && pcarProjects[index]) || projects[index];
  if (!p) return;
  const L = fLang();

  const hero = document.getElementById('cs-hero');
  hero.style.background = p.image ? `url('${p.image}') center/cover` : (p.gradient || 'var(--bg3)');
  document.getElementById('cs-title').textContent = L === 'fa' ? (p.titleFa || p.titleEn) : (p.titleEn || p.titleFa);

  document.getElementById('cs-tags').innerHTML = (p.tags || '').split(',').filter(Boolean)
    .map(t => `<span class="tag">${fEsc(t.trim())}</span>`).join('');

  const fullDesc = L === 'fa' ? (p.fullDescFa || p.fullDescEn || p.descFa || p.descEn) : (p.fullDescEn || p.fullDescFa || p.descEn || p.descFa);
  document.getElementById('cs-desc').textContent = fullDesc || '';

  const gallery = document.getElementById('cs-gallery');
  if (p.gallery && p.gallery.length) {
    gallery.style.display = 'grid';
    gallery.innerHTML = p.gallery.map(src => `<img src="${fEsc(src)}" alt="" loading="lazy" onclick="window.open('${fEsc(src)}','_blank')">`).join('');
  } else {
    gallery.style.display = 'none';
    gallery.innerHTML = '';
  }

  const links = document.getElementById('cs-links');
  links.innerHTML =
    (p.github ? `<a href="${fEsc(p.github)}" target="_blank" class="btn btn-o"><i class="fab fa-github"></i> GitHub</a>` : '') +
    (p.demo ? `<a href="${fEsc(p.demo)}" target="_blank" class="btn btn-p"><i class="fa-solid fa-eye"></i> ${L === 'fa' ? 'دمو' : 'Live Demo'}</a>` : '');

  document.getElementById('case-study-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCaseStudy() {
  const overlay = document.getElementById('case-study-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════
   5) TESTIMONIALS — بخش نظرات و توصیه‌نامه‌ها
   ══════════════════════════════════════════════ */
function renderTestimonialsToPage() {
  const grid = document.getElementById('testi-grid');
  const section = document.getElementById('testimonials');
  const items = window.SiteData.testimonials || [];
  if (!grid) return;
  if (!items.length) {
    if (section) section.style.display = 'none';
    return;
  }
  if (section) section.style.display = '';
  const L = fLang();
  grid.innerHTML = items.map(t => {
    const initials = (t.name || '').split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
    const rating = Math.max(0, Math.min(5, t.rating || 5));
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const role = L === 'fa' ? (t.roleFa || t.roleEn) : (t.roleEn || t.roleFa);
    const text = L === 'fa' ? (t.textFa || t.textEn) : (t.textEn || t.textFa);
    return `<div class="testi-card">
      <div class="testi-quote-ico"><i class="fa-solid fa-quote-left"></i></div>
      <div class="testi-stars">${stars}</div>
      <div class="testi-text">${fEsc(text)}</div>
      <div class="testi-person">
        ${t.photo ? `<img class="testi-avatar" src="${fEsc(t.photo)}" alt="${fEsc(t.name)}" loading="lazy">` : `<div class="testi-avatar">${fEsc(initials)}</div>`}
        <div>
          <div class="testi-name">${fEsc(t.name)}</div>
          <div class="testi-role">${fEsc(role || '')}</div>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════
   6) RESUME DOWNLOAD BUTTON
   ══════════════════════════════════════════════ */
function initResumeDownloadButton() {
  const btn = document.getElementById('cv-download-btn');
  if (!btn) return;
  const cv = (window.SiteData.config && window.SiteData.config.cv) || '';
  const L = fLang();
  if (cv) {
    btn.setAttribute('href', cv);
    btn.setAttribute('download', '');
    btn.removeAttribute('data-cv-missing');
    btn.title = '';
  } else {
    btn.setAttribute('href', '#');
    btn.setAttribute('data-cv-missing', '1');
    btn.title = L === 'fa'
      ? 'فایل رزومه هنوز تنظیم نشده — فیلد cv در js/data/site-config.js را پر کنید'
      : 'Resume file not set yet — fill the "cv" field in js/data/site-config.js';
  }
}

/* ══════════════════════════════════════════════
   7) BOOKING VIA CALENDLY (اختیاری)
   اگه calendlyUrl توی site-config.js پر بشه، جای فرم رزرو
   نمایشی فعلی رو یه Calendly embed واقعی می‌گیره.
   اگه خالی بمونه، همون فرم نمایشی فعلی دست‌نخورده می‌مونه.
   ══════════════════════════════════════════════ */
function initBookingCalendly() {
  const url = window.SiteData.config && window.SiteData.config.calendlyUrl;
  const wrap = document.querySelector('#booking .booking-wrap');
  if (!url || !wrap || wrap.dataset.calendlyApplied) return;
  wrap.dataset.calendlyApplied = '1';
  const L = fLang();
  wrap.innerHTML = `
    <div class="calendly-fallback-note"><i class="fa-solid fa-circle-info"></i>
      <span>${L === 'fa' ? 'این بخش مستقیم به تقویم Calendly وصله — بدون نیاز به بک‌اند.' : 'This section is powered directly by Calendly — no backend required.'}</span>
    </div>
    <div class="calendly-embed-wrap">
      <iframe src="${fEsc(url)}" width="100%" height="700" frameborder="0" title="Book a meeting"></iframe>
    </div>`;
}

/* ══════════════════════════════════════════════
   8) SERVICE WORKER REGISTRATION (PWA / آفلاین)
   ══════════════════════════════════════════════ */
function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

/* ══════════════════════════════════════════════
   LANGUAGE CHANGE HOOK — رفرش متن ویژگی‌های جدید
   وقتی زبان سایت با دکمه‌ی بالای نویگیشن عوض می‌شه
   ══════════════════════════════════════════════ */
function refreshFeatureTexts() {
  const L = fLang();
  const extrasBtn = document.getElementById('nav-extras-btn');
  if (extrasBtn) extrasBtn.title = L === 'fa' ? 'جستجو و تم' : 'Search & theme';
  const searchRow = document.getElementById('extras-search-row');
  if (searchRow) {
    const span = searchRow.querySelector('span');
    if (span) span.textContent = L === 'fa' ? 'جستجو' : 'Search';
  }
  const input = document.getElementById('global-search-input');
  if (input) input.placeholder = L === 'fa' ? 'جستجو در پروژه‌ها، کد و بلاگ…' : 'Search projects, code, blog posts…';
  renderTestimonialsToPage();
  initProjectFilters();
  initResumeDownloadButton();
  initBookingCalendly();
}

function patchLangChangeHandlers() {
  if (typeof toggleLang !== 'function' || window._langPatched) return;
  window._langPatched = true;
  const orig = window.toggleLang;
  window.toggleLang = function() {
    orig();
    refreshFeatureTexts();
  };
}

/* ══════════════════════════════════════════════
   INIT — راه‌اندازی همه‌ی ویژگی‌های جدید
   ══════════════════════════════════════════════ */
function initAllFeatures() {
  try { initScrollReveal(); } catch (e) {}
  try { initNavExtrasMenu(); } catch (e) {}
  try { initSearchKeyboardShortcut(); } catch (e) {}
  try { initProjectFilters(); } catch (e) {}
  try { patchProjectCarouselDetailsButton(); } catch (e) {}
  try { renderTestimonialsToPage(); } catch (e) {}
  try { initResumeDownloadButton(); } catch (e) {}
  try { initBookingCalendly(); } catch (e) {}
  try { patchLangChangeHandlers(); } catch (e) {}
  try { registerServiceWorker(); } catch (e) {}
}

document.addEventListener('DOMContentLoaded', initAllFeatures);
