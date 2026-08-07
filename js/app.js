// ══════════════════════════════════════════════
//  UI TOAST (small confirmation messages)
// پیام‌های کوچک تأیید روی صفحه
// ══════════════════════════════════════════════
let _toastTimer = null;

// یک پیام کوچک اعلان (Toast) رو نمایش می‌ده
function showToast(msg) {
  const t = document.getElementById('toast-msg');
  if (!t) return;
  if (_toastTimer) {
    clearTimeout(_toastTimer);
    _toastTimer = null;
  }
  t.textContent = msg;
  t.classList.remove('show');
  void t.offsetWidth;
  t.classList.add('show');
  _toastTimer = setTimeout(() => {
    t.classList.remove('show');
    _toastTimer = null;
  }, 2800);
}

// پیام اعلان رو مخفی می‌کنه
function hideToast() {
  const t = document.getElementById('toast-msg');
  if (!t) return;
  if (_toastTimer) {
    clearTimeout(_toastTimer);
    _toastTimer = null;
  }
  t.classList.remove('show');
}

// ══════════════════════════════════════════════
//  PAGE RENDERING — everything below reads straight
//  from the js/data/*.js files (window.SiteData).
//  To change site content, edit those files only.
// رندر صفحه — همه‌چیز مستقیماً از فایل‌های js/data
//  خونده می‌شه. برای تغییر محتوا فقط همون فایل‌ها رو ویرایش کن.
// ══════════════════════════════════════════════

// ── Skills ──────────────────────────────────
// مهارت‌ها
// لیست مهارت‌ها رو از فایل داده برمی‌گردونه
function defaultSkills() {
  return window.SiteData.skills || [];
}

// آیکون پیش‌فرض وقتی برای یه مهارت آیکون مشخص نشده باشه
const DEFAULT_SKILL_ICON = 'fa-solid fa-microchip';

// مهارت‌ها رو کاملاً از روی داده می‌سازه (کارت‌ها فقط از skills.js خونده می‌شن)
function renderSkillsToPage(skills) {
  const grid = document.getElementById('skills-grid');
  if (!grid) return false;
  grid.innerHTML = skills.map(s => `<div class="sk">
      <div class="sk-head">
        <div class="ski"><i class="${s.icon || DEFAULT_SKILL_ICON}"></i></div>
        <div>
          <div class="sk-name">${s.name || ''}</div>
          ${s.cat ? `<div class="sk-cat">${s.cat}</div>` : ''}
        </div>
      </div>
      <div class="sb-wrap">
        <div class="sb-lbl" style="justify-content:flex-end"><span>${s.pct}%</span></div>
        <div class="sb-bg"><div class="sb-fill" style="width:${s.pct}%"></div></div>
      </div>
    </div>`).join('');
  renderSkillRadar(skills);
  return true;
}

// ── Dynamic Skill Radar (auto-rebuilt from live skills data) ──
// نمودار راداری مهارت‌ها (خودکار)
// نمودار راداری مهارت‌ها رو رسم می‌کنه
function renderSkillRadar(skills) {
  const wrap = document.getElementById('skill-radar-wrap');
  if (!wrap) return;
  const list = (skills && skills.length ? skills : defaultSkills()).slice(0, 8);
  const n = list.length;
  if (n < 3) {
    wrap.innerHTML = '';
    return;
  }
  const cx = 160,
    cy = 150,
    R = 98;
  const ang = i => -Math.PI / 2 + i * (2 * Math.PI / n);
  const ringPts = p => list.map((s, i) => {
    const a = ang(i),
      r = R * p;
    return (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1)
  }).join(' ');
  const grid = [1, 0.68, 0.36].map(p => `<polygon points="${ringPts(p)}" fill="none" stroke="rgba(255,122,26,.12)" stroke-width="1"/>`).join('');
  const axes = list.map((s, i) => {
    const a = ang(i);
    return `<line x1="${cx}" y1="${cy}" x2="${(cx+R*Math.cos(a)).toFixed(1)}" y2="${(cy+R*Math.sin(a)).toFixed(1)}" stroke="rgba(255,122,26,.1)" stroke-width="1"/>`
  }).join('');
  const pts = list.map((s, i) => {
    const a = ang(i),
      r = R * (Math.max(0, Math.min(100, Number(s.pct) || 0)) / 100);
    return {
      x: cx + r * Math.cos(a),
      y: cy + r * Math.sin(a)
    }
  });
  const poly = pts.map(p => p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' ');
  const dotColors = ['#FF7A1A', '#35C7C2', '#7FE8A4', '#FFC857', '#B34700', '#FF7A1A', '#35C7C2', '#7FE8A4'];
  const dots = pts.map((p, i) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="${dotColors[i%dotColors.length]}"/>`).join('');
  const labels = list.map((s, i) => {
    const a = ang(i),
      lx = cx + (R + 26) * Math.cos(a),
      ly = cy + (R + 26) * Math.sin(a);
    let anchor = 'middle';
    if (Math.cos(a) > 0.25) anchor = 'start';
    else if (Math.cos(a) < -0.25) anchor = 'end';
    const nm = (s.name || '').length > 13 ? (s.name || '').slice(0, 12) + '…' : (s.name || '');
    return `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}">${nm} ${s.pct}%</text>`;
  }).join('');
  wrap.innerHTML = `<svg class="radar-svg" viewBox="0 0 320 300" width="320" height="300" xmlns="http://www.w3.org/2000/svg">
    ${grid}${axes}
    <polygon id="radar-data" points="${poly}" fill="rgba(255,122,26,.18)" stroke="url(#radarGrad)" stroke-width="2.5" stroke-linejoin="round" style="transition:all 1s cubic-bezier(.4,0,.2,1)"/>
    <defs><linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF7A1A"/><stop offset="100%" stop-color="#FFC857"/></linearGradient></defs>
    ${dots}${labels}
  </svg>`;
}

// ── Projects ────────────────────────────────
// پروژه‌ها
// لیست پروژه‌ها رو از فایل داده برمی‌گردونه
function defaultProjects() {
  return window.SiteData.projects || [];
}

// چرخ‌فلک دایره‌ای پروژه‌ها روی صفحه اصلی
let pcarProjects = [];
let pcarIndex = 0;
let pcarAutoTimer = null;
let pcarNavBound = false;

function renderProjectsToPage(projs) {
  const stage = document.getElementById('pcar-stage');
  if (!stage) return false;
  pcarProjects = projs;
  if (pcarIndex >= projs.length) pcarIndex = 0;

  stage.innerHTML = projs.map((p, i) => `
      <div class="pcar-item" data-idx="${i}" style="background:${p.gradient}">
        ${p.image ? `<img src="${p.image}" alt="${(p.titleEn || '').replace(/"/g, '&quot;')}" loading="lazy">` : `<i class="${p.icon}"></i>`}
        ${p.featured?`<span class="pfeat" data-en="Featured" data-fa="ویژه">Featured</span>`:''}
      </div>`).join('');
  stage.querySelectorAll('.pcar-item').forEach(item => {
    item.addEventListener('click', () => pcarGoTo(parseInt(item.dataset.idx, 10)));
  });

  pcarRenderDots();
  pcarLayout();
  pcarUpdateInfo();
  pcarBindNav();
  pcarStartAutoplay();
  return true;
}

// چیدمان دایره‌ای آیتم‌ها بر اساس فاصله از آیتم فعال
function pcarLayout() {
  const n = pcarProjects.length;
  document.querySelectorAll('.pcar-item').forEach(item => {
    const i = parseInt(item.dataset.idx, 10);
    let diff = i - pcarIndex;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    item.classList.remove('active', 'side-l1', 'side-r1', 'side-l2', 'side-r2', 'hidden-item');
    if (diff === 0) item.classList.add('active');
    else if (diff === 1) item.classList.add('side-r1');
    else if (diff === -1) item.classList.add('side-l1');
    else if (diff === 2) item.classList.add('side-r2');
    else if (diff === -2) item.classList.add('side-l2');
    else item.classList.add('hidden-item');
  });
  const dots = document.querySelectorAll('.pcar-dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === pcarIndex));
}

// اطلاعات پروژه فعال (عنوان، توضیح، تگ‌ها، لینک‌ها) رو در پنل زیر چرخ‌فلک نشون می‌ده
function pcarUpdateInfo() {
  const p = pcarProjects[pcarIndex];
  if (!p) return;
  const L = (typeof lang !== 'undefined' && lang === 'fa') ? 'fa' : 'en';

  // retrigger the staggered fade/slide-in animation on the text panel
  const infoEl = document.querySelector('.pcar-info');
  if (infoEl) {
    infoEl.classList.remove('pcar-anim');
    void infoEl.offsetWidth; // force reflow so the animation restarts
    infoEl.classList.add('pcar-anim');
  }

  const catEl = document.getElementById('pcar-cat');
  if (catEl) catEl.textContent = p.cat;

  const titleEl = document.getElementById('pcar-title');
  if (titleEl) {
    titleEl.dataset.en = p.titleEn;
    titleEl.dataset.fa = p.titleFa;
    titleEl.textContent = L === 'fa' ? p.titleFa : p.titleEn;
  }

  const descEl = document.getElementById('pcar-desc');
  if (descEl) {
    descEl.dataset.en = p.descEn;
    descEl.dataset.fa = p.descFa;
    descEl.textContent = L === 'fa' ? p.descFa : p.descEn;
  }

  const tagsEl = document.getElementById('pcar-tags');
  if (tagsEl) tagsEl.innerHTML = p.tags.split(',').map(t => `<span class="tag">${t.trim()}</span>`).join('');

  const linksEl = document.getElementById('pcar-links');
  if (linksEl) {
    const esc = s => (s || '').replace(/'/g, "\\'");
    linksEl.innerHTML =
      (p.github ? `<a href="${p.github}" class="plink"><i class="fab fa-github"></i> GitHub</a>` : '') +
      (p.demo ? `<a href="${p.demo}" class="plink"><i class="fa-solid fa-eye"></i> Demo</a>` : '') +
      (p.video ? `<a href="javascript:void(0)" class="plink" onclick="openProjectVideo('${esc(p.video)}','${esc(L === 'fa' ? p.titleFa : p.titleEn)}')"><i class="fa-solid fa-circle-play"></i> ${L === 'fa' ? 'ویدیو' : 'Video'}</a>` : '');
  }
}

function pcarRenderDots() {
  const dots = document.getElementById('pcar-dots');
  if (!dots) return;
  dots.innerHTML = pcarProjects.map((_, i) => `<span class="pcar-dot${i === pcarIndex ? ' active' : ''}" data-idx="${i}"></span>`).join('');
  dots.querySelectorAll('.pcar-dot').forEach(d => {
    d.addEventListener('click', () => pcarGoTo(parseInt(d.dataset.idx, 10)));
  });
}

function pcarGoTo(i) {
  pcarIndex = ((i % pcarProjects.length) + pcarProjects.length) % pcarProjects.length;
  pcarLayout();
  pcarUpdateInfo();
  pcarStartAutoplay();
}

function pcarNext() {
  pcarGoTo(pcarIndex + 1);
}

function pcarPrev() {
  pcarGoTo(pcarIndex - 1);
}

function pcarBindNav() {
  if (pcarNavBound) return;
  const prev = document.getElementById('pcar-prev');
  const next = document.getElementById('pcar-next');
  const carousel = document.getElementById('proj-carousel');
  if (prev) prev.addEventListener('click', pcarPrev);
  if (next) next.addEventListener('click', pcarNext);
  if (carousel) {
    carousel.addEventListener('mouseenter', pcarStopAutoplay);
    carousel.addEventListener('mouseleave', pcarStartAutoplay);
  }
  pcarNavBound = true;
}

function pcarStartAutoplay() {
  pcarStopAutoplay();
  if (pcarProjects.length < 2) return;
  pcarAutoTimer = setInterval(() => {
    pcarIndex = (pcarIndex + 1) % pcarProjects.length;
    pcarLayout();
    pcarUpdateInfo();
  }, 4500);
}

function pcarStopAutoplay() {
  if (pcarAutoTimer) {
    clearInterval(pcarAutoTimer);
    pcarAutoTimer = null;
  }
}

// ── Achievements / Badges ──────────────────
// افتخارات و مدال‌ها
// لیست افتخارات/مدال‌ها رو از فایل داده برمی‌گردونه
function defaultAchievements() {
  return window.SiteData.achievements || [];
}

// کارت‌های افتخارات رو روی صفحه اصلی می‌سازه
function renderAchievementsToPage(achs) {
  const grid = document.getElementById('ach-grid');
  if (!grid) return false;
  const isFA = document.body.classList.contains('rtl');
  grid.innerHTML = achs.map(a => {
    const locked = a.pct < 100;
    const iconInner = a.image ?
      `<img src="${a.image}" alt="${(a.nameEn || '').replace(/"/g, '&quot;')}" loading="lazy">` :
      `<i class="${a.icon}"></i>`;
    return `<div class="ach-card${locked?' locked':''}" style="--ach-c:${a.color||'#FF7A1A'}">
      ${locked?'<i class="fa-solid fa-lock ach-lock-ico"></i>':''}
      <div class="ach-icon">${iconInner}</div>
      <div class="ach-name">${isFA?(a.nameFa||a.nameEn):a.nameEn}</div>
      <div class="ach-desc">${isFA?(a.descFa||a.descEn||''):(a.descEn||'')}</div>
      <div class="ach-bar-bg"><div class="ach-bar-fill" style="width:${a.pct}%"></div></div>
      <span class="ach-pct">${a.pct}%</span>
    </div>`;
  }).join('');
  return true;
}

// ── Latest Posts (Blog) ─────────────────────
// آخرین مقالات
// لیست پست‌های بلاگ رو از فایل داده برمی‌گردونه
function defaultBlogPosts() {
  return window.SiteData.blogPosts || [];
}

// کارت‌های آخرین مقالات رو کاملاً از روی داده می‌سازه
function renderBlogPostsToPage(posts) {
  const grid = document.getElementById('blog-grid');
  if (!grid) return false;
  const isFA = document.body.classList.contains('rtl');
  const esc = s => (s || '').replace(/'/g, "\\'");
  grid.innerHTML = posts.map(p => {
    const color = p.color || '#FF7A1A';
    const cover = p.image ?
      `<img src="${p.image}" alt="${(p.titleEn || '').replace(/"/g, '&quot;')}" loading="lazy" style="width:100%;height:100%;object-fit:cover">` :
      `<i class="${p.icon || 'fa-solid fa-file-lines'}" style="font-size:2.5rem;color:${color}"></i>`;
    const cat = isFA ? (p.catFa || p.catEn || '') : (p.catEn || '');
    const title = isFA ? (p.titleFa || p.titleEn || '') : (p.titleEn || '');
    const excerpt = isFA ? (p.excerptFa || p.excerptEn || '') : (p.excerptEn || '');
    const readTime = isFA ? (p.readTimeFa || p.readTimeEn || '') : (p.readTimeEn || '');
    const clickAttr = p.url ? ` onclick="window.open('${esc(p.url)}','_blank','noopener')" style="cursor:pointer"` : '';
    return `<div class="blog-card"${clickAttr}>
      <div class="blog-img" style="background:linear-gradient(135deg,#0D1319,#0d1b3e)">
        ${cover}
        <span class="blog-cat" style="background:${color}">${cat}</span>
      </div>
      <div class="blog-body">
        <div class="blog-title">${title}</div>
        <div class="blog-excerpt">${excerpt}</div>
        <div class="blog-meta"><span>${p.date || ''}</span><span class="read-time"><i class="fa-regular fa-clock"></i> ${readTime}</span></div>
      </div>
    </div>`;
  }).join('');
  return true;
}

// ── Latest Activity ─────────────────────────
// آخرین فعالیت‌ها
// لیست فعالیت‌ها رو از فایل داده برمی‌گردونه
function defaultLatestActivity() {
  return window.SiteData.latestActivity || [];
}

// خط‌های آخرین فعالیت‌ها رو کاملاً از روی داده می‌سازه
function renderLatestActivityToPage(items) {
  const list = document.getElementById('activity-feed-list');
  if (!list) return false;
  const isFA = document.body.classList.contains('rtl');
  list.innerHTML = items.map(a => {
    const title = isFA ? (a.titleFa || a.titleEn || '') : (a.titleEn || '');
    const meta = isFA ? (a.metaFa || a.metaEn || '') : (a.metaEn || '');
    const badge = isFA ? (a.badgeFa || a.badgeEn || '') : (a.badgeEn || '');
    return `<div class="fi">
      <div class="fi-ico"${a.color ? ` style="color:${a.color}"` : ''}><i class="${a.icon || 'fa-solid fa-circle-info'}"></i></div>
      <div class="fi-body"><div class="fi-title">${title}</div><div class="fi-meta">${meta}</div></div>
      <span class="fi-badge ${a.badgeClass || 'b-act'}">${badge}</span>
    </div>`;
  }).join('');
  return true;
}

// ── مسیر من (My Journey) + رزومه (Education/Experience) ──
// این سه لیست از فایل js/data/journey-resume.js خونده می‌شن
function defaultJourney() {
  return window.SiteData.journey || [];
}
function defaultResumeEducation() {
  return window.SiteData.resumeEducation || [];
}
function defaultResumeExperience() {
  return window.SiteData.resumeExperience || [];
}

// یه لیست تایم‌لاین رو توی یه ظرف با id مشخص رندر می‌کنه
function renderTimelineList(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return false;
  const isFA = document.body.classList.contains('rtl');
  el.innerHTML = (items || []).map(t => {
    const date = isFA ? (t.dateFa || t.date || '') : (t.date || '');
    const title = isFA ? (t.titleFa || t.titleEn || '') : (t.titleEn || '');
    const sub = isFA ? (t.subFa || t.subEn || '') : (t.subEn || '');
    return `<div class="tl-item"><div class="tl-dot"></div><div class="tl-date">${date}</div><div class="tl-title">${title}</div><div class="tl-sub">${sub}</div></div>`;
  }).join('');
  return true;
}

function renderJourneyAndResumeToPage() {
  renderTimelineList('journey-timeline-list', defaultJourney());
  renderTimelineList('resume-education-list', defaultResumeEducation());
  renderTimelineList('resume-experience-list', defaultResumeExperience());
}

// ── Skills & Experience ──────────────────────
// مهارت‌ها و تجربه (تب‌های: ابزار و فناوری / تایم‌لاین / گواهی‌نامه‌ها)
// داده‌ی این بخش رو از فایل داده برمی‌گردونه
function defaultExperience() {
  return window.SiteData.experience || { tools: [], timeline: [], certs: [] };
}

// هر سه تب بخش «مهارت‌ها و تجربه» رو کاملاً از روی داده می‌سازه
function renderExperienceToPage(exp) {
  const isFA = document.body.classList.contains('rtl');

  const toolsGrid = document.getElementById('exp-tools-grid');
  if (toolsGrid) {
    toolsGrid.innerHTML = (exp.tools || []).map((t, i) => {
      const title = isFA ? (t.titleFa || t.titleEn || '') : (t.titleEn || '');
      const desc = isFA ? (t.descFa || t.descEn || '') : (t.descEn || '');
      return `<div class="exp-card reveal stagger-${(i % 6) + 1}">
        <div class="exp-icon"${t.color ? ` style="color:${t.color}"` : ''}><i class="${t.icon || 'fa-solid fa-wrench'}"></i></div>
        <h4>${title}</h4><p>${desc}</p>
      </div>`;
    }).join('');
  }

  const tlList = document.getElementById('exp-timeline-list');
  if (tlList) {
    tlList.innerHTML = (exp.timeline || []).map(t => {
      const title = isFA ? (t.titleFa || t.titleEn || '') : (t.titleEn || '');
      const sub = isFA ? (t.subFa || t.subEn || '') : (t.subEn || '');
      const desc = isFA ? (t.descFa || t.descEn || '') : (t.descEn || '');
      const tags = (t.tags || '').split(',').map(s => s.trim()).filter(Boolean)
        .map(tag => `<span class="exp-tl-tag">${tag}</span>`).join('');
      return `<div class="exp-tl-item">
        <div class="exp-tl-dot"></div>
        <div class="exp-tl-header"><div class="exp-tl-title">${title}</div><span class="exp-tl-badge">${t.badge || ''}</span></div>
        <div class="exp-tl-sub">${sub}</div>
        <p style="font-size:.8rem;color:var(--tx2);line-height:1.7">${desc}</p>
        <div class="exp-tl-tags">${tags}</div>
      </div>`;
    }).join('');
  }

  const certsGrid = document.getElementById('exp-certs-grid');
  if (certsGrid) {
    certsGrid.innerHTML = (exp.certs || []).map((c, i) => {
      const title = isFA ? (c.titleFa || c.titleEn || '') : (c.titleEn || '');
      const desc = isFA ? (c.descFa || c.descEn || '') : (c.descEn || '');
      const color = c.color || '#fcd34d';
      const featStyle = c.featured ? ` style="border-color:${color}40;background:linear-gradient(135deg,${color}0D,${color}05)"` : '';
      return `<div class="exp-card reveal stagger-${(i % 6) + 1}"${featStyle}>
        <div class="exp-icon" style="color:${color};background:${color}1A;border-color:${color}33"><i class="${c.icon || 'fa-solid fa-certificate'}"></i></div>
        <h4${c.featured ? ` style="color:${color}"` : ''}>${title}</h4><p>${desc}</p>
      </div>`;
    }).join('');
  }
  return true;
}


// ویدیوها
// رنگ/آیکون/برچسب پیش‌فرض هر دسته‌بندی ویدیو (اگه توی خود آیتم ننویسی از این استفاده می‌شه)
const VIDEO_CAT_META = {
  plc: { color: '', icon: 'fa-solid fa-industry', labelEn: 'PLC', labelFa: 'PLC' },
  iot: { color: '#22C55E', icon: 'fa-solid fa-wifi', labelEn: 'IoT', labelFa: 'IoT' },
  python: { color: '#fbbf24', icon: 'fab fa-python', labelEn: 'Python', labelFa: 'پایتون' },
  esp32: { color: '#f97316', icon: 'fa-solid fa-microchip', labelEn: 'ESP32', labelFa: 'ESP32' }
};

// لیست ویدیوها رو از فایل داده برمی‌گردونه
function defaultVideos() {
  return window.SiteData.videos || [];
}

// وضعیت فعلی فیلتر/جستجو/مرتب‌سازی/صفحه‌بندیِ بخش ویدیوها
const VIDEO_PAGE_SIZE = 6;
let videoUiState = { cat: 'all', query: '', sort: 'newest', duration: 'all', visible: VIDEO_PAGE_SIZE };

// رشته‌ی نمایشی مثل '12.4K' رو به عدد قابل مقایسه تبدیل می‌کنه (برای مرتب‌سازی)
function parseCountStr(s) {
  if (s === undefined || s === null) return 0;
  const str = String(s).trim().toUpperCase();
  const m = str.match(/^([\d.]+)\s*([KM]?)/);
  if (!m) return parseFloat(str) || 0;
  let n = parseFloat(m[1]) || 0;
  if (m[2] === 'K') n *= 1e3;
  if (m[2] === 'M') n *= 1e6;
  return n;
}

// عدد رو به رشته‌ی فشرده مثل '12.4K' / '1.2M' برمی‌گردونه (عکسِ parseCountStr)
function formatCount(n) {
  n = Math.max(0, Math.round(n || 0));
  const fmt = v => { const s = v.toFixed(1); return s.endsWith('.0') ? s.slice(0, -2) : s; };
  if (n >= 1e6) return fmt(n / 1e6) + 'M';
  if (n >= 1e3) return fmt(n / 1e3) + 'K';
  return String(n);
}

// ── Real view counter (persisted in the browser) ──
// شمارنده‌ی بازدید واقعی که روی مرورگر کاربر ذخیره و به عدد نمایشی پایه اضافه می‌شه
function getVideoViewsStore() {
  try { return JSON.parse(localStorage.getItem('videoViewsV1') || '{}'); } catch (e) { return {}; }
}
function setVideoViewsStore(store) {
  try { localStorage.setItem('videoViewsV1', JSON.stringify(store)); } catch (e) {}
}
function getExtraViews(url) {
  if (!url) return 0;
  return getVideoViewsStore()[url] || 0;
}
function getTotalViewsNumber(v) {
  return parseCountStr(v.views) + getExtraViews(v.url);
}
// یه بازدید واقعی جدید رو برای این لینک ثبت می‌کنه
function registerVideoView(url) {
  if (!url) return 0;
  const store = getVideoViewsStore();
  store[url] = (store[url] || 0) + 1;
  setVideoViewsStore(store);
  return store[url];
}
// بعد از شروع پخش، شمارنده‌ی بازدید رو هم در حافظه و هم روی خودِ کارت آپدیت می‌کنه
function bumpViewUiForCard(card, video) {
  if (!video) return;
  registerVideoView(video.url);
  const el = card && card.querySelector('.vv-count');
  if (el) el.textContent = formatCount(getTotalViewsNumber(video));
}

// ── NEW badge ──
// اگه تاریخ ویدیو (dateISO یا date) به امروز نزدیک باشه (کمتر از ۱۴ روز)، برچسب «جدید» نشون داده می‌شه
function isVideoNew(v) {
  const raw = v.dateISO || v.date;
  if (!raw) return false;
  const t = Date.parse(raw);
  if (isNaN(t)) return false;
  const diffDays = (Date.now() - t) / 86400000;
  return diffDays > -2 && diffDays <= 14;
}

// ── Duration filter (short / medium / long) ──
// رشته‌ی مدت زمان مثل '3:42' یا '1:02:10' رو به ثانیه تبدیل می‌کنه
function durationToSeconds(dur) {
  if (!dur) return 0;
  const parts = String(dur).trim().split(':').map(s => parseInt(s, 10));
  if (!parts.length || parts.some(n => isNaN(n))) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] || 0;
}
// دسته مدت‌زمان رو برمی‌گردونه: short (زیر ۵ دقیقه) / medium (۵ تا ۲۰ دقیقه) / long (بالای ۲۰ دقیقه)
function getDurationCategory(dur) {
  const s = durationToSeconds(dur);
  if (s <= 0) return 'unknown';
  if (s < 300) return 'short';
  if (s <= 1200) return 'medium';
  return 'long';
}

// لیست ویدیوها رو بر اساس دسته‌بندی فعلی، متن جستجو، فیلتر مدت‌زمان و نوع مرتب‌سازی فیلتر می‌کنه
function getFilteredSortedVideos() {
  const isFA = document.body.classList.contains('rtl');
  let list = defaultVideos().slice();
  if (videoUiState.cat !== 'all') list = list.filter(v => (v.cat || '') === videoUiState.cat);
  if (videoUiState.duration && videoUiState.duration !== 'all') list = list.filter(v => getDurationCategory(v.dur) === videoUiState.duration);
  const q = videoUiState.query.trim().toLowerCase();
  if (q) {
    list = list.filter(v => {
      const t = (isFA ? (v.titleFa || v.title) : (v.titleEn || v.title) || '').toLowerCase();
      const d = (isFA ? (v.descFa || v.desc) : (v.descEn || v.desc) || '').toLowerCase();
      return t.indexOf(q) !== -1 || d.indexOf(q) !== -1;
    });
  }
  if (videoUiState.sort === 'views') list.sort((a, b) => getTotalViewsNumber(b) - getTotalViewsNumber(a));
  else if (videoUiState.sort === 'likes') list.sort((a, b) => parseCountStr(b.likes) - parseCountStr(a.likes));
  return list;
}

// ── Video likes (persisted in the browser) ──
// لایک واقعی ویدیو که توی مرورگر کاربر ذخیره می‌مونه
function getVideoLikesStore() {
  try { return JSON.parse(localStorage.getItem('videoLikesV1') || '{}'); } catch (e) { return {}; }
}
function setVideoLikesStore(store) {
  try { localStorage.setItem('videoLikesV1', JSON.stringify(store)); } catch (e) {}
}
function isVideoLiked(url) {
  return !!(url && getVideoLikesStore()[url]);
}

// ── Watch Later (persisted in the browser) ──
function getWatchLaterStore() {
  try { return JSON.parse(localStorage.getItem('watchLaterV1') || '{}'); } catch (e) { return {}; }
}
function setWatchLaterStore(store) {
  try { localStorage.setItem('watchLaterV1', JSON.stringify(store)); } catch (e) {}
}
function isInWatchLater(url) {
  return !!(url && getWatchLaterStore()[url]);
}
// لیست «بعداً ببین» رو (ذخیره‌شده در مرورگر) toggle می‌کنه
function toggleWatchLaterBtn(btn) {
  const url = btn.dataset.url;
  if (!url) return;
  const store = getWatchLaterStore();
  store[url] = !store[url];
  setWatchLaterStore(store);
  btn.classList.toggle('active', !!store[url]);
  const icon = btn.querySelector('i');
  if (icon) icon.className = store[url] ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
}

// ── Watched badge (وقتی ویدیو کامل تا انتها پخش بشه) ──
function getWatchedStore() {
  try { return JSON.parse(localStorage.getItem('watchedVideosV1') || '[]'); } catch (e) { return []; }
}
function setWatchedStore(list) {
  try { localStorage.setItem('watchedVideosV1', JSON.stringify(list)); } catch (e) {}
}
function isVideoWatched(url) {
  return !!url && getWatchedStore().indexOf(url) !== -1;
}
// یه ویدیو رو «دیده‌شده» علامت می‌زنه، برچسبش رو (اگه کارتش توی صفحه باشه) زنده آپدیت می‌کنه، و پنل آمار رو دوباره می‌سازه
function markVideoWatched(url) {
  if (!url) return;
  const list = getWatchedStore();
  if (list.indexOf(url) === -1) {
    list.push(url);
    setWatchedStore(list);
  }
  const isFA = document.body.classList.contains('rtl');
  document.querySelectorAll('.video-card[data-vurl]').forEach(c => {
    if (c.dataset.vurl !== url || c.querySelector('.video-watched-badge')) return;
    const thumbWrap = c.querySelector('.video-thumb-wrap');
    if (!thumbWrap) return;
    const b = document.createElement('span');
    b.className = 'video-watched-badge';
    b.innerHTML = `<i class="fa-solid fa-check"></i> ${isFA ? 'دیده شده' : 'Watched'}`;
    thumbWrap.appendChild(b);
  });
  renderWatchStatsPanel();
}

// ── پنل کوچیک «آمار تماشای من» (از روی داده‌های ذخیره‌شده در مرورگر) ──
function renderWatchStatsPanel() {
  const el = document.getElementById('video-watch-stats');
  if (!el) return;
  const isFA = document.body.classList.contains('rtl');
  const watchedUrls = getWatchedStore();
  const vids = defaultVideos().filter(v => watchedUrls.indexOf(v.url) !== -1);
  if (!vids.length) {
    el.style.display = 'none';
    el.innerHTML = '';
    return;
  }
  const totalSec = vids.reduce((s, v) => s + durationToSeconds(v.dur), 0);
  const mins = Math.max(1, Math.round(totalSec / 60));
  el.style.display = 'flex';
  el.innerHTML = `<i class="fa-solid fa-chart-simple"></i>` +
    `<span>${isFA ? `${vids.length} ویدیو دیده‌ای` : `${vids.length} video${vids.length === 1 ? '' : 's'} watched`}</span>` +
    `<span class="vws-dot">·</span>` +
    `<span>${isFA ? `حدود ${mins} دقیقه` : `~${mins} min`}</span>`;
}
// لایک/آنلایک یه ویدیو رو ذخیره و روی دکمه اعمال می‌کنه
function toggleVideoLikeBtn(btn) {
  const url = btn.dataset.url;
  if (!url) return;
  const store = getVideoLikesStore();
  store[url] = !store[url];
  setVideoLikesStore(store);
  btn.classList.toggle('active', !!store[url]);
  const icon = btn.querySelector('i');
  if (icon) icon.className = store[url] ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
}

// لینک ویدیو رو کپی می‌کنه (اشتراک‌گذاری)
function shareVideoLink(btn) {
  const url = btn.dataset.url;
  if (!url) return;
  const isFA = document.body.classList.contains('rtl');
  const span = btn.querySelector('span');
  const original = span ? span.textContent : '';
  const showDone = () => {
    if (!span) return;
    span.textContent = isFA ? 'کپی شد!' : 'Copied!';
    setTimeout(() => { span.textContent = original; }, 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(showDone).catch(() => prompt(isFA ? 'کپی کن:' : 'Copy this link:', url));
  } else {
    prompt(isFA ? 'کپی کن:' : 'Copy this link:', url);
  }
}

// یه ویدیو رو از روی لینکش توی داده پیدا می‌کنه
function findVideoByUrl(url) {
  return defaultVideos().find(v => v.url === url);
}

// ── Recently Watched (persisted in the browser) ──
// تاریخچه‌ی آخرین ویدیوهایی که کاربر پخش کرده، توی مرورگرش ذخیره می‌مونه
const RECENTLY_WATCHED_KEY = 'recentlyWatchedV1';
const RECENTLY_WATCHED_MAX = 10;
function getRecentlyWatched() {
  try { return JSON.parse(localStorage.getItem(RECENTLY_WATCHED_KEY) || '[]'); } catch (e) { return []; }
}
function setRecentlyWatched(list) {
  try { localStorage.setItem(RECENTLY_WATCHED_KEY, JSON.stringify(list)); } catch (e) {}
}
// یه ویدیو رو به اول تاریخچه‌ی «اخیراً دیده‌شده» اضافه می‌کنه و نوار بالای گرید رو دوباره می‌سازه
function addRecentlyWatched(url) {
  if (!url) return;
  let list = getRecentlyWatched().filter(u => u !== url);
  list.unshift(url);
  if (list.length > RECENTLY_WATCHED_MAX) list = list.slice(0, RECENTLY_WATCHED_MAX);
  setRecentlyWatched(list);
  renderRecentlyWatchedRow();
}
// نوار کوچیک «اخیراً دیده‌شده» رو بالای گرید ویدیوها می‌سازه
function renderRecentlyWatchedRow() {
  const wrap = document.getElementById('recently-watched-row');
  if (!wrap) return;
  const isFA = document.body.classList.contains('rtl');
  const esc = s => (s || '').replace(/'/g, "\\'");
  const items = getRecentlyWatched().map(u => findVideoByUrl(u)).filter(Boolean);
  if (!items.length) { wrap.innerHTML = ''; wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  const label = isFA ? 'اخیراً دیده‌شده' : 'Recently watched';
  wrap.innerHTML = `<div class="rw-label">${label}</div><div class="rw-strip">` + items.map(v => {
    const title = isFA ? (v.titleFa || v.titleEn || '') : (v.titleEn || v.titleFa || '');
    const meta = VIDEO_CAT_META[v.cat] || {};
    const icon = v.icon || meta.icon || 'fa-solid fa-video';
    const thumb = v.image ?
      `<img src="${v.image}" alt="">` :
      `<div class="rw-thumb-icon"><i class="${icon}"></i></div>`;
    return `<button class="rw-item" onclick="jumpToVideoFromHistory('${esc(v.url)}')">${thumb}<span>${(title || '').replace(/</g, '&lt;')}</span></button>`;
  }).join('') + `</div>`;
}
// روی یه آیتم تاریخچه کلیک می‌شه: فیلترها ریست می‌شن، تا اون ویدیو اسکرول و پخش می‌شه
function jumpToVideoFromHistory(url) {
  videoUiState.cat = 'all';
  videoUiState.query = '';
  videoUiState.duration = 'all';
  const searchInput = document.getElementById('video-search-input');
  if (searchInput) searchInput.value = '';
  const durSelect = document.getElementById('video-duration-select');
  if (durSelect) durSelect.value = 'all';
  const filtered = getFilteredSortedVideos();
  const idx = filtered.findIndex(v => v.url === url);
  if (idx === -1) return;
  videoUiState.visible = Math.max(videoUiState.visible, idx + 1);
  renderVideosToPage();
  requestAnimationFrame(() => {
    let card = null;
    try { card = document.querySelector(`.video-card[data-vurl="${CSS.escape(url)}"]`); } catch (e) {}
    if (!card) card = Array.from(document.querySelectorAll('.video-card')).find(c => c.dataset.vurl === url);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => playVideo(card, url), 350);
    }
  });
}

// نوار «ویدیوهای مرتبط» زیر پخش‌کننده رو می‌سازه (بر اساس دسته‌بندی یکسان)
function renderRelatedStrip(card, currentVideo) {
  const wrap = card.querySelector('.video-related-strip');
  if (!wrap) return;
  const isFA = document.body.classList.contains('rtl');
  const esc = s => (s || '').replace(/'/g, "\\'");
  const related = defaultVideos().filter(v => v.cat === currentVideo.cat && v.url !== currentVideo.url).slice(0, 3);
  if (!related.length) { wrap.innerHTML = ''; return; }
  const label = isFA ? 'ویدیوهای مرتبط' : 'Related videos';
  wrap.innerHTML = `<div class="video-related-label">${label}</div>` + related.map(v => {
    const title = isFA ? (v.titleFa || v.title || '') : (v.titleEn || v.title || '');
    return `<button class="video-related-item" onclick="event.stopPropagation();playRelatedVideo(this.closest('.video-card'), '${esc(v.url)}')"><span class="video-related-dot"></span>${title}</button>`;
  }).join('');
}

// یه ویدیوی مرتبط رو داخل همون کارتِ درحال پخش، جایگزین می‌کنه
function playRelatedVideo(card, url) {
  const video = findVideoByUrl(url);
  if (!video || !card) return;
  const isFA = document.body.classList.contains('rtl');
  card.dataset.vcat = video.cat || '';
  card.dataset.vurl = video.url || '';
  const titleEl = card.querySelector('.video-title');
  const descEl = card.querySelector('.video-desc');
  if (titleEl) titleEl.textContent = isFA ? (video.titleFa || video.title || '') : (video.titleEn || video.title || '');
  if (descEl) descEl.textContent = isFA ? (video.descFa || video.desc || '') : (video.descEn || video.desc || '');
  const likeBtn = card.querySelector('.vab-like');
  if (likeBtn) {
    likeBtn.dataset.url = video.url;
    const liked = isVideoLiked(video.url);
    likeBtn.classList.toggle('active', liked);
    const icon = likeBtn.querySelector('i');
    if (icon) icon.className = liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  }
  const shareBtn = card.querySelector('.vab-share');
  if (shareBtn) shareBtn.dataset.url = video.url;
  const watchLaterBtn = card.querySelector('.vab-watchlater');
  if (watchLaterBtn) {
    watchLaterBtn.dataset.url = video.url;
    const inWL = isInWatchLater(video.url);
    watchLaterBtn.classList.toggle('active', inWL);
    const wlIcon = watchLaterBtn.querySelector('i');
    if (wlIcon) wlIcon.className = inWL ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
  }
  const timestampBtn = card.querySelector('.vab-timestamp');
  if (timestampBtn) timestampBtn.dataset.url = video.url;
  const embedBtn = card.querySelector('.vab-embed');
  if (embedBtn) embedBtn.dataset.url = video.url;
  const reportBtn = card.querySelector('.vab-report');
  if (reportBtn) reportBtn.dataset.url = video.url;
  const playerWrap = card.querySelector('.video-player-wrap');
  if (playerWrap) embedIntoPlayerWrap(playerWrap, video.url, card);
  renderRelatedStrip(card, video);
  bumpViewUiForCard(card, video);
  addRecentlyWatched(video.url);
}

// ── Categories / tabs ────────────────────────
// تب‌های دسته‌بندی رو کاملاً از روی دسته‌بندی‌های موجود توی داده می‌سازه —
// اگه یه دسته‌بندی جدید توی videos.js اضافه کنی، خودش این‌جا هم اضافه می‌شه
function renderVideoTabsToPage() {
  const wrap = document.getElementById('rvtabs');
  if (!wrap) return;
  const isFA = document.body.classList.contains('rtl');
  const cats = [];
  defaultVideos().forEach(v => { if (v.cat && cats.indexOf(v.cat) === -1) cats.push(v.cat); });
  let html = `<button class="rvtab${videoUiState.cat === 'all' ? ' active' : ''}" onclick="filterVideos('all',this)">${isFA ? 'همه' : 'All'}</button>`;
  html += cats.map(cat => {
    const meta = VIDEO_CAT_META[cat] || {};
    const label = isFA ? (meta.labelFa || cat.toUpperCase()) : (meta.labelEn || cat.toUpperCase());
    return `<button class="rvtab${videoUiState.cat === cat ? ' active' : ''}" onclick="filterVideos('${cat}',this)">${label}</button>`;
  }).join('');
  wrap.innerHTML = html;
}

// ── Search / Sort / Load more ────────────────
let videoSearchDebounce = null;
function onVideoSearchInput(value) {
  videoUiState.query = value || '';
  videoUiState.visible = VIDEO_PAGE_SIZE;
  clearTimeout(videoSearchDebounce);
  videoSearchDebounce = setTimeout(() => renderVideosToPage(), 150);
}
function onVideoSortChange(value) {
  videoUiState.sort = value;
  videoUiState.visible = VIDEO_PAGE_SIZE;
  renderVideosToPage();
}
function onVideoDurationChange(value) {
  videoUiState.duration = value;
  videoUiState.visible = VIDEO_PAGE_SIZE;
  renderVideosToPage();
}
function loadMoreVideos() {
  videoUiState.visible += VIDEO_PAGE_SIZE;
  renderVideosToPage();
}


// کارت‌های ویدیو رو کاملاً از روی داده می‌سازه — تصویر بندانگشتی و خود ویدیو
// فقط از طریق لینک (url / image) تنظیم می‌شن، نیازی به آپلود فایل نیست
// یه کارت ویدیوی تکی رو از روی داده می‌سازه (شامل نوار لایک/اشتراک و جای ویدیوهای مرتبط)
function buildVideoCardHtml(v, isFA, esc) {
  const meta = VIDEO_CAT_META[v.cat] || {};
  const color = v.color || meta.color || '';
  const icon = v.icon || meta.icon || 'fa-solid fa-video';
  const title = isFA ? (v.titleFa || v.title || '') : (v.titleEn || v.title || '');
  const desc = isFA ? (v.descFa || v.desc || '') : (v.descEn || v.desc || '');
  const label = isFA ?
    (v.labelFa || v.label || meta.labelFa || (v.cat || '').toUpperCase()) :
    (v.labelEn || v.label || meta.labelEn || (v.cat || '').toUpperCase());
  const thumb = v.image ?
    `<img class="video-thumb-img" src="${v.image}" alt="${(title || '').replace(/"/g, '&quot;')}" loading="lazy">` :
    `<div class="video-thumb-icon"${color ? ` style="color:${color}"` : ''}><i class="${icon}"></i></div>`;
  const urlAttr = esc(v.url);
  const liked = isVideoLiked(v.url);
  const inWatchLater = isInWatchLater(v.url);
  const watched = isVideoWatched(v.url);
  const newBadge = isVideoNew(v) ? `<span class="video-new-badge">${isFA ? 'جدید' : 'NEW'}</span>` : '';
  const watchedBadge = watched ? `<span class="video-watched-badge"><i class="fa-solid fa-check"></i> ${isFA ? 'دیده شده' : 'Watched'}</span>` : '';
  return `<div class="video-card" data-vcat="${v.cat || ''}" data-vurl="${urlAttr}" onclick="playVideo(this,'${urlAttr}')">
    <div class="video-thumb-wrap">
      ${thumb}
      <div class="video-thumb-gradient"></div>
      <div class="video-play-overlay"><div class="video-play-btn"><i class="fa-solid fa-play" style="margin-left:3px"></i></div></div>
      <span class="video-cat-badge"${color ? ` style="background:${color}CC"` : ''}>${label}</span>
      ${newBadge}
      ${watchedBadge}
      <span class="video-duration-badge">${v.dur || ''}</span>
    </div>
    <div class="video-player-wrap"></div>
    <div class="video-related-strip"></div>
    <button class="video-close-player" onclick="event.stopPropagation();stopVideo(this)" style="display:none"><i class="fa-solid fa-xmark"></i></button>
    <div class="video-info">
      <div class="video-title">${title}</div>
      <div class="video-desc">${desc}</div>
      <div class="video-meta-row">
        <div class="video-meta-left">
          <span class="video-stat video-views-stat"><i class="fa-solid fa-eye"></i> <span class="vv-count">${formatCount(getTotalViewsNumber(v))}</span></span>
          <span class="video-stat"><i class="fa-solid fa-heart" style="color:#f87171"></i> <span class="vl-count">${v.likes || '0'}</span></span>
        </div>
        <span style="font-family:var(--mo);font-size:.65rem">${v.date || ''}</span>
      </div>
      <div class="video-actions-row">
        <button class="video-action-btn vab-like${liked ? ' active' : ''}" data-url="${urlAttr}" onclick="event.stopPropagation();toggleVideoLikeBtn(this)"><i class="fa-${liked ? 'solid' : 'regular'} fa-heart"></i><span>${isFA ? 'پسندیدم' : 'Like'}</span></button>
        <button class="video-action-btn vab-share" data-url="${urlAttr}" onclick="event.stopPropagation();shareVideoLink(this)"><i class="fa-solid fa-share-nodes"></i><span>${isFA ? 'اشتراک' : 'Share'}</span></button>
        <button class="video-action-btn icon-only vab-watchlater${inWatchLater ? ' active' : ''}" data-url="${urlAttr}" title="${isFA ? 'بعداً ببین' : 'Watch later'}" onclick="event.stopPropagation();toggleWatchLaterBtn(this)"><i class="fa-${inWatchLater ? 'solid' : 'regular'} fa-bookmark"></i></button>
        <button class="video-action-btn icon-only vab-timestamp" data-url="${urlAttr}" title="${isFA ? 'کپی زمان فعلی ویدیو' : 'Copy current timestamp'}" onclick="event.stopPropagation();copyVideoTimestamp(this)"><i class="fa-solid fa-clock"></i></button>
        <button class="video-action-btn icon-only vab-theater" title="${isFA ? 'حالت تئاتر' : 'Theater mode'}" onclick="event.stopPropagation();openTheaterMode(this.closest('.video-card'))"><i class="fa-solid fa-expand"></i></button>
        <button class="video-action-btn icon-only vab-pip" title="${isFA ? 'پخش شناور (Picture-in-Picture)' : 'Picture-in-picture'}" onclick="event.stopPropagation();toggleMiniPlayer(this.closest('.video-card'))"><i class="fa-regular fa-window-restore"></i></button>
        <button class="video-action-btn icon-only vab-embed" data-url="${urlAttr}" title="${isFA ? 'کپی کد امبد' : 'Copy embed code'}" onclick="event.stopPropagation();copyEmbedLink(this)"><i class="fa-solid fa-code"></i></button>
        <button class="video-action-btn icon-only vab-report" data-url="${urlAttr}" title="${isFA ? 'گزارش لینک خراب' : 'Report broken link'}" onclick="event.stopPropagation();reportBrokenVideo(this)"><i class="fa-solid fa-triangle-exclamation"></i></button>
      </div>
    </div>
  </div>`;
}

// کارت‌های ویدیو رو کاملاً از روی داده می‌سازه — فیلتر دسته‌بندی، جستجو، مرتب‌سازی
// و صفحه‌بندی (نمایش بیشتر) رو هم اعمال می‌کنه. تصویر بندانگشتی و خود ویدیو
// فقط از طریق لینک (url / image) تنظیم می‌شن، نیازی به آپلود فایل نیست
function renderVideosToPage() {
  const grid = document.getElementById('videos-grid');
  if (!grid) return false;
  const isFA = document.body.classList.contains('rtl');
  const esc = s => (s || '').replace(/'/g, "\\'");

  renderVideoTabsToPage();
  renderRecentlyWatchedRow();
  renderWatchStatsPanel();

  const filtered = getFilteredSortedVideos();
  const visible = filtered.slice(0, videoUiState.visible);

  grid.innerHTML = visible.length ?
    visible.map(v => buildVideoCardHtml(v, isFA, esc)).join('') :
    `<div class="video-empty-msg">${isFA ? 'ویدیویی پیدا نشد.' : 'No videos found.'}</div>`;

  // اطمینان از اینکه کارت اول همیشه کامل نمایش داده می‌شه (نه نصفه)،
  // چون بعضی مرورگرهای موبایل موقعیت اسکرول اولیه رو در حالت RTL اشتباه محاسبه می‌کنن
  // (روی موبایل اسکرول عمودیه، پس scrollTop هم ریست می‌شه)
  requestAnimationFrame(() => {
    grid.scrollLeft = 0;
    grid.scrollTop = 0;
    requestAnimationFrame(() => { grid.scrollLeft = 0; grid.scrollTop = 0; });
  });

  const loadMoreBtn = document.getElementById('video-load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = filtered.length > visible.length ? 'inline-flex' : 'none';
    loadMoreBtn.textContent = isFA ? 'نمایش بیشتر' : 'Load more';
  }

  const searchInput = document.getElementById('video-search-input');
  if (searchInput) searchInput.placeholder = isFA ? 'جستجوی ویدیو…' : 'Search videos…';

  const sortSelect = document.getElementById('video-sort-select');
  if (sortSelect) {
    const optNewest = sortSelect.querySelector('option[value="newest"]');
    const optViews = sortSelect.querySelector('option[value="views"]');
    const optLikes = sortSelect.querySelector('option[value="likes"]');
    if (optNewest) optNewest.textContent = isFA ? 'جدیدترین' : 'Newest';
    if (optViews) optViews.textContent = isFA ? 'پربازدیدترین' : 'Most viewed';
    if (optLikes) optLikes.textContent = isFA ? 'پرلایک‌ترین' : 'Most liked';
    sortSelect.value = videoUiState.sort;
  }

  const durSelect = document.getElementById('video-duration-select');
  if (durSelect) {
    const optAll = durSelect.querySelector('option[value="all"]');
    const optShort = durSelect.querySelector('option[value="short"]');
    const optMedium = durSelect.querySelector('option[value="medium"]');
    const optLong = durSelect.querySelector('option[value="long"]');
    if (optAll) optAll.textContent = isFA ? 'همه مدت‌ها' : 'All lengths';
    if (optShort) optShort.textContent = isFA ? 'کوتاه (زیر ۵ دقیقه)' : 'Short (<5 min)';
    if (optMedium) optMedium.textContent = isFA ? 'متوسط (۵ تا ۲۰ دقیقه)' : 'Medium (5-20 min)';
    if (optLong) optLong.textContent = isFA ? 'بلند (بالای ۲۰ دقیقه)' : 'Long (20+ min)';
    durSelect.value = videoUiState.duration;
  }
  return true;
}

// ── Code Library ────────────────────────────
// کتابخانه کد
// لیست کدهای کتابخانه کد رو از فایل داده برمی‌گردونه
function defaultCodes() {
  return window.SiteData.codes || [];
}

// کاراکترهای خاص HTML رو برای نمایش امن کد، تبدیل می‌کنه
function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function renderCodesToPage(codes) {
  const grid = document.getElementById('code-grid');
  if (!grid) return false;
  grid.innerHTML = codes.map(c => `<div class="cc"><div class="cc-head"><div class="dots-row"><span></span><span></span><span></span></div><div class="cc-lang">${c.lang}</div><button class="cc-copy" onclick="copyCode(this)"><i class="fa-regular fa-copy"></i></button></div><pre class="cc-pre">${c.code}</pre><div class="cc-foot"><div class="cc-title" data-en="${c.titleEn}" data-fa="${c.titleFa}">${c.titleEn}</div><div class="cc-desc" data-en="${c.descEn}" data-fa="${c.descFa}">${c.descEn}</div></div></div>`).join('');
  return true;
}

// ── PDFs ─────────────────────────────────────
// فایل‌های PDF
// لیست فایل‌های PDF رو از فایل داده برمی‌گردونه
function defaultPdfsData() {
  return window.SiteData.pdfs || [];
}

function renderPdfsToPage(pdfs) {
  const grid = document.getElementById('pdf-grid');
  if (!grid) return false;
  grid.innerHTML = pdfs.map(p => {
    // پسوند فایل رو تشخیص می‌ده تا برای صفحات HTML (به‌جای PDF) آیکون درست نشون بده
    const srcPath = p.file || p.preview || p.dl || '';
    const isHtmlDoc = /\.html?(\?.*)?(#.*)?$/i.test(srcPath);
    const iconInner = p.image ?
      `<img src="${p.image}" alt="${(p.titleEn || '').replace(/"/g, '&quot;')}" loading="lazy">` :
      (isHtmlDoc ? `<i class="fa-solid fa-file-code"></i>` : `<i class="fa-solid fa-file-pdf"></i>`);
    return `<div class="pdf-card"><div class="pdf-icon-wrap">${iconInner}</div><div class="pdf-title" data-en="${p.titleEn}" data-fa="${p.titleFa}">${p.titleEn}</div><div class="pdf-desc" data-en="${p.descEn}" data-fa="${p.descFa}">${p.descEn}</div><div class="pdf-meta" data-en="${p.metaEn}" data-fa="${p.metaFa}">${p.metaEn}</div><div class="pdf-actions"><a href="${p.preview}" class="btn btn-o" style="padding:7px 13px;font-size:.74rem"><i class="fa-solid fa-eye"></i> <span data-en="Preview" data-fa="پیش‌نمایش">Preview</span></a><a href="${p.dl}" class="btn btn-p" style="padding:7px 13px;font-size:.74rem" download><i class="fa-solid fa-download"></i> <span data-en="Download" data-fa="دانلود">Download</span></a></div></div>`;
  }).join('');
  return true;
}

// ── Post type filters (sidebar) ─────────────
// فیلتر «Filter by Type» توی سایدبار پست‌ها
// برچسب/آیکون پیش‌فرض برای انواع شناخته‌شده‌ی پست؛ هر نوع دیگه‌ای که توی
// posts.js بذاری هم خودکار با یه آیکون عمومی و همون اسمِ نوع اضافه می‌شه
const POST_TYPE_META = {
  project: { label: { en: 'Projects', fa: 'پروژه‌ها' }, icon: 'fa-solid fa-rocket' },
  tech: { label: { en: 'Engineering', fa: 'مهندسی' }, icon: 'fa-solid fa-microchip' },
  announcement: { label: { en: 'Announcements', fa: 'اعلان‌ها' }, icon: 'fa-solid fa-bullhorn' },
  insight: { label: { en: 'Insights', fa: 'بینش‌ها' }, icon: 'fa-solid fa-lightbulb' },
  carousel: { label: { en: 'Carousels', fa: 'کاروسل‌ها' }, icon: 'fa-solid fa-images' }
};

// اسم نوع رو برای نمایش (وقتی توی POST_TYPE_META نباشه) خوانا می‌کنه — مثلاً 'behind-the-scenes' -> 'Behind The Scenes'
function humanizePostType(type) {
  return (type || '')
    .replace(/[-_]+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase()) || 'Other';
}

// لیست فیلتر «Filter by Type» رو از روی پست‌های واقعی posts.js می‌سازه؛
// یعنی دسته‌ها و شمارشگرها همیشه خودکار با محتوای واقعی هماهنگ می‌مونن
function renderPostFiltersToPage(posts) {
  const list = document.getElementById('post-filter-list');
  if (!list) return false;
  const isFA = document.body.classList.contains('rtl');

  const counts = {};
  posts.forEach(p => {
    const t = p.type || 'other';
    counts[t] = (counts[t] || 0) + 1;
  });
  const types = Object.keys(counts);

  const btn = (type, icon, label, count, active) =>
    `<button class="pfl${active ? ' active' : ''}" onclick="filterPosts('${type}',this)"><i class="${icon}"></i><span>${label}</span><span class="pfl-count">${count}</span></button>`;

  let html = btn('all', 'fa-solid fa-border-all', isFA ? 'همه پست‌ها' : 'All Posts', posts.length, true);
  types.forEach(t => {
    const meta = POST_TYPE_META[t];
    const icon = meta ? meta.icon : 'fa-solid fa-tag';
    const label = meta ? (isFA ? meta.label.fa : meta.label.en) : humanizePostType(t);
    html += btn(t, icon, label, counts[t], false);
  });
  list.innerHTML = html;
  return true;
}

// ── Posts feed (Instagram-style updates) ───
// فید پست‌ها
// رنگ‌های آماده برای برچسب دسته‌بندی هر پست
const POST_BADGE_PALETTE = {
  orange: { bg: 'rgba(255,122,26,.2)', text: 'var(--ac3)', border: 'rgba(255,122,26,.3)' },
  purple: { bg: 'rgba(168,85,247,.2)', text: '#c084fc', border: 'rgba(168,85,247,.3)' },
  yellow: { bg: 'rgba(234,179,8,.15)', text: '#fcd34d', border: 'rgba(234,179,8,.25)' },
  green: { bg: 'rgba(34,197,94,.15)', text: '#4ade80', border: 'rgba(34,197,94,.25)' },
  red: { bg: 'rgba(239,68,68,.15)', text: '#f87171', border: 'rgba(239,68,68,.25)' }
};

// لیست پست‌های فید رو از فایل داده برمی‌گردونه
function defaultPosts() {
  return window.SiteData.posts || [];
}

// فید پست‌ها رو روی صفحه می‌سازه
function renderPostsToPage(posts) {
  const feed = document.getElementById('posts-feed-list');
  if (!feed) return false;
  feed.innerHTML = posts.map(p => {
    const pal = POST_BADGE_PALETTE[p.badgeColor] || POST_BADGE_PALETTE.orange;
    const likes = parseInt(p.likes, 10) || 0;
    const comments = parseInt(p.comments, 10) || 0;
    const eu = p.video ? (typeof getVideoEmbed === 'function' ? getVideoEmbed(p.video) : null) : null;
    let videoHtml = '';
    if (eu) {
      const isMP4 = /\.(mp4|webm|ogg)/i.test(eu);
      const platform = p.video.includes('youtube') || p.video.includes('youtu.be') ? 'YouTube' : p.video.includes('aparat') ? 'Aparat' : 'Video';
      const tag = `<div class="post-video-tag"><i class="fa-solid fa-play-circle"></i>${platform}</div>`;
      videoHtml = isMP4 ?
        tag + `<div class="post-video-wrap"><video src="${eu}" controls></video></div>` :
        tag + `<div class="post-video-wrap"><iframe src="${eu}" allow="autoplay;fullscreen;encrypted-media" allowfullscreen></iframe></div>`;
    }
    return `
    <div class="post-card${p.featured?' featured-post':''}" data-post-type="${p.type||''}">
      <div class="post-header">
        <div class="post-avatar"><i class="fa-solid fa-microchip"></i></div>
        <div class="post-meta">
          <div class="post-author">Amir Hosin Sekhavatfar</div>
          <div class="post-time"><i class="fa-solid fa-clock" style="font-size:.6rem"></i> ${p.date||''}</div>
        </div>
        <span class="post-cat-badge" style="background:${pal.bg};color:${pal.text};border:1px solid ${pal.border}">${p.badgeLabel||'POST'}</span>
      </div>
      <div class="post-body">
        <div class="post-text">${p.text||''}</div>
        ${p.image?`<div class="post-image"><div class="post-image-inner" style="height:240px;font-size:0"><img src="${p.image}" alt="post image" style="width:100%;height:100%;object-fit:cover;border-radius:14px"><div class="post-image-overlay"></div></div></div>`:''}
        ${videoHtml}
        ${p.linkUrl?`<a href="${p.linkUrl}" target="_blank" rel="noopener" class="btn btn-o" style="margin-bottom:10px;font-size:.8rem"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${p.linkLabel||p.linkUrl}</a>`:''}
        <div class="post-hashtags">${(p.tags||'').split(',').filter(t=>t.trim()).map(t=>`<span class="post-hashtag">${t.trim()}</span>`).join('')}</div>
      </div>
      <div class="post-actions">
        <button class="post-action-btn${p.liked?' liked':''}" onclick="togglePostLike(this)"><i class="fa-${p.liked?'solid':'regular'} fa-heart"></i> ${likes}</button>
        <div class="post-action-sep"></div>
        <button class="post-action-btn${comments?' commented':''}" onclick=""><i class="fa-regular fa-comment"></i> ${comments}</button>
        <div class="post-action-sep"></div>
        <button class="post-action-btn" onclick=""><i class="fa-solid fa-share-nodes"></i> Share</button>
        <button class="post-action-btn${p.saved?' saved':''}" onclick="togglePostSave(this)"><i class="fa-${p.saved?'solid':'regular'} fa-bookmark"></i> ${p.saved?'Saved':'Save'}</button>
      </div>
    </div>`;
  }).join('');
  return true;
}

// ── Posts section settings (sidebar profile card + announcement banner) ──
// تنظیمات بخش پست‌ها (کارت پروفایل و بنر اعلان)
// تنظیمات بخش پست‌ها رو از فایل داده برمی‌گردونه
function defaultPostsSettings() {
  return window.SiteData.postsSettings || {};
}

// تنظیمات بخش پست‌ها رو روی صفحه اعمال می‌کنه
function applyPostsSettingsToPage(s) {
  const set = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.textContent = v || ''
  };
  set('pp-name-el', s.name);
  set('pp-handle-el', s.handle);
  set('pp-bio-el', s.bio);
  set('pp-stat-posts-el', s.statPosts);
  set('pp-stat-followers-el', s.statFollowers);
  set('pp-stat-following-el', s.statFollowing);
  set('ann-banner-title-el', s.annTitle);
  set('ann-banner-text-el', s.annText);
}

// ── Apply core content to the page (safe to call repeatedly) ──
// اعمال محتوای اصلی روی صفحه
// نام هیرو، مهارت‌ها، پروژه‌ها و افتخارات رو از فایل‌های داده روی صفحه اعمال می‌کنه
function applyAllToPage() {
  const cfg = window.SiteData.config;
  const isFA = document.body.classList.contains('rtl');

  // Hero name (kept in sync with site-config.js)
  const nameEn = cfg.nameEn,
    lnameEn = cfg.lnameEn;
  const nameFa = cfg.nameFa,
    lnameFa = cfg.lnameFa;
  document.querySelectorAll('.hero-name [data-en]').forEach((el, i) => {
    if (i === 0) {
      el.setAttribute('data-en', nameEn);
      el.setAttribute('data-fa', nameFa)
    } else {
      el.setAttribute('data-en', lnameEn);
      el.setAttribute('data-fa', lnameFa)
    }
    el.textContent = isFA ? el.dataset.fa : el.dataset.en;
  });

  // Skills + Projects + Achievements
  renderSkillsToPage(defaultSkills());
  renderProjectsToPage(defaultProjects());
  renderAchievementsToPage(defaultAchievements());

  // Refresh QR contact card with latest info
  if (typeof renderContactQR === 'function') setTimeout(renderContactQR, 50);
}

// ── Initial render on page load ──────────────
// رندر اولیه هنگام بارگذاری صفحه
(function() {
  try {
    applyAllToPage();
    applyPostsSettingsToPage(defaultPostsSettings());
    renderPostsToPage(defaultPosts());
    renderPostFiltersToPage(defaultPosts());
    renderCodesToPage(defaultCodes());
    renderPdfsToPage(defaultPdfsData());
    renderVideosToPage();
    renderBlogPostsToPage(defaultBlogPosts());
    renderLatestActivityToPage(defaultLatestActivity());
    renderExperienceToPage(defaultExperience());
    renderJourneyAndResumeToPage();
  } catch (e) {}
  setTimeout(updateSimLinkBadge, 500);
})();

// ══════════════════════════════════════════════
//  INLINE VIDEO PLAYER (Videos Section)
// پخش‌کننده ویدیوی داخلی (بخش ویدیوها)
// ══════════════════════════════════════════════
// لینک ویدیو رو به آدرس قابل embed تبدیل می‌کنه
function buildEmbedUrl(url) {
  if (!url) return null;
  url = url.trim();
  // Already an embed URL
  if (url.includes('/embed/')) return url.includes('autoplay') ? url : url + (url.includes('?') ? '&' : '?') + 'autoplay=1';
  // YouTube watch
  let m = url.match(/(?:youtube\.com\/watch\?.*v=|youtu\.be\/)([^&?\s\/#]+)/);
  if (m) return 'https://www.youtube.com/embed/' + m[1] + '?autoplay=1&rel=0&modestbranding=1';
  // YouTube shorts
  m = url.match(/youtube\.com\/shorts\/([^?&\s\/#]+)/);
  if (m) return 'https://www.youtube.com/embed/' + m[1] + '?autoplay=1&rel=0';
  // Aparat /v/
  m = url.match(/aparat\.com\/v\/([^/?&#\s]+)/);
  if (m) return 'https://www.aparat.com/video/video/embed/videohash/' + m[1] + '/vt/frame?autoplay=1';
  // Aparat short
  m = url.match(/aparat\.com\/([A-Za-z0-9]{5,8})(?:$|[/?#])/);
  if (m) return 'https://www.aparat.com/video/video/embed/videohash/' + m[1] + '/vt/frame?autoplay=1';
  // Direct file
  if (/\.(mp4|webm|ogg)/i.test(url)) return url;
  return null;
}

// از لینک ویدیو، آیدی یوتیوب رو استخراج می‌کنه (اگه یوتیوب باشه)
function getYouTubeId(url) {
  if (!url) return null;
  let m = url.match(/(?:youtube\.com\/watch\?.*v=|youtu\.be\/)([^&?\s\/#]+)/);
  if (m) return m[1];
  m = url.match(/youtube\.com\/shorts\/([^?&\s\/#]+)/);
  if (m) return m[1];
  m = url.match(/youtube\.com\/embed\/([^?&\s\/#]+)/);
  if (m) return m[1];
  return null;
}

// اسکریپت YouTube IFrame API رو (فقط یه‌بار) لود می‌کنه — لازم برای «پخش خودکار ویدیوی بعدی» و «کپی زمان فعلی»
let ytApiLoadPromise = null;
function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytApiLoadPromise) return ytApiLoadPromise;
  ytApiLoadPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function() {
      if (typeof prev === 'function') { try { prev(); } catch (e) {} }
      resolve(window.YT);
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }
  });
  return ytApiLoadPromise;
}

// وضعیت پخش‌کننده‌ی هر کارت (پلیر یوتیوب یا المنت ویدیوی مستقیم) رو نگه می‌داره —
// لازم برای «کپی زمان فعلی» و «پخش خودکار ویدیوی بعدی»
let ytPlayerUid = 0;
const videoPlayerState = new WeakMap();

// پلیر فعال یه کارت رو (اگه یوتیوبه) نابود می‌کنه تا حافظه/چندتایی پخش شدن نشتی نکنه
function destroyCardPlayer(card) {
  const state = videoPlayerState.get(card);
  if (!state) return;
  if (state.type === 'youtube' && state.player && typeof state.player.destroy === 'function') {
    try { state.player.destroy(); } catch (e) {}
  }
  videoPlayerState.delete(card);
}

// لینک ویدیو رو داخل یه player-wrap مشخص، پخش می‌کنه (برای پخش اول و برای سوییچ به ویدیوی مرتبط هم استفاده می‌شه)
// یوتیوب: از YouTube IFrame API استفاده می‌شه (برای پخش خودکار بعدی و کپی زمان فعلی)
// فایل مستقیم (mp4/webm/ogg): با <video> واقعی، رویداد ended هم گوش داده می‌شه
// آپارات/سایر: امبد ساده (بدون پشتیبانی از تایم‌استمپ/پخش خودکار بعدی)
function embedIntoPlayerWrap(playerWrap, url, card) {
  if (!url) return false;
  url = url.trim();
  const isFile = /\.(mp4|webm|ogg)(\?|#|$)/i.test(url);
  const ytId = !isFile ? getYouTubeId(url) : null;
  const fallbackEmbedUrl = (!isFile && !ytId) ? buildEmbedUrl(url) : null;
  if (!isFile && !ytId && !fallbackEmbedUrl) return false;

  if (card) destroyCardPlayer(card);
  playerWrap.innerHTML = '';
  const wrap = document.createElement('div');
  wrap.className = 'vp-iframe-wrap';
  playerWrap.appendChild(wrap);
  playerWrap.classList.add('vp-active');

  if (ytId) {
    const holderId = 'yt-player-' + (++ytPlayerUid);
    const holder = document.createElement('div');
    holder.id = holderId;
    wrap.appendChild(holder);
    loadYouTubeApi().then(YT => {
      if (!document.getElementById(holderId)) return; // کاربر قبل از لود شدن API بست
      const player = new YT.Player(holderId, {
        videoId: ytId,
        playerVars: { autoplay: 1, rel: 0, modestbranding: 1 },
        events: {
          onStateChange: e => {
            if (e.data === YT.PlayerState.ENDED && card) {
              markVideoWatched(card.dataset.vurl);
              playNextRelatedVideoForCard(card);
            }
          }
        }
      });
      if (card) videoPlayerState.set(card, { type: 'youtube', player });
    }).catch(() => {});
    return true;
  }

  if (isFile) {
    const v = document.createElement('video');
    v.src = url;
    v.controls = true;
    v.autoplay = true;
    v.playsInline = true;
    v.addEventListener('ended', () => {
      if (card) {
        markVideoWatched(card.dataset.vurl);
        playNextRelatedVideoForCard(card);
      }
    });
    wrap.appendChild(v);

    // کنترل سرعت پخش (0.5x تا 2x) — فقط برای فایل مستقیم چون پلیر واقعی <video> داریم
    const speedSel = document.createElement('select');
    speedSel.className = 'video-speed-select';
    speedSel.innerHTML = [0.5, 0.75, 1, 1.25, 1.5, 2].map(r => `<option value="${r}"${r === 1 ? ' selected' : ''}>${r}x</option>`).join('');
    speedSel.addEventListener('click', e => e.stopPropagation());
    speedSel.addEventListener('change', e => { e.stopPropagation(); v.playbackRate = parseFloat(speedSel.value); });
    wrap.appendChild(speedSel);

    if (card) videoPlayerState.set(card, { type: 'file', el: v });
    return true;
  }

  const fr = document.createElement('iframe');
  fr.src = fallbackEmbedUrl;
  fr.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media');
  fr.allowFullscreen = true;
  fr.frameBorder = '0';
  wrap.appendChild(fr);
  if (card) videoPlayerState.set(card, { type: 'iframe' });
  return true;
}

// پخش یک ویدیو رو شروع می‌کنه
function playVideo(card, url) {
  // stop others
  document.querySelectorAll('.video-card.playing').forEach(c => {
    if (c !== card) stopVideo(c.querySelector('.video-close-player'));
  });
  // toggle off
  if (card.classList.contains('playing')) {
    stopVideo(card.querySelector('.video-close-player'));
    return;
  }

  const playerWrap = card.querySelector('.video-player-wrap');
  const closeBtn = card.querySelector('.video-close-player');
  if (!embedIntoPlayerWrap(playerWrap, url, card)) {
    alert('لینک ویدیو معتبر نیست');
    return;
  }
  card.classList.add('playing');
  if (closeBtn) closeBtn.style.display = 'flex';
  const video = findVideoByUrl(url);
  if (video) {
    renderRelatedStrip(card, video);
    bumpViewUiForCard(card, video);
    addRecentlyWatched(video.url);
  }
  card.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest'
  });
}

// پخش ویدیو رو متوقف می‌کنه
function stopVideo(btn) {
  if (!btn) return;
  const card = btn.closest('.video-card');
  if (!card) return;
  destroyCardPlayer(card);
  const playerWrap = card.querySelector('.video-player-wrap');
  if (playerWrap) {
    playerWrap.innerHTML = '';
    playerWrap.classList.remove('vp-active');
  }
  const relWrap = card.querySelector('.video-related-strip');
  if (relWrap) relWrap.innerHTML = '';
  card.classList.remove('playing');
  if (card.classList.contains('theater-mode')) closeTheaterMode(card);
  if (card.classList.contains('mini-player')) closeMiniPlayer(card);
  btn.style.display = 'none';
}

// ویدیوها رو بر اساس دسته‌بندی فیلتر می‌کنه
function filterVideos(cat) {
  videoUiState.cat = cat;
  videoUiState.visible = VIDEO_PAGE_SIZE;
  renderVideosToPage();
}

// ── Autoplay next: وقتی ویدیو تموم شد خودکار می‌ره سراغ اولین ویدیوی مرتبط ──
function playNextRelatedVideoForCard(card) {
  if (!card) return;
  const url = card.dataset.vurl;
  const current = findVideoByUrl(url);
  if (!current) return;
  const related = defaultVideos().filter(v => v.cat === current.cat && v.url !== current.url);
  if (!related.length) return;
  playRelatedVideo(card, related[0].url);
}

// ── Theater / fullscreen mode ──
// پخش‌کننده رو بزرگ و وسط صفحه (به‌جای فقط داخل کارت) نشون می‌ده
function openTheaterMode(card) {
  if (!card) return;
  if (!card.classList.contains('playing')) {
    const url = card.dataset.vurl;
    if (url) playVideo(card, url);
  }
  if (card.classList.contains('mini-player')) closeMiniPlayer(card);
  document.querySelectorAll('.video-card.theater-mode').forEach(c => { if (c !== card) closeTheaterMode(c); });
  card.classList.add('theater-mode');
  document.body.style.overflow = 'hidden';
  if (!card.querySelector('.video-theater-close')) {
    const btn = document.createElement('button');
    btn.className = 'video-theater-close';
    btn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    btn.onclick = e => { e.stopPropagation(); closeTheaterMode(card); };
    card.appendChild(btn);
  }
}
function closeTheaterMode(card) {
  if (!card) return;
  card.classList.remove('theater-mode');
  document.body.style.overflow = '';
  const btn = card.querySelector('.video-theater-close');
  if (btn) btn.remove();
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const tcard = document.querySelector('.video-card.theater-mode');
    if (tcard) closeTheaterMode(tcard);
  }
});

// ── Picture-in-Picture / پخش شناور هنگام اسکرول ──
// برای فایل مستقیم از PiP واقعی مرورگر استفاده می‌کنه (پنجره‌ی سیستمی، حتی بیرون از تب).
// برای یوتیوب/آپارات (که به‌خاطر محدودیت cross-origin نمی‌شه PiP واقعی گرفت)، یه حالت
// «پخش شناور» با CSS می‌سازه: خود کارت کوچیک و ثابت گوشه‌ی صفحه می‌مونه.
function toggleMiniPlayer(card) {
  if (!card) return;
  if (card.classList.contains('mini-player')) { closeMiniPlayer(card); return; }
  if (!card.classList.contains('playing')) {
    const url = card.dataset.vurl;
    if (url) playVideo(card, url);
  }
  const state = videoPlayerState.get(card);
  if (state && state.type === 'file' && state.el && document.pictureInPictureEnabled && !state.el.disablePictureInPicture) {
    state.el.requestPictureInPicture().catch(() => enableCssMiniPlayer(card));
    return;
  }
  enableCssMiniPlayer(card);
}
function enableCssMiniPlayer(card) {
  if (card.classList.contains('theater-mode')) closeTheaterMode(card);
  document.querySelectorAll('.video-card.mini-player').forEach(c => { if (c !== card) closeMiniPlayer(c); });
  card.classList.add('mini-player');
  if (!card.querySelector('.video-mini-close')) {
    const btn = document.createElement('button');
    btn.className = 'video-mini-close';
    btn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    btn.onclick = e => { e.stopPropagation(); closeMiniPlayer(card); };
    card.appendChild(btn);
  }
}
function closeMiniPlayer(card) {
  if (!card) return;
  card.classList.remove('mini-player');
  const btn = card.querySelector('.video-mini-close');
  if (btn) btn.remove();
}

// ── میان‌بر صفحه‌کلید هنگام پخش: Space پلی/پاز، فلش چپ/راست عقب/جلو ۱۰ ثانیه ──
function toggleCardPlayPause(card) {
  const state = videoPlayerState.get(card);
  if (!state) return;
  if (state.type === 'file' && state.el) {
    if (state.el.paused) state.el.play(); else state.el.pause();
  } else if (state.type === 'youtube' && state.player) {
    try {
      const s = state.player.getPlayerState();
      if (s === 1) state.player.pauseVideo(); else state.player.playVideo();
    } catch (e) {}
  }
}
function seekCardBy(card, delta) {
  const state = videoPlayerState.get(card);
  if (!state) return;
  if (state.type === 'file' && state.el) {
    state.el.currentTime = Math.max(0, (state.el.currentTime || 0) + delta);
  } else if (state.type === 'youtube' && state.player && typeof state.player.getCurrentTime === 'function') {
    try {
      const cur = state.player.getCurrentTime();
      state.player.seekTo(Math.max(0, cur + delta), true);
    } catch (e) {}
  }
}
document.addEventListener('keydown', e => {
  const activeTag = document.activeElement ? document.activeElement.tagName : '';
  if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable)) return;
  const card = document.querySelector('.video-card.playing');
  if (!card) return;
  if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); toggleCardPlayPause(card); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); seekCardBy(card, 10); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); seekCardBy(card, -10); }
});

// ── Copy current timestamp link ──
// زمان فعلی پخش رو از پلیر می‌گیره (یوتیوب یا ویدیوی مستقیم) و لینک قابل‌اشتراک‌گذاری می‌سازه
function getCurrentPlaybackSeconds(card) {
  const state = videoPlayerState.get(card);
  if (!state) return null;
  if (state.type === 'youtube' && state.player && typeof state.player.getCurrentTime === 'function') {
    try { return Math.floor(state.player.getCurrentTime()); } catch (e) { return null; }
  }
  if (state.type === 'file' && state.el) return Math.floor(state.el.currentTime || 0);
  return null;
}
function buildTimestampLink(url, seconds) {
  if (!url) return '';
  if (/youtube\.com|youtu\.be/.test(url)) {
    const base = url.split(/[?&]t=\d+s?/)[0].replace(/[?&]$/, '');
    const sep = base.includes('?') ? '&' : '?';
    return base + sep + 't=' + seconds + 's';
  }
  if (/\.(mp4|webm|ogg)/i.test(url)) return url.split('#')[0] + '#t=' + seconds;
  const mm = Math.floor(seconds / 60), ss = seconds % 60;
  return url + ' @ ' + mm + ':' + String(ss).padStart(2, '0');
}
function copyVideoTimestamp(btn) {
  const isFA = document.body.classList.contains('rtl');
  const card = btn.closest('.video-card');
  if (!card || !card.classList.contains('playing')) {
    alert(isFA ? 'اول ویدیو رو پخش کن تا بشه زمانش رو کپی کرد.' : 'Play the video first to copy its timestamp.');
    return;
  }
  const seconds = getCurrentPlaybackSeconds(card);
  if (seconds === null) {
    alert(isFA ? 'برای این نوع ویدیو کپی زمان پشتیبانی نمی‌شه.' : "Timestamp copy isn't supported for this video source.");
    return;
  }
  const link = buildTimestampLink(card.dataset.vurl, seconds);
  const icon = btn.querySelector('i');
  const showDone = () => { if (icon) { const old = icon.className; icon.className = 'fa-solid fa-check'; setTimeout(() => { icon.className = old; }, 1500); } };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(link).then(showDone).catch(() => prompt(isFA ? 'کپی کن:' : 'Copy this link:', link));
  } else prompt(isFA ? 'کپی کن:' : 'Copy this link:', link);
}

// ── Copy embed code (for developers) ──
function copyEmbedLink(btn) {
  const isFA = document.body.classList.contains('rtl');
  const url = btn.dataset.url;
  const ytId = getYouTubeId(url);
  const embedUrl = ytId ? ('https://www.youtube.com/embed/' + ytId) : buildEmbedUrl(url);
  if (!embedUrl) { alert(isFA ? 'این لینک قابل امبد نیست.' : "This link can't be embedded."); return; }
  const isFile = /\.(mp4|webm|ogg)/i.test(embedUrl);
  const code = isFile ?
    `<video src="${embedUrl}" controls style="width:100%;aspect-ratio:16/9"></video>` :
    `<iframe src="${embedUrl}" width="560" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowfullscreen></iframe>`;
  const icon = btn.querySelector('i');
  const showDone = () => { if (icon) { const old = icon.className; icon.className = 'fa-solid fa-check'; setTimeout(() => { icon.className = old; }, 1500); } };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(showDone).catch(() => prompt(isFA ? 'کد امبد:' : 'Embed code:', code));
  } else prompt(isFA ? 'کد امبد:' : 'Embed code:', code);
}

// ── Report broken video link ──
// اگه ویدیویی پخش نشه، کاربر می‌تونه از طریق ایمیل به توسعه‌دهنده خبر بده
function reportBrokenVideo(btn) {
  const isFA = document.body.classList.contains('rtl');
  const url = btn.dataset.url;
  const video = findVideoByUrl(url);
  const title = video ? (isFA ? (video.titleFa || video.titleEn) : (video.titleEn || video.titleFa)) : '';
  const email = (window.SiteData && window.SiteData.config && window.SiteData.config.email) || '';
  const subject = isFA ? 'گزارش لینک خراب ویدیو' : 'Broken video link report';
  const body = (isFA ? 'عنوان ویدیو: ' : 'Video title: ') + (title || '-') + '\n' +
    (isFA ? 'لینک ویدیو: ' : 'Video link: ') + (url || '-') + '\n' +
    (isFA ? 'توضیح مشکل: ' : 'Describe the issue: ') + '\n';
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// ══════════════════════════════════════════════
//  SIMLINK PAGE
// صفحه سیم‌لینک
// ══════════════════════════════════════════════
// صفحه سیم‌لینک رو باز می‌کنه
function openSimLink() {
  document.getElementById('simlink-page').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderSimLinkFeed();
}

// صفحه سیم‌لینک رو می‌بنده
function closeSimLink() {
  document.getElementById('simlink-page').classList.remove('open');
  document.body.style.overflow = '';
}

// لیست پست‌های سیم‌لینک رو از فایل داده برمی‌گردونه
function defaultSimLinkPosts() {
  return window.SiteData.simlinkPosts || [];
}

// نشان تعداد پست‌های جدید سیم‌لینک رو به‌روزرسانی می‌کنه
function updateSimLinkBadge() {
  const count = defaultSimLinkPosts().length;
  const b1 = document.getElementById('simlink-count-badge');
  const b2 = document.getElementById('sl-badge-count');
  if (b1) b1.textContent = count;
  if (b2) b2.textContent = count + ' پست';
}

// فید پست‌های سیم‌لینک رو روی صفحه می‌سازه
function renderSimLinkFeed() {
  const feed = document.getElementById('sl-feed');
  const empty = document.getElementById('sl-empty');
  if (!feed) return;
  const posts = defaultSimLinkPosts();
  updateSimLinkBadge();
  if (!posts.length) {
    if (empty) empty.style.display = 'block';
    feed.innerHTML = '';
    feed.appendChild(empty || document.createElement('div'));
    return;
  }
  if (empty) empty.style.display = 'none';
  const typeBadge = {
    project: 'PROJECT UPDATE',
    tech: 'ENGINEERING',
    insight: 'INSIGHT',
    announcement: 'ANNOUNCEMENT',
    link: 'LINK'
  };
  const typeColor = {
    project: 'rgba(255,122,26,.2)',
    tech: 'rgba(34,197,94,.15)',
    insight: 'rgba(251,191,36,.15)',
    announcement: 'rgba(239,68,68,.15)',
    link: 'rgba(179,71,0,.2)'
  };
  const typeTextColor = {
    project: 'var(--ac3)',
    tech: '#4ade80',
    insight: '#fcd34d',
    announcement: '#f87171',
    link: '#c084fc'
  };
  feed.innerHTML = posts.map((p, i) => `
    <div class="post-card" style="border-color:rgba(179,71,0,.2)">
      <div class="post-header">
        <div class="post-avatar sl-post-avatar" style="background:linear-gradient(135deg,#B34700,#4f46e5)"><i class="fa-solid fa-diagram-project"></i></div>
        <div class="post-meta">
          <div class="post-author">Amir Hosin Sekhavatfar</div>
          <div class="post-time"><i class="fa-solid fa-clock" style="font-size:.6rem"></i> ${p.date||''}</div>
        </div>
        <span class="post-cat-badge" style="background:${typeColor[p.type]||typeColor.project};color:${typeTextColor[p.type]||typeTextColor.project};border:1px solid ${typeColor[p.type]||typeColor.project}">${typeBadge[p.type]||'POST'}</span>
      </div>
      <div class="post-body">
        <div class="post-text">${p.text||''}</div>
        ${p.image?`<div class="post-image"><div class="post-image-inner" style="height:240px;font-size:0"><img src="${p.image}" alt="post image" style="width:100%;height:100%;object-fit:cover;border-radius:14px"><div class="post-image-overlay"></div></div></div>`:''}
        ${(()=>{
          if(!p.video) return '';
          const eu=getVideoEmbed?getVideoEmbed(p.video):null;
          if(!eu) return '';
          const isMP4=/\.(mp4|webm|ogg)/i.test(eu);
          const platform=p.video.includes('youtube')||p.video.includes('youtu.be')?'YouTube':p.video.includes('aparat')?'Aparat':'Video';
          const tag=`<div class="post-video-tag"><i class="fa-solid fa-play-circle"></i>${platform}</div>`;
          if(isMP4) return tag+`<div class="post-video-wrap"><video src="${eu}" controls></video></div>`;
          return tag+`<div class="post-video-wrap"><iframe src="${eu}" allow="autoplay;fullscreen;encrypted-media" allowfullscreen></iframe></div>`;
        })()}
        ${p.linkUrl?`<a href="${p.linkUrl}" target="_blank" rel="noopener" class="styled-button" style="margin-bottom:10px">
          ${p.linkLabel||'ورود به سیمولیشن'}
          <div class="inner-button">
            <svg id="Arrow-sl-${i}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" height="30px" width="30px" class="icon">
              <defs>
                <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient-sl-${i}">
                  <stop style="stop-color:#FFFFFF;stop-opacity:1" offset="0%"></stop>
                  <stop style="stop-color:#AAAAAA;stop-opacity:1" offset="100%"></stop>
                </linearGradient>
              </defs>
              <path fill="url(#iconGradient-sl-${i})" d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"></path>
            </svg>
          </div>
        </a>`:''}
        <div class="post-hashtags">${(p.tags||'').split(',').filter(t=>t.trim()).map(t=>`<span class="post-hashtag">${t.trim()}</span>`).join('')}</div>
      </div>
      <div class="post-actions">
        <button class="post-action-btn" onclick="togglePostLike(this)"><i class="fa-regular fa-heart"></i> 0</button>
        <div class="post-action-sep"></div>
        <button class="post-action-btn" onclick=""><i class="fa-regular fa-comment"></i> 0</button>
        <div class="post-action-sep"></div>
        <button class="post-action-btn" onclick=""><i class="fa-solid fa-share-nodes"></i> Share</button>
        <button class="post-action-btn" onclick="togglePostSave(this)"><i class="fa-regular fa-bookmark"></i> Save</button>
      </div>
    </div>`).join('');
}
