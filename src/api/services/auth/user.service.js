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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
var user_model_1 = require("../../schema/user.model");
var daily_job_model_1 = require("../../schema/daily-job.model");
var item_model_1 = require("../../schema/item.model");
var scrapped_items_model_1 = require("../../schema/scrapped-items.model");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var email_service_1 = require("../../helper/email/email.service");
var ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.Register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, fullname, c_password, user, HashPassword, newUser, saveNewUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, password = data.password, fullname = data.fullname, c_password = data.c_password;
                        return [4 /*yield*/, user_model_1.default.findOne({ email: email.toLowerCase() })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            throw new Error("User already exists");
                        }
                        if (password !== c_password) {
                            throw new Error("Password does not match");
                        }
                        return [4 /*yield*/, this.HashPassword(password)];
                    case 2:
                        HashPassword = _a.sent();
                        return [4 /*yield*/, user_model_1.default.create({
                                email: email.toLowerCase(),
                                fullname: fullname,
                                password: HashPassword,
                            })];
                    case 3:
                        newUser = _a.sent();
                        return [4 /*yield*/, newUser.save()];
                    case 4:
                        saveNewUser = _a.sent();
                        if (saveNewUser)
                            return [2 /*return*/, {
                                    success: true,
                                    message: "Account created successfully!",
                                    data: data,
                                }];
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, validPassword, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, password = data.password;
                        return [4 /*yield*/, user_model_1.default.findOne({ email: email.toLowerCase() })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Account does not exist",
                                    data: null,
                                }];
                        }
                        return [4 /*yield*/, bcryptjs_1.compare(password, user.password)];
                    case 2:
                        validPassword = _a.sent();
                        if (!validPassword) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Invalid password",
                                    data: null,
                                }];
                        }
                        return [4 /*yield*/, this.accessTokenGenerator(user._id)];
                    case 3:
                        token = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: "Login successful",
                                data: {
                                    token: token,
                                    email: user.email,
                                    fullname: user.fullname,
                                    role: user.role,
                                },
                            }];
                }
            });
        });
    };
    AuthService.prototype.HashPassword = function (password) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, hashedPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcryptjs_1.genSalt(10)];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcryptjs_1.hash(password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [2 /*return*/, hashedPassword];
                }
            });
        });
    };
    AuthService.prototype.accessTokenGenerator = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, jsonwebtoken_1.sign({ _id: userId }, "swsh23hjddnknoh788778aCHOssc", {
                        algorithm: "HS256",
                        expiresIn: process.env.ACCESS_TOKEN_LIFE,
                    })];
            });
        });
    };
    AuthService.prototype.sendResetCode = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var findUser, resetCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.findOne({ email: email.toLowerCase() })];
                    case 1:
                        findUser = _a.sent();
                        if (!findUser) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Account does not exist",
                                    data: null,
                                }];
                        }
                        resetCode = Math.floor(Math.random() * 100000);
                        findUser.reset_code = resetCode;
                        return [4 /*yield*/, findUser.save()];
                    case 2:
                        _a.sent();
                        //TODO: send mail_verified
                        return [4 /*yield*/, new email_service_1.default().sendMail({
                                template: {
                                    name: "reset.account.html",
                                    data: {
                                        Full_Name: findUser.fullname,
                                        resetToken: resetCode,
                                        userEmail: findUser.email,
                                    },
                                },
                                email: email,
                                title: "Hobbyist Reset Password",
                            })];
                    case 3:
                        //TODO: send mail_verified
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                message: "Reset code sent ".concat(email),
                            }];
                }
            });
        });
    };
    AuthService.prototype.resetAccount = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var password, reset_code, c_password, findUser, HashPassword, saveResetCode;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = data.password, reset_code = data.reset_code, c_password = data.c_password;
                        return [4 /*yield*/, user_model_1.default.findOne({ reset_code: reset_code })];
                    case 1:
                        findUser = _a.sent();
                        if (!findUser) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "It appears that the reset code is invalid, please try again",
                                    data: null,
                                }];
                        }
                        if (password !== c_password) {
                            return [2 /*return*/, {
                                    success: false,
                                    message: "Password does not match",
                                    data: null,
                                }];
                        }
                        return [4 /*yield*/, this.HashPassword(password)];
                    case 2:
                        HashPassword = _a.sent();
                        findUser.password = HashPassword;
                        findUser.reset_code = null;
                        return [4 /*yield*/, findUser.save()];
                    case 3:
                        saveResetCode = _a.sent();
                        if (saveResetCode)
                            return [2 /*return*/, {
                                    success: true,
                                    message: "Password reset successful",
                                }];
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.setRole = function (role, user) {
        return __awaiter(this, void 0, void 0, function () {
            var setRole;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, user_model_1.default.findOne({ _id: user })];
                    case 1:
                        setRole = _a.sent();
                        setRole.role = role;
                        setRole.role_date = new Date();
                        setRole.save();
                        return [2 /*return*/, {
                                status: 200,
                                success: true,
                                message: "".concat(role, " set for user")
                            }];
                }
            });
        });
    };
    AuthService.prototype.updateUser = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var email, fullname, user, find_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = data.email, fullname = data.fullname, user = data.user;
                        return [4 /*yield*/, user_model_1.default.findOne({ _id: user })];
                    case 1:
                        find_user = _a.sent();
                        find_user.email = email;
                        find_user.fullname = fullname;
                        return [4 /*yield*/, find_user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                status: 200,
                                message: "Account updated successfully"
                            }];
                }
            });
        });
    };
    AuthService.prototype.get_user = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, find_user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = data.user;
                        return [4 /*yield*/, user_model_1.default.findOne({ _id: user })];
                    case 1:
                        find_user = _a.sent();
                        return [2 /*return*/, {
                                status: 200,
                                message: "Account updated successfully",
                                data: find_user
                            }];
                }
            });
        });
    };
    AuthService.prototype.delete_user = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var user, find_delete_user, find_daily_items, find_item, similar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = data.user;
                        return [4 /*yield*/, user_model_1.default.findByIdAndDelete({ _id: user })];
                    case 1:
                        find_delete_user = _a.sent();
                        return [4 /*yield*/, daily_job_model_1.default.deleteMany({ _userId: user })];
                    case 2:
                        find_daily_items = _a.sent();
                        return [4 /*yield*/, item_model_1.default.deleteMany({ _userId: user })];
                    case 3:
                        find_item = _a.sent();
                        return [4 /*yield*/, scrapped_items_model_1.default.deleteMany({ _userId: user })];
                    case 4:
                        similar = _a.sent();
                        if (find_delete_user && find_daily_items && find_item && similar) {
                            return [2 /*return*/, { status: 200, success: true, message: "user deleted successfully" }];
                        }
                        else {
                            return [2 /*return*/, { status: 400, success: false, message: 'something went wrong deleting user' }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports.default = AuthService;
