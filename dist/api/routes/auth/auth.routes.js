"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../../controllers/user.controller");
const verify_token_1 = require("../../middleware/verify.token");
router.post("/api/v1/signup", user_controller_1.register);
router.post("/api/v1/signin", user_controller_1.login);
router.post("/api/v1/send-reset-code", user_controller_1.sendResetCode);
router.post("/api/v1/reset-account", user_controller_1.resetAccount);
router.put('/api/v1/set-role', verify_token_1.verify, user_controller_1.setRole);
router.put('/api/v1/edit-user', verify_token_1.verify, user_controller_1.updateUser);
router.get('/api/v1/get-user', verify_token_1.verify, user_controller_1.get_user);
router.delete('/api/v1/delete-user', verify_token_1.verify, user_controller_1.delete_user);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map