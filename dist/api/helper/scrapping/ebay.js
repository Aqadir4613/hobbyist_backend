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
    priceToStr(price) {
        if (price && (price === null || price === void 0 ? void 0 : price.includes("to"))) {
            const lomerImit = price
                .split("$").join("")
                .replace("to", "").replace(",", "")
                .split(" ")[0];
            const upperLimit = price
                .split("$").join("")
                .replace("to", "").replace(",", "")
                .split(" ")[1];
            const avgPrice = (parseFloat(lomerImit) + parseFloat(upperLimit)) / 2;
            return !avgPrice ? lomerImit : avgPrice;
        }
        else {
            return parseFloat(price === null || price === void 0 ? void 0 : price.replace("$", "").replace(",", ""));
        }
    }
    getScrappingData(search_word, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = search_word.split(" ").join("+");
            const params = {
                api_key: "DCXO8PT2BDINHZNQDJUMHLK9FYAKG3MDW9U4T1A4G7KNZ4IN7WNYA796GELUFA1KW9VQ7R9ZXSXN28IH",
                url: `https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=${url}&_sacat=0`,
                // Wait for there to be at least one
                // non-empty .event-tile element
                wait_for: ".s-item",
                extract_rules: JSON.stringify({
                    data: {
                        // Lets create a list with data
                        // extracted from the .event-tile element
                        selector: ".s-item",
                        type: "list",
                        // Each object in the list should
                        output: {
                            // have a title lifted from
                            // the .event-tile__title element
                            price: ".s-item__price",
                            title: ".s-item__title",
                            link: {
                                selector: ".s-item__image-wrapper img",
                                output: "@src",
                            },
                            url: {
                                selector: ".s-item__link",
                                output: "@href"
                            }
                        },
                    },
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
                            price: this.priceToStr(item.price),
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
                logger_1.logger.info(`ebay complete with ${invs.length}`);
                return invs.slice(1);
            }
            catch (error) {
                logger_1.logger.error(`ebay ${error}`);
                return [];
            }
        });
    }
}
exports.default = Scrapping;
//# sourceMappingURL=ebay.js.map