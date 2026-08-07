/**
 * ==========================================
 * Intent Detection
 * ==========================================
 */

window.IntentEngine = {

    detect(message) {

        const normalized = ChatbotUtils.normalize(message);
        const tokens = normalized.split(" ");

        for (const intent in ChatbotSynonyms) {

            const words = ChatbotSynonyms[intent];

            for (const word of words) {

                const normalizedWord = ChatbotUtils.normalize(word);

                // برای عبارت‌های چندکلمه‌ای (مثل "نمونه کار") جستجوی زیررشته
                // برای کلمه‌های تکی، تطبیق دقیق روی توکن‌ها (یا شروع‌شدن توکن با
                // همون کلمه، برای پسوندهای فارسی بدون فاصله مثل "مدارکش")
                const isPersianWord = /[\u0600-\u06FF]/.test(normalizedWord);

                const isMatch = normalizedWord.includes(" ")
                    ? normalized.includes(normalizedWord)
                    : tokens.some(t => t === normalizedWord ||
                        (isPersianWord && normalizedWord.length >= 3 && t.startsWith(normalizedWord)));

                if (isMatch) {

                    return intent;

                }

            }

        }

        return "search";

    }

};
