"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = new mongoose_1.default.Schema({
    category: [{
            type: String
        }]
}, { timestamps: true });
Schema.index({ _id: 1, type: -1 });
exports.default = mongoose_1.default.model('Category', Schema);
//# sourceMappingURL=category.model.js.map