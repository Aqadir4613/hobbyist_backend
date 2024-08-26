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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDailyItems = exports.addCategory = exports.uploadImage = exports.editItem = exports.removeItem = exports.scrapItem = exports.getCategory = exports.getSimilarItems = exports.oneItem = exports.itemList = exports.addItem = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const items_service_1 = require("../services/auth/items.service");
const service = new items_service_1.ItemService();
const addItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign({ user: req === null || req === void 0 ? void 0 : req.userId }, req.body);
        console.log(data);
        const addItem = yield service.addItem(data);
        res.status(addItem.status).send(addItem);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.addItem = addItem;
const scrapItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign({ user: req === null || req === void 0 ? void 0 : req.userId }, req.body);
        console.log(data);
        const scrapItem = yield service.saveScrapItem(data);
        res.status(scrapItem.status).send(scrapItem);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.scrapItem = scrapItem;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = {
            file: req.file,
            uri: (_a = req.body) === null || _a === void 0 ? void 0 : _a.uri,
        };
        const itemList = yield service.imageUpload(data);
        res.status(itemList.status).send(itemList);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.uploadImage = uploadImage;
const itemList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = {
            user: req === null || req === void 0 ? void 0 : req.userId,
            query: req.query,
        };
        const itemList = yield service.itemList(data);
        res.status(201).send(itemList);
    }
    catch (error) {
        // //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.itemList = itemList;
const oneItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oneItem = yield service.getOneItem({ item_id: req.params.id });
        res.status(201).send(oneItem);
    }
    catch (error) {
        // //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.oneItem = oneItem;
const removeItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removeItem = yield service.removeItem({ item_id: req.params.id });
        res.status(201).send(removeItem);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.removeItem = removeItem;
const editItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = Object.assign(Object.assign({ user: req === null || req === void 0 ? void 0 : req.userId }, req.body), { item_id: req.params });
        const editItem = yield service.editList(data);
        res.status(201).send(editItem);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.editItem = editItem;
const addCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body;
        const editItem = yield service.addCategory(data.toLowerCase());
        console.log(editItem);
        res.status(editItem.status).send(editItem);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.addCategory = addCategory;
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getItem = yield service.getCategory();
        res.status(getItem.status).send(getItem);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.getCategory = getCategory;
const getSimilarItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //gets ebay items from daily jobs
        const getItem = yield service.getRelatedItems(req.params.id);
        res.status(getItem.status).send(getItem);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.getSimilarItems = getSimilarItems;
const getDailyItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        user: req === null || req === void 0 ? void 0 : req.userId,
        itemId: req.params.itemId,
        type: req.query.type
    };
    try {
        const getItem = yield service.getDailyItems(data);
        res.status(getItem.status).send(getItem);
    }
    catch (error) {
        //logger.error(error.message);
        console.error(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong",
            reason: error.message,
            data: {},
        });
    }
});
exports.getDailyItems = getDailyItems;
//# sourceMappingURL=item.controller.js.map