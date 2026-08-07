// ══════════════════════════════════════════════
//  DATA: کتابخانه PDF (PDF Library)
//  فقط همین فایل رو برای تغییر «کتابخانه PDF (PDF Library)» ویرایش کن.
//  Edit ONLY this file to change "کتابخانه PDF (PDF Library)" content.
//
//  فیلدها:
//    titleEn / titleFa   - عنوان سند
//    descEn / descFa     - توضیح کوتاه
//    metaEn / metaFa     - متن کوچیک زیر توضیح (مثلاً حجم فایل و منبع)
//    image   - لینک عکس جلد سند، اختیاری. اگه بذاری به‌جای آیکون PDF
//              پیش‌فرض، همین عکس نشون داده می‌شه (فقط لینک، آپلود لازم نیست)
//    preview - لینک پیش‌نمایش سند (مثلاً یه لینک Google Drive یا هر لینک دیگه)
//    dl      - لینک دانلود مستقیم فایل
//    file    - (اختیاری) مسیر فایل PDF یا HTML داخل خود سایت، مثلاً:
//              'assets/pdfs/report.pdf'  یا  'assets/pdfs/report.html'
//              اگه این فیلد رو پر کنی، چت‌بات سایت متن این فایل رو
//              می‌خونه و می‌تونه بهش جواب بده — کاملاً آفلاین، بدون
//              بک‌اند. نوع فایل (PDF یا HTML) خودکار از روی پسوندش
//              تشخیص داده می‌شه؛ برای PDF از pdf.js و برای HTML از
//              fetch ساده استفاده می‌شه. اگه این فیلد رو خالی/حذف
//              کنی، فقط لینک preview/dl کار می‌کنه و چت‌بات این سند
//              رو نادیده می‌گیره (بدون خطا).
//
//  این فقط یه آیتم نمونه‌ست تا فرمت رو ببینی. برای اضافه کردن PDF
//  بعدی، یه بلوک {...} دیگه با همین ساختار زیرش با کاما اضافه کن.
// ══════════════════════════════════════════════
window.SiteData = window.SiteData || {};
window.SiteData.pdfs = [
    {
      titleEn: 'Sample PDF Title',
      titleFa: 'عنوان نمونه PDF',
      descEn: 'A short description of this PDF document.',
      descFa: 'توضیح کوتاه این سند PDF.',
      metaEn: 'PDF · 0 MB · Source',
      metaFa: 'PDF · ۰ مگابایت',
      image: '',
      preview: 'FAIL/plc electric.pdf',
      dl: 'FAIL/plc electric.pdf',
      file: 'FAIL/plc electric.pdf'
    },
     {
      titleEn: 'Sample PDF Title',
      titleFa: 'عنوان نمونه PDF',
      descEn: 'A short description of this PDF document.',
      descFa: 'توضیح کوتاه این سند PDF.',
      metaEn: 'PDF · 0 MB · Source',
      metaFa: 'PDF · ۰ مگابایت',
      image: '',
      preview: 'FAIL/restart-plc-s7300.html',
      dl: 'FAIL/restart-plc-s7300.html',
      file: 'FAIL/restart-plc-s7300.html'
    }
  ];
