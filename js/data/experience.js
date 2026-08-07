// ══════════════════════════════════════════════
//  DATA: مهارت‌ها و تجربه (Skills & Experience)
//  فقط همین فایل رو برای تغییر بخش «مهارت‌ها و تجربه» (سه تب: ابزار و
//  فناوری / تایم‌لاین / گواهی‌نامه‌ها) ویرایش کن.
//  Edit ONLY this file to change the "Skills & Experience" section
//  (three tabs: Tools & Tech / Timeline / Certifications).
//
//  ── window.SiteData.experience.tools ──  (تب «ابزار و فناوری»)
//    icon   - کلاس آیکون فونت‌اوسام
//    color  - رنگ آیکون، اختیاری (hex)
//    titleEn / titleFa - عنوان ابزار/مهارت
//    descEn / descFa   - توضیح کوتاه
//
//  ── window.SiteData.experience.timeline ──  (تب «تایم‌لاین»)
//    titleEn / titleFa - عنوان (مثلاً اسم شغل یا مدرک)
//    badge             - متن نشان تاریخ (مثلاً '2024 — Now')
//    subEn / subFa     - زیرعنوان (مثلاً 'Freelance · Remote')
//    descEn / descFa   - توضیح کوتاه
//    tags              - برچسب‌ها، با کاما جدا شده (مثلاً 'PLC,IoT,Python')
//
//  ── window.SiteData.experience.certs ──  (تب «گواهی‌نامه‌ها»)
//    icon    - کلاس آیکون فونت‌اوسام
//    color   - رنگ آیکون به‌صورت hex
//    titleEn / titleFa - عنوان گواهی‌نامه
//    descEn / descFa   - توضیح کوتاه (صادرکننده، سال، و…)
//    featured          - true/false — اگه true باشه، کارت با رنگ برجسته نشون داده می‌شه
//
//  برای اضافه کردن آیتم جدید توی هر کدوم از سه لیست، یه بلوک {...} دیگه
//  با همین ساختار زیرش با کاما اضافه کن.
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};
window.SiteData.experience = {
  tools: [{
    icon: 'fa-solid fa-industry',
    color: '',
    titleEn: 'Sample Tool',
    titleFa: 'ابزار نمونه',
    descEn: 'A short description of this tool or skill.',
    descFa: 'توضیح کوتاه این ابزار یا مهارت.'
  }],
  timeline: [{
    titleEn: 'Sample Role or Degree',
    titleFa: 'عنوان نمونه شغل یا مدرک',
    badge: '2024 — Now',
    subEn: 'Freelance · Remote',
    subFa: 'فریلنسر · راه دور',
    descEn: 'A short description of this role.',
    descFa: 'توضیح کوتاه این جایگاه.',
    tags: 'Tag1,Tag2,Tag3'
  }],
  certs: [{
    icon: 'fa-solid fa-certificate',
    color: '#fcd34d',
    titleEn: 'Sample Certification',
    titleFa: 'گواهی‌نامه نمونه',
    descEn: 'Issuer · short description · year',
    descFa: 'صادرکننده · توضیح کوتاه · سال',
    featured: false
  }]
};
