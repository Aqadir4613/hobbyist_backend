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
exports.ItemService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const item_model_1 = __importDefault(require("../../schema/item.model"));
const cloudinary_1 = require("../../helper/upload/cloudinary");
const category_model_1 = __importDefault(require("../../schema/category.model"));
const assert_1 = __importDefault(require("assert"));
const underscore_1 = __importDefault(require("underscore"));
const index_1 = require("../../helper/scrapping/index");
const scrapped_items_model_1 = __importDefault(require("../../schema/scrapped-items.model"));
const daily_job_model_1 = __importDefault(require("../../schema/daily-job.model"));
const scrap = new index_1.Scrapping();
class ItemService {
    addItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, image_id, item_image, item_desc, item_title, item_keywords, item_category, } = data;
            const findItem = yield item_model_1.default.findOne({ item_title });
            if (findItem) {
                return {
                    status: 400,
                    success: false,
                    message: "Item already exists",
                    data: null,
                };
            }
            const newItem = yield item_model_1.default.create({
                _userId: user,
                item_title,
                item_keywords,
                item_desc,
                item_category,
                image_id: image_id,
                item_image: item_image,
            });
            //create a reverse search
            if (newItem)
                return {
                    status: 200,
                    success: true,
                    message: `${item_title} successfully created`,
                    data: newItem,
                };
        });
    }
    imageUpload(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { file, uri } = data;
            const url = uri;
            if (!file && !url) {
                return {
                    status: 400,
                    success: false,
                    message: "No file was uploaded",
                    data: null,
                };
            }
            if ((file === null || file === void 0 ? void 0 : file.size) > 100000000 && !url) {
                return {
                    status: 400,
                    success: false,
                    message: "Image must not exceed 100mb",
                };
            }
            const input = url || (file === null || file === void 0 ? void 0 : file.path);
            const uploadImage = yield cloudinary_1.cloudinary.v2.uploader.upload(input);
            return {
                status: 200,
                success: true,
                image_id: uploadImage.public_id,
                item_image: uploadImage.secure_url,
            };
        });
    }
    editList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, item_id, item_desc, item_title, item_keywords, item_category, image_id, item_image, } = data;
            console.log(data, item_id.id);
            const updateItem = yield item_model_1.default.findOne({ _id: item_id.id });
            (0, assert_1.default)(user == updateItem._userId.toString());
            if (image_id)
                yield cloudinary_1.cloudinary.v2.uploader.destroy(updateItem.image_id);
            updateItem.item_title = item_title || updateItem.item_title;
            updateItem.item_keywords = item_keywords || updateItem.item_keywords;
            updateItem.item_desc = item_desc || updateItem.item_desc;
            updateItem.item_category = item_category || updateItem.item_category;
            updateItem.item_image = item_image || updateItem.item_image;
            updateItem.image_id = image_id || updateItem.image_id;
            updateItem.save();
            return {
                status: 200,
                success: true,
                message: `${item_title} successfully edited`,
                data: updateItem,
            };
        });
    }
    itemList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, query, } = data;
            const day = parseInt(query.days);
            const findItem = yield item_model_1.default.find({ _userId: user }).select("-_userId");
            const item_per_day = findItem.map((item) => __awaiter(this, void 0, void 0, function* () {
                const others = yield this.getCatalogueValue(item._id);
                return Object.assign(Object.assign({}, item.toObject()), { average: others ? others.average : '', median: others ? others.median : '', low: others ? others.low : '', high: others ? others.high : '' });
            })).filter(item => item);
            const resolved = yield Promise.all(item_per_day);
            if (!findItem)
                return {
                    status: 400,
                    success: true,
                    message: "No item found for this account",
                    data: resolved,
                };
            if (findItem.length > 0)
                return {
                    status: 200,
                    success: true,
                    message: "Items Found for this account",
                    data: resolved
                };
        });
    }
    paginateList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { query, list } = data;
            const page = parseInt(query.page);
            const limit = parseInt(query.limit);
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const results = {};
            if (endIndex < list.length) {
                results.next = {
                    page: page + 1,
                    limit: limit,
                };
            }
            if (startIndex > 0) {
                results.previous = {
                    page: page - 1,
                    limit: limit,
                };
            }
            const List = list.sort((a, b) => new Date(b.stamps).valueOf() - new Date(a.stamps).valueOf());
            const CheckUrl = (results) => !results
                ? null
                : `https://https://hobbyist-api.herokuapp.com/get-items?page=${results.page}&limit=${results.limit}`;
            const returningData = {
                data: List.slice(startIndex, endIndex).filter(x => x),
                PreviousPage: results.previous,
                NextUrl: CheckUrl(results.next),
                PreviousUrl: CheckUrl(results.previous),
                ListLenght: List.length,
            };
            return returningData;
        });
    }
    getOneItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { item_id } = data;
            const fetchItem = yield item_model_1.default.findById(item_id);
            if (!fetchItem)
                return {
                    status: 400,
                    success: true,
                    message: "Item does not exist",
                    data: {},
                };
            if (fetchItem)
                return {
                    status: 200,
                    success: true,
                    message: "Item found",
                    data: fetchItem,
                };
        });
    }
    removeItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { item_id } = data;
            const fetchItem = yield item_model_1.default.findById(item_id);
            if (!fetchItem)
                return {
                    status: 400,
                    success: true,
                    message: "Item does not exist",
                    data: {},
                };
            if (fetchItem) {
                const deleteItem = yield item_model_1.default.findByIdAndDelete(item_id);
                if (deleteItem)
                    return {
                        status: 200,
                        success: true,
                        message: "Item deleted",
                        data: fetchItem,
                    };
            }
        });
    }
    addCategory(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const addCategory = yield category_model_1.default.findOne({});
            console.log(data);
            if (!addCategory) {
                const createList = yield category_model_1.default.create({
                    category: [data],
                });
                return {
                    status: 200,
                    success: true,
                    message: "Data pushed to category",
                    data: createList,
                };
            }
            else if (addCategory) {
                const checkCategory = yield category_model_1.default.find({ category: data });
                if (checkCategory.length > 0) {
                    return {
                        status: 401,
                        success: false,
                        message: "Category already exists",
                        data: null,
                    };
                }
                if (checkCategory.length == 0) {
                    addCategory.category.push(data);
                    addCategory.save();
                    return {
                        status: 200,
                        success: true,
                        message: "Data pushed to category",
                    };
                }
            }
        });
    }
    getCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const addCategory = yield category_model_1.default.findOne({});
            const data = !addCategory ? [] : addCategory.category;
            return {
                status: 200,
                success: true,
                message: "Category Fetched",
                data,
            };
        });
    }
    getSimilarItems(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const getItems = yield scrapped_items_model_1.default.findOne({ _itemId: item }).select("-_id -_userId -_itemId");
            const getItem = yield item_model_1.default
                .findOne({ _id: item })
                .select("-_id -_userId");
            if (!getItems && getItem) {
                return {
                    status: 400,
                    success: false,
                    message: "No item id found",
                    data: null,
                };
            }
            if (getItem && getItems) {
                return {
                    status: 200,
                    success: true,
                    message: "Item found",
                    data: {
                        item: getItem,
                        similar_item: getItems.similar_data.slice(0, 11),
                        same_data: getItems.same_data.slice(0, 11),
                    },
                };
            }
        });
    }
    getRelatedItems(item) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            //used for ebay items in both horizontal scroll near bottom of item page
            const getItem = yield item_model_1.default
                .findOne({ _id: item })
                .select("-_id");
            if (!getItem) {
                return {
                    status: 400,
                    success: false,
                    message: "No item id found",
                    data: null,
                };
            }
            //get daily job for id
            let dailyItem = yield daily_job_model_1.default.find({ _scrapId: item }).sort({ createdAt: -1 }).limit(1);
            let same_data = [], related_data = [];
            let scrapeTime = null;
            if (dailyItem && (dailyItem === null || dailyItem === void 0 ? void 0 : dailyItem.length) > 0) {
                same_data = dailyItem[0].same_data;
                related_data = dailyItem[0].similar_data;
                scrapeTime = (_a = dailyItem[0]) === null || _a === void 0 ? void 0 : _a.createdAt;
            }
            else {
                const firstScrap = yield scrapped_items_model_1.default.findOne({ _itemId: item }).select("-_id -_userId -_itemId");
                same_data = firstScrap.same_data;
                related_data = firstScrap.similar_data;
                scrapeTime = firstScrap.createdAt;
            }
            same_data.sort((b, a) => b.price - a.price);
            related_data.sort((a, b) => b.price - a.price);
            if (getItem && same_data.length != 0) {
                return {
                    status: 200,
                    success: true,
                    message: "Item found",
                    data: {
                        item: getItem,
                        same_data: same_data,
                        similar_item: related_data,
                        scrapeTime,
                    },
                };
            }
            else {
                console.log(`item "${getItem.item_title}" missing scraped data!`);
                console.log(getItem);
                console.log(same_data);
                console.log(related_data);
                return {
                    status: 400,
                    success: false,
                    message: "No item id found",
                    data: {
                        item: getItem,
                        same_data: [],
                        similar_data: [],
                        similar_item: [],
                    },
                };
            }
        });
    }
    saveScrapItem(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, item_id, item_category, item_keyword } = data;
            const startTime = Date.now();
            yield scrap.saveScrapItem(item_category, item_keyword, item_id, user);
            const endTime = Date.now();
            console.log(`Time taken to save item: ${endTime - startTime}`);
            const findItem = yield item_model_1.default.findOne({ _id: item_id });
            findItem.its_scrapped = true;
            findItem.save();
            return {
                status: 200,
                success: true,
                message: "Item scrapped",
            };
        });
    }
    getMedianPrice(items) {
        if (items) {
            return underscore_1.default.sortBy(items.map((item) => parseFloat(item.price)))[Math.floor(items.length / 2)];
        }
    }
    getAveragePrice(items) {
        if (items)
            return items.map((item) => parseFloat(item.price)).reduce((a, b) => a + b, 0) / items.length;
    }
    getDailyItems(data) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const { itemId, type } = data;
            if (type === "items") {
                const findItems = yield daily_job_model_1.default.find({ _scrapId: itemId });
                console.log(findItems.length);
                const findItem = yield scrapped_items_model_1.default.find({ _itemId: itemId });
                const average = (_a = findItem[0]) === null || _a === void 0 ? void 0 : _a.average;
                const median = (_b = findItem[0]) === null || _b === void 0 ? void 0 : _b.median;
                const first_data = {
                    itemId,
                    average,
                    median,
                    createdAt: (_c = findItem[0]) === null || _c === void 0 ? void 0 : _c.createdAt,
                    count: 0
                };
                const data = findItems
                    .map((item, count) => {
                    return {
                        item_id: item._scrapId,
                        average: item.average,
                        median: item.median,
                        createdAt: item.createdAt,
                        count,
                    };
                });
                return {
                    status: 200,
                    success: true,
                    message: "Resource found",
                    data: [first_data, ...data].sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
                };
            }
            if (type === "categories") {
                const targetItem = yield item_model_1.default.findOne({ _id: itemId });
                const targetCategory = yield daily_job_model_1.default.find({
                    category: targetItem.item_category,
                });
                if (targetCategory.length === 0) {
                    return {
                        status: 200,
                        success: true,
                        message: "No resource found for this item",
                        data: targetCategory,
                    };
                }
                if (targetCategory.length > 0) {
                    const data = targetCategory
                        .map((item, count) => {
                        return {
                            category: item.category,
                            average: item.average,
                            median: item.median,
                            createdAt: item.createdAt,
                            count,
                        };
                    }).sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
                    return {
                        status: 200,
                        success: true,
                        message: "Resource found",
                        data
                    };
                }
                else {
                    return {
                        status: 200,
                        success: true,
                        message: "Not enough resource found for the selected date",
                        data: []
                    };
                }
            }
        });
    }
    getCatalogueValue(id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findScraps = yield daily_job_model_1.default.find({ _scrapId: id }).sort({ createdAt: -1 }).limit(1);
                if (findScraps.length > 0) {
                    const todayValue = findScraps;
                    if (todayValue.length > 0) {
                        //if no average you can calculate it
                        let average = (_a = todayValue[0]) === null || _a === void 0 ? void 0 : _a.average;
                        const median = (_b = todayValue[0]) === null || _b === void 0 ? void 0 : _b.median;
                        const low = (_c = todayValue[0]) === null || _c === void 0 ? void 0 : _c.lowest_price;
                        const high = (_d = todayValue[0]) === null || _d === void 0 ? void 0 : _d.highest_price;
                        // (not really necessary, but just in case)
                        if (!((_e = todayValue[0]) === null || _e === void 0 ? void 0 : _e.average)) {
                            average = todayValue[0].reduce((a, b) => a + b, 0);
                        }
                        return {
                            average: average ? average : '',
                            median: median ? median : '',
                            low: low ? low : '',
                            high: high ? high : '',
                        };
                    }
                }
                else {
                    const findItem = yield scrapped_items_model_1.default.find({ _itemId: id }).sort({ createdAt: -1 }).limit(1);
                    if (findItem) {
                        const todayValue = findItem;
                        if (todayValue.length > 0) {
                            let average = (_f = todayValue[0]) === null || _f === void 0 ? void 0 : _f.average;
                            const median = (_g = todayValue[0]) === null || _g === void 0 ? void 0 : _g.median;
                            const low = (_h = todayValue[0]) === null || _h === void 0 ? void 0 : _h.lowest_price;
                            const high = (_j = todayValue[0]) === null || _j === void 0 ? void 0 : _j.highest_price;
                            // (not really necessary, but just in case)
                            if (!((_k = todayValue[0]) === null || _k === void 0 ? void 0 : _k.average)) {
                                average = todayValue[0].reduce((a, b) => a + b, 0);
                            }
                            return {
                                average: average ? average : '',
                                median: median ? median : '',
                                low: low ? low : '',
                                high: high ? high : '',
                            };
                        }
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.ItemService = ItemService;
//# sourceMappingURL=items.service.js.map