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
        if (!price)
            return 0;
        return parseFloat(price.slice(1).replace(",", ""));
    }
    getScrappingData(search_word, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = search_word.split(" ").join("+");
            const params = {
                api_key: "DCXO8PT2BDINHZNQDJUMHLK9FYAKG3MDW9U4T1A4G7KNZ4IN7WNYA796GELUFA1KW9VQ7R9ZXSXN28IH",
                url: `https://gamedaysportsmemorabilia.com/search.php?search_query=${url}`,
                // Wait for there to be at least one
                // non-empty .event-tile element
                wait_for: "body",
                extract_rules: JSON.stringify({
                    data: {
                        selector: '.productGrid li.product',
                        type: "list",
                        output: {
                            title: ".card-title",
                            price: ".price--withoutTax",
                            link: {
                                selector: ".card-img-container img",
                                output: "@src"
                            },
                            url: {
                                selector: ".card-title a",
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
                    if (item) {
                        const inv = {
                            price: this.PriceToStr(item.price),
                            title: item.title,
                        };
                        if (item.link) {
                            inv.link = item.link;
                            inv.baseCurrency = "$";
                            inv.date = new Date();
                            inv.url = item.url;
                            if (id == null)
                                inv.category = search_word;
                            inv.item = id;
                        }
                        invs.push(inv);
                    }
                }));
                logger_1.logger.info(`gamedays complete with ${invs.length}`);
                return invs;
            }
            catch (error) {
                logger_1.logger.error(`gamedays ${error}`);
                return [];
            }
        });
    }
}
exports.default = Scrapping;
//# sourceMappingURL=gamedays.js.map