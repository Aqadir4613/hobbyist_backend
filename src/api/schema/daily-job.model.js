"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = new mongoose_1.default.Schema({
    _itemId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Items",
    },
    _userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Users",
    },
    _scrapId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Similar-item",
    },
    median: {
        type: Number,
    },
    average: {
        type: Number,
    },
    highest_price: {
        type: Number,
    },
    lowest_price: {
        type: Number,
    },
    category: {
        type: String,
    },
    same_data: [],
    similar_data: [],
}, { timestamps: true });
Schema.index({ _itemId: 1, type: -1 });
exports.default = mongoose_1.default.model("daily-job", Schema);
