// ══════════════════════════════════════════════
//  DATA: نظرات و توصیه‌نامه‌ها (Testimonials)
//  فقط همین فایل رو برای تغییر بخش «نظرات» ویرایش کن.
//  Edit ONLY this file to change the Testimonials section.
//
//  فیلدها:
//    name        - نام فرد
//    roleEn/roleFa - سمت + شرکت، مثلاً 'Automation Manager, Fars Steel Co.'
//    photo       - لینک عکس (اختیاری). اگه ننویسی، حرف اول اسم نشون داده می‌شه.
//    textEn/textFa - متن نظر
//    rating      - عدد ۱ تا ۵ (اختیاری، پیش‌فرض ۵)
//
//  این فقط دو آیتم نمونه‌ست تا فرمت رو ببینی. برای اضافه کردن
//  نظر بعدی، یه بلوک {...} دیگه با همین ساختار زیرش با کاما اضافه کن.
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};
window.SiteData.testimonials = [
  {
    name: 'Sample Client Name',
    roleEn: 'Operations Manager, Sample Industries',
    roleFa: 'مدیر عملیات، شرکت نمونه',
    photo: '',
    textEn: 'A short English testimonial describing the working experience goes here.',
    textFa: 'یک متن کوتاه فارسی درباره‌ی تجربه‌ی همکاری اینجا قرار می‌گیرد.',
    rating: 5
  },
  {
    name: 'Sample Colleague Name',
    roleEn: 'Lead Engineer, Sample Automation',
    roleFa: 'مهندس ارشد، اتوماسیون نمونه',
    photo: '',
    textEn: 'Another short English testimonial goes here to show the format.',
    textFa: 'یک متن کوتاه دیگر برای نمایش فرمت اینجا قرار می‌گیرد.',
    rating: 5
  }
];
