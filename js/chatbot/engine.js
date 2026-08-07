/**
 * ============================================
 * Portfolio AI — Chatbot Engine
 * ============================================
 * نقطه‌ی ورود اصلی: پیام کاربر رو می‌گیره، از باقی ماژول‌ها
 * (Intent, Search, Ranking, Memory, Context, History, Answer)
 * برای ساختن پاسخ نهایی استفاده می‌کنه — کاملاً آفلاین، بدون
 * هیچ درخواستی به سرور یا API خارجی.
 */

window.ChatbotEngine = {

    // زبان پاسخ رو اول از روی خود پیام کاربر تشخیص می‌ده (اگه حرف فارسی/عربی
    // داشت، فارسی جواب می‌ده)، و فقط برای پیام‌های کاملاً لاتین از زبان فعلی
    // رابط سایت (دکمه تغییر زبان) به‌عنوان پیش‌فرض استفاده می‌کنه
    detectLang(message) {

        const hasPersianScript = /[\u0600-\u06FF]/.test(message);

        if (hasPersianScript) return "fa";

        return (window.chatLang || document.documentElement.lang) === "fa" ? "fa" : "en";

    },

    ask(message) {

        const intent = IntentEngine.detect(message);
        const results = SearchEngine.search(message);

        const lang = this.detectLang(message);

        if (ChatbotConfig.rememberConversation) {

            ChatbotContext.update(intent, {});

            ChatbotMemory.add({
                question: message,
                intent,
                results
            });

            ChatbotHistory.add("user", message);

        }

        const answer = AnswerEngine.create({ intent, results, lang });

        if (ChatbotConfig.rememberConversation) {

            ChatbotHistory.add("bot", answer.text);

        }

        return answer;

    }

};
