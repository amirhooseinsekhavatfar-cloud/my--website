// ══════════════════════════════════════════════
//  DATA: دستاوردها و مدارک (Achievements)
//  فقط همین فایل رو برای تغییر «دستاوردها و مدارک (Achievements)» ویرایش کن.
//  Edit ONLY this file to change "دستاوردها و مدارک (Achievements)" content.
//
//  فیلدها:
//    icon    - کلاس آیکون فونت‌اوسام (مثلاً 'fa-solid fa-microchip')، وقتی image نداری استفاده می‌شه
//    image   - لینک عکس مدال/گواهی، اختیاری. اگه بذاری به‌جای آیکون، همین
//              عکس به‌صورت دایره‌ای نشون داده می‌شه (فقط لینک، آپلود فایل لازم نیست)
//    nameEn / nameFa   - عنوان
//    descEn / descFa   - توضیح کوتاه
//    pct     - درصد پیشرفت (100 یعنی کامل/باز، کمتر از 100 یعنی قفل‌شده و کم‌رنگ)
//    color   - رنگ حلقه/نوار به‌صورت hex
//
//  این فقط یه آیتم نمونه‌ست تا فرمت رو ببینی. برای اضافه کردن دستاورد
//  بعدی، یه بلوک {...} دیگه با همین ساختار زیرش با کاما اضافه کن.
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};
window.SiteData.achievements = [{
      icon: 'fa-solid fa-microchip',
      image: '',
      nameEn: 'Sample Achievement',
      nameFa: 'دستاورد نمونه',
      descEn: 'A short description of this achievement',
      descFa: 'توضیح کوتاه این دستاورد',
      pct: 90,
      color: '#FF7A1A'
    }
  ];
