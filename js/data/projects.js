// ══════════════════════════════════════════════
//  DATA: پروژه‌ها (Projects)
//  فقط همین فایل رو برای تغییر «پروژه‌ها (Projects)» ویرایش کن.
//  Edit ONLY this file to change "پروژه‌ها (Projects)" content.
//
//  برای گذاشتن عکس روی یه پروژه — فقط لینک لازمه، آپلود فایل لازم نیست:
//  image: 'https://xxxxx.png'   (لینک مستقیم به یه عکس روی اینترنت)
//  اگه image نذاری، همون گرادیان + آیکون قبلی نشون داده می‌شه.
//
//  برای گذاشتن ویدیو (از طریق لینک، نیازی به آپلود فایل نیست):
//  video: 'https://youtu.be/xxxxxx'   یا لینک آپارات   یا لینک مستقیم یه فایل mp4
//  اگه video بذاری، یه دکمه‌ی «ویدیو» کنار GitHub/Demo اضافه می‌شه که
//  با کلیک، ویدیو رو به‌صورت تمام‌صفحه پخش می‌کنه.
//
//  فیلدهای اختیاری برای فیلتر/مرتب‌سازی و صفحه‌ی Case Study
//  (این‌ها اختیاری‌اند؛ اگه نذاری‌شون سایت خراب نمی‌شه):
//    dateISO      - تاریخ پروژه به فرمت 'YYYY-MM-DD'، برای مرتب‌سازی «جدیدترین»
//    popularity   - یه عدد (مثلاً بازدید یا امتیاز)، برای مرتب‌سازی «محبوب‌ترین»
//    fullDescEn/fullDescFa - توضیح کامل‌تر برای صفحه‌ی Case Study (اختیاری،
//                   اگه نذاری همون descEn/descFa توی Case Study نشون داده می‌شه)
//    gallery      - آرایه‌ای از لینک عکس برای گالری Case Study، مثلاً:
//                   gallery: ['https://.../1.png', 'https://.../2.png']
//
//  این فقط یه آیتم نمونه‌ست تا فرمت رو ببینی. برای اضافه کردن پروژه‌ی
//  بعدی، یه بلوک {...} دیگه با همین ساختار زیرش با کاما اضافه کن.
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};
window.SiteData.projects = [
    {
      cat: 'plc',
      gradient: 'linear-gradient(135deg,#0D1319,#0d1b3e)',
      icon: 'fa-solid fa-sliders',
      featured: true,
      titleEn: 'Sample Project Title',
      titleFa: 'عنوان نمونه پروژه',
      descEn: 'A short English description of the project goes here.',
      descFa: 'یک توضیح کوتاه فارسی درباره‌ی پروژه اینجا قرار می‌گیرد.',
      tags: 'Tag1,Tag2,Tag3',
      github: '#',
      demo: '#',
      dateISO: '2025-01-01',
      popularity: 0,
      fullDescEn: '',
      fullDescFa: '',
      gallery: []
    }
  ];
