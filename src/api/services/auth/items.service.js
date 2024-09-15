"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
var item_model_1 = require("../../schema/item.model");
var cloudinary_1 = require("../../helper/upload/cloudinary");
var category_model_1 = require("../../schema/category.model");
var assert_1 = require("assert");
var underscore_1 = require("underscore");
var index_1 = require("../../helper/scrapping/index");
var scrapped_items_model_1 = require("../../schema/scrapped-items.model");
var daily_job_model_1 = require("../../schema/daily-job.model");
var scrap = new index_1.Scrapping();
var ItemService = /** @class */ (function () {
  function ItemService() {}
  ItemService.prototype.addItem = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var user,
        image_id,
        item_image,
        item_desc,
        item_title,
        item_keywords,
        item_category,
        findItem,
        newItem,
        item_purchased_price,
        item_purchased_date,
        item_grading_cost,
        item_sold_price,
        item_sold_date;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            (user = data.user),
              (image_id = data.image_id),
              (item_image = data.item_image),
              (item_desc = data.item_desc),
              (item_title = data.item_title),
              (item_keywords = data.item_keywords),
              (item_category = data.item_category),
              (item_purchased_price = data.item_purchased_price),
              (item_purchased_date = data.item_purchased_date),
              (item_grading_cost = data.item_grading_cost),
              (item_sold_price = data.item_sold_price),
              (item_sold_date = data.item_sold_date);
            return [
              4 /*yield*/,
              item_model_1.default.findOne({ item_title: item_title }),
            ];
          case 1:
            findItem = _a.sent();
            if (findItem) {
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: false,
                  message: "Item already exists",
                  data: null,
                },
              ];
            }
            return [
              4 /*yield*/,
              item_model_1.default.create({
                _userId: user,
                item_title: item_title,
                item_keywords: item_keywords,
                item_desc: item_desc,
                item_category: item_category,
                image_id: image_id,
                item_image: item_image,
                item_purchased_price: item_purchased_price,
                item_purchased_date: item_purchased_date,
                item_grading_cost: item_grading_cost,
                item_sold_price: item_sold_price,
                item_sold_date: item_sold_date,
              }),
            ];
          case 2:
            newItem = _a.sent();
            //create a reverse search
            if (newItem)
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "".concat(item_title, " successfully created"),
                  data: newItem,
                },
              ];
            return [2 /*return*/];
        }
      });
    });
  };
  ItemService.prototype.imageUpload = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var file, uri, url, input, uploadImage;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            (file = data.file), (uri = data.uri);
            url = uri;
            if (!file && !url) {
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: false,
                  message: "No file was uploaded",
                  data: null,
                },
              ];
            }
            if (
              (file === null || file === void 0 ? void 0 : file.size) >
                100000000 &&
              !url
            ) {
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: false,
                  message: "Image must not exceed 100mb",
                },
              ];
            }
            input =
              url || (file === null || file === void 0 ? void 0 : file.path);
            return [
              4 /*yield*/,
              cloudinary_1.cloudinary.v2.uploader.upload(input),
            ];
          case 1:
            uploadImage = _a.sent();
            return [
              2 /*return*/,
              {
                status: 200,
                success: true,
                image_id: uploadImage.public_id,
                item_image: uploadImage.secure_url,
              },
            ];
        }
      });
    });
  };
  ItemService.prototype.editList = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var user,
        item_id,
        item_desc,
        item_title,
        item_keywords,
        item_category,
        image_id,
        item_image,
        updateItem,
        item_purchased_price,
        item_purchased_date,
        item_grading_cost,
        item_sold_price,
        item_sold_date;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            (user = data.user),
              (item_id = data.item_id),
              (item_desc = data.item_desc),
              (item_title = data.item_title),
              (item_keywords = data.item_keywords),
              (item_category = data.item_category),
              (image_id = data.image_id),
              (item_image = data.item_image),
              (item_purchased_price = data.item_purchased_price),
              (item_purchased_date = data.item_purchased_date),
              (item_grading_cost = data.item_grading_cost),
              (item_sold_price = data.item_sold_price),
              (item_sold_date = data.item_sold_date);
            console.log(data, item_id.id);
            return [
              4 /*yield*/,
              item_model_1.default.findOne({ _id: item_id.id }),
            ];
          case 1:
            updateItem = _a.sent();
            (0, assert_1)(user == updateItem._userId.toString());
            if (!image_id) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              cloudinary_1.cloudinary.v2.uploader.destroy(updateItem.image_id),
            ];
          case 2:
            _a.sent();
            _a.label = 3;
          case 3:
            updateItem.item_title = item_title || updateItem.item_title;
            updateItem.item_keywords =
              item_keywords || updateItem.item_keywords;
            updateItem.item_desc = item_desc || updateItem.item_desc;
            updateItem.item_category =
              item_category || updateItem.item_category;
            updateItem.item_image = item_image || updateItem.item_image;
            updateItem.image_id = image_id || updateItem.image_id;
            updateItem.item_purchased_price =
              item_purchased_price || updateItem.item_purchased_price;
            updateItem.item_purchased_date =
              item_purchased_date || updateItem.item_purchased_date;
            updateItem.item_grading_cost =
              item_grading_cost || updateItem.item_grading_cost;
            updateItem.item_sold_price =
              item_sold_price || updateItem.item_sold_price;
            updateItem.item_sold_date =
              item_sold_date || updateItem.item_sold_date;
            updateItem.save();
            return [
              2 /*return*/,
              {
                status: 200,
                success: true,
                message: "".concat(item_title, " successfully edited"),
                data: updateItem,
              },
            ];
        }
      });
    });
  };
  ItemService.prototype.itemList = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var user, query, day, findItem, item_per_day, resolved;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            (user = data.user), (query = data.query);
            day = parseInt(query.days);
            return [
              4 /*yield*/,
              item_model_1.default.find({ _userId: user }).select("-_userId"),
            ];
          case 1:
            findItem = _a.sent();
            item_per_day = findItem
              .map(function (item) {
                return __awaiter(_this, void 0, void 0, function () {
                  var others;
                  return __generator(this, function (_a) {
                    switch (_a.label) {
                      case 0:
                        return [4 /*yield*/, this.getCatalogueValue(item._id)];
                      case 1:
                        others = _a.sent();
                        return [
                          2 /*return*/,
                          __assign(__assign({}, item.toObject()), {
                            average: others ? others.average : "",
                            median: others ? others.median : "",
                            low: others ? others.low : "",
                            high: others ? others.high : "",
                          }),
                        ];
                    }
                  });
                });
              })
              .filter(function (item) {
                return item;
              });
            return [4 /*yield*/, Promise.all(item_per_day)];
          case 2:
            resolved = _a.sent();
            if (!findItem)
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: true,
                  message: "No item found for this account",
                  data: resolved,
                },
              ];
            if (findItem.length > 0)
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "Items Found for this account",
                  data: resolved,
                },
              ];
            return [2 /*return*/];
        }
      });
    });
  };
  ItemService.prototype.paginateList = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var query,
        list,
        page,
        limit,
        startIndex,
        endIndex,
        results,
        List,
        CheckUrl,
        returningData;
      return __generator(this, function (_a) {
        (query = data.query), (list = data.list);
        page = parseInt(query.page);
        limit = parseInt(query.limit);
        startIndex = (page - 1) * limit;
        endIndex = page * limit;
        results = {};
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
        List = list.sort(function (a, b) {
          return new Date(b.stamps).valueOf() - new Date(a.stamps).valueOf();
        });
        CheckUrl = function (results) {
          return !results
            ? null
            : "https://https://hobbyist-api.herokuapp.com/get-items?page="
                .concat(results.page, "&limit=")
                .concat(results.limit);
        };
        returningData = {
          data: List.slice(startIndex, endIndex).filter(function (x) {
            return x;
          }),
          PreviousPage: results.previous,
          NextUrl: CheckUrl(results.next),
          PreviousUrl: CheckUrl(results.previous),
          ListLenght: List.length,
        };
        return [2 /*return*/, returningData];
      });
    });
  };
  ItemService.prototype.getOneItem = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var item_id, fetchItem;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            item_id = data.item_id;
            return [4 /*yield*/, item_model_1.default.findById(item_id)];
          case 1:
            fetchItem = _a.sent();
            if (!fetchItem)
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: true,
                  message: "Item does not exist",
                  data: {},
                },
              ];
            if (fetchItem)
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "Item found",
                  data: fetchItem,
                },
              ];
            return [2 /*return*/];
        }
      });
    });
  };
  ItemService.prototype.removeItem = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var item_id, fetchItem, deleteItem;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            item_id = data.item_id;
            return [4 /*yield*/, item_model_1.default.findById(item_id)];
          case 1:
            fetchItem = _a.sent();
            if (!fetchItem)
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: true,
                  message: "Item does not exist",
                  data: {},
                },
              ];
            if (!fetchItem) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              item_model_1.default.findByIdAndDelete(item_id),
            ];
          case 2:
            deleteItem = _a.sent();
            if (deleteItem)
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "Item deleted",
                  data: fetchItem,
                },
              ];
            _a.label = 3;
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  ItemService.prototype.addCategory = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var addCategory, createList, checkCategory;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, category_model_1.default.findOne({})];
          case 1:
            addCategory = _a.sent();
            console.log(data);
            if (!!addCategory) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              category_model_1.default.create({
                category: [data],
              }),
            ];
          case 2:
            createList = _a.sent();
            return [
              2 /*return*/,
              {
                status: 200,
                success: true,
                message: "Data pushed to category",
                data: createList,
              },
            ];
          case 3:
            if (!addCategory) return [3 /*break*/, 5];
            return [
              4 /*yield*/,
              category_model_1.default.find({ category: data }),
            ];
          case 4:
            checkCategory = _a.sent();
            if (checkCategory.length > 0) {
              return [
                2 /*return*/,
                {
                  status: 401,
                  success: false,
                  message: "Category already exists",
                  data: null,
                },
              ];
            }
            if (checkCategory.length == 0) {
              addCategory.category.push(data);
              addCategory.save();
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "Data pushed to category",
                },
              ];
            }
            _a.label = 5;
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  ItemService.prototype.getCategory = function () {
    return __awaiter(this, void 0, void 0, function () {
      var addCategory, data;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, category_model_1.default.findOne({})];
          case 1:
            addCategory = _a.sent();
            data = !addCategory ? [] : addCategory.category;
            return [
              2 /*return*/,
              {
                status: 200,
                success: true,
                message: "Category Fetched",
                data: data,
              },
            ];
        }
      });
    });
  };
  ItemService.prototype.getSimilarItems = function (item) {
    return __awaiter(this, void 0, void 0, function () {
      var getItems, getItem;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              scrapped_items_model_1.default
                .findOne({ _itemId: item })
                .select("-_id -_userId -_itemId"),
            ];
          case 1:
            getItems = _a.sent();
            return [
              4 /*yield*/,
              item_model_1.default
                .findOne({ _id: item })
                .select("-_id -_userId"),
            ];
          case 2:
            getItem = _a.sent();
            if (!getItems && getItem) {
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: false,
                  message: "No item id found",
                  data: null,
                },
              ];
            }
            if (getItem && getItems) {
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "Item found",
                  data: {
                    item: getItem,
                    similar_item: getItems.similar_data.slice(0, 11),
                    same_data: getItems.same_data.slice(0, 11),
                  },
                },
              ];
            }
            return [2 /*return*/];
        }
      });
    });
  };
  ItemService.prototype.getRelatedItems = function (item) {
    return __awaiter(this, void 0, void 0, function () {
      var getItem, dailyItem, same_data, related_data, scrapeTime, firstScrap;
      var _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [
              4 /*yield*/,
              item_model_1.default.findOne({ _id: item }).select("-_id"),
            ];
          case 1:
            getItem = _b.sent();
            if (!getItem) {
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: false,
                  message: "No item id found",
                  data: null,
                },
              ];
            }
            return [
              4 /*yield*/,
              daily_job_model_1.default
                .find({ _scrapId: item })
                .sort({ createdAt: -1 })
                .limit(1),
            ];
          case 2:
            dailyItem = _b.sent();
            (same_data = []), (related_data = []);
            scrapeTime = null;
            if (
              !(
                dailyItem &&
                (dailyItem === null || dailyItem === void 0
                  ? void 0
                  : dailyItem.length) > 0
              )
            )
              return [3 /*break*/, 3];
            same_data = dailyItem[0].same_data;
            related_data = dailyItem[0].similar_data;
            scrapeTime =
              (_a = dailyItem[0]) === null || _a === void 0
                ? void 0
                : _a.createdAt;
            return [3 /*break*/, 5];
          case 3:
            return [
              4 /*yield*/,
              scrapped_items_model_1.default
                .findOne({ _itemId: item })
                .select("-_id -_userId -_itemId"),
            ];
          case 4:
            firstScrap = _b.sent();
            same_data = firstScrap?.same_data ?? [];
            related_data = firstScrap?.similar_data ?? [];
            scrapeTime = firstScrap?.createdAt ?? "";
            _b.label = 5;
          case 5:
            same_data.sort(function (b, a) {
              return b.price - a.price;
            });
            related_data.sort(function (a, b) {
              return b.price - a.price;
            });
            if (getItem && same_data.length != 0) {
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "Item found",
                  data: {
                    item: getItem,
                    same_data: same_data,
                    similar_item: related_data,
                    scrapeTime: scrapeTime,
                  },
                },
              ];
            } else {
              console.log(
                'item "'.concat(getItem.item_title, '" missing scraped data!')
              );
              console.log(getItem);
              console.log(same_data);
              console.log(related_data);
              return [
                2 /*return*/,
                {
                  status: 400,
                  success: false,
                  message: "No item id found",
                  data: {
                    item: getItem,
                    same_data: [],
                    similar_data: [],
                    similar_item: [],
                  },
                },
              ];
            }
            return [2 /*return*/];
        }
      });
    });
  };
  ItemService.prototype.saveScrapItem = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var user,
        item_id,
        item_category,
        item_keyword,
        startTime,
        endTime,
        findItem;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            (user = data.user),
              (item_id = data.item_id),
              (item_category = data.item_category),
              (item_keyword = data.item_keyword);
            startTime = Date.now();
            return [
              4 /*yield*/,
              scrap.saveScrapItem(item_category, item_keyword, item_id, user),
            ];
          case 1:
            _a.sent();
            endTime = Date.now();
            console.log(
              "Time taken to save item: ".concat(endTime - startTime)
            );
            return [
              4 /*yield*/,
              item_model_1.default.findOne({ _id: item_id }),
            ];
          case 2:
            findItem = _a.sent();
            findItem.its_scrapped = true;
            findItem.save();
            return [
              2 /*return*/,
              {
                status: 200,
                success: true,
                message: "Item scrapped",
              },
            ];
        }
      });
    });
  };
  ItemService.prototype.getMedianPrice = function (items) {
    if (items) {
      return underscore_1.default.sortBy(
        items.map(function (item) {
          return parseFloat(item.price);
        })
      )[Math.floor(items.length / 2)];
    }
  };
  ItemService.prototype.getAveragePrice = function (items) {
    if (items)
      return (
        items
          .map(function (item) {
            return parseFloat(item.price);
          })
          .reduce(function (a, b) {
            return a + b;
          }, 0) / items.length
      );
  };
  ItemService.prototype.getDailyItems = function (data) {
    return __awaiter(this, void 0, void 0, function () {
      var itemId,
        type,
        findItems,
        findItem,
        average,
        median,
        first_data,
        data_1,
        targetItem,
        targetCategory,
        data_2;
      var _a, _b, _c;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            (itemId = data.itemId), (type = data.type);
            if (!(type === "items")) return [3 /*break*/, 3];
            return [
              4 /*yield*/,
              daily_job_model_1.default.find({ _scrapId: itemId }),
            ];
          case 1:
            findItems = _d.sent();
            console.log(findItems.length);
            return [
              4 /*yield*/,
              scrapped_items_model_1.default.find({ _itemId: itemId }),
            ];
          case 2:
            findItem = _d.sent();
            average =
              (_a = findItem[0]) === null || _a === void 0
                ? void 0
                : _a.average;
            median =
              (_b = findItem[0]) === null || _b === void 0 ? void 0 : _b.median;
            first_data = {
              itemId: itemId,
              average: average,
              median: median,
              createdAt:
                (_c = findItem[0]) === null || _c === void 0
                  ? void 0
                  : _c.createdAt,
              count: 0,
            };
            data_1 = findItems.map(function (item, count) {
              return {
                item_id: item._scrapId,
                average: item.average,
                median: item.median,
                createdAt: item.createdAt,
                count: count,
              };
            });
            return [
              2 /*return*/,
              {
                status: 200,
                success: true,
                message: "Resource found",
                data: __spreadArray([first_data], data_1, true).sort(function (
                  a,
                  b
                ) {
                  return (
                    new Date(b.createdAt).valueOf() -
                    new Date(a.createdAt).valueOf()
                  );
                }),
              },
            ];
          case 3:
            if (!(type === "categories")) return [3 /*break*/, 6];
            return [4 /*yield*/, item_model_1.default.findOne({ _id: itemId })];
          case 4:
            targetItem = _d.sent();
            return [
              4 /*yield*/,
              daily_job_model_1.default.find({
                category: targetItem.item_category,
              }),
            ];
          case 5:
            targetCategory = _d.sent();
            if (targetCategory.length === 0) {
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "No resource found for this item",
                  data: targetCategory,
                },
              ];
            }
            if (targetCategory.length > 0) {
              data_2 = targetCategory
                .map(function (item, count) {
                  return {
                    category: item.category,
                    average: item.average,
                    median: item.median,
                    createdAt: item.createdAt,
                    count: count,
                  };
                })
                .sort(function (a, b) {
                  return (
                    new Date(b.createdAt).valueOf() -
                    new Date(a.createdAt).valueOf()
                  );
                });
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "Resource found",
                  data: data_2,
                },
              ];
            } else {
              return [
                2 /*return*/,
                {
                  status: 200,
                  success: true,
                  message: "Not enough resource found for the selected date",
                  data: [],
                },
              ];
            }
            _d.label = 6;
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  ItemService.prototype.getCatalogueValue = function (id) {
    return __awaiter(this, void 0, void 0, function () {
      var findScraps,
        todayValue,
        average,
        median,
        low,
        high,
        findItem,
        todayValue,
        average,
        median,
        low,
        high,
        err_1;
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
      return __generator(this, function (_l) {
        switch (_l.label) {
          case 0:
            _l.trys.push([0, 5, , 6]);
            return [
              4 /*yield*/,
              daily_job_model_1.default
                .find({ _scrapId: id })
                .sort({ createdAt: -1 })
                .limit(1),
            ];
          case 1:
            findScraps = _l.sent();
            if (!(findScraps.length > 0)) return [3 /*break*/, 2];
            todayValue = findScraps;
            if (todayValue.length > 0) {
              average =
                (_a = todayValue[0]) === null || _a === void 0
                  ? void 0
                  : _a.average;
              median =
                (_b = todayValue[0]) === null || _b === void 0
                  ? void 0
                  : _b.median;
              low =
                (_c = todayValue[0]) === null || _c === void 0
                  ? void 0
                  : _c.lowest_price;
              high =
                (_d = todayValue[0]) === null || _d === void 0
                  ? void 0
                  : _d.highest_price;
              // (not really necessary, but just in case)
              if (
                !((_e = todayValue[0]) === null || _e === void 0
                  ? void 0
                  : _e.average)
              ) {
                average = todayValue[0].reduce(function (a, b) {
                  return a + b;
                }, 0);
              }
              return [
                2 /*return*/,
                {
                  average: average ? average : "",
                  median: median ? median : "",
                  low: low ? low : "",
                  high: high ? high : "",
                },
              ];
            }
            return [3 /*break*/, 4];
          case 2:
            return [
              4 /*yield*/,
              scrapped_items_model_1.default
                .find({ _itemId: id })
                .sort({ createdAt: -1 })
                .limit(1),
            ];
          case 3:
            findItem = _l.sent();
            if (findItem) {
              todayValue = findItem;
              if (todayValue.length > 0) {
                average =
                  (_f = todayValue[0]) === null || _f === void 0
                    ? void 0
                    : _f.average;
                median =
                  (_g = todayValue[0]) === null || _g === void 0
                    ? void 0
                    : _g.median;
                low =
                  (_h = todayValue[0]) === null || _h === void 0
                    ? void 0
                    : _h.lowest_price;
                high =
                  (_j = todayValue[0]) === null || _j === void 0
                    ? void 0
                    : _j.highest_price;
                // (not really necessary, but just in case)
                if (
                  !((_k = todayValue[0]) === null || _k === void 0
                    ? void 0
                    : _k.average)
                ) {
                  average = todayValue[0].reduce(function (a, b) {
                    return a + b;
                  }, 0);
                }
                return [
                  2 /*return*/,
                  {
                    average: average ? average : "",
                    median: median ? median : "",
                    low: low ? low : "",
                    high: high ? high : "",
                  },
                ];
              }
            }
            _l.label = 4;
          case 4:
            return [3 /*break*/, 6];
          case 5:
            err_1 = _l.sent();
            console.error(err_1);
            return [3 /*break*/, 6];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  return ItemService;
})();
exports.ItemService = ItemService;
