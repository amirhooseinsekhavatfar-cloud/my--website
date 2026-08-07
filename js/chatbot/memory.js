/**
 * ============================================
 * Memory Engine v1
 * ============================================
 * حافظه‌ی کوتاه‌مدت گفتگو (فقط در حافظه‌ی جاوااسکریپت،
 * بدون ذخیره‌سازی در localStorage و بدون بقا بعد از رفرش صفحه)
 */

window.ChatbotMemory = {

    limit: 20,

    entries: [],

    lastIntent: null,
    lastProject: null,
    lastSkill: null,
    lastTopic: null,

    add(data) {

        this.entries.push(data);

        if (this.entries.length > this.limit) {
            this.entries.shift();
        }

    },

    clear() {

        this.entries = [];
        this.lastIntent = null;
        this.lastProject = null;
        this.lastSkill = null;
        this.lastTopic = null;

    },

    getLast() {

        return this.entries[this.entries.length - 1] || null;

    }

};

// سقف حافظه رو با تنظیمات ربات هماهنگ می‌کنه
if (window.ChatbotConfig && window.ChatbotConfig.maxHistory) {
    window.ChatbotMemory.limit = window.ChatbotConfig.maxHistory;
}
