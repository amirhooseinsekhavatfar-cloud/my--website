/**
 * ==========================================
 * Portfolio AI
 * Search Engine V2
 * ==========================================
 */

window.SearchEngine = {

    // این کلیدها معمولاً حاوی کد رنگ، آیکون یا لینک هستن و برای جستجوی متنی
    // به کاربر مفید نیستن؛ در ساخت پیکره‌ی دانش نادیده گرفته می‌شن
    SKIP_KEYS: [
        "icon", "gradient", "color", "cat", "github", "demo",
        "image", "img", "avatar", "banner", "href", "url", "link", "id",
        "chatbotKnowledge", "faq", "pdfKnowledge"
    ],

    // کلمات پرکاربرد و کم‌اهمیت که در محاسبه‌ی میزان اطمینان نادیده گرفته می‌شن
    STOPWORDS: [
        "the", "a", "an", "is", "are", "was", "were", "do", "does", "did",
        "he", "she", "it", "his", "her", "him", "what", "where", "when",
        "how", "who", "can", "could", "would", "tell", "me", "about",
        "of", "to", "for", "in", "on", "at", "and", "with", "have", "has",
        "you", "your", "i", "please", "vs", "difference", "between", "s", "differ", "from",
        "و", "در", "به", "از", "که", "را", "این", "آن", "با", "هست",
        "است", "کن", "بگو", "چیه", "چیست", "چطور", "کجا", "برای", "یک",
        "می", "میشه", "بشه", "هستش", "داره", "داری", "چی", "کدوم", "رو", "چرا", "مهمه", "مهم", "میکنه",
        "چه", "فرق", "فرقی", "کنن"
    ],

    corpus: null,

    // درخت SiteData + متن آزاد chatbotKnowledge رو یک‌بار به یک لیست
    // قابل‌جستجو تبدیل می‌کنه و کش می‌کنه
    buildCorpus() {

        if (this.corpus) return this.corpus;

        const results = [];

        this.walk(window.SiteData, "SiteData", results);
        this.walkKnowledge(results);
        this.walkFaq(results);
        this.walkPdfKnowledge(results);

        this.corpus = results;

        return results;

    },

    // پیکره‌ی دانش رو دوباره می‌سازه — وقتی متن یه PDF جدید (به‌صورت
    // پس‌زمینه، بعد از اولین ساخته‌شدن پیکره) آماده می‌شه صدا زده می‌شه
    // تا بدون نیاز به رفرش صفحه، توی جواب‌های بعدی چت‌بات لحاظ بشه
    refreshCorpus() {
        this.corpus = null;
        this.buildCorpus();
    },

    walk(node, path, out) {

        if (node == null) return;

        if (typeof node === "string") {

            const isPlainText = node.trim().length > 1 && !/<[a-z][\s\S]*>/i.test(node);

            if (isPlainText) {
                out.push({ text: node, path });
            }

            return;

        }

        if (typeof node === "number" || typeof node === "boolean") return;

        if (Array.isArray(node)) {

            node.forEach((item, index) => {

                this.walk(item, path + "[" + index + "]", out);

            });

            return;

        }

        if (typeof node === "object") {

            Object.keys(node).forEach(key => {

                if (this.SKIP_KEYS.includes(key)) return;

                this.walk(node[key], path + "." + key, out);

            });

        }

    },

    // متن آزاد داخل chatbot-knowledge.js رو خط‌به‌خط به پیکره‌ی دانش اضافه می‌کنه
    // (اطلاعاتی مثل تحصیلات و سوابق کاری که در SiteData ساختاریافته نیستن).
    // هر خط با اسم بخشش (مثلاً «EXPERIENCE») پیشوند می‌خوره تا کلمه‌ی بخش
    // به‌صورت لفظی هم داخل متن قابل‌جستجو باشه.
    walkKnowledge(out) {

        const raw = (window.SiteData && window.SiteData.chatbotKnowledge) || "";

        let section = "";

        raw.split("\n").forEach(rawLine => {

            const line = rawLine.trim();

            if (!line) {
                section = "";
                return;
            }

            const isSectionHeader = line.endsWith(":") && line === line.toUpperCase();

            if (isSectionHeader) {
                section = line.slice(0, -1);
                return;
            }

            const isSystemInstruction = line.startsWith("You are") || line.startsWith("Answer in");

            if (isSystemInstruction || line.length <= 3) return;

            const cleanLine = line.replace(/^[-\d.]+\s*/, "");
            const text = section ? section + ": " + cleanLine : cleanLine;

            out.push({ text, path: "knowledge" });

        });

    },

    // پرسش‌وپاسخ‌های تخصصی (برق، مهندسی کنترل، هوشمندسازی خانه) رو از
    // js/data/faq-knowledge.js به پیکره‌ی دانش اضافه می‌کنه. تطبیق روی
    // برچسب‌ها (tags) و متن هر دو پاسخ انجام می‌شه، ولی نمایش نهایی
    // بسته به زبان فعلی سایت (فارسی/انگلیسی) انتخاب می‌شه
    walkFaq(out) {

        const items = (window.SiteData && window.SiteData.faq) || [];

        items.forEach(item => {

            const matchText = (item.tags || []).join(" ");

            out.push({
                text: matchText,
                path: "faq",
                answerFa: item.answerFa,
                answerEn: item.answerEn
            });

        });

    },

    // متن استخراج‌شده از فایل‌های PDF کتابخانه (توسط pdf-knowledge.js پر
    // می‌شه) رو دقیقاً مثل بقیه‌ی داده‌ها به پیکره‌ی دانش اضافه می‌کنه.
    // هر سند به قطعه‌های چندصدکاراکتری شکسته می‌شه تا تطبیق دقیق‌تر و
    // سریع‌تر باشه (به‌جای این‌که کل متن یه سند بزرگ یه ورودی واحد باشه)
    walkPdfKnowledge(out) {

        const items = (window.SiteData && window.SiteData.pdfKnowledge) || [];
        const CHUNK_SIZE = 600;

        items.forEach(doc => {

            const title = doc.titleEn || doc.titleFa || "PDF";
            const text = doc.text || "";

            for (let i = 0; i < text.length; i += CHUNK_SIZE) {
                const chunk = text.slice(i, i + CHUNK_SIZE).trim();
                if (chunk.length > 20) {
                    out.push({ text: title + ": " + chunk, path: "pdf." + title });
                }
            }

        });

    },

    search(query) {

        query = ChatbotUtils.normalize(query);

        if (!query) return [];

        const allTokens = ChatbotUtils.unique(
            query.split(" ").filter(Boolean)
        );

        const meaningfulTokens = allTokens.filter(t => !this.STOPWORDS.includes(t));
        const queryTokens = meaningfulTokens.length ? meaningfulTokens : allTokens;

        const corpus = this.buildCorpus();
        const results = [];

        corpus.forEach(entry => {

            const normalizedText = ChatbotUtils.normalize(entry.text);
            const confidence = this.matchConfidence(normalizedText, query, queryTokens);

            if (confidence <= 0) return;

            const rank = RankingEngine.score(entry.path, normalizedText);

            results.push({
                value: entry.text,
                answerFa: entry.answerFa,
                answerEn: entry.answerEn,
                path: entry.path,
                confidence,
                score: rank * confidence
            });

        });

        results.sort((a, b) => b.score - a.score);

        return results.slice(0, ChatbotConfig.maxResults);

    },

    // میزان اطمینان تطبیق رو بین ۰ تا ۱ برمی‌گردونه:
    // ۱ یعنی تطبیق کامل عبارت، پایین‌تر یعنی تطبیق جزئی/فازی روی توکن‌ها
    matchConfidence(text, query, queryTokens) {

        if (query.length > 3 && text.includes(query)) return 2;

        // اگه عبارت کاربر (بدون کلمات پرکاربرد) عیناً و پشت‌سرهم داخل متن باشه،
        // نشونهٔ خیلی قوی‌تری از تطبیقه تا اینکه هر کلمه جدا جدا و شاید داخل
        // برچسب‌های مختلف پیدا بشه؛ همین باعث می‌شه مثلاً «Home Assistant» با
        // برچسب دقیق خودش مچ بشه، نه با ترکیب اتفاقی «google home» + «voice assistant»
        const phrase = queryTokens.join(" ");

        if (phrase.length > 3 && text.includes(phrase)) return 1.5;

        let matched = 0;

        queryTokens.forEach(token => {

            if (token.length < 2) return;

            if (text.includes(token)) {

                matched += 1;

            } else if (ChatbotConfig.fuzzySearch && token.length >= 4) {

                const best = ChatbotUtils.bestSimilarity(token, text);

                if (best >= 0.72) matched += best;

            }

        });

        return queryTokens.length ? matched / queryTokens.length : 0;

    }

};
