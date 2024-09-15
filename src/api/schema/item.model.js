"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Schema = new mongoose_1.default.Schema(
  {
    _userId: {
      type: mongoose_1.default.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    item_title: {
      type: String,
      required: true,
    },
    item_keywords: {
      type: Array,
      required: true,
    },
    item_desc: {
      type: String,
    },
    item_category: {
      type: String,
      required: true,
    },
    its_scrapped: {
      type: Boolean,
    },
    item_image: {
      type: String,
    },
    image_id: {
      type: String,
    },
    item_purchased_price: {
      type: String,
    },
    item_purchased_date: {
      type: String,
    },
    item_grading_cost: {
      type: String,
    },
    item_sold_price: {
      type: String,
    },
    item_sold_date: {
      type: String,
    },
    stamps: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
Schema.index({ _userId: 1, type: -1 });
exports.default = mongoose_1.default.model("item", Schema);
