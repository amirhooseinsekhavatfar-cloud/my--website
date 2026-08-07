// ══════════════════════════════════════════════
//  DATA: اطلاعات کلی سایت (Site Config)
//  نام، ایمیل، شبکه‌های اجتماعی، آمار هیرو و رنگ‌های پیش‌فرض
//  Edit ONLY this file to change name, contact info, socials,
//  hero stats, and default theme colors.
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};
window.SiteData.config = {
  // نام و عنوان (Name & title)
  nameEn: 'Amir Hosin',
  lnameEn: 'Sekhavatfar',
  nameFa: 'امیرحسین',
  lnameFa: 'سخاوتفر',
  title: 'Amir Hosin Sekhavatfar',
  location: 'Iran',

  // اطلاعات تماس (Contact)
  email: 'amirhooseinsekhavatfar@gmail.com',
  // لینک دانلود فایل رزومه (PDF). می‌تونه لینک یه فایل روی خود سایت باشه
  // (مثلاً 'assets/resume.pdf') یا لینک مستقیم به یه فایل PDF روی اینترنت.
  // تا وقتی خالیه، دکمه‌ی «دانلود رزومه» غیرفعال نشون داده می‌شه.
  cv: '',

  // لینک صفحه‌ی رزرو جلسه‌ی Calendly (یا هر سرویس مشابه با embed مستقیم).
  // مثال: 'https://calendly.com/your-username/30min'
  // تا وقتی خالیه، همون تقویم نمایشی فعلی (بدون بک‌اند واقعی) نشون داده می‌شه.
  calendlyUrl: '',

  // شبکه‌های اجتماعی (Social links)
  github: 'https://github.com/amirhooseinsekhavatfar-cloud',
  linkedin: 'https://linkedin.com/in/amirhosins',
  telegram: 'https://t.me/AmirHosinSekhavatfar',
  instagram: '',
  youtube: '',

  // آمار بخش هیرو (Hero stats)
  statProjects: 15,
  statYears: 3,
  statTech: 8,
  statCerts: 5,

  // نشان زیر نام (Hero badge) — مقدار خالی یعنی از پیش‌فرض HTML استفاده شود
  badge: '',

  // رنگ‌های پیش‌فرض تم (Default theme colors — must match css/main.css)
  colors: {
    accent: '#FF7A1A',
    bg: '#0A0E14',
    bg2: '#131A22',
    tx: '#FFFFFF'
  }
};
