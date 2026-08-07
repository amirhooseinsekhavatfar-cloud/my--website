window.Normalizer = {

    normalize(text = "") {

        return ChatbotUtils.normalize(text);

    },

    tokenize(text = "") {

        return this
            .normalize(text)
            .split(" ");

    }

};