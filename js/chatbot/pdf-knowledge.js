/**
 * ==========================================
 * Portfolio AI — PDF Knowledge Loader
 * ------------------------------------------
 * متن فایل‌های PDF کتابخانه (js/data/pdfs.js) رو با
 * Mozilla pdf.js توی خودِ مرورگر کاربر استخراج می‌کنه و به
 * پیکره‌ی دانش چت‌بات اضافه می‌کنه — کاملاً سمت کاربر،
 * بدون بک‌اند/سرور.
 *
 * علاوه بر PDF، اگه فیلد `file` به یه فایل .html/.htm اشاره کنه
 * (مثلاً به‌جای PDF یه صفحه‌ی HTML گذاشته باشی)، متنش با
 * fetch + DOMParser خونده می‌شه — بدون نیاز به لود pdf.js.
 * تشخیص نوع فایل خودکار و از روی پسوندشه؛ کاری نیست که بکنی.
 *
 * فقط آیتم‌هایی از js/data/pdfs.js که فیلد `file` دارن پردازش
 * می‌شن (مسیر PDF یا HTML داخل خود سایت، مثل 'assets/pdfs/report.pdf'
 * یا 'assets/pdfs/report.html'). آیتم‌های بدون `file` (فقط لینک
 * خارجی preview/dl) بی‌سروصدا رد می‌شن — هیچ خطایی نمی‌ده.
 *
 * نتیجه‌ی هر PDF توی localStorage کش می‌شه تا بازدیدهای بعدی
 * دوباره پردازش نشه.
 * ==========================================
 */

window.PdfKnowledgeLoader = {

  PDFJS_VERSION: '3.11.174',
  CDN_BASE: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/',
  CACHE_PREFIX: 'pdfKnowledgeCache::',
  CACHE_VERSION: 'v1', // اگه فرمت کش عوض شد، این عدد رو یکی زیاد کن
  MAX_CACHE_CHARS: 200000, // سقف کاراکتر برای کش هر PDF (جلوگیری از پر شدن localStorage)
  MAX_PAGES: 60, // سقف تعداد صفحه برای هر PDF (برای اسناد خیلی حجیم)

  _started: false,
  _runPromise: null,
  _pdfjsLoadPromise: null,

  /* ── لود اسکریپت pdf.js از CDN، فقط یه‌بار و فقط وقتی لازم شد ── */
  ensurePdfJsLoaded() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (this._pdfjsLoadPromise) return this._pdfjsLoadPromise;

    this._pdfjsLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = this.CDN_BASE + this.PDFJS_VERSION + '/pdf.min.js';
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            this.CDN_BASE + this.PDFJS_VERSION + '/pdf.worker.min.js';
          resolve(window.pdfjsLib);
        } else {
          reject(new Error('pdf.js loaded but window.pdfjsLib is missing'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load pdf.js from CDN'));
      document.head.appendChild(script);
    });

    return this._pdfjsLoadPromise;
  },

  cacheKey(file) {
    return this.CACHE_PREFIX + this.CACHE_VERSION + '::' + file;
  },

  readCache(file) {
    try {
      const raw = localStorage.getItem(this.cacheKey(file));
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.text === 'string') return parsed.text;
    } catch (e) { /* کش خراب یا در دسترس نیست — نادیده گرفته می‌شه */ }
    return null;
  },

  writeCache(file, text) {
    try {
      const trimmed = text.length > this.MAX_CACHE_CHARS ? text.slice(0, this.MAX_CACHE_CHARS) : text;
      localStorage.setItem(this.cacheKey(file), JSON.stringify({ text: trimmed, cachedAt: Date.now() }));
    } catch (e) {
      // localStorage پر یا غیرقابل‌دسترسه — فقط کش نمی‌شه، سایت خراب نمی‌شه
    }
  },

  /* ── تشخیص نوع فایل از روی پسوند: PDF یا HTML ── */
  isHtmlFile(file) {
    return /\.html?(\?.*)?(#.*)?$/i.test(file);
  },

  /* ── استخراج متن از یه فایل PDF با pdf.js ── */
  async extractPdfText(file) {
    const pdfjsLib = await this.ensurePdfJsLoaded();
    const pdf = await pdfjsLib.getDocument(file).promise;
    let fullText = '';
    const maxPages = Math.min(pdf.numPages, this.MAX_PAGES);

    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(it => it.str).join(' ');
      fullText += pageText + '\n';
    }

    return fullText;
  },

  /* ── استخراج متن از یه فایل HTML محلی (بدون نیاز به pdf.js) ──
     برای وقتی که به‌جای PDF، یه صفحه‌ی HTML (مثلاً یه گزارش یا
     دیتاشیت وب‌محور) توی کتابخانه گذاشته باشی */
  async extractHtmlText(file) {
    const res = await fetch(file);
    if (!res.ok) throw new Error('HTTP ' + res.status + ' for ' + file);
    const htmlSrc = await res.text();
    const doc = new DOMParser().parseFromString(htmlSrc, 'text/html');
    doc.querySelectorAll('script, style, noscript').forEach(el => el.remove());
    const root = doc.body || doc.documentElement;
    return root ? root.textContent : '';
  },

  /* ── متن یه سند (PDF یا HTML) رو برمی‌گردونه (از کش یا با پردازش زنده) ── */
  async extractOne(item) {
    const file = item.file;
    if (!file) return null; // بدون فیلد file → نادیده گرفته می‌شه، بدون خطا

    const cached = this.readCache(file);
    if (cached != null) {
      return { file, titleEn: item.titleEn, titleFa: item.titleFa, text: cached };
    }

    try {
      const fullTextRaw = this.isHtmlFile(file)
        ? await this.extractHtmlText(file)
        : await this.extractPdfText(file);

      const fullText = fullTextRaw.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
      if (fullText) this.writeCache(file, fullText);
      return { file, titleEn: item.titleEn, titleFa: item.titleFa, text: fullText };
    } catch (err) {
      // یه فایل خراب/گمشده نباید کل سایت یا بقیه‌ی اسناد رو خراب کنه
      if (window.ChatbotConfig && window.ChatbotConfig.debug) {
        console.warn('[PdfKnowledgeLoader] Could not extract "' + file + '":', err);
      }
      return null;
    }
  },

  /* ── همه‌ی PDF های دارای فیلد file رو یکی‌یکی پردازش می‌کنه ── */
  run() {
    if (this._runPromise) return this._runPromise;
    this._started = true;

    this._runPromise = (async () => {
      const pdfs = (window.SiteData && window.SiteData.pdfs) || [];
      const withFile = pdfs.filter(p => !!p.file);
      if (!withFile.length) return;

      window.SiteData.pdfKnowledge = window.SiteData.pdfKnowledge || [];

      for (const item of withFile) {
        const result = await this.extractOne(item);
        if (result && result.text) {
          window.SiteData.pdfKnowledge.push(result);
          // به محض آماده شدن هر سند، به پیکره‌ی دانش چت‌بات اضافه‌ش کن
          if (window.SearchEngine && typeof window.SearchEngine.refreshCorpus === 'function') {
            window.SearchEngine.refreshCorpus();
          }
        }
      }
    })();

    return this._runPromise;
  },

  /* ── اجرای بی‌صدا در پس‌زمینه، موقع لود اولیه‌ی سایت ── */
  startInBackground() {
    const kickoff = () => this.run();
    if ('requestIdleCallback' in window) {
      requestIdleCallback(kickoff, { timeout: 4000 });
    } else {
      setTimeout(kickoff, 1500);
    }
  },

  /* ── وقتی کاربر برای اولین‌بار با چت‌بات صحبت می‌کنه صدا زده می‌شه؛
     اگه هنوز پردازش شروع نشده، همین الان (بدون صبر برای idle) شروعش می‌کنه ── */
  startNow() {
    if (!this._started) this.run();
  }

};

// شروع خودکار در پس‌زمینه بعد از لود اولیه‌ی سایت
document.addEventListener('DOMContentLoaded', () => {
  window.PdfKnowledgeLoader.startInBackground();
});

// اگه چت‌بات قبل از تموم‌شدن idle-callback باز بشه، پردازش رو
// فوراً (بدون صبر برای بی‌کار شدن مرورگر) شروع می‌کنه
(function hookChatOpenTrigger() {
  function patch() {
    if (typeof toggleChat !== 'function' || window._pdfChatHookPatched) return;
    window._pdfChatHookPatched = true;
    const orig = window.toggleChat;
    window.toggleChat = function () {
      orig();
      window.PdfKnowledgeLoader.startNow();
    };
  }
  document.addEventListener('DOMContentLoaded', patch);
})();
