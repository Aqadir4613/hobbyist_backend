"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = new mongoose_1.default.Schema({
    category: [{
            type: String
        }]
}, { timestamps: true });
Schema.index({ _id: 1, type: -1 });
exports.default = mongoose_1.default.model('Category', Schema);
