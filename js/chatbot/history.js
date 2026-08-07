/**
 * ============================================
 * Conversation History
 * ============================================
 */

window.ChatbotHistory = {

    messages: [],

    add(role, message) {

        this.messages.push({
            role,
            message,
            time: new Date()
        });

    },

    last() {

        return this.messages[this.messages.length - 1] || null;

    },

    clear() {

        this.messages = [];

    }

};
