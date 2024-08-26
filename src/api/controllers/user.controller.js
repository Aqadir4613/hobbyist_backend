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
exports.delete_user = exports.get_user = exports.updateUser = exports.setRole = exports.resetAccount = exports.sendResetCode = exports.login = exports.register = void 0;
var user_service_1 = require("../services/auth/user.service");
var logger_1 = require("../config/logger");
var authService = new user_service_1.default();
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var register_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, authService.Register(req.body)];
            case 1:
                register_1 = _a.sent();
                res.status(201).send(register_1);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                logger_1.logger.error(error_1.message);
                res.status(400).send({
                    success: false,
                    message: error_1.message,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var login_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, authService.login(req.body)];
            case 1:
                login_1 = _a.sent();
                res.status(201).send(login_1);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                logger_1.logger.error(error_2.message);
                res.status(400).send({
                    success: false,
                    message: error_2.message,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var sendResetCode = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, sendResetCode_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                email = req.body.email;
                return [4 /*yield*/, authService.sendResetCode(email)];
            case 1:
                sendResetCode_1 = _a.sent();
                res.status(201).send(sendResetCode_1);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                logger_1.logger.error(error_3.message);
                res.status(400).send({
                    success: false,
                    message: error_3.message,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendResetCode = sendResetCode;
var resetAccount = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var resetAccount_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, authService.resetAccount(req.body)];
            case 1:
                resetAccount_1 = _a.sent();
                res.status(201).send(resetAccount_1);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                logger_1.logger.error(error_4.message);
                res.status(400).send({
                    success: false,
                    message: error_4.message,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.resetAccount = resetAccount;
var setRole = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var role, resetAccount_2, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                role = req.body.role;
                return [4 /*yield*/, authService.setRole(role, req === null || req === void 0 ? void 0 : req.userId)];
            case 1:
                resetAccount_2 = _a.sent();
                res.status(200).send(resetAccount_2);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                logger_1.logger.error(error_5.message);
                res.status(400).send({
                    success: false,
                    message: error_5.message,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.setRole = setRole;
var updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, email, fullname, data, update_user, error_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                user = req.userId;
                _a = req.body, email = _a.email, fullname = _a.fullname;
                data = { user: user, email: email, fullname: fullname };
                return [4 /*yield*/, authService.updateUser(data)];
            case 1:
                update_user = _b.sent();
                res.status(200).send(update_user);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _b.sent();
                logger_1.logger.error(error_6.message);
                res.status(400).send({
                    success: false,
                    message: error_6.message,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var get_user = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, data, get_user_1, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.userId;
                data = { user: user };
                return [4 /*yield*/, authService.get_user(data)];
            case 1:
                get_user_1 = _a.sent();
                res.status(get_user_1.status).send(get_user_1);
                return [3 /*break*/, 3];
            case 2:
                error_7 = _a.sent();
                logger_1.logger.error(error_7.message);
                res.status(400).send({
                    success: false,
                    message: error_7.message,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.get_user = get_user;
var delete_user = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, data, get_user_2, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.userId;
                data = { user: user };
                return [4 /*yield*/, authService.delete_user(data)];
            case 1:
                get_user_2 = _a.sent();
                res.status(get_user_2.status).send(get_user_2);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                logger_1.logger.error(error_8.message);
                res.status(400).send({
                    success: false,
                    message: error_8.message,
                    data: null,
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.delete_user = delete_user;
