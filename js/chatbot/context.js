/**
 * ============================================
 * Context Engine
 * ============================================
 * ردیابی آخرین موضوع گفتگو، برای پاسخ بهتر به سوالات پیگیرانه
 */

window.ChatbotContext = {

    update(intent, data = {}) {

        const memory = window.ChatbotMemory;

        if (!memory) return;

        memory.lastIntent = intent;

        if (data.project) memory.lastProject = data.project;
        if (data.skill) memory.lastSkill = data.skill;
        if (data.topic) memory.lastTopic = data.topic;

    }

};
