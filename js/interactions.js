// این متغیر عمداً اول فایل تعریف شده: اگه هر بخش دیگه‌ای از این اسکریپت
// (مثلاً افکت‌های دکوری) روی مرورگر کاربر خطا بده، باز هم دکمهٔ چت باید کار کنه
let chatOpen = false;

if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 640,
    easing: 'ease-out-cubic',
    once: true,
    offset: 40
  })
} else {
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none'
  })
}

let pct = 0;
const lpct = document.getElementById('lpct');
const loaderDiv = document.getElementById('loader');
if (loaderDiv && !(typeof AHS_IS_EXPORTED !== 'undefined' && AHS_IS_EXPORTED) && !loaderDiv.classList.contains('loader-done')) {
  const lt = setInterval(() => {
    pct += Math.random() * 20;
    if (pct > 100) pct = 100;
    if (lpct) lpct.textContent = Math.floor(pct) + '%';
    if (pct >= 100) {
      clearInterval(lt);
      setTimeout(() => {
        loaderDiv.style.transition = 'opacity .55s';
        loaderDiv.style.opacity = '0';
        setTimeout(() => loaderDiv.classList.add('loader-done'), 560)
      }, 180)
    }
  }, 80);
} else if (loaderDiv) {
  loaderDiv.classList.add('loader-done');
}

const progressBar = document.getElementById('scroll-progress');
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('back-top');
const secs = document.querySelectorAll('section[id]');
const nlinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const dh = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (y / dh * 100) + '%';
  navbar.classList.toggle('scrolled', y > 60);
  backTop.classList.toggle('visible', y > 400);
  secs.forEach(s => {
    if (y >= s.offsetTop - 100 && y < s.offsetTop + s.offsetHeight - 100) {
      nlinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + s.id))
    }
  });
}, {
  passive: true
});

const cursor = document.getElementById('cursor'),
  ring = document.getElementById('cursor-ring');
if (cursor && ring && window.matchMedia('(hover:hover)').matches) {
  let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY
  });
  (function animC() {
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animC)
  })();
  document.querySelectorAll('a,button,.pc,.sk,.hcard').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      ring.style.width = '50px';
      ring.style.height = '50px'
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '10px';
      cursor.style.height = '10px';
      ring.style.width = '36px';
      ring.style.height = '36px'
    })
  });
}

const phrases = ['PLC Programmer', 'IoT Developer', 'Embedded Systems Dev', 'Python Enthusiast', 'Automation Engineer', 'ESP32 Hacker'];
let pi = 0,
  ci = 0,
  del = false;
const tel = document.getElementById('typing-el');
(function type() {
  const ph = phrases[pi];
  tel.textContent = del ? ph.slice(0, ci--) : ph.slice(0, ci++);
  if (!del && ci > ph.length) {
    del = true;
    setTimeout(type, 1300);
    return
  }
  if (del && ci < 0) {
    del = false;
    pi = (pi + 1) % phrases.length;
    ci = 0
  }
  setTimeout(type, del ? 44 : 78)
})();

const cobs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const t = parseInt(e.target.dataset.target);
    let n = 0;
    const step = Math.ceil(t / 30);
    const ti = setInterval(() => {
      n += step;
      if (n >= t) {
        n = t;
        clearInterval(ti)
      }
      e.target.textContent = n + '+'
    }, 48);
    cobs.unobserve(e.target)
  })
}, {
  threshold: .5
});
document.querySelectorAll('.stat-num[data-target]').forEach(el => cobs.observe(el));

const bobs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.sb-fill').forEach(b => b.style.width = b.dataset.width + '%');
    bobs.unobserve(e.target)
  })
}, {
  threshold: .25
});
document.querySelectorAll('.sk').forEach(c => bobs.observe(c));

document.querySelectorAll('.fb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.fb').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.pc').forEach(c => {
      const show = f === 'all' || c.dataset.category === f;
      c.style.display = show ? 'flex' : 'none'
    })
  })
});

document.querySelectorAll('.pc,.sk,.hcard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - .5,
      y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `translateY(-5px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`
  });
  card.addEventListener('mouseleave', () => card.style.transform = '')
});

// کد نمایش داده‌شده رو در کلیپ‌بورد کپی می‌کنه
function copyCode(btn) {
  const txt = btn.closest('.cc').querySelector('.cc-pre').innerText;
  navigator.clipboard.writeText(txt).then(() => {
    btn.innerHTML = '<i class="fa-solid fa-check"></i>';
    btn.style.color = '#22C55E';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-regular fa-copy"></i>';
      btn.style.color = ''
    }, 2000)
  })
}

// منوی موبایل رو باز/بسته می‌کنه
function toggleMobile() {
  const m = document.getElementById('mobile-menu'),
    h = document.getElementById('hamburger');
  m.classList.toggle('open');
  h.classList.toggle('open');
  document.body.style.overflow = m.classList.contains('open') ? 'hidden' : ''
}

// منوی موبایل رو می‌بنده
function closeMobile() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = ''
}

let isDark = !(localStorage.getItem('theme') === 'light');
(function() {
  if (!isDark) {
    document.body.classList.add('light')
  }
  const ic = document.getElementById('theme-icon');
  if (ic) ic.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'
})();

// بین حالت روشن و تاریک سایت جابه‌جا می‌کنه
function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('light', !isDark);
  document.getElementById('theme-icon').className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  const t = document.createElement('div');
  t.className = 'theme-saved-toast';
  t.innerHTML = (isDark ? '<i class="fa-solid fa-moon"></i> Dark' : '<i class="fa-solid fa-sun"></i> Light') + ' mode saved';
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 300)
  }, 1800)
}

let lang = 'en';

// زبان مستقل خودِ چت‌بات — پیش‌فرضش با زبان کل سایت هماهنگه، ولی با دکمه‌ی
// کوچیک بالای چت می‌شه بدون تغییر زبان کل سایت، فقط چت رو عوض کرد
window.chatLang = lang;

// زبان سایت رو بین فارسی و انگلیسی عوض می‌کنه
function toggleLang() {
  lang = lang === 'en' ? 'fa' : 'en';
  document.getElementById('lang-lbl').textContent = lang === 'en' ? 'فارسی' : 'English';
  document.body.classList.toggle('rtl', lang === 'fa');
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.en
  })
  if (typeof initLocationMap === 'function') initLocationMap();
  if (typeof renderAchievementsToPage === 'function') renderAchievementsToPage(defaultAchievements());
  if (typeof renderBlogPostsToPage === 'function') renderBlogPostsToPage(defaultBlogPosts());
  if (typeof renderLatestActivityToPage === 'function') renderLatestActivityToPage(defaultLatestActivity());
  if (typeof renderExperienceToPage === 'function') renderExperienceToPage(defaultExperience());
  if (typeof renderJourneyAndResumeToPage === 'function') renderJourneyAndResumeToPage();
  if (typeof renderVideosToPage === 'function') renderVideosToPage();
  // تعویض زبان کل سایت، زبان چت رو هم هماهنگ می‌کنه (مگر این‌که کاربر قبلاً
  // با دکمه‌ی داخل خودِ چت جداگونه انتخاب کرده باشه — همون‌جوری که هست می‌مونه)
  window.chatLang = lang;
  syncChatLangUI();
  if (window.ChatFaqSlider) window.ChatFaqSlider.render();
}

// فقط زبان خودِ چت رو عوض می‌کنه — بدون این‌که به بقیه‌ی سایت دست بزنه
function toggleChatLang() {
  window.chatLang = window.chatLang === 'fa' ? 'en' : 'fa';
  syncChatLangUI();
  if (window.ChatFaqSlider) window.ChatFaqSlider.render();
}

// متن‌های داخل پنجره‌ی چت (عنوان، پیام خوش‌آمد، جای‌نگه‌دار ورودی، دکمه‌ی زبان)
// رو با زبان فعلیِ چت (window.chatLang) هماهنگ می‌کنه
function syncChatLangUI() {
  const cl = window.chatLang === 'fa' ? 'fa' : 'en';
  const chatWindow = document.getElementById('ai-chat-window');
  if (!chatWindow) return;

  chatWindow.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[cl] || el.dataset.en;
  });

  const input = document.getElementById('chat-input');
  if (input) {
    input.placeholder = input.dataset['ph' + (cl === 'fa' ? 'Fa' : 'En')] || input.placeholder;
  }

  chatWindow.dir = cl === 'fa' ? 'rtl' : 'ltr';

  const lbl = document.getElementById('chat-lang-toggle-lbl');
  if (lbl) lbl.textContent = cl === 'fa' ? 'EN' : 'فا';
}

// ── QR / vCard "Save My Contact" card ──
// کارت QR / vCard برای ذخیره اطلاعات تماس
// متن فایل vCard (کارت مخاطب) رو می‌سازه
function buildVCardString() {
  const nameParts = document.querySelectorAll('.hero-name [data-en]');
  const fullName = nameParts.length ? Array.from(nameParts).map(n => n.textContent.trim()).join(' ') : 'Amir Hosin Sekhavatfar';
  const cfg = (window.SiteData && window.SiteData.config) || {};
  const email = cfg.email || '';
  const ghRaw = (cfg.github || '').replace(/^https?:\/\//, '');
  return {
    fullName,
    email,
    gh: ghRaw
  };
}

// کد QR مربوط به کارت تماس رو رسم می‌کنه
function renderContactQR() {
  const wrap = document.getElementById('qr-contact-wrap');
  if (!wrap) return;
  const img = wrap.querySelector('img');
  if (!img) return;
  const v = buildVCardString();
  const mecard = `MECARD:N:${v.fullName};EMAIL:${v.email};URL:https\\://${v.gh};;`;
  img.src = 'https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=6&data=' + encodeURIComponent(mecard);
}

// فایل کارت مخاطب (vCard) رو برای دانلود آماده می‌کنه
function downloadVCard() {
  const v = buildVCardString();
  const vcf = `BEGIN:VCARD\r\nVERSION:3.0\r\nFN:${v.fullName}\r\nEMAIL:${v.email}\r\nURL:https://${v.gh}\r\nEND:VCARD`;
  const blob = new Blob([vcf], {
    type: 'text/vcard'
  });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = v.fullName.replace(/\s+/g, '_') + '.vcf';
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('📇 فایل vCard دانلود شد');
}
setTimeout(renderContactQR, 600);

// ── Konami Code Easter Egg 🎮 ──
// تخم‌مرغ شانسی کد کونامی 🎮
(function konamiEgg() {
  const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let pos = 0;
  window.addEventListener('keydown', e => {
    pos = (e.key === seq[pos]) ? pos + 1 : (e.key === seq[0] ? 1 : 0);
    if (pos === seq.length) {
      pos = 0;
      if (typeof startParticleExplosion === 'function') startParticleExplosion();
      document.body.style.transition = 'filter .6s';
      document.body.style.filter = 'hue-rotate(180deg) saturate(1.6)';
      setTimeout(() => {
        document.body.style.filter = '';
      }, 3000);
      const t = document.createElement('div');
      t.className = 'theme-saved-toast';
      t.style.background = 'linear-gradient(135deg,#B34700,#FF7A1A)';
      t.innerHTML = '🎮 حالت مخفی مهندس فعال شد!';
      document.body.appendChild(t);
      requestAnimationFrame(() => t.classList.add('show'));
      setTimeout(() => {
        t.classList.remove('show');
        setTimeout(() => t.remove(), 300)
      }, 2600);
    }
  });
})();

// فرم تماس رو ارسال می‌کنه
function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('input[type=text]')?.value || '';
  const email = form.querySelector('input[type=email]')?.value || '';
  const subject = form.querySelectorAll('input[type=text]')[1]?.value || 'Portfolio Contact';
  const msg = form.querySelector('textarea')?.value || '';
  const mailtoLink = 'mailto:' + window.SiteData.config.email +
    '?subject=' + encodeURIComponent('[Portfolio] ' + subject) +
    '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
  window.location.href = mailtoLink;
  const btn = form.querySelector('button[type=submit]');
  const sp = btn.querySelector('span');
  btn.disabled = true;
  btn.style.opacity = '.7';
  sp.textContent = lang === 'en' ? 'Opening email…' : 'در حال باز کردن ایمیل…';
  const succ = form.querySelector('.form-success');
  if (succ) {
    succ.style.display = 'block'
  }
  setTimeout(() => {
    btn.disabled = false;
    btn.style.opacity = '';
    sp.textContent = lang === 'en' ? 'Send Message' : 'ارسال پیام';
    form.reset();
    if (succ) succ.style.display = 'none'
  }, 4000)
}

(function buildCal() {
  const grid = document.getElementById('cal-grid');
  const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  let offset = 3;
  for (let i = 0; i < offset; i++) {
    const d = document.createElement('div');
    d.className = 'cal-day disabled';
    grid.appendChild(d)
  }
  for (let d = 1; d <= 31; d++) {
    const el = document.createElement('div');
    el.className = 'cal-day' + (d < new Date().getDate() ? ' disabled' : '');
    el.textContent = d;
    if (d >= new Date().getDate()) el.onclick = () => {
      document.querySelectorAll('.cal-day.active').forEach(x => x.classList.remove('active'));
      el.classList.add('active')
    };
    grid.appendChild(el)
  }
})();

// یک بازه زمانی برای رزرو وقت انتخاب می‌کنه
function selectTime(btn) {
  document.querySelectorAll('.ts.active').forEach(b => b.classList.remove('active'));
  btn.classList.add('active')
}

// درخواست رزرو وقت رو ثبت می‌کنه
function bookMeeting(btn) {
  const orig = btn.innerHTML;
  btn.disabled = true;
  btn.style.opacity = '.7';
  const sp = btn.querySelector('span');
  sp.textContent = lang === 'en' ? 'Booking…' : 'در حال رزرو…';
  setTimeout(() => {
    sp.textContent = lang === 'en' ? 'Booked! ✓' : 'رزرو شد! ✓';
    btn.style.background = 'linear-gradient(135deg,#16a34a,#22c55e)';
    setTimeout(() => {
      btn.disabled = false;
      btn.style.opacity = '';
      btn.style.background = '';
      btn.innerHTML = orig
    }, 3500)
  }, 1800)
}


/* ═══ GITHUB LIVE DATA ═══ */
const GH_USER = window.SiteData.config.github.split('/').filter(Boolean).pop();
async function loadGitHub() {
  const wrap = document.getElementById('gh-profile-wrap');
  if (!wrap) return;
  try {
    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GH_USER}`),
      fetch(`https://api.github.com/users/${GH_USER}/repos?sort=stars&per_page=6`)
    ]);
    if (!profileRes.ok) throw new Error('GitHub API error');
    const profile = await profileRes.json();
    const repos = await reposRes.json();

    // Build contribution calendar (simulated — GitHub API doesn't expose this publicly)
    let calHtml = '';
    const levels = ['', 'l1', 'l2', 'l3', 'l4'];
    for (let i = 0; i < 52 * 5; i++) {
      const lvl = Math.random() > 0.45 ? levels[Math.floor(Math.random() * 4) + 1] : '';
      calHtml += `<div class="contrib-cell ${lvl}" title="contributions"></div>`;
    }

    const topRepos = Array.isArray(repos) ? repos.slice(0, 4) : [];
    const langColors = {
      Python: '#3572A5',
      JavaScript: '#f1e05a',
      'C++': '#f34b7d',
      C: '#555555',
      HTML: '#e34c26',
      Shell: '#89e051',
      Makefile: '#427819'
    };

    wrap.innerHTML = `
      <div class="gh-profile-card">
        <img class="gh-avatar" src="${profile.avatar_url}" alt="${profile.name}" loading="lazy">
        <div class="gh-info">
          <div class="gh-name">${profile.name || GH_USER}</div>
          <div class="gh-handle">@${profile.login}</div>
          <div class="gh-bio">${profile.bio || 'Electrical Engineering student & Industrial Automation Developer'}</div>
          <div class="gh-stats-row">
            <div class="gh-stat"><div class="gh-stat-n">${profile.public_repos||0}</div><div class="gh-stat-l">Repos</div></div>
            <div class="gh-stat"><div class="gh-stat-n">${profile.followers||0}</div><div class="gh-stat-l">Followers</div></div>
            <div class="gh-stat"><div class="gh-stat-n">${profile.following||0}</div><div class="gh-stat-l">Following</div></div>
          </div>
        </div>
        <a href="https://github.com/${GH_USER}" target="_blank" class="btn btn-o" style="align-self:flex-start"><i class="fab fa-github"></i> View Profile</a>
      </div>
      <div class="gh-repos-grid">
        ${topRepos.map(r => `
          <a href="${r.html_url}" target="_blank" class="gh-repo-card" style="text-decoration:none">
            <div class="gh-repo-name"><i class="fa-solid fa-book-open" style="font-size:.75rem;margin-right:5px"></i>${r.name}</div>
            <div class="gh-repo-desc">${r.description || 'No description'}</div>
            <div class="gh-repo-meta">
              ${r.language ? `<span class="gh-repo-lang"><span class="gh-repo-lang-dot" style="background:${langColors[r.language]||'#888'}"></span>${r.language}</span>` : ''}
              <span class="gh-repo-stars"><i class="fa-solid fa-star" style="color:#fbbf24"></i> ${r.stargazers_count}</span>
              <span class="gh-repo-stars"><i class="fa-solid fa-code-branch"></i> ${r.forks_count}</span>
            </div>
          </a>`).join('')}
      </div>
      <div class="cal-contrib">
        <h4>Contribution Activity (last year)</h4>
        <div class="contrib-grid">${calHtml}</div>
        <div class="contrib-legend">Less <div class="contrib-cell"></div><div class="contrib-cell l1"></div><div class="contrib-cell l2"></div><div class="contrib-cell l3"></div><div class="contrib-cell l4"></div> More</div>
      </div>`;
  } catch (err) {
    const wrap2 = document.getElementById('gh-profile-wrap');
    if (wrap2) wrap2.innerHTML = `<div class="gh-error"><i class="fab fa-github" style="font-size:2rem;margin-bottom:8px;display:block;color:var(--ac2)"></i>View my work on <a href="https://github.com/${GH_USER}" target="_blank" style="color:var(--ac2)">GitHub</a></div>`;
  }
}
loadGitHub();

/* ═══ RADAR ANIMATION ON SCROLL ═══ */
const radarObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const poly = document.getElementById('radar-data');
      if (poly) {
        poly.style.opacity = '0';
        setTimeout(() => {
          poly.style.opacity = '1';
          poly.style.filter = 'drop-shadow(0 0 8px rgba(255,122,26,.5))';
        }, 100);
      }
      radarObs.unobserve(e.target);
    }
  });
}, {
  threshold: 0.3
});
const radarWrap = document.getElementById('skill-radar-wrap');
if (radarWrap) radarObs.observe(radarWrap);

/* ═══ SERVICE WORKER ═══ */
if ('serviceWorker' in navigator) {
  const swCode = `
const CACHE='ahs-v1';
const ASSETS=['/'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(ca=>ca.put(e.request,c));return r}).catch(()=>caches.match(e.request)));});
  `;
  const swBlob = new Blob([swCode], {
    type: 'text/javascript'
  });
  const swUrl = URL.createObjectURL(swBlob);
  navigator.serviceWorker.register(swUrl, {
    scope: './'
  }).catch(() => {});
}

/* ═══ PWA INSTALL PROMPT ═══ */
let deferredPrompt;

// Inject install banner styles
const pwaStyle = document.createElement('style');
pwaStyle.textContent = `
#pwa-banner{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(120px);z-index:9000;display:flex;align-items:center;gap:14px;padding:14px 20px;background:rgba(7,16,30,0.96);border:1px solid rgba(255,122,26,0.4);border-radius:18px;backdrop-filter:blur(20px);box-shadow:0 8px 40px rgba(255,122,26,0.25);transition:transform 0.5s cubic-bezier(.34,1.2,.64,1);min-width:280px;max-width:360px}
#pwa-banner.show{transform:translateX(-50%) translateY(0)}
#pwa-banner-logo{width:44px;height:44px;flex-shrink:0}
#pwa-banner-text{flex:1}
#pwa-banner-title{font-family:var(--mo);font-size:.8rem;font-weight:700;color:#D8EEFF;letter-spacing:1px}
#pwa-banner-sub{font-size:.7rem;color:#3A80C0;margin-top:2px}
#pwa-banner-install{background:linear-gradient(135deg,#1E7FCC,#3FA0E8);color:#fff;border:none;border-radius:10px;padding:8px 16px;font-size:.75rem;font-weight:700;font-family:var(--fn);cursor:pointer;white-space:nowrap;letter-spacing:.5px;transition:all .2s}
#pwa-banner-install:hover{transform:scale(1.04);box-shadow:0 4px 16px rgba(30,127,204,.5)}
#pwa-banner-close{background:none;border:none;color:#3A80C0;cursor:pointer;font-size:.9rem;padding:4px;line-height:1;transition:color .2s;flex-shrink:0}
#pwa-banner-close:hover{color:#D8EEFF}
#pwa-nav-btn{display:none}
`;
document.head.appendChild(pwaStyle);

// بنر نصب اپلیکیشن (PWA) رو می‌سازه
function createPWABanner() {
  if (document.getElementById('pwa-banner')) return;
  const banner = document.createElement('div');
  banner.id = 'pwa-banner';
  banner.innerHTML = `
    <svg id="pwa-banner-logo" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
      <circle cx="160" cy="160" r="156" fill="#050C18"/>
      <circle cx="160" cy="160" r="156" fill="none" stroke="#1E7FCC" stroke-width="4"/>
      <circle cx="160" cy="160" r="131" fill="none" stroke="#0C2848" stroke-width="0.5"/>
      <circle cx="160" cy="160" r="106" fill="#07101E" stroke="#0F2C50" stroke-width="1.2"/>
      <circle cx="160" cy="100" r="32" fill="#060E1C" stroke="#1A5F9E" stroke-width="1.4"/>
      <line x1="160" y1="80" x2="160" y2="120" stroke="#1E7FCC" stroke-width="3"/>
      <line x1="140" y1="100" x2="180" y2="100" stroke="#1E7FCC" stroke-width="3"/>
      <circle cx="150" cy="90" r="3" fill="#3FA0E8"/><circle cx="170" cy="90" r="3" fill="#3FA0E8"/>
      <circle cx="150" cy="110" r="3" fill="#3FA0E8"/><circle cx="170" cy="110" r="3" fill="#3FA0E8"/>
      <circle cx="160" cy="100" r="8" fill="none" stroke="#5BB8FF" stroke-width="2"/>
      <text x="160" y="158" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="800" font-size="19" fill="#D8EEFF" letter-spacing="2">AMIRHOSIN</text>
      <text x="160" y="179" text-anchor="middle" font-family="Segoe UI,Arial,sans-serif" font-weight="300" font-size="9" fill="#3A80C0" letter-spacing="5">SEKHAVATFAR</text>
    </svg>
    <div id="pwa-banner-text">
      <div id="pwa-banner-title">AHS.dev</div>
      <div id="pwa-banner-sub">Add to Home Screen</div>
    </div>
    <button id="pwa-banner-install"><i class="fa-solid fa-plus"></i> Install</button>
    <button id="pwa-banner-close"><i class="fa-solid fa-xmark"></i></button>
  `;
  document.body.appendChild(banner);
  setTimeout(() => banner.classList.add('show'), 100);

  banner.querySelector('#pwa-banner-install').onclick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const {
      outcome
    } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      banner.remove();
      showToast('✅ App installed!');
    }
    deferredPrompt = null;
  };
  banner.querySelector('#pwa-banner-close').onclick = () => {
    banner.style.transform = 'translateX(-50%) translateY(120px)';
    setTimeout(() => banner.remove(), 500);
  };
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  setTimeout(createPWABanner, 3000);
});

window.addEventListener('appinstalled', () => {
  const b = document.getElementById('pwa-banner');
  if (b) b.remove();
  showToast('🎉 AHS.dev installed!');
});

/* ═══ LAZY SECTION LOADING ═══ */
const lazySections = document.querySelectorAll('.sec');
const lazyObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.contentVisibility = 'visible';
      lazyObs.unobserve(e.target);
    }
  });
}, {
  rootMargin: '200px'
});
lazySections.forEach(s => lazyObs.observe(s));

/* ═══ SKILL BAR TOOLTIPS ═══ */
document.querySelectorAll('.sb-wrap').forEach(wrap => {
  const label = wrap.querySelector('.sb-lbl span:first-child')?.textContent || '';
  const pct = wrap.querySelector('.sb-lbl span:last-child')?.textContent || '';
  const tip = document.createElement('div');
  tip.className = 'sk-tooltip';
  tip.textContent = label + ' — ' + pct + ' proficiency';
  wrap.appendChild(tip);
});

// لینک ویدیو رو به فرمت قابل‌نمایش (embed) تبدیل می‌کنه
function getVideoEmbed(url) {
  if (!url || !url.trim()) return null;
  url = url.trim().replace(/^['"]|['"]$/g, ''); // اگه کوتیشن اضافه دور لینک مونده بود، پاکش کن
  // YouTube watch / youtu.be
  let m = url.match(/(?:youtube\.com\/watch\?.*v=|youtu\.be\/)([^&?\s/#]+)/);
  if (m) return 'https://www.youtube.com/embed/' + m[1] + '?autoplay=1&rel=0&modestbranding=1';
  // YouTube shorts
  m = url.match(/youtube\.com\/shorts\/([^?&\s/#]+)/);
  if (m) return 'https://www.youtube.com/embed/' + m[1] + '?autoplay=1&rel=0';
  // YouTube live
  m = url.match(/youtube\.com\/live\/([^?&\s/#]+)/);
  if (m) return 'https://www.youtube.com/embed/' + m[1] + '?autoplay=1&rel=0';
  // YouTube — already an embed link
  m = url.match(/youtube\.com\/embed\/([^?&\s/#]+)/);
  if (m) return 'https://www.youtube.com/embed/' + m[1] + '?autoplay=1&rel=0&modestbranding=1';
  // Aparat — extract hash from URL like /v/AbCdEf یا /v/AbCdEf/...
  m = url.match(/aparat\.com\/v\/([^/?&#\s]+)/);
  if (m) return 'https://www.aparat.com/video/video/embed/videohash/' + m[1] + '/vt/frame?titleshow=true&autoplay=1';
  // Aparat — لینکی که از قبل embed هست
  m = url.match(/aparat\.com\/video\/video\/embed\/videohash\/([^/?&#\s]+)/);
  if (m) return 'https://www.aparat.com/video/video/embed/videohash/' + m[1] + '/vt/frame?titleshow=true&autoplay=1';
  // Aparat short share — مثل aparat.com/xyzAB12
  m = url.match(/aparat\.com\/([A-Za-z0-9]{4,15})(?:$|[/?#])/);
  if (m) return 'https://www.aparat.com/video/video/embed/videohash/' + m[1] + '/vt/frame?autoplay=1';
  // Direct video file
  if (/\.(mp4|webm|ogg)([?#]|$)/i.test(url)) return url;
  return null;
}

// پخش‌کننده تمام‌صفحه ویدیوی پروژه رو می‌بنده
function closeReel() {
  document.getElementById('fullscreen-overlay').classList.remove('open');
  document.body.style.overflow = '';
  const wrap = document.getElementById('fs-vm-media-wrap');
  if (wrap) wrap.innerHTML = '';
  const vm = document.getElementById('fs-video-modal');
  vm.classList.remove('fs-active');
  setTimeout(() => {
    vm.style.display = 'none';
  }, 350);
}

// اگه بیرون پخش‌کننده کلیک شد، می‌بندش
function closeReelIfOutside(e) {
  if (e.target === document.getElementById('fullscreen-overlay')) closeReel()
}

// یه ویدیوی پروژه رو (از لینک یوتیوب/آپارات/فایل مستقیم mp4) به‌صورت تمام‌صفحه باز می‌کنه
// از همون پخش‌کننده‌ی ویدیوییِ ریلز/ویدیوها استفاده می‌کنه، فقط بدون فیلدهای مخصوص ریل (لایک/بازدید و…)
function openProjectVideo(url, title) {
  const embedUrl = getVideoEmbed(url || '');
  if (!embedUrl) {
    // اگه لینک رو نتونستیم تشخیص بدیم، به‌جای این‌که دکمه هیچ‌کاری نکنه،
    // خودِ لینک رو مستقیم توی تب جدید باز می‌کنیم — همیشه یه اتفاقی می‌افته
    if (url) window.open(url, '_blank', 'noopener');
    return;
  }

  const ov = document.getElementById('fullscreen-overlay');
  const videoModal = document.getElementById('fs-video-modal');

  videoModal.style.display = 'flex';
  videoModal.classList.add('fs-active');

  document.getElementById('fs-vm-title').textContent = title || '';
  document.getElementById('fs-vm-date').textContent = '';
  document.getElementById('fs-vm-views').textContent = '';
  document.getElementById('fs-vm-tags').innerHTML = '';
  document.getElementById('fs-like-count').textContent = '';

  const wrap = document.getElementById('fs-vm-media-wrap');
  wrap.innerHTML = '';
  const isMP4 = /\.(mp4|webm|ogg)/i.test(embedUrl);
  if (isMP4) {
    const v = document.createElement('video');
    v.src = embedUrl;
    v.controls = true;
    v.autoplay = true;
    v.style.cssText = 'width:100%;aspect-ratio:16/9;display:block;background:#000';
    wrap.appendChild(v);
  } else {
    const fr = document.createElement('iframe');
    fr.src = embedUrl;
    fr.frameBorder = '0';
    fr.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    fr.allowFullscreen = true;
    fr.style.cssText = 'width:100%;aspect-ratio:16/9;display:block;border:none;background:#000';
    wrap.appendChild(fr);
  }

  ov.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// یه فایل HTML بخش «ابزارهای مهندسی» رو به‌صورت تمام‌صفحه باز می‌کنه
function openEngTool(filePath, btnEl) {
  const modal = document.getElementById('tool-fullscreen-modal');
  const iframe = document.getElementById('tool-fs-iframe');
  const titleEl = document.getElementById('tool-fs-title');
  if (!modal || !iframe) return;

  const isFa = document.documentElement.lang === 'fa' || document.body.classList.contains('rtl');
  const card = btnEl ? btnEl.closest('.tool-card') : null;
  const titleNode = card ? card.querySelector('.tool-title') : null;
  titleEl.textContent = titleNode ? titleNode.textContent : (isFa ? 'ابزار مهندسی' : 'Engineering Tool');

  iframe.src = filePath;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

// پنجره‌ی تمام‌صفحه‌ی ابزار مهندسی رو می‌بنده
function closeEngTool() {
  const modal = document.getElementById('tool-fullscreen-modal');
  const iframe = document.getElementById('tool-fs-iframe');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  // با تأخیر کوچیک، سورس iframe رو خالی می‌کنیم تا اجرای فایل (مثلاً شبیه‌سازی) واقعاً متوقف بشه
  setTimeout(() => { if (iframe) iframe.src = 'about:blank'; }, 300);
}

// لایک ویدیوی پروژه در حالت تمام‌صفحه رو روشن/خاموش می‌کنه
function toggleFsLike() {
  const btn = document.getElementById('fs-vm-like-btn');
  if (!btn) return;
  btn.classList.toggle('active');
  const icon = btn.querySelector('i');
  icon.className = btn.classList.contains('active') ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
}

// ذخیره ویدیوی پروژه در حالت تمام‌صفحه رو روشن/خاموش می‌کنه
function toggleFsSave() {
  const btn = document.getElementById('fs-vm-save-btn');
  if (!btn) return;
  btn.classList.toggle('active');
  const span = btn.querySelector('span');
  if (span) span.textContent = btn.classList.contains('active') ? 'Saved' : 'Save';
}

document.addEventListener('keydown', e => {
  if (document.getElementById('fullscreen-overlay').classList.contains('open')) {
    if (e.key === 'Escape') closeReel();
  }
  const toolModal = document.getElementById('tool-fullscreen-modal');
  if (toolModal && toolModal.classList.contains('open') && e.key === 'Escape') closeEngTool();
});

/* ═══ POSTS ═══ */
// لایک یک پست رو روشن/خاموش می‌کنه
function togglePostLike(btn) {
  btn.classList.toggle('liked');
  const i = btn.querySelector('i');
  const isLiked = btn.classList.contains('liked');
  i.className = isLiked ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  const txt = btn.textContent.trim();
  const num = parseInt(txt.replace(/\D/g, ''));
  btn.innerHTML = (isLiked ? '<i class="fa-solid fa-heart"></i> ' : '<i class="fa-regular fa-heart"></i> ') + (isLiked ? num + 1 : num - 1)
}

// ذخیره یک پست رو روشن/خاموش می‌کنه
function togglePostSave(btn) {
  btn.classList.toggle('saved');
  const i = btn.querySelector('i');
  i.className = btn.classList.contains('saved') ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
  btn.lastChild.textContent = btn.classList.contains('saved') ? ' Saved' : ' Save'
}

// پست‌ها رو بر اساس نوع فیلتر می‌کنه
function filterPosts(type, btn) {
  document.querySelectorAll('.pfl').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#posts-feed .post-card, #posts-feed .announcement-banner').forEach(c => {
    c.style.display = (type === 'all' || c.dataset.postType === type) ? '' : 'none'
  })
}

// پست‌های بیشتر رو نمایش می‌ده
function loadMorePosts(btn) {
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Loading…</span>';
  setTimeout(() => {
    btn.innerHTML = '<i class="fa-solid fa-check"></i> <span>All posts loaded</span>';
    btn.style.opacity = '.5'
  }, 1500)
}

/* ═══ CAROUSEL ═══ */
const carouselState = {};

// اسلایدر رو یک قدم جابه‌جا می‌کنه
function moveCarousel(wrapId, trackId, dotsId, dir) {
  const track = document.getElementById(trackId);
  const dots = document.getElementById(dotsId);
  const n = track.children.length;
  if (!carouselState[trackId]) carouselState[trackId] = 0;
  let idx = carouselState[trackId] + dir;
  if (idx < 0) idx = n - 1;
  if (idx >= n) idx = 0;
  goCarousel(trackId, dotsId, idx)
}

// اسلایدر رو به یک اسلاید مشخص می‌بره
function goCarousel(trackId, dotsId, idx) {
  const track = document.getElementById(trackId);
  const dots = document.getElementById(dotsId);
  carouselState[trackId] = idx;
  track.style.transform = `translateX(-${idx*100}%)`;
  if (dots) {
    dots.querySelectorAll('.c-dot').forEach((d, i) => d.classList.toggle('active', i === idx))
  }
}


/* ═══ AI CHATBOT ═══ */
// پنجره ربات گفتگو رو باز/بسته می‌کنه (چه دسکتاپ چه موبایل، به‌صورت تمام‌صفحه)
function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('ai-chat-window');
  const icon = document.getElementById('chat-fab-icon');
  const badge = document.getElementById('ai-chat-badge');
  if (chatOpen) {
    win.classList.add('open');
    icon.className = 'fa-solid fa-xmark';
    badge.style.display = 'none';
    document.body.style.overflow = 'hidden';
    document.getElementById('chat-input').focus();
  } else {
    win.classList.remove('open');
    icon.className = 'fa-solid fa-robot';
    badge.style.display = 'flex';
    document.body.style.overflow = '';
    // با بسته شدن چت، پاپ‌آپ سوالات هم بسته بشه (ولی خودِ لیست حذف نمی‌شه)
    toggleChatFaq(false);
  }
}

// توپ شناورِ سوالات: پاپ‌آپ لیست سوالات رو باز/بسته می‌کنه بدون این‌که
// چیزی از DOM حذف بشه — پس لیست سوالات همیشه همون‌جاست و از بین نمی‌ره
function toggleChatFaq(force) {
  const popup = document.getElementById('chat-faq-popup');
  const ball = document.getElementById('chat-faq-ball');
  if (!popup) return;
  const shouldOpen = typeof force === 'boolean' ? force : !popup.classList.contains('open');
  popup.classList.toggle('open', shouldOpen);
  if (ball) ball.classList.toggle('active', shouldOpen);
}

// یک پیام آماده به ربات گفتگو می‌فرسته
function sendQuick(msg) {
  document.getElementById('chat-input').value = msg;
  sendChat();
  // بعد از پرسیدن سوال، پاپ‌آپ بسته می‌شه ولی لیست سوالات پاک نمی‌شه
  // و کاربر می‌تونه دوباره با زدن توپ شناور بازش کنه
  toggleChatFaq(false);
}

// متن رو کاراکتر به کاراکتر داخل یک المان نمایش می‌ده (افکت تایپ)
function typeMessage(el, text, speed) {
  return new Promise(resolve => {
    let i = 0;
    el.textContent = '';
    const msgs = document.getElementById('chat-messages');
    const timer = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (msgs) msgs.scrollTop = msgs.scrollHeight;
      if (i >= text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';

  const msgs = document.getElementById('chat-messages');

  // Add user message
  const userEl = document.createElement('div');
  userEl.className = 'chat-msg user';
  userEl.textContent = msg;
  msgs.appendChild(userEl);
  msgs.scrollTop = msgs.scrollHeight;

  // Add typing indicator
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-msg typing';
  typingEl.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  msgs.appendChild(typingEl);
  msgs.scrollTop = msgs.scrollHeight;

  // یه مکث کوتاه و طبیعی قبل از پاسخ ربات آفلاین
  await new Promise(r => setTimeout(r, 350 + Math.random() * 350));

  // تشخیص زبان به‌صورت مستقل از ChatbotEngine، تا حتی اگه خودِ موتور
  // چت‌بات درست لود نشده باشه، پیام خطا هم باز به فارسی/انگلیسیِ درست نشون داده بشه
  const safeLang = /[\u0600-\u06FF]/.test(msg)
    ? 'fa'
    : ((window.chatLang || document.documentElement.lang) === 'fa' ? 'fa' : 'en');

  const fallbackAnswer = {
    text: (safeLang === 'fa'
      ? 'مشکلی پیش اومد. برای تماس مستقیم: ایمیل ' + (window.SiteData && window.SiteData.config && window.SiteData.config.email || '') + (window.SiteData && window.SiteData.config && window.SiteData.config.telegram ? ' یا تلگرام ' + window.SiteData.config.telegram.replace('https://t.me/', '@') : '')
      : 'Something went wrong. For direct contact, email: ' + (window.SiteData && window.SiteData.config && window.SiteData.config.email || '') + (window.SiteData && window.SiteData.config && window.SiteData.config.telegram ? ' or Telegram: ' + window.SiteData.config.telegram.replace('https://t.me/', '@') : '')),
    suggestions: []
  };

  let answer;
  try {
    answer = window.ChatbotEngine && window.ChatbotEngine.ask(msg);
  } catch (err) {
    console.error('Chatbot error:', err);
    answer = null;
  }

  // اگه هر دلیلی پاسخ نامعتبر/خالی برگشت، به‌جای گیر کردنِ ابدی روی «...در حال تایپ»
  // همون پیام خطای امن رو نشون می‌دیم تا کاربر همیشه یه جواب ببینه
  if (!answer || typeof answer.text !== 'string' || !answer.text.trim()) {
    answer = fallbackAnswer;
  }

  typingEl.remove();

  const botEl = document.createElement('div');
  botEl.className = 'chat-msg bot';
  msgs.appendChild(botEl);

  const speed = (window.ChatbotConfig && window.ChatbotConfig.typingSpeed) || 18;
  await typeMessage(botEl, answer.text, speed);

  if (window.ChatbotConfig && window.ChatbotConfig.showSource && answer.source) {
    const srcEl = document.createElement('div');
    srcEl.className = 'chat-msg-source';
    const answerLang = window.ChatbotEngine.detectLang(msg);
    srcEl.textContent = (answerLang === 'fa' ? 'منبع: ' : 'Source: ') + answer.source;
    msgs.appendChild(srcEl);
  }

  if (window.ChatbotConfig && window.ChatbotConfig.showSuggestions && answer.suggestions && answer.suggestions.length) {
    const sugWrap = document.createElement('div');
    sugWrap.className = 'chat-msg-suggestions';
    answer.suggestions.forEach(s => {
      const b = document.createElement('button');
      b.className = 'chat-quick-btn';
      b.type = 'button';
      b.textContent = s;
      b.onclick = () => sendQuick(s);
      sugWrap.appendChild(b);
    });
    msgs.appendChild(sugWrap);
  }

  msgs.scrollTop = msgs.scrollHeight;
}

/* ═══ EXPERIENCE TABS ═══ */
// تب بخش تجربه تعاملی رو عوض می‌کنه
function switchExpTab(tabId, btn) {
  document.querySelectorAll('.exp-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const panel = document.getElementById('exp-' + tabId);
  if (panel) panel.classList.add('active');
  // re-trigger reveals inside panel
  panel.querySelectorAll('.reveal').forEach((el, i) => {
    el.classList.remove('visible');
    setTimeout(() => el.classList.add('visible'), 80 * i);
  });
}

/* ═══ ENHANCED PROJECT FILTERING ═══ */
// پروژه‌ها رو بر اساس دسته‌بندی فیلتر می‌کنه
function filterProjects() {
  const search = document.getElementById('proj-search')?.value.toLowerCase() || '';
  const activeFilter = document.querySelector('.pf .fb.active')?.dataset.filter || 'all';
  const grid = document.getElementById('proj-grid');
  if (!grid) return;

  const cards = grid.querySelectorAll('.pc');
  let visible = 0;
  cards.forEach(card => {
    const title = (card.querySelector('.ptitle')?.textContent || '').toLowerCase();
    const desc = (card.querySelector('.pdesc')?.textContent || '').toLowerCase();
    const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase()).join(' ');
    const cat = card.dataset.category || '';

    const matchSearch = !search || title.includes(search) || desc.includes(search) || tags.includes(search);
    const matchFilter = activeFilter === 'all' || cat === activeFilter;

    if (matchSearch && matchFilter) {
      card.style.display = '';
      card.classList.remove('hidden');
      visible++;
    } else {
      card.classList.add('hidden');
      setTimeout(() => {
        if (card.classList.contains('hidden')) card.style.display = 'none';
      }, 350);
    }
  });

  const badge = document.getElementById('proj-count');
  if (badge) badge.textContent = visible + ' project' + (visible !== 1 ? 's' : '');

  const noRes = document.getElementById('proj-no-results');
  if (noRes) noRes.style.display = visible === 0 ? 'block' : 'none';
}

// Patch existing filter buttons to also call filterProjects
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pf .fb').forEach(btn => {
    const origClick = btn.onclick;
    btn.onclick = function(e) {
      if (origClick) origClick.call(this, e);
      filterProjects();
    };
  });
});

// ترتیب نمایش پروژه‌ها رو عوض می‌کنه
function sortProjects(by, btn) {
  document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('proj-grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.pc'));
  if (by === 'name') {
    cards.sort((a, b) => (a.querySelector('.ptitle')?.textContent || '').localeCompare(b.querySelector('.ptitle')?.textContent || ''));
  } else if (by === 'category') {
    cards.sort((a, b) => (a.dataset.category || '').localeCompare(b.dataset.category || ''));
  } else {
    cards.sort((a, b) => (a.dataset.origIdx || 0) - (b.dataset.origIdx || 0));
  }
  cards.forEach((card, i) => {
    card.dataset.origIdx = card.dataset.origIdx || i;
    grid.appendChild(card);
  });
}

/* ═══ SCROLL REVEAL ═══ */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach((el, i) => {
  el.dataset.origIdx = i;
  revealObs.observe(el);
});

// Store original indices for project cards
document.querySelectorAll('#proj-grid .pc').forEach((card, i) => {
  card.dataset.origIdx = i;
});

/* ═══ MAGNETIC BUTTONS ═══ */
document.querySelectorAll('.btn-p, .btn-o').forEach(btn => {
  btn.classList.add('btn-mag');
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    this.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

/* ═══ EXPERIENCE CARD MOUSE TRACKING ═══ */
document.querySelectorAll('.exp-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
    this.style.setProperty('--mx', x + '%');
    this.style.setProperty('--my', y + '%');
  });
});

/* ═══ PARTICLE ENHANCEMENTS ═══ */
// Additional glow colors for particles
const origNewP = window.newP;

/* ═══ SMOOTH REVEAL FOR HERO ELEMENTS ═══ */
/* Removed — handled by CSS heroItemIn animation to avoid conflict */


/* ═══════════════════ CINEMATIC ENGINE ═══════════════════ */

// ── 0. JSON-DRIVEN VIDEO INTRO (circuit lab / ESP32 / holographic, ~15s) ──
// ۰- اینتروی ویدیویی (حدود ۱۵ ثانیه)
(function videoIntro() {
  const intro = document.getElementById('video-intro');
  if (!intro) return;
  // Skip intro entirely if this is an exported file
  if (typeof AHS_IS_EXPORTED !== 'undefined' && AHS_IS_EXPORTED) {
    intro.style.display = 'none';
    return;
  }
  const canvas = document.getElementById('vi-grid-canvas');
  const textEl = document.getElementById('vi-text-target');
  const skipBtn = document.getElementById('vi-skip-btn');

  // text_sequence from the source prompt
  const sequence = [{
      main: 'Amir Hosin Sekhavatfar',
      sub: ''
    },
    {
      main: 'Electrical Engineering Student',
      sub: ''
    },
    {
      main: 'ESP32 & IoT Developer',
      sub: ''
    },
    {
      main: 'Embedded Systems Engineer',
      sub: ''
    },
    {
      main: 'Portfolio 2026',
      sub: ''
    }
  ];
  const STEP_MS = 3000; // matches vi-text-cycle animation duration
  const TOTAL_MS = sequence.length * STEP_MS; // ~15s total, matches "duration":"15s"
  let stepIndex = 0;
  let timers = [];
  let finished = false;

  function clearTimers() {
    timers.forEach(t => clearTimeout(t));
    timers = [];
  }

  function playStep(i) {
    if (finished || i >= sequence.length) return;
    textEl.classList.remove('vi-active');
    textEl.style.animation = 'none';
    textEl.textContent = sequence[i].main;
    void textEl.offsetWidth; // restart animation
    textEl.style.animation = '';
    textEl.classList.add('vi-active');
    if (i < sequence.length - 1) {
      timers.push(setTimeout(() => playStep(i + 1), STEP_MS));
    }
  }

  function finishIntro() {
    if (finished) return;
    finished = true;
    clearTimers();
    intro.classList.add('vi-bars-out');
    const content = intro.querySelector('.vi-chip');
    if (content) content.style.animation = 'none';
    intro.classList.add('vi-zoom-out');
    setTimeout(() => {
      intro.classList.add('vi-hide');
      setTimeout(() => {
        intro.style.display = 'none';
      }, 950);
    }, 380);
  }

  skipBtn?.addEventListener('click', finishIntro);

  // ── circuit-grid canvas: drifting nodes + connecting energy lines ──
  let raf;

  function initGrid() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, nodes = [];

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(60, Math.floor((w * h) / 26000));
      nodes = Array.from({
        length: count
      }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6
      }));
    }
    resize();
    window.addEventListener('resize', resize);

    function tick() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,122,26,0.18)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.globalAlpha = 1 - dist / 140;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = '#7FE8A4';
        ctx.shadowColor = '#35C7C2';
        ctx.shadowBlur = 6;
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      if (!finished || intro.style.display !== 'none') raf = requestAnimationFrame(tick);
    }
    tick();
  }
  initGrid();

  playStep(0);
  timers.push(setTimeout(finishIntro, TOTAL_MS));
})();

// ── 1. INTRO SEQUENCE ──
// ۱- توالی مقدمه
(function cinemaIntro() {
  const intro = document.getElementById('cinema-intro');
  if (!intro) return;
  // Skip if this is an exported file
  if (typeof AHS_IS_EXPORTED !== 'undefined' && AHS_IS_EXPORTED) {
    intro.style.display = 'none';
    return;
  }
  // After loader finishes (~2.2s), play cinematic outro
  setTimeout(() => {
    intro.classList.add('done');
    setTimeout(() => {
      intro.style.display = 'none';
      startParticleExplosion();
    }, 1200);
  }, 1800);
})();

// ── 2. PARTICLE EXPLOSION ──
// ۲- انفجار ذرات
// افکت انفجار ذرات رو اجرا می‌کنه
function startParticleExplosion() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add('active');

  const cx = canvas.width / 2,
    cy = canvas.height / 2;
  const colors = ['#FF7A1A', '#35C7C2', '#7FE8A4', '#FFC857', '#9FEAE6', '#ffffff'];
  const particles = [];

  for (let i = 0; i < 180; i++) {
    const angle = (Math.PI * 2 / 180) * i + Math.random() * 0.3;
    const speed = 3 + Math.random() * 9;
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      life: 1,
      decay: 0.012 + Math.random() * 0.018,
      gravity: 0.08 + Math.random() * 0.06
    });
  }

  function drawExplosion() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    particles.forEach(p => {
      if (p.alpha <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= 0.98;
      p.life -= p.decay;
      p.alpha = Math.max(0, p.life);
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    if (alive) requestAnimationFrame(drawExplosion);
    else {
      canvas.classList.remove('active');
    }
  }
  drawExplosion();
}

// ── 3. 3D TILT EFFECT ──
// ۳- افکت کج‌شدن سه‌بعدی
// افکت کج‌شدن سه‌بعدی کارت‌ها هنگام حرکت ماوس رو راه‌اندازی می‌کنه
function initTilt() {
  const tiltEls = document.querySelectorAll('.pc, .sk, .exp-card, .blog-card, .gh-repo-card, .ach-card');
  tiltEls.forEach(el => {
    // Add shine layer
    if (!el.querySelector('.tilt-shine')) {
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      el.style.position = 'relative';
      el.appendChild(shine);
    }
    el.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const tiltX = y * -14;
      const tiltY = x * 14;
      this.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(8px)`;
      const shine = this.querySelector('.tilt-shine');
      if (shine) {
        shine.style.setProperty('--sx', ((e.clientX - rect.left) / rect.width * 100) + '%');
        shine.style.setProperty('--sy', ((e.clientY - rect.top) / rect.height * 100) + '%');
      }
    });
    el.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), border-color .3s, box-shadow .3s';
      setTimeout(() => this.style.transition = '', 500);
    });
  });
}
setTimeout(initTilt, 2500);

// ── 4. CINEMATIC SCROLL REVEALS ──
// ۴- نمایان‌شدن سینمایی هنگام اسکرول
// افکت نمایان‌شدن سینمایی بخش‌ها هنگام اسکرول رو راه‌اندازی می‌کنه
function initCinScroll() {
  // Add classes to section headers and content
  document.querySelectorAll('.sec-title, .sec-sub, .sec-label').forEach((el, i) => {
    el.classList.add('cin-section');
    el.style.transitionDelay = (i % 3 * 0.1) + 's';
  });
  document.querySelectorAll('.about-bio').forEach(el => el.classList.add('cin-section-left'));
  document.querySelectorAll('.about-grid > div:last-child').forEach(el => el.classList.add('cin-section-right'));
  document.querySelectorAll('.pc').forEach((el, i) => {
    el.classList.add('cin-section');
    el.style.transitionDelay = (i % 3 * 0.12) + 's';
  });
  document.querySelectorAll('.sk').forEach((el, i) => {
    el.classList.add('cin-section');
    el.style.transitionDelay = (i % 3 * 0.1) + 's';
  });
  document.querySelectorAll('.hcard').forEach((el, i) => {
    el.classList.add('cin-section');
    el.style.transitionDelay = (i * 0.1) + 's';
  });
  document.querySelectorAll('.blog-card').forEach((el, i) => {
    el.classList.add('cin-section');
    el.style.transitionDelay = (i * 0.12) + 's';
  });
  document.querySelectorAll('.fi').forEach((el, i) => {
    el.classList.add('cin-section');
    el.style.transitionDelay = (i * 0.08) + 's';
  });
  document.querySelectorAll('.ach-card').forEach((el, i) => {
    el.classList.add('cin-section');
    el.style.transitionDelay = (i % 3 * 0.1) + 's';
  });

  const cinObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('cin-visible');
        cinObs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.cin-section, .cin-section-left, .cin-section-right').forEach(el => cinObs.observe(el));
}
setTimeout(initCinScroll, 100);

// ── 5. PARALLAX HERO ──
// ۵- پارالاکس بخش اصلی
(function initParallax() {
  const hero = document.getElementById('hero');
  const imgWrap = document.querySelector('.hero-img-wrap');
  const floaters = document.querySelectorAll('.fc');
  if (!hero) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const prog = Math.min(y / window.innerHeight, 1);
      if (imgWrap) imgWrap.style.transform = `translateY(${y * 0.18}px) scale(${1 - prog * 0.06})`;
      floaters.forEach((f, i) => {
        f.style.transform = `translateY(${y * (0.06 + i * 0.04)}px)`;
      });
      // Fade hero on scroll
      if (hero) hero.style.opacity = Math.max(0, 1 - prog * 1.6);
      ticking = false;
    });
  }, {
    passive: true
  });
})();

// ── 6. TEXT SCRAMBLE EFFECT ──
// ۶- افکت درهم‌ریختن متن
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const old = this.el.innerText;
    const len = Math.max(old.length, newText.length);
    const p = new Promise(res => this.resolve = res);
    this.queue = [];
    for (let i = 0; i < len; i++) {
      const from = old[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 16);
      const end = start + Math.floor(Math.random() * 16);
      this.queue.push({
        from,
        to,
        start,
        end
      });
    }
    cancelAnimationFrame(this.frameReq);
    this.frame = 0;
    this.update();
    return p;
  }
  update() {
    let output = '',
      complete = 0;
    this.queue.forEach((item, i) => {
      const {
        from,
        to,
        start,
        end
      } = item;
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!item.char || Math.random() < 0.28) item.char = this.chars[Math.floor(Math.random() * this.chars.length)];
        output += `<span style="color:var(--ac3);opacity:.6">${item.char}</span>`;
      } else output += from;
    });
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameReq = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Apply scramble to section titles on reveal
setTimeout(() => {
  const titleObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.scrambled) {
        e.target.dataset.scrambled = '1';
        const scrambler = new TextScramble(e.target);
        const text = e.target.innerText;
        setTimeout(() => scrambler.setText(text), 200);
        titleObs.unobserve(e.target);
      }
    });
  }, {
    threshold: 0.5
  });
  document.querySelectorAll('.sec-label').forEach(el => titleObs.observe(el));
}, 2600);

// ── 7. AMBIENT FLOATING PARTICLES ──
// ۷- ذرات شناور محیطی
(function ambientParticles() {
  const colors = ['rgba(255,122,26,', 'rgba(127,232,164,', 'rgba(255,200,87,'];

  function spawnParticle() {
    if (document.hidden) return;
    const p = document.createElement('div');
    p.className = 'ambient-particle';
    const size = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = Math.random() * 0.4 + 0.1;
    const dur = Math.random() * 12 + 8;
    const left = Math.random() * 100;
    p.style.cssText = `width:${size}px;height:${size}px;left:${left}%;bottom:-10px;background:${color}${opacity});box-shadow:0 0 ${size*2}px ${color}0.3);animation-duration:${dur}s;animation-delay:${Math.random()*2}s`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), (dur + 2) * 1000);
  }
  setInterval(spawnParticle, 600);
})();

// ── 8. CURSOR UPGRADE - expand on hover ──
// ۸- بزرگ‌شدن نشانگر ماوس هنگام هاور
(function upgradeCursor() {
  const cur = document.getElementById('cursor');
  if (!cur) return;
  const interactives = 'a, button, .pc, .sk, .exp-card, .blog-card, .reel-card, .gh-repo-card, input, textarea, select, .fb, .rtab';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => cur.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cur.classList.remove('expanded'));
  });
})();

// ── 9. CINEMATIC NAV SCROLL ──
// ۹- اسکرول سینمایی نوار بالا
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('cin-scrolled', window.scrollY > 80);
}, {
  passive: true
});

// ── 10. SKILL BARS glow on fill ──
// ۱۰- درخشش نوار مهارت‌ها هنگام پر شدن
setTimeout(() => {
  document.querySelectorAll('.sb-fill').forEach(bar => {
    bar.classList.add('filled');
  });
}, 3500);

// ── 11. SECTION COUNTER animation upgrade (cinematic) ──
// ۱۱- ارتقای انیمیشن شمارنده بخش‌ها
const cinCounterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting || e.target.dataset.counted) return;
    e.target.dataset.counted = '1';
    const target = parseInt(e.target.dataset.target);
    if (isNaN(target)) return;
    let current = 0;
    const duration = 1800;
    const start = performance.now();

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const prog = Math.min((now - start) / duration, 1);
      current = Math.round(easeOut(prog) * target);
      e.target.textContent = current + '+';
      if (prog < 1) requestAnimationFrame(tick);
      else e.target.textContent = target + '+';
    }
    requestAnimationFrame(tick);
  });
}, {
  threshold: 0.6
});
document.querySelectorAll('.stat-num[data-target]').forEach(el => cinCounterObs.observe(el));

/* ═══════════════════ LOCATION MAP ═══════════════════ */
/* بخش نقشه موقعیت مکانی — این‌جا می‌تونید اطلاعات رو عوض کنید */
const LOCATION_DATA = {
  city: "Yasuj",
  cityFa: "یاسوج",
  country: "Iran",
  countryFa: "ایران",
  coords: "30.6682° N, 51.5880° E",
  timezone: "Asia/Tehran",     // IANA timezone, e.g. "Europe/Berlin"
  timezoneLabel: "GMT+3:30",
  available: true              // toggles the "Available for opportunities" badge
};

function initLocationMap() {
  const lang = document.documentElement.getAttribute('lang') === 'fa' ? 'fa' : 'en';
  const cityName = lang === 'fa' ? LOCATION_DATA.cityFa : LOCATION_DATA.city;
  const countryName = lang === 'fa' ? LOCATION_DATA.countryFa : LOCATION_DATA.country;
  const fullName = `${cityName}, ${countryName}`;

  document.querySelectorAll('#loc-name-val, #loc-name-val-lg').forEach(el => {
    el.textContent = fullName;
  });
  document.querySelectorAll('#loc-coords-val, #loc-coords-val-lg').forEach(el => {
    el.textContent = LOCATION_DATA.coords;
  });

  const cityEl = document.getElementById('loc-city-val');
  if (cityEl) cityEl.textContent = cityName;
  const countryEl = document.getElementById('loc-country-val');
  if (countryEl) countryEl.textContent = countryName;
  const tzEl = document.getElementById('loc-tz-val');
  if (tzEl) tzEl.textContent = LOCATION_DATA.timezoneLabel;

  const badge = document.getElementById('loc-avail-badge');
  if (badge) badge.style.display = LOCATION_DATA.available ? 'inline-flex' : 'none';

  updateLocationClock();
  setInterval(updateLocationClock, 1000 * 30);
}

function updateLocationClock() {
  const timeEl = document.getElementById('loc-time-val');
  if (!timeEl) return;
  try {
    const now = new Date().toLocaleTimeString('en-US', {
      timeZone: LOCATION_DATA.timezone,
      hour: '2-digit',
      minute: '2-digit'
    });
    timeEl.textContent = now;
  } catch (e) {
    timeEl.textContent = '—';
  }
}

function toggleLocationMap() {
  const overlay = document.getElementById('loc-map-overlay');
  if (!overlay) return;
  overlay.classList.toggle('active');
  document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
}

document.addEventListener('DOMContentLoaded', initLocationMap);
document.addEventListener('langchange', initLocationMap);
