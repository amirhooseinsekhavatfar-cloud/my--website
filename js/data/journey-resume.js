// ══════════════════════════════════════════════
//  DATA: مسیر من + تحصیلات و تجربه (رزومه)
//  فقط همین فایل رو برای تغییر این سه بخش ویرایش کن:
//   ۱) «مسیر من» (My Journey) — تایم‌لاین کوچیک توی بخش «درباره من»
//   ۲) «تحصیلات» (Education) — ستون سمت راست بخش «رزومه»
//   ۳) «تجربه» (Experience) — ستون سمت چپ بخش «رزومه»
//
//  Edit ONLY this file to change:
//   1) "My Journey" timeline in the About section
//   2) "Education" column in the Resume section
//   3) "Experience" column in the Resume section
//
//  هر آیتم این فیلدها رو داره:
//    badge (یا date) - متن تاریخ، مثلاً '2022 — Present'
//    titleEn / titleFa - عنوان
//    subEn / subFa     - زیرعنوان (اختیاری)
//
//  برای اضافه/حذف کردن آیتم، یه بلوک {...} با همین ساختار
//  اضافه یا حذف کن و با کاما جدا کن.
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};

// ── ۱) «مسیر من» — بخش About ──────────────────
window.SiteData.journey = [
  {
    date: '2022 — Present',
    dateFa: '۲۰۲۲ — اکنون',
    titleEn: 'B.Sc. Electrical Engineering',
    titleFa: 'کارشناسی مهندسی برق',
    subEn: 'Control Systems & Automation focus',
    subFa: 'تمرکز: کنترل و اتوماسیون'
  },
  {
    date: '2023',
    dateFa: '۲۰۲۳',
    titleEn: 'Siemens TIA Portal Certification',
    titleFa: 'گواهینامه TIA Portal زیمنس',
    subEn: 'PLC S7-1200 / S7-1500',
    subFa: 'PLC S7-1200 / S7-1500'
  },
  {
    date: '2024 — Present',
    dateFa: '۲۰۲۴ — اکنون',
    titleEn: 'Independent Automation Developer',
    titleFa: 'توسعه‌دهنده اتوماسیون مستقل',
    subEn: 'PLC, IoT, Python automation',
    subFa: 'PLC، IoT، پایتون'
  },
  {
    date: '2023 — Present',
    dateFa: '۲۰۲۳ — اکنون',
    titleEn: 'Open Source Contributor',
    titleFa: 'مشارکت‌کننده متن‌باز',
    subEn: 'Automation libs, ESP32 on GitHub',
    subFa: 'کتابخانه‌ها در GitHub'
  }
];

// ── ۲) «تحصیلات» — بخش Resume ──────────────────
window.SiteData.resumeEducation = [
  {
    date: '2022 — Present',
    dateFa: '۲۰۲۲ — اکنون',
    titleEn: 'B.Sc. Electrical Engineering',
    titleFa: 'کارشناسی مهندسی برق',
    subEn: 'Control Systems & Automation',
    subFa: 'سیستم‌های کنترل و اتوماسیون'
  },
  {
    date: '2023',
    dateFa: '۲۰۲۳',
    titleEn: 'Siemens TIA Portal Cert.',
    titleFa: 'گواهینامه TIA Portal',
    subEn: 'S7-1200 / S7-1500',
    subFa: 'S7-1200 / S7-1500'
  },
  {
    date: '2023',
    dateFa: '۲۰۲۳',
    titleEn: 'Python for Engineers',
    titleFa: 'پایتون برای مهندسان',
    subEn: 'Industrial Applications',
    subFa: 'کاربردهای صنعتی'
  }
];

// ── ۳) «تجربه» — بخش Resume ─────────────────────
window.SiteData.resumeExperience = [
  {
    date: '2024 — Present',
    dateFa: '۲۰۲۴ — اکنون',
    titleEn: 'Independent Automation Dev',
    titleFa: 'توسعه‌دهنده اتوماسیون',
    subEn: 'PLC programs, IoT systems, Python tools',
    subFa: 'PLC، IoT، ابزارهای پایتون'
  },
  {
    date: '2023',
    dateFa: '۲۰۲۳',
    titleEn: 'University Lab — Control Systems',
    titleFa: 'آزمایشگاه دانشگاه',
    subEn: 'PID, motor drives, relay circuits',
    subFa: 'PID، درایو موتور، رله'
  },
  {
    date: '2023 — Present',
    dateFa: '۲۰۲۳ — اکنون',
    titleEn: 'Open Source Contributor',
    titleFa: 'مشارکت‌کننده متن‌باز',
    subEn: 'Automation libs, ESP32 repos on GitHub',
    subFa: 'کتابخانه‌ها در GitHub'
  }
];
