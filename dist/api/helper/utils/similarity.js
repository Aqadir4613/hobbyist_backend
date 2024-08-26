"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.similarity = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const logger_1 = require("../../config/logger");
// import connectDatabase from '../../database';
function removePunctuation(s) {
    return s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ");
}
const similarity = (matching_title, target_title) => {
    try {
        const natural = require('natural');
        const sw = require('remove-stopwords');
        matching_title = removePunctuation(matching_title);
        target_title = removePunctuation(target_title);
        target_title = target_title.split(' ');
        target_title = sw.removeStopwords(target_title);
        matching_title = matching_title.split(' ');
        matching_title = sw.removeStopwords(matching_title);
        matching_title = matching_title.map(word => natural.PorterStemmer.stem(word));
        target_title = target_title.map(word => natural.PorterStemmer.stem(word));
        const intersection = matching_title.filter(word => target_title.includes(word)).length;
        if (matching_title.length == 0)
            return 0;
        return intersection / (matching_title.length + target_title.length - intersection);
    }
    catch (e) {
        console.log("error in calculating similarity");
        logger_1.logger.error("error in calculating sim: ");
        console.log(e);
        logger_1.logger.error(e);
        console.log(matching_title, target_title);
        logger_1.logger.error(matching_title, target_title);
        return 0;
    }
};
exports.similarity = similarity;
const test = () => {
    console.log('running test...');
    let t = "Ring";
    const m = "Feng Shui Pixiu Mani Mantra Adjustable Ring Protection Wealth Ring Qua…";
    console.log(similarity(m, t));
};
//# sourceMappingURL=similarity.js.map