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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_user = exports.get_user = exports.updateUser = exports.setRole = exports.resetAccount = exports.sendResetCode = exports.login = exports.register = void 0;
const user_service_1 = __importDefault(require("../services/auth/user.service"));
const logger_1 = require("../config/logger");
const authService = new user_service_1.default();
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const register = yield authService.Register(req.body);
        res.status(201).send(register);
    }
    catch (error) {
        logger_1.logger.error(error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const login = yield authService.login(req.body);
        res.status(201).send(login);
    }
    catch (error) {
        logger_1.logger.error(error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.login = login;
const sendResetCode = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const sendResetCode = yield authService.sendResetCode(email);
        res.status(201).send(sendResetCode);
    }
    catch (error) {
        logger_1.logger.error(error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.sendResetCode = sendResetCode;
const resetAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resetAccount = yield authService.resetAccount(req.body);
        res.status(201).send(resetAccount);
    }
    catch (error) {
        logger_1.logger.error(error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.resetAccount = resetAccount;
const setRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role } = req.body;
        const resetAccount = yield authService.setRole(role, req === null || req === void 0 ? void 0 : req.userId);
        res.status(200).send(resetAccount);
    }
    catch (error) {
        logger_1.logger.error(error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.setRole = setRole;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.userId;
        const { email, fullname } = req.body;
        let data = { user, email, fullname };
        const update_user = yield authService.updateUser(data);
        res.status(200).send(update_user);
    }
    catch (error) {
        logger_1.logger.error(error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.updateUser = updateUser;
const get_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.userId;
        let data = { user };
        const get_user = yield authService.get_user(data);
        res.status(get_user.status).send(get_user);
    }
    catch (error) {
        logger_1.logger.error(error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.get_user = get_user;
const delete_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.userId;
        let data = { user };
        const get_user = yield authService.delete_user(data);
        res.status(get_user.status).send(get_user);
    }
    catch (error) {
        logger_1.logger.error(error.message);
        res.status(400).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
});
exports.delete_user = delete_user;
//# sourceMappingURL=user.controller.js.map