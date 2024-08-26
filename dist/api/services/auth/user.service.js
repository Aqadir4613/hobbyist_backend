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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
const user_model_1 = __importDefault(require("../../schema/user.model"));
const daily_job_model_1 = __importDefault(require("../../schema/daily-job.model"));
const item_model_1 = __importDefault(require("../../schema/item.model"));
const scrapped_items_model_1 = __importDefault(require("../../schema/scrapped-items.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_service_1 = __importDefault(require("../../helper/email/email.service"));
const { ACCESS_TOKEN_SECRET } = process.env;
class AuthService {
    Register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, fullname, c_password } = data;
            const user = yield user_model_1.default.findOne({ email: email.toLowerCase() });
            if (user) {
                throw new Error("User already exists");
            }
            if (password !== c_password) {
                throw new Error("Password does not match");
            }
            const HashPassword = yield this.HashPassword(password);
            const newUser = yield user_model_1.default.create({
                email: email.toLowerCase(),
                fullname,
                password: HashPassword,
            });
            const saveNewUser = yield newUser.save();
            if (saveNewUser)
                return {
                    success: true,
                    message: "Account created successfully!",
                    data,
                };
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = data;
            const user = yield user_model_1.default.findOne({ email: email.toLowerCase() });
            if (!user) {
                return {
                    success: false,
                    message: "Account does not exist",
                    data: null,
                };
            }
            const validPassword = yield bcryptjs_1.default.compare(password, user.password);
            if (!validPassword) {
                return {
                    success: false,
                    message: "Invalid password",
                    data: null,
                };
            }
            const token = yield this.accessTokenGenerator(user._id);
            return {
                success: true,
                message: "Login successful",
                data: {
                    token,
                    email: user.email,
                    fullname: user.fullname,
                    role: user.role,
                },
            };
        });
    }
    HashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            return hashedPassword;
        });
    }
    accessTokenGenerator(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ _id: userId }, "swsh23hjddnknoh788778aCHOssc", {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE,
            });
        });
    }
    sendResetCode(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield user_model_1.default.findOne({ email: email.toLowerCase() });
            if (!findUser) {
                return {
                    success: false,
                    message: "Account does not exist",
                    data: null,
                };
            }
            const resetCode = Math.floor(Math.random() * 100000);
            findUser.reset_code = resetCode;
            yield findUser.save();
            //TODO: send mail_verified
            yield new email_service_1.default().sendMail({
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
            });
            return {
                success: true,
                message: `Reset code sent ${email}`,
            };
        });
    }
    resetAccount(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, reset_code, c_password } = data;
            const findUser = yield user_model_1.default.findOne({ reset_code });
            if (!findUser) {
                return {
                    success: false,
                    message: "It appears that the reset code is invalid, please try again",
                    data: null,
                };
            }
            if (password !== c_password) {
                return {
                    success: false,
                    message: "Password does not match",
                    data: null,
                };
            }
            const HashPassword = yield this.HashPassword(password);
            findUser.password = HashPassword;
            findUser.reset_code = null;
            const saveResetCode = yield findUser.save();
            if (saveResetCode)
                return {
                    success: true,
                    message: "Password reset successful",
                };
        });
    }
    setRole(role, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const setRole = yield user_model_1.default.findOne({ _id: user });
            setRole.role = role;
            setRole.role_date = new Date();
            setRole.save();
            return {
                status: 200,
                success: true,
                message: `${role} set for user`
            };
        });
    }
    updateUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, fullname, user } = data;
            const find_user = yield user_model_1.default.findOne({ _id: user });
            find_user.email = email;
            find_user.fullname = fullname;
            yield find_user.save();
            return {
                status: 200,
                message: "Account updated successfully"
            };
        });
    }
    get_user(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = data;
            const find_user = yield user_model_1.default.findOne({ _id: user });
            return {
                status: 200,
                message: "Account updated successfully",
                data: find_user
            };
        });
    }
    delete_user(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = data;
            const find_delete_user = yield user_model_1.default.findByIdAndDelete({ _id: user });
            const find_daily_items = yield daily_job_model_1.default.deleteMany({ _userId: user });
            const find_item = yield item_model_1.default.deleteMany({ _userId: user });
            const similar = yield scrapped_items_model_1.default.deleteMany({ _userId: user });
            if (find_delete_user && find_daily_items && find_item && similar) {
                return { status: 200, success: true, message: "user deleted successfully" };
            }
            else {
                return { status: 400, success: false, message: 'something went wrong deleting user' };
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=user.service.js.map