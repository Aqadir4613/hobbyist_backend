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
exports.Scrapping = void 0;
const scrapped_items_model_1 = __importDefault(require("../../schema/scrapped-items.model"));
const underscore_1 = __importDefault(require("underscore"));
const daily_job_model_1 = __importDefault(require("../../schema/daily-job.model"));
const axios_1 = __importDefault(require("axios"));
const category_model_1 = __importDefault(require("../../schema/category.model"));
const item_model_1 = __importDefault(require("../../schema/item.model"));
const daily_job_model_2 = __importDefault(require("../../schema/daily-job.model"));
const category_model_2 = __importDefault(require("../../schema/category.model"));
const logger_1 = require("../../config/logger");
const ebay_1 = __importDefault(require("./ebay"));
const scarce_1 = __importDefault(require("./scarce"));
const brickowl_1 = __importDefault(require("./brickowl"));
const chowrentoys_1 = __importDefault(require("./chowrentoys"));
const mercari_1 = __importDefault(require("./mercari"));
const novelship_1 = __importDefault(require("./novelship"));
const vintagevtg_1 = __importDefault(require("./vintagevtg"));
const adebooks_1 = __importDefault(require("./adebooks"));
const bonanza_1 = __importDefault(require("./bonanza"));
const estay_1 = __importDefault(require("./estay"));
const gamedays_1 = __importDefault(require("./gamedays"));
const myslabs_1 = __importDefault(require("./myslabs"));
const steinersports_1 = __importDefault(require("./steinersports"));
const whatnot_1 = __importDefault(require("./whatnot"));
const yamestore_1 = __importDefault(require("./yamestore"));
const fatherson_1 = __importDefault(require("./fatherson"));
const amazon_1 = __importDefault(require("./amazon"));
const bricklink_1 = __importDefault(require("./bricklink"));
const walmat_1 = __importDefault(require("./walmat"));
class Scrapping {
    constructor() {
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
    saveScrapItem(category, item_title, itemId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const scrapped_data = yield this.scrappingBee(item_title, itemId);
            // same_data.forEach(x => x.similarity = similarity(x.title, item_title))
            let good_items = [];
            //add all similarity > 0.8, then keep on adding until count is greater than 30
            for (let i = 0; i < scrapped_data.length; i++) {
                if (scrapped_data[i].similarity >= 0.89)
                    good_items.push(scrapped_data[i]);
            }
            if (good_items.length == 0) {
                good_items = scrapped_data.slice(0, 30);
            }
            const similar_data = scrapped_data.slice(good_items.length, scrapped_data.length);
            const average = yield this.getAveragePrice(good_items);
            const median = yield this.getMedianPrice(good_items);
            const { high, low } = yield this.getHighLowPrice(good_items);
            const createNewScrapItem = yield scrapped_items_model_1.default.create({
                _itemId: itemId,
                _userId: user,
                similar_data: similar_data,
                same_data: good_items,
                average,
                median,
                highest_price: high,
                lowest_price: low,
            });
            if (createNewScrapItem)
                return true;
        });
    }
    saveDailyJobforCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            // const data = await Model.find({});
            // const similar_data = data.map((item) => item.similar_data).flat()
            const categories = yield category_model_1.default.find({});
            const all_categories = categories[0].category;
            const items = [];
            // seriously needs to be refactored
            for (let i = 0; i < all_categories.length; i += 1) {
                items.push(all_categories.slice(i, i + 1));
            }
            let response;
            let offset = 0;
            (0, underscore_1.default)(items).each((item) => {
                setTimeout(() => {
                    item.forEach((category) => __awaiter(this, void 0, void 0, function* () {
                        if (category) {
                            // console.log(item.title)
                            const data = yield this.scrappingBee(category);
                            // data.forEach(el => el.similarity = similarity(el.title,item.title))
                            const average = yield this.getAveragePrice(data);
                            const median = yield this.getMedianPrice(data);
                            return yield daily_job_model_1.default.create({
                                median: median,
                                average: average,
                                category: category,
                                similar_data: data,
                            });
                        }
                        return response;
                    }));
                }, 25000 + offset);
                offset += 25000;
            });
        });
    }
    saveDailyJobForItem() {
        return __awaiter(this, void 0, void 0, function* () {
            const items_data = yield item_model_1.default.find({});
            const same_data = items_data.map((item) => {
                let item_keywords = item.item_keywords.filter(x => x.toLowerCase() != item.item_title.toLowerCase());
                let title = item.item_title;
                item_keywords.forEach(x => title += " " + x);
                return {
                    title: title,
                    item: item._id,
                };
            });
            const items = [];
            for (let i = 0; i < same_data.length; i += 1) {
                items.push(same_data.slice(i, i + 1));
            }
            let response;
            let offset = 0;
            (0, underscore_1.default)(items).each((item) => {
                setTimeout(() => {
                    item.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                        if (item.title !== 'Shop on eBay') {
                            // console.log(item.title)
                            const data = yield this.scrappingBee(item.title, item.item);
                            // data.forEach(el => el.similarity = similarity(el.title, item.title))
                            let whole_data = data;
                            let good_items = [];
                            //add all similarity > 0.8, then keep on adding until count is greater than 30
                            for (let i = 0; i < data.length; i++) {
                                if (data[i].similarity >= 0.89)
                                    good_items.push(data[i]);
                            }
                            if (good_items.length == 0) {
                                good_items = whole_data.slice(0, 30);
                            }
                            const similar_data = whole_data.slice(good_items.length);
                            const average = yield this.getAveragePrice(good_items);
                            const median = yield this.getMedianPrice(good_items);
                            const { high, low } = yield this.getHighLowPrice(good_items);
                            return yield daily_job_model_1.default.create({
                                _scrapId: item.item,
                                median: median,
                                average: average,
                                same_data: good_items,
                                similar_data: similar_data,
                                lowest_price: low,
                                highest_price: high,
                            });
                        }
                        return response;
                    }));
                }, 25000 + offset);
                offset += 25000;
            });
        });
    }
    cleanDailyJobsCategories() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let categories = yield category_model_2.default.find({});
                categories = categories[0].category;
                // For each item, find all daily-jobs that have the item's id
                for (const category of categories) {
                    let dailyJobs = yield ((_a = daily_job_model_2.default.find({ category: category })) === null || _a === void 0 ? void 0 : _a.sort({ createdAt: -1 }));
                    //   Delete the title and link of all but the most recent daily-job
                    dailyJobs = dailyJobs.slice(0, 4);
                    for (let i = 2; i < dailyJobs.length; i++) {
                        if (!(dailyJobs[i].same_data && dailyJobs[i].similar_data)) {
                            continue;
                        }
                        yield daily_job_model_2.default.updateOne({ _id: dailyJobs[i]._id }, { $unset: { same_data: '', similar_data: '' } });
                    }
                }
            }
            catch (err) {
                logger_1.logger.error(err.message);
            }
        });
    }
    ;
    cleanDailyJobsItems() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find all items that belong to the user
                // const items = await db.collection('items').find({ _userId: user._id }).toArray();
                const items = yield item_model_1.default.find({});
                // For each item, find all daily-jobs that have the item's id
                for (const item of items) {
                    let dailyJobs = yield ((_a = daily_job_model_2.default.find({ _scrapId: item._id })) === null || _a === void 0 ? void 0 : _a.sort({ createdAt: -1 }));
                    //   Delete the title and link of all but the most recent daily-job
                    dailyJobs = dailyJobs.slice(0, 4);
                    for (let i = 2; i < dailyJobs.length; i++) {
                        if (!(dailyJobs[i].same_data && dailyJobs[i].similar_data)) {
                            continue;
                        }
                        yield daily_job_model_2.default.updateOne({ _id: dailyJobs[i]._id }, { $unset: { same_data: '', similar_data: '' } });
                    }
                }
            }
            catch (err) {
                logger_1.logger.error(err.message);
            }
        });
    }
    ;
    getMedianPrice(items) {
        if (items) {
            return underscore_1.default.sortBy(items.map((item) => parseFloat(item.price)))[Math.floor(items.length / 2)];
        }
    }
    getAveragePrice(items) {
        if (items)
            return items.map((item) => parseFloat(item.price)).reduce((a, b) => a + b, 0) / items.length;
    }
    getHighLowPrice(items) {
        return __awaiter(this, void 0, void 0, function* () {
            items.sort((a, b) => b.price - a.price);
            const high = items[0].price;
            const low = items[items.length - 1].price;
            return { low, high };
        });
    }
    scrappingBee(item, id = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            result.push(...(yield this.ebay.getScrappingData(item, id)));
            result.push(...(yield this.scarce.getScrappingData(item, id)));
            result.push(...(yield this.brickowl.getScrappingData(item, id)));
            result.push(...(yield this.chowrentoys.getScrappingData(item, id)));
            result.push(...(yield this.mercari.getScrappingData(item, id)));
            result.push(...(yield this.novelship.getScrappingData(item, id)));
            result.push(...(yield this.vintage.getScrappingData(item, id)));
            result.push(...(yield this.yamestore.getScrappingData(item, id)));
            result.push(...(yield this.adobebooks.getScrappingData(item, id)));
            result.push(...(yield this.bonanza.getScrappingData(item, id)));
            result.push(...(yield this.estay.getScrappingData(item, id)));
            result.push(...(yield this.myslabs.getScrappingData(item, id)));
            result.push(...(yield this.whatnot.getScrappingData(item, id)));
            result.push(...(yield this.steiner.getScrappingData(item, id)));
            result.push(...(yield this.gamedays.getScrappingData(item, id)));
            result.push(...(yield this.fatherson.getScrappingData(item, id)));
            result.push(...(yield this.amazon.getScrappingData(item, id)));
            result.push(...(yield this.bricklink.getScrappingData(item, id)));
            result.push(...(yield this.walmat.getScrappingData(item, id)));
            const sim_data = yield axios_1.default.post('http://localhost:8000/calculate-similarity', {
                search_word: item,
                products: result.map(val => val.title)
            });
            result.forEach((element, index) => {
                element.similarity = sim_data.data.data[index];
            });
            result.sort((a, b) => b.similarity - a.similarity);
            return result.slice(0, 200);
        });
    }
}
exports.Scrapping = Scrapping;
//# sourceMappingURL=index.js.map