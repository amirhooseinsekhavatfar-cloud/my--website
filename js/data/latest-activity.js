// ══════════════════════════════════════════════
//  DATA: آخرین فعالیت‌ها (Latest Activity)
//  فقط همین فایل رو برای تغییر «آخرین فعالیت‌ها (Latest Activity)» ویرایش کن.
//  Edit ONLY this file to change the "Latest Activity" section.
//
//  فیلدها:
//    titleEn / titleFa   - متن اصلی خط فعالیت
//    metaEn / metaFa     - متن کوچیک زیر عنوان (مثلاً '2 days ago · GitHub')
//    icon                - کلاس آیکون فونت‌اوسام (مثلاً 'fab fa-github')
//    color               - رنگ آیکون به‌صورت hex یا متغیر CSS (مثلاً 'var(--ac2)')
//    badgeEn / badgeFa   - متن کوچیک نشان سمت راست (مثلاً 'CODE' / 'کد')
//    badgeClass          - کلاس رنگ نشان: 'b-act' | 'b-cert' | 'b-proj' | 'b-post'
//
//  این فقط یه آیتم نمونه‌ست تا فرمت رو ببینی. برای اضافه کردن فعالیت
//  بعدی، یه بلوک {...} دیگه با همین ساختار زیرش با کاما اضافه کن.
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};
window.SiteData.latestActivity = [{
      titleEn: 'Sample activity title',
      titleFa: 'عنوان نمونه‌ی فعالیت',
      metaEn: '2 days ago · GitHub',
      metaFa: '۲ روز پیش · گیت‌هاب',
      icon: 'fab fa-github',
      color: 'var(--ac2)',
      badgeEn: 'CODE',
      badgeFa: 'کد',
      badgeClass: 'b-act'
    }
  ];
