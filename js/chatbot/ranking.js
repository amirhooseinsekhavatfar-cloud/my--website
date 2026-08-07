/**
 * ==========================================
 * Ranking Engine
 * ==========================================
 */

window.RankingEngine = {

    score(path, text) {

        let score = 0;

        if (path.includes("projects"))
            score += 50;

        if (path.includes("skills"))
            score += 40;

        if (path.includes("achievements"))
            score += 38;

        if (path.includes("about"))
            score += 35;

        if (path.includes("faq"))
            return 100;

        if (path.includes("knowledge"))
            score += 30;

        if (path.includes("pdf."))
            score += 28;

        if (path.includes("services"))
            score += 25;

        score += Math.min(text.length, 30);

        return score;

    }

};
