/**
 * ============================================
 * Answer Generator
 * ============================================
 * ورودی (intent + نتایج جستجو) رو به یک پاسخ آماده برای نمایش
 * (متن + منبع + پیشنهادها) تبدیل می‌کنه؛ دوزبانه (فارسی/انگلیسی)
 */

window.AnswerEngine = {

    LABELS: {

        fa: {
            noInfo: "متاسفم، دربارهٔ این موضوع اطلاعاتی پیدا نکردم. می‌تونی یکی از موضوعات زیر رو بپرسی:",
            greeting: [
                "سلام! خوش اومدی 👋 دربارهٔ مهارت‌ها، پروژه‌ها یا نحوهٔ تماس با امیرحسین می‌تونی بپرسی.",
                "درود! چطور می‌تونم کمکت کنم؟"
            ],
            thanks: [
                "خواهش می‌کنم! 😊",
                "قابلی نداشت، چیز دیگه‌ای هم می‌خوای بدونی؟"
            ],
            contactIntro: "می‌تونی از این راه‌ها با امیرحسین در ارتباط باشی:",
            resumeMissing: "فایل رزومه هنوز آپلود نشده، ولی می‌تونی مستقیماً باهاش در تماس باشی:",
            resumeIntro: "رزومهٔ امیرحسین:",
            skillsIntro: "مهم‌ترین مهارت‌های امیرحسین:",
            plcIntro: "امیرحسین تجربهٔ قوی‌ای تو حوزهٔ PLC و اتوماسیون صنعتی داره:",
            plcProjectsIntro: "چند نمونه از پروژه‌های PLC:",
            projectsIntro: "چند نمونه از پروژه‌های امیرحسین:",
            achievementsIntro: "دستاوردها و مدارک امیرحسین:",
            suggestions: ["پروژه‌ها", "مهارت‌ها", "رزومه", "تماس"]
        },

        en: {
            noInfo: "Sorry, I couldn't find information on that. You could ask about:",
            greeting: [
                "Hi there! 👋 Ask me about Amir's skills, projects, or how to reach him.",
                "Hello! How can I help you today?"
            ],
            thanks: [
                "You're welcome! 😊",
                "Anytime! Anything else you'd like to know?"
            ],
            contactIntro: "Here's how you can reach Amir:",
            resumeMissing: "The resume file isn't uploaded yet, but you can reach him directly:",
            resumeIntro: "Amir's resume:",
            skillsIntro: "Amir's main skills:",
            plcIntro: "Amir has strong experience in PLC & industrial automation:",
            plcProjectsIntro: "A few PLC-related projects:",
            projectsIntro: "A few of Amir's projects:",
            achievementsIntro: "Amir's achievements & certifications:",
            suggestions: ["Projects", "Skills", "Resume", "Contact"]
        }

    },

    create({ intent, results, lang }) {

        lang = lang === "fa" ? "fa" : "en";

        const L = this.LABELS[lang];
        const cfg = (window.SiteData && window.SiteData.config) || {};

        // بعضی کلمه‌های کلیدی (مثل "plc" یا "scada") هم می‌تونن سوال شخصی
        // دربارهٔ امیرحسین باشن و هم یه سوال عمومی آموزشی. اگه یه پاسخ آموزشی
        // (faq) با اطمینان بالا پیدا بشه، به‌جز برای intentهای صریحاً شخصی
        // (تماس/رزومه)، همون پاسخ آموزشی در اولویته
        if (intent !== "contact" && intent !== "resume" && intent !== "greeting" && intent !== "thanks") {

            const topFaq = (results || []).find(r => r.path === "faq" && r.confidence >= 0.75);

            if (topFaq) {
                return this.fromSearch([topFaq], L, lang);
            }

        }

        switch (intent) {

            case "greeting":
                return { text: ChatbotUtils.random(L.greeting), suggestions: L.suggestions };

            case "thanks":
                return { text: ChatbotUtils.random(L.thanks), suggestions: [] };

            case "contact":
                return this.contact(L, lang, cfg);

            case "resume":
                return this.resume(L, lang, cfg);

            case "skill":
                return this.skills(L, lang, false);

            case "plc":
                return this.skills(L, lang, true);

            case "project":
                return this.projects(L, lang);

            case "achievement":
                return this.achievements(L, lang);

            default:
                return this.fromSearch(results, L, lang);

        }

    },

    contact(L, lang, cfg) {

        let text = L.contactIntro;

        if (cfg.email) text += "\n📧 " + cfg.email;
        if (cfg.telegram) text += "\n💬 " + cfg.telegram.replace("https://t.me/", "@");
        if (cfg.linkedin) text += "\n🔗 " + cfg.linkedin;
        if (cfg.github) text += "\n💻 " + cfg.github;

        return {
            text,
            source: "SiteData.config",
            suggestions: lang === "fa" ? ["پروژه‌ها", "مهارت‌ها"] : ["Projects", "Skills"]
        };

    },

    resume(L, lang, cfg) {

        if (cfg.cv) {
            return {
                text: L.resumeIntro + " " + cfg.cv,
                source: "SiteData.config",
                suggestions: lang === "fa" ? ["تماس"] : ["Contact"]
            };
        }

        let text = L.resumeMissing;

        if (cfg.email) text += "\n📧 " + cfg.email;
        if (cfg.telegram) text += "\n💬 " + cfg.telegram.replace("https://t.me/", "@");

        return {
            text,
            suggestions: lang === "fa" ? ["تماس"] : ["Contact"]
        };

    },

    skills(L, lang, plcOnly) {

        const all = (window.SiteData.skills || []).slice()
            .sort((a, b) => b.pct - a.pct);

        const filtered = plcOnly
            ? all.filter(s => ChatbotUtils.contains(s.name, "plc") || ChatbotUtils.contains(s.name, "scada"))
            : all;

        const list = (filtered.length ? filtered : all)
            .slice(0, 6)
            .map(s => "• " + s.name + " — " + s.pct + "%")
            .join("\n");

        let text = (plcOnly ? L.plcIntro : L.skillsIntro) + "\n" + list;

        if (plcOnly) {

            const plcProjects = (window.SiteData.projects || [])
                .filter(p => p.cat === "plc")
                .slice(0, 3)
                .map(p => "• " + (lang === "fa" ? (p.titleFa || p.titleEn) : (p.titleEn || p.titleFa)));

            if (plcProjects.length) {
                text += "\n\n" + L.plcProjectsIntro + "\n" + plcProjects.join("\n");
            }

        }

        return {
            text,
            source: "SiteData.skills",
            suggestions: lang === "fa" ? ["پروژه‌ها", "تماس"] : ["Projects", "Contact"]
        };

    },

    projects(L, lang) {

        const projects = (window.SiteData.projects || []).slice();

        const featured = projects.filter(p => p.featured);
        const list = (featured.length ? featured : projects)
            .slice(0, 5)
            .map(p => "• " + (lang === "fa" ? (p.titleFa || p.titleEn) : (p.titleEn || p.titleFa)));

        return {
            text: L.projectsIntro + "\n" + list.join("\n"),
            source: "SiteData.projects",
            suggestions: lang === "fa" ? ["مهارت‌ها", "تماس"] : ["Skills", "Contact"]
        };

    },

    achievements(L, lang) {

        const items = (window.SiteData.achievements || [])
            .slice(0, 5)
            .map(a => "• " + (lang === "fa" ? (a.nameFa || a.nameEn) : (a.nameEn || a.nameFa)));

        return {
            text: L.achievementsIntro + "\n" + items.join("\n"),
            source: "SiteData.achievements",
            suggestions: lang === "fa" ? ["پروژه‌ها", "مهارت‌ها"] : ["Projects", "Skills"]
        };

    },

    // برای intent های عمومی (search / education / experience / about و ...)
    // که پاسخ آماده‌ای نداریم، از موتور جستجو روی کل دانش سایت استفاده می‌کنه
    fromSearch(results, L, lang) {

        const threshold = ChatbotConfig.confidenceThreshold || 0.35;
        const good = results.filter(r => r.confidence >= threshold);

        if (!good.length) {

            return {
                text: L.noInfo,
                suggestions: L.suggestions
            };

        }

        const top = good[0];
        const text = (lang === "fa" ? top.answerFa : top.answerEn) || top.value;

        return {
            text,
            source: ChatbotConfig.showSource ? top.path : null,
            suggestions: ChatbotConfig.showSuggestions ? L.suggestions : []
        };

    }

};
