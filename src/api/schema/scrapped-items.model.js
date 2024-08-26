"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = new mongoose_1.default.Schema({
    _itemId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Items",
    },
    _userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    same_data: [],
    similar_data: [],
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
    }
}, { timestamps: true });
Schema.index({ _itemId: 1, type: -1 });
exports.default = mongoose_1.default.model("Similar-item", Schema);
