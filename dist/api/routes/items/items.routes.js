"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const item_controller_1 = require("../../controllers/item.controller");
const multer_1 = require("../../middleware/multer");
const verify_token_1 = require("../../middleware/verify.token");
router.post("/api/v1/add-item", verify_token_1.verify, item_controller_1.addItem);
router.put("/api/v1/edit-item/:id", verify_token_1.verify, item_controller_1.editItem);
router.post("/api/v1/item-image", verify_token_1.verify, multer_1.uploads.single("file"), item_controller_1.uploadImage);
router.post("/api/v1/item-image-url", verify_token_1.verify, item_controller_1.uploadImage);
router.get("/api/v1/items-list", verify_token_1.verify, item_controller_1.itemList);
router.get("/api/v1/get-item/:id", verify_token_1.verify, item_controller_1.oneItem);
router.delete("/api/v1/delete-item/:id", verify_token_1.verify, item_controller_1.removeItem);
router.post("/api/v1/add-category", verify_token_1.verify, item_controller_1.addCategory);
router.get("/api/v1/get-category", verify_token_1.verify, item_controller_1.getCategory);
router.get("/api/v1/get-similar-item/:id", verify_token_1.verify, item_controller_1.getSimilarItems);
router.post("/api/v1/scrap-item", verify_token_1.verify, item_controller_1.scrapItem);
router.get("/api/v1/get-daily-items/:itemId", verify_token_1.verify, item_controller_1.getDailyItems);
// router.post("/api/v1/signin", login);
// router.post("/api/v1/send-reset-code", sendResetCode);
// router.post("/api/v1/reset-account", resetAccount);
exports.default = router;
//# sourceMappingURL=items.routes.js.map