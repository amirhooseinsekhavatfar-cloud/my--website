/**
 * ============================================
 * Portfolio AI — FAQ Slider
 * ============================================
 * یه اسلایدر از سوالات پیشنهادی داخل چت‌بات می‌سازه: چند دسته‌بندی
 * (دربارهٔ امیرحسین، برق، کنترل/PLC، خانه هوشمند، ...) که هرکدوم یه
 * اسلاید جداگانه‌ست و کاربر می‌تونه با فلش یا سوایپ بینشون جابه‌جا بشه؛
 * با زدن هر سوال، همون لحظه از چت‌بات پرسیده می‌شه.
 */

window.ChatFaqSlider = {

    // دستهٔ اول («دربارهٔ امیرحسین») سوالات شخصی ثابته؛ بقیهٔ دسته‌ها از
    // روی window.SiteData.faq (فیلد category) به‌صورت خودکار ساخته می‌شن
    CATEGORIES: [
        {
            id: "about",
            icon: "fa-user",
            titleFa: "دربارهٔ امیرحسین",
            titleEn: "About Amir",
            questions: [
                { fa: "مهارت‌های امیرحسین چیه؟", en: "What are Amir's main skills?" },
                { fa: "پروژه‌هاش چیه؟", en: "Tell me about his projects" },
                { fa: "چطور باهاش تماس بگیرم؟", en: "How can I contact Amir?" },
                { fa: "تجربه‌اش با PLC چقدره؟", en: "What is his experience with PLC?" }
            ]
        },
        { id: "electrical", icon: "fa-bolt", titleFa: "برق پایه", titleEn: "Basic Electrical" },
        { id: "control", icon: "fa-sliders", titleFa: "قطعات و مدار کنترل", titleEn: "Control Components" },
        { id: "plc", icon: "fa-microchip", titleFa: "PLC و اتوماسیون", titleEn: "PLC & Automation" },
        { id: "smarthome", icon: "fa-house-signal", titleFa: "خانه هوشمند", titleEn: "Smart Home" },
        { id: "motors", icon: "fa-gear", titleFa: "موتورها", titleEn: "Motors" },
        { id: "safety", icon: "fa-shield-halved", titleFa: "ایمنی صنعتی", titleEn: "Industrial Safety" },
        { id: "iot", icon: "fa-satellite-dish", titleFa: "IoT و ابزار DIY", titleEn: "IoT & DIY Tools" }
    ],

    currentSlide: 0,

    getQuestionsFor(category) {

        if (category.questions) return category.questions;

        return (window.SiteData.faq || [])
            .filter(item => item.category === category.id)
            .map(item => ({ fa: item.questionFa, en: item.questionEn }));

    },

    // دسته‌هایی که هیچ سوالی توشون نیست رو حذف می‌کنه (مثلاً اگه یه روز
    // دسته خالی موند، اسلاید خالی نشون داده نشه)
    getVisibleCategories() {

        return this.CATEGORIES.filter(cat => this.getQuestionsFor(cat).length > 0);

    },

    render() {

        const container = document.getElementById("chat-faq-slider");

        if (!container) return;

        container.style.display = "";

        const lang = (window.chatLang || document.documentElement.lang) === "fa" ? "fa" : "en";
        const categories = this.getVisibleCategories();

        const track = document.createElement("div");
        track.className = "chat-faq-track";
        track.id = "chat-faq-track";

        categories.forEach(cat => {

            const slide = document.createElement("div");
            slide.className = "chat-faq-slide";

            this.getQuestionsFor(cat).forEach(q => {

                const label = (lang === "fa" ? q.fa : q.en) || q.fa || q.en;
                const sendText = (lang === "fa" ? q.fa : q.en) || q.fa || q.en;

                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = "chat-quick-btn chat-faq-question-btn";
                btn.innerHTML = '<span class="chat-faq-btn-glyph">›</span>' + label;
                btn.onclick = () => sendQuick(sendText);

                slide.appendChild(btn);

            });

            track.appendChild(slide);

        });

        const dotsWrap = document.createElement("div");
        dotsWrap.className = "chat-faq-dots";
        dotsWrap.id = "chat-faq-dots";

        categories.forEach((cat, i) => {

            const dot = document.createElement("span");
            dot.className = "chat-faq-dot" + (i === 0 ? " active" : "");
            dot.onclick = () => this.goTo(i);
            dotsWrap.appendChild(dot);

        });

        const prevIcon = lang === "fa" ? "fa-chevron-right" : "fa-chevron-left";
        const nextIcon = lang === "fa" ? "fa-chevron-left" : "fa-chevron-right";

        const header = document.createElement("div");
        header.className = "chat-faq-slider-header";
        header.innerHTML =
            '<button type="button" class="chat-faq-nav-btn" id="chat-faq-prev" aria-label="prev"><i class="fa-solid ' + prevIcon + '"></i></button>' +
            '<div class="chat-faq-slider-title" id="chat-faq-title">' +
                '<span class="chat-faq-icon-chip" id="chat-faq-icon-chip"><i class="fa-solid"></i></span>' +
                '<span class="chat-faq-title-text" id="chat-faq-title-text"></span>' +
                '<span class="chat-faq-index" id="chat-faq-index"></span>' +
            '</div>' +
            '<button type="button" class="chat-faq-nav-btn" id="chat-faq-next" aria-label="next"><i class="fa-solid ' + nextIcon + '"></i></button>';

        container.innerHTML = "";
        container.appendChild(header);
        container.appendChild(track);
        container.appendChild(dotsWrap);

        document.getElementById("chat-faq-prev").onclick = () => this.goTo(this.currentSlide - 1);
        document.getElementById("chat-faq-next").onclick = () => this.goTo(this.currentSlide + 1);

        // وقتی کاربر با سوایپ/اسکرول دستی جابه‌جا می‌شه هم نقطه‌ها و عنوان به‌روز بشن
        let scrollTimer = null;
        track.addEventListener("scroll", () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                // اگه این ترک قدیمیه و با رندر جدید (مثلاً بعد از تعویض زبان) از صفحه
                // جدا شده، یا عرضش صفره، محاسبه نکن — وگرنه currentSlide می‌شه NaN
                if (!track.isConnected || !track.clientWidth) return;
                const index = Math.round(track.scrollLeft / track.clientWidth);
                this.currentSlide = Math.max(0, Math.min(categories.length - 1, index));
                this.updateUI(lang, categories);
            }, 120);
        });

        this.currentSlide = 0;
        this.updateUI(lang, categories);

    },

    updateUI(lang, categories) {

        const cat = categories[this.currentSlide];
        const iconChip = document.getElementById("chat-faq-icon-chip");
        const titleText = document.getElementById("chat-faq-title-text");
        const indexEl = document.getElementById("chat-faq-index");

        if (cat) {

            if (iconChip) iconChip.innerHTML = '<i class="fa-solid ' + cat.icon + '"></i>';
            if (titleText) titleText.textContent = lang === "fa" ? cat.titleFa : cat.titleEn;

            if (indexEl) {
                const current = String(this.currentSlide + 1).padStart(2, "0");
                const total = String(categories.length).padStart(2, "0");
                indexEl.textContent = current + " / " + total;
            }

        }

        document.querySelectorAll("#chat-faq-dots .chat-faq-dot").forEach((dot, i) => {
            dot.classList.toggle("active", i === this.currentSlide);
        });

        const prevBtn = document.getElementById("chat-faq-prev");
        const nextBtn = document.getElementById("chat-faq-next");

        if (prevBtn) prevBtn.disabled = this.currentSlide === 0;
        if (nextBtn) nextBtn.disabled = this.currentSlide === categories.length - 1;

    },

    goTo(index) {

        const track = document.getElementById("chat-faq-track");
        const categories = this.getVisibleCategories();

        if (!track || !track.clientWidth) return;

        const max = categories.length - 1;
        this.currentSlide = Math.max(0, Math.min(max, index));

        track.scrollTo({
            left: this.currentSlide * track.clientWidth,
            behavior: "smooth"
        });

        const lang = (window.chatLang || document.documentElement.lang) === "fa" ? "fa" : "en";
        this.updateUI(lang, categories);

    }

};

document.addEventListener("DOMContentLoaded", () => {
    window.ChatFaqSlider.render();
});
