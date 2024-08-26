"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getDailyItems = exports.addCategory = exports.uploadImage = exports.editItem = exports.removeItem = exports.scrapItem = exports.getCategory = exports.getSimilarItems = exports.oneItem = exports.itemList = exports.addItem = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
var items_service_1 = require("../services/auth/items.service");
var service = new items_service_1.ItemService();
var addItem = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, addItem_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = __assign({ user: req === null || req === void 0 ? void 0 : req.userId }, req.body);
                console.log(data);
                return [4 /*yield*/, service.addItem(data)];
            case 1:
                addItem_1 = _a.sent();
                res.status(addItem_1.status).send(addItem_1);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                //logger.error(error.message);
                console.error(error_1);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_1.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addItem = addItem;
var scrapItem = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, scrapItem_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = __assign({ user: req === null || req === void 0 ? void 0 : req.userId }, req.body);
                console.log(data);
                return [4 /*yield*/, service.saveScrapItem(data)];
            case 1:
                scrapItem_1 = _a.sent();
                res.status(scrapItem_1.status).send(scrapItem_1);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                //logger.error(error.message);
                console.error(error_2);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_2.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.scrapItem = scrapItem;
var uploadImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, itemList_1, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                data = {
                    file: req.file,
                    uri: (_a = req.body) === null || _a === void 0 ? void 0 : _a.uri,
                };
                return [4 /*yield*/, service.imageUpload(data)];
            case 1:
                itemList_1 = _b.sent();
                res.status(itemList_1.status).send(itemList_1);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _b.sent();
                //logger.error(error.message);
                console.error(error_3);
                res.status(500).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_3.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.uploadImage = uploadImage;
var itemList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, itemList_2, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = {
                    user: req === null || req === void 0 ? void 0 : req.userId,
                    query: req.query,
                };
                return [4 /*yield*/, service.itemList(data)];
            case 1:
                itemList_2 = _a.sent();
                res.status(201).send(itemList_2);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                // //logger.error(error.message);
                console.error(error_4);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_4.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.itemList = itemList;
var oneItem = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var oneItem_1, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service.getOneItem({ item_id: req.params.id })];
            case 1:
                oneItem_1 = _a.sent();
                res.status(201).send(oneItem_1);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                // //logger.error(error.message);
                console.error(error_5);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_5.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.oneItem = oneItem;
var removeItem = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var removeItem_1, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service.removeItem({ item_id: req.params.id })];
            case 1:
                removeItem_1 = _a.sent();
                res.status(201).send(removeItem_1);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                //logger.error(error.message);
                console.error(error_6);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_6.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeItem = removeItem;
var editItem = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, editItem_1, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = __assign(__assign({ user: req === null || req === void 0 ? void 0 : req.userId }, req.body), { item_id: req.params });
                return [4 /*yield*/, service.editList(data)];
            case 1:
                editItem_1 = _a.sent();
                res.status(201).send(editItem_1);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                //logger.error(error.message);
                console.error(error_7);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_7.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editItem = editItem;
var addCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, editItem_2, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                data = req.body.data;
                return [4 /*yield*/, service.addCategory(data.toLowerCase())];
            case 1:
                editItem_2 = _a.sent();
                console.log(editItem_2);
                res.status(editItem_2.status).send(editItem_2);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                //logger.error(error.message);
                console.error(error_8);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_8.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addCategory = addCategory;
var getCategory = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var getItem, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service.getCategory()];
            case 1:
                getItem = _a.sent();
                res.status(getItem.status).send(getItem);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                //logger.error(error.message);
                console.error(error_9);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_9.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCategory = getCategory;
var getSimilarItems = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var getItem, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, service.getRelatedItems(req.params.id)];
            case 1:
                getItem = _a.sent();
                res.status(getItem.status).send(getItem);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                //logger.error(error.message);
                console.error(error_10);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_10.message,
                    data: {},
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getSimilarItems = getSimilarItems;
var getDailyItems = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, getItem, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = {
                    user: req === null || req === void 0 ? void 0 : req.userId,
                    itemId: req.params.itemId,
                    type: req.query.type
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, service.getDailyItems(data)];
            case 2:
                getItem = _a.sent();
                res.status(getItem.status).send(getItem);
                return [3 /*break*/, 4];
            case 3:
                error_11 = _a.sent();
                //logger.error(error.message);
                console.error(error_11);
                res.status(400).send({
                    success: false,
                    message: "Something went wrong",
                    reason: error_11.message,
                    data: {},
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getDailyItems = getDailyItems;
