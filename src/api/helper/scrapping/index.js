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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scrapping = void 0;
var scrapped_items_model_1 = require("../../schema/scrapped-items.model");
var underscore_1 = require("underscore");
var daily_job_model_1 = require("../../schema/daily-job.model");
var axios_1 = require("axios");
var category_model_1 = require("../../schema/category.model");
var item_model_1 = require("../../schema/item.model");
var daily_job_model_2 = require("../../schema/daily-job.model");
var category_model_2 = require("../../schema/category.model");
var logger_1 = require("../../config/logger");
var ebay_1 = require("./ebay");
var scarce_1 = require("./scarce");
var brickowl_1 = require("./brickowl");
var chowrentoys_1 = require("./chowrentoys");
var mercari_1 = require("./mercari");
var novelship_1 = require("./novelship");
var vintagevtg_1 = require("./vintagevtg");
var adebooks_1 = require("./adebooks");
var bonanza_1 = require("./bonanza");
var estay_1 = require("./estay");
var gamedays_1 = require("./gamedays");
var myslabs_1 = require("./myslabs");
var steinersports_1 = require("./steinersports");
var whatnot_1 = require("./whatnot");
var yamestore_1 = require("./yamestore");
var fatherson_1 = require("./fatherson");
var amazon_1 = require("./amazon");
var bricklink_1 = require("./bricklink");
var walmat_1 = require("./walmat");
var Scrapping = /** @class */ (function () {
    function Scrapping() {
        this.bricklink = new bricklink_1.default();
        this.walmat = new walmat_1.default();
        this.amazon = new amazon_1.default();
        this.ebay = new ebay_1.default();
        this.scarce = new scarce_1.default();
        this.brickowl = new brickowl_1.default();
        this.chowrentoys = new chowrentoys_1.default();
        this.mercari = new mercari_1.default();
        this.novelship = new novelship_1.default();
        this.vintage = new vintagevtg_1.default();
        this.adobebooks = new adebooks_1.default();
        this.bonanza = new bonanza_1.default();
        this.estay = new estay_1.default();
        this.gamedays = new gamedays_1.default();
        this.myslabs = new myslabs_1.default();
        this.steiner = new steinersports_1.default();
        this.whatnot = new whatnot_1.default();
        this.yamestore = new yamestore_1.default();
        this.fatherson = new fatherson_1.default();
        /*
          public async testing(id) {
            console.log('testing...')
            let items_data = await itemModel.find({});
            console.log('asdfasdf')
            console.log(items_data.length)
            items_data = items_data.filter(x => x._id == id)
            if (items_data.length > 1 || items_data.length == 0) {
              console.log('fail asdfss')
              console.log(items_data.length)
              return
            }
            console.log('whhhhaaat')
            // console.log(items_data)
            // console.log(items_data[0])
            const same_data = items_data.map((item) => {
              let item_keywords = item.item_keywords.filter(x => x.toLowerCase() != item.item_title.toLocaleLowerCase())
              let title = item.item_title
              item_keywords.forEach(x => title += " " + x)
              return {
                title: title,
                item: item._id,
              }
            })
        
        
            const items = [];
        
            for (let i = 0; i < same_data.length; i += 1) {
              items.push(same_data.slice(i, i + 1));
            }
            let response;
            let offset = 0;
        
            _(items).each((item) => {
              // setTimeout(() => {
              item.forEach(async (item) => {
        
                if (item.title !== 'Shop on eBay') {
                  // console.log(item.title)
                  const data = await this.scrappingBeeDaily(item.title, item.item);
        
                  // console.log(data)
        
                  data.forEach(el => el.similarity = similarity(el.title, item.title))
        
                  const average = await this.getAveragePrice(data);
        
                  const median = await this.getMedianPrice(data);
        
                  const { high, low } = await this.getHighLowPrice(data)
        
                  console.log('creating')
                  return await dailyJob.create({
                    _scrapId: item.item,
                    median: median,
                    average: average,
                    same_data: data,
                    lowest_price: low,
                    highest_price: high,
                  });
                }
                return response;
              });
            });
            // offset += 25000;
            // });
          }
        */
    }
    /*
    public async scrapCall(item) {
      try {
        const url = `https://hobbyist-scrapper.herokuapp.com/api/v1/scrap-item?item=${item}`;
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
    public async ebayScrapping(item) {
      try {
        const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
        const page = await browser.newPage();
        await page.goto("https://www.ebay.com/");
        await page.waitForSelector("#gh-ac");
        await page.type("#gh-ac", `${item}`);
        await page.click('input[value="Search"]');
  
        await page.waitForSelector("div.s-item__wrapper");
  
        const link = await page.$$eval("img.s-item__image-img", (items) => {
          return items.map((item: any) => {
            return item.src;
          });
        });
  
        const title = await page.$$eval("h3.s-item__title", (items) => {
          return items.map((item: any) => {
            return item.innerText;
          });
        });
  
        const price = await page.$$eval("span.s-item__price", (items) => {
          return items.map((item: any) => {
            return item.innerText;
          });
        });
  
        const invs = [];
  
        for (let i = 0, length = 17; i < length; i++) {
          const inv: any = {
            price: this.priceToStr(price[i]),
            title: title[i],
          };
          if (i < link.length) {
            inv.link = link[i];
            inv.baseCurrency = "$";
            inv.date = new Date();
          }
          invs.push(inv);
        }
  
        return invs;
      } catch (error) {
        if (error instanceof puppeteer.errors.TimeoutError) {
          return error.message;
        }
      }
    }
    
    public async ebayScrappingDaily(
      itemId?: any,
      user?: any,
      id?: any,
      item?: any
    ) {
      try {
  
        const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
        const page = await browser.newPage();
        await page.goto("https://www.ebay.com/");
        await page.waitForSelector("#gh-ac");
        await page.type("#gh-ac", `${item}`);
        await page.click('input[value="Search"]');
  
        await page.waitForSelector("div.s-item__wrapper");
  
        const link = await page.$$eval("img.s-item__image-img", (items) => {
          return items.map((item: any) => {
            return item.src;
          });
        });
  
        const title = await page.$$eval("h3.s-item__title", (items) => {
          return items.map((item: any) => {
            return item.innerText;
          });
        });
  
        const price = await page.$$eval("span.s-item__price", (items) => {
          return items.map((item: any) => {
            return item.innerText;
          });
        });
  
        const invs = [];
  
        for (let i = 0, length = 17; i < length; i++) {
          const inv: any = {
            price: this.priceToStr(price[i]),
            title: title[i],
          };
          if (i < link.length) {
            inv.link = link[i];
            inv.baseCurrency = "$";
            inv.date = new Date();
          }
          invs.push(inv);
        }
  
        return invs;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    }
    */
    Scrapping.prototype.saveScrapItem = function (category, item_title, itemId, user) {
        return __awaiter(this, void 0, void 0, function () {
            var scrapped_data, good_items, i, similar_data, average, median, _a, high, low, createNewScrapItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.scrappingBee(item_title, itemId)];
                    case 1:
                        scrapped_data = _b.sent();
                        good_items = [];
                        //add all similarity > 0.8, then keep on adding until count is greater than 30
                        for (i = 0; i < scrapped_data.length; i++) {
                            if (scrapped_data[i].similarity >= 0.89)
                                good_items.push(scrapped_data[i]);
                        }
                        if (good_items.length == 0) {
                            good_items = scrapped_data.slice(0, 30);
                        }
                        similar_data = scrapped_data.slice(good_items.length, scrapped_data.length);
                        return [4 /*yield*/, this.getAveragePrice(good_items)];
                    case 2:
                        average = _b.sent();
                        return [4 /*yield*/, this.getMedianPrice(good_items)];
                    case 3:
                        median = _b.sent();
                        return [4 /*yield*/, this.getHighLowPrice(good_items)];
                    case 4:
                        _a = _b.sent(), high = _a.high, low = _a.low;
                        return [4 /*yield*/, scrapped_items_model_1.default.create({
                                _itemId: itemId,
                                _userId: user,
                                similar_data: similar_data,
                                same_data: good_items,
                                average: average,
                                median: median,
                                highest_price: high,
                                lowest_price: low,
                            })];
                    case 5:
                        createNewScrapItem = _b.sent();
                        if (createNewScrapItem)
                            return [2 /*return*/, true];
                        return [2 /*return*/];
                }
            });
        });
    };
    Scrapping.prototype.saveDailyJobforCategory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categories, all_categories, items, i, response, offset;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, category_model_1.default.find({})];
                    case 1:
                        categories = _a.sent();
                        all_categories = categories[0].category;
                        items = [];
                        // seriously needs to be refactored
                        for (i = 0; i < all_categories.length; i += 1) {
                            items.push(all_categories.slice(i, i + 1));
                        }
                        offset = 0;
                        (0, underscore_1.default)(items).each(function (item) {
                            setTimeout(function () {
                                item.forEach(function (category) { return __awaiter(_this, void 0, void 0, function () {
                                    var data, average, median;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!category) return [3 /*break*/, 5];
                                                return [4 /*yield*/, this.scrappingBee(category)];
                                            case 1:
                                                data = _a.sent();
                                                return [4 /*yield*/, this.getAveragePrice(data)];
                                            case 2:
                                                average = _a.sent();
                                                return [4 /*yield*/, this.getMedianPrice(data)];
                                            case 3:
                                                median = _a.sent();
                                                return [4 /*yield*/, daily_job_model_1.default.create({
                                                        median: median,
                                                        average: average,
                                                        category: category,
                                                        similar_data: data,
                                                    })];
                                            case 4: return [2 /*return*/, _a.sent()];
                                            case 5: return [2 /*return*/, response];
                                        }
                                    });
                                }); });
                            }, 25000 + offset);
                            offset += 25000;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Scrapping.prototype.saveDailyJobForItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items_data, same_data, items, i, response, offset;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, item_model_1.default.find({})];
                    case 1:
                        items_data = _a.sent();
                        same_data = items_data.map(function (item) {
                            var item_keywords = item.item_keywords.filter(function (x) { return x.toLowerCase() != item.item_title.toLowerCase(); });
                            var title = item.item_title;
                            item_keywords.forEach(function (x) { return title += " " + x; });
                            return {
                                title: title,
                                item: item._id,
                            };
                        });
                        items = [];
                        for (i = 0; i < same_data.length; i += 1) {
                            items.push(same_data.slice(i, i + 1));
                        }
                        offset = 0;
                        (0, underscore_1.default)(items).each(function (item) {
                            setTimeout(function () {
                                item.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                    var data, whole_data, good_items, i, similar_data, average, median, _a, high, low;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                if (!(item.title !== 'Shop on eBay')) return [3 /*break*/, 6];
                                                return [4 /*yield*/, this.scrappingBee(item.title, item.item)];
                                            case 1:
                                                data = _b.sent();
                                                whole_data = data;
                                                good_items = [];
                                                //add all similarity > 0.8, then keep on adding until count is greater than 30
                                                for (i = 0; i < data.length; i++) {
                                                    if (data[i].similarity >= 0.89)
                                                        good_items.push(data[i]);
                                                }
                                                if (good_items.length == 0) {
                                                    good_items = whole_data.slice(0, 30);
                                                }
                                                similar_data = whole_data.slice(good_items.length);
                                                return [4 /*yield*/, this.getAveragePrice(good_items)];
                                            case 2:
                                                average = _b.sent();
                                                return [4 /*yield*/, this.getMedianPrice(good_items)];
                                            case 3:
                                                median = _b.sent();
                                                return [4 /*yield*/, this.getHighLowPrice(good_items)];
                                            case 4:
                                                _a = _b.sent(), high = _a.high, low = _a.low;
                                                return [4 /*yield*/, daily_job_model_1.default.create({
                                                        _scrapId: item.item,
                                                        median: median,
                                                        average: average,
                                                        same_data: good_items,
                                                        similar_data: similar_data,
                                                        lowest_price: low,
                                                        highest_price: high,
                                                    })];
                                            case 5: return [2 /*return*/, _b.sent()];
                                            case 6: return [2 /*return*/, response];
                                        }
                                    });
                                }); });
                            }, 25000 + offset);
                            offset += 25000;
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Scrapping.prototype.cleanDailyJobsCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var categories, _i, categories_1, category, dailyJobs, i, err_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, category_model_2.default.find({})];
                    case 1:
                        categories = _b.sent();
                        categories = categories[0].category;
                        _i = 0, categories_1 = categories;
                        _b.label = 2;
                    case 2:
                        if (!(_i < categories_1.length)) return [3 /*break*/, 8];
                        category = categories_1[_i];
                        return [4 /*yield*/, ((_a = daily_job_model_2.default.find({ category: category })) === null || _a === void 0 ? void 0 : _a.sort({ createdAt: -1 }))
                            //   Delete the title and link of all but the most recent daily-job
                        ];
                    case 3:
                        dailyJobs = _b.sent();
                        //   Delete the title and link of all but the most recent daily-job
                        dailyJobs = dailyJobs.slice(0, 4);
                        i = 2;
                        _b.label = 4;
                    case 4:
                        if (!(i < dailyJobs.length)) return [3 /*break*/, 7];
                        if (!(dailyJobs[i].same_data && dailyJobs[i].similar_data)) {
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, daily_job_model_2.default.updateOne({ _id: dailyJobs[i]._id }, { $unset: { same_data: '', similar_data: '' } })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_1 = _b.sent();
                        logger_1.logger.error(err_1.message);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Scrapping.prototype.cleanDailyJobsItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, _i, items_1, item, dailyJobs, i, err_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 9, , 10]);
                        return [4 /*yield*/, item_model_1.default.find({})
                            // For each item, find all daily-jobs that have the item's id
                        ];
                    case 1:
                        items = _b.sent();
                        _i = 0, items_1 = items;
                        _b.label = 2;
                    case 2:
                        if (!(_i < items_1.length)) return [3 /*break*/, 8];
                        item = items_1[_i];
                        return [4 /*yield*/, ((_a = daily_job_model_2.default.find({ _scrapId: item._id })) === null || _a === void 0 ? void 0 : _a.sort({ createdAt: -1 }))];
                    case 3:
                        dailyJobs = _b.sent();
                        //   Delete the title and link of all but the most recent daily-job
                        dailyJobs = dailyJobs.slice(0, 4);
                        i = 2;
                        _b.label = 4;
                    case 4:
                        if (!(i < dailyJobs.length)) return [3 /*break*/, 7];
                        if (!(dailyJobs[i].same_data && dailyJobs[i].similar_data)) {
                            return [3 /*break*/, 6];
                        }
                        return [4 /*yield*/, daily_job_model_2.default.updateOne({ _id: dailyJobs[i]._id }, { $unset: { same_data: '', similar_data: '' } })];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        _i++;
                        return [3 /*break*/, 2];
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        err_2 = _b.sent();
                        logger_1.logger.error(err_2.message);
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    ;
    Scrapping.prototype.getMedianPrice = function (items) {
        if (items) {
            return underscore_1.default.sortBy(items.map(function (item) { return parseFloat(item.price); }))[Math.floor(items.length / 2)];
        }
    };
    Scrapping.prototype.getAveragePrice = function (items) {
        if (items)
            return items.map(function (item) { return parseFloat(item.price); }).reduce(function (a, b) { return a + b; }, 0) / items.length;
    };
    Scrapping.prototype.getHighLowPrice = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var high, low;
            return __generator(this, function (_a) {
                items.sort(function (a, b) { return b.price - a.price; });
                high = items[0].price;
                low = items[items.length - 1].price;
                return [2 /*return*/, { low: low, high: high }];
            });
        });
    };
    Scrapping.prototype.scrappingBee = function (item_1) {
        return __awaiter(this, arguments, void 0, function (item, id) {
            var result, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, sim_data;
            if (id === void 0) { id = null; }
            return __generator(this, function (_33) {
                switch (_33.label) {
                    case 0:
                        result = [];
                        _b = (_a = result.push).apply;
                        _c = [result];
                        return [4 /*yield*/, this.ebay.getScrappingData(item, id)];
                    case 1:
                        _b.apply(_a, _c.concat([(_33.sent())]));
                        _e = (_d = result.push).apply;
                        _f = [result];
                        return [4 /*yield*/, this.scarce.getScrappingData(item, id)];
                    case 2:
                        _e.apply(_d, _f.concat([(_33.sent())]));
                        _h = (_g = result.push).apply;
                        _j = [result];
                        return [4 /*yield*/, this.brickowl.getScrappingData(item, id)];
                    case 3:
                        _h.apply(_g, _j.concat([(_33.sent())]));
                        _l = (_k = result.push).apply;
                        _m = [result];
                        return [4 /*yield*/, this.chowrentoys.getScrappingData(item, id)];
                    case 4:
                        _l.apply(_k, _m.concat([(_33.sent())]));
                        _p = (_o = result.push).apply;
                        _q = [result];
                        return [4 /*yield*/, this.mercari.getScrappingData(item, id)];
                    case 5:
                        _p.apply(_o, _q.concat([(_33.sent())]));
                        _s = (_r = result.push).apply;
                        _t = [result];
                        return [4 /*yield*/, this.novelship.getScrappingData(item, id)];
                    case 6:
                        _s.apply(_r, _t.concat([(_33.sent())]));
                        _v = (_u = result.push).apply;
                        _w = [result];
                        return [4 /*yield*/, this.vintage.getScrappingData(item, id)];
                    case 7:
                        _v.apply(_u, _w.concat([(_33.sent())]));
                        _y = (_x = result.push).apply;
                        _z = [result];
                        return [4 /*yield*/, this.yamestore.getScrappingData(item, id)];
                    case 8:
                        _y.apply(_x, _z.concat([(_33.sent())]));
                        _1 = (_0 = result.push).apply;
                        _2 = [result];
                        return [4 /*yield*/, this.adobebooks.getScrappingData(item, id)];
                    case 9:
                        _1.apply(_0, _2.concat([(_33.sent())]));
                        _4 = (_3 = result.push).apply;
                        _5 = [result];
                        return [4 /*yield*/, this.bonanza.getScrappingData(item, id)];
                    case 10:
                        _4.apply(_3, _5.concat([(_33.sent())]));
                        _7 = (_6 = result.push).apply;
                        _8 = [result];
                        return [4 /*yield*/, this.estay.getScrappingData(item, id)];
                    case 11:
                        _7.apply(_6, _8.concat([(_33.sent())]));
                        _10 = (_9 = result.push).apply;
                        _11 = [result];
                        return [4 /*yield*/, this.myslabs.getScrappingData(item, id)];
                    case 12:
                        _10.apply(_9, _11.concat([(_33.sent())]));
                        _13 = (_12 = result.push).apply;
                        _14 = [result];
                        return [4 /*yield*/, this.whatnot.getScrappingData(item, id)];
                    case 13:
                        _13.apply(_12, _14.concat([(_33.sent())]));
                        _16 = (_15 = result.push).apply;
                        _17 = [result];
                        return [4 /*yield*/, this.steiner.getScrappingData(item, id)];
                    case 14:
                        _16.apply(_15, _17.concat([(_33.sent())]));
                        _19 = (_18 = result.push).apply;
                        _20 = [result];
                        return [4 /*yield*/, this.gamedays.getScrappingData(item, id)];
                    case 15:
                        _19.apply(_18, _20.concat([(_33.sent())]));
                        _22 = (_21 = result.push).apply;
                        _23 = [result];
                        return [4 /*yield*/, this.fatherson.getScrappingData(item, id)];
                    case 16:
                        _22.apply(_21, _23.concat([(_33.sent())]));
                        _25 = (_24 = result.push).apply;
                        _26 = [result];
                        return [4 /*yield*/, this.amazon.getScrappingData(item, id)];
                    case 17:
                        _25.apply(_24, _26.concat([(_33.sent())]));
                        _28 = (_27 = result.push).apply;
                        _29 = [result];
                        return [4 /*yield*/, this.bricklink.getScrappingData(item, id)];
                    case 18:
                        _28.apply(_27, _29.concat([(_33.sent())]));
                        _31 = (_30 = result.push).apply;
                        _32 = [result];
                        return [4 /*yield*/, this.walmat.getScrappingData(item, id)];
                    case 19:
                        _31.apply(_30, _32.concat([(_33.sent())]));
                        return [4 /*yield*/, axios_1.default.post('http://localhost:8000/calculate-similarity', {
                                search_word: item,
                                products: result.map(function (val) { return val.title; })
                            })];
                    case 20:
                        sim_data = _33.sent();
                        result.forEach(function (element, index) {
                            element.similarity = sim_data.data.data[index];
                        });
                        result.sort(function (a, b) { return b.similarity - a.similarity; });
                        return [2 /*return*/, result.slice(0, 200)];
                }
            });
        });
    };
    return Scrapping;
}());
exports.Scrapping = Scrapping;
