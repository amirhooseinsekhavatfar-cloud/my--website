window.ChatbotUtils = {

    normalize(text = "") {

        return text
            .toString()
            .trim()
            .replace(/ي/g, "ی")
            .replace(/ك/g, "ک")
            .replace(/ة/g, "ه")
            .replace(/خونه/g, "خانه")
            .replace(/\u200c/g, " ")
            .replace(/[؟،؛!?.,;:"()«»]/g, "")
            .replace(/'/g, " ")
            .replace(/—/g, " ")
            .replace(/\s+/g, " ")
            .toLowerCase();

    },

    contains(text, keyword) {

        return this.normalize(text)
            .includes(this.normalize(keyword));

    },

    random(array) {

        return array[
            Math.floor(Math.random() * array.length)
        ];

    },

    unique(array) {

        return [...new Set(array)];

    },

    // یک متن رو به بایگرام (جفت‌کاراکتر) تبدیل می‌کنه، برای مقایسه فازی (Fuzzy)
    bigrams(str) {

        const s = " " + str + " ";
        const grams = [];

        for (let i = 0; i < s.length - 1; i++) {
            grams.push(s.slice(i, i + 2));
        }

        return grams;

    },

    // شباهت دو رشته رو بین ۰ تا ۱ حساب می‌کنه (Dice coefficient)
    diceCoefficient(a, b) {

        if (!a || !b || a.length < 2 || b.length < 2) {
            return a === b ? 1 : 0;
        }

        const gramsA = this.bigrams(a);
        const gramsB = this.bigrams(b).slice();

        let matches = 0;

        gramsA.forEach(g => {
            const idx = gramsB.indexOf(g);
            if (idx !== -1) {
                matches++;
                gramsB.splice(idx, 1);
            }
        });

        return (2 * matches) / (gramsA.length + gramsB.length);

    },

    // بیشترین شباهت یک کلمه رو نسبت به کلمات داخل یک متن پیدا می‌کنه
    bestSimilarity(token, text) {

        let best = 0;

        text.split(" ").forEach(word => {

            const sim = this.diceCoefficient(token, word);

            if (sim > best) best = sim;

        });

        return best;

    }

};
