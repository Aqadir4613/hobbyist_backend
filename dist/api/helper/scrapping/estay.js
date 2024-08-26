"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const logger_1 = require("../../config/logger");
class Scrapping {
    PriceToStr(price) {
        price = price.replace(/ /g, "").replace(/,/g, "");
        let i = 0;
        for (i = 0; i < price.length; i++)
            if (price[i] >= '0' && price[i] <= '9')
                break;
        if (i == price.length)
            return {
                currency: 'No',
                price: 0
            };
        return {
            currency: price.slice(0, i),
            price: parseFloat(price.slice(i))
        };
    }
    getScrappingData(search_word, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = search_word.split(" ").map(val => encodeURIComponent(val)).join(" ");
            const params = {
                api_key: "DCXO8PT2BDINHZNQDJUMHLK9FYAKG3MDW9U4T1A4G7KNZ4IN7WNYA796GELUFA1KW9VQ7R9ZXSXN28IH",
                url: `https://www.etsy.com/search?q=${url}&ref=search_bar`,
                // Wait for there to be at least one
                // non-empty .event-tile element
                wait_for: "div[data-search-results-container]",
                extract_rules: JSON.stringify({
                    data: {
                        selector: 'ol li',
                        type: "list",
                        output: {
                            title: 'h3.v2-listing-card__title',
                            baseCurrency: ".currency-symbol",
                            price: ".currency-value",
                            link: {
                                selector: "img[data-listing-card-listing-image]",
                                output: "@src"
                            },
                            url: {
                                selector: "a",
                                output: "@href"
                            }
                        }
                    }
                }),
            };
            try {
                const { data } = yield axios_1.default.get("https://app.scrapingbee.com/api/v1/", {
                    params: params
                });
                const response = data.data;
                const invs = [];
                yield response.map((item) => __awaiter(this, void 0, void 0, function* () {
                    item.date = new Date();
                    if (id == null)
                        item.category = search_word;
                    item.item = id;
                    invs.push(item);
                }));
                logger_1.logger.info(`estay complete with ${invs.length}`);
                return invs;
            }
            catch (error) {
                logger_1.logger.error(`estay ${error}`);
                return [];
            }
        });
    }
}
exports.default = Scrapping;
//# sourceMappingURL=estay.js.map