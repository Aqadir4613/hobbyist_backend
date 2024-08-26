"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-empty-function */
const fs_1 = require("fs");
const path = __importStar(require("path"));
const error_handler_1 = __importDefault(require("../handler/error.handler"));
const logger_1 = require("../../config/logger");
const email_initialization_1 = __importDefault(require("./email.initialization"));
class Email {
    constructor() { }
    getEmailTemplate(template) {
        try {
            const file = path.join(__dirname, `./templates/${template}`);
            const emailTemplate = (0, fs_1.readFileSync)(file, "utf8");
            return emailTemplate;
        }
        catch (error) {
            logger_1.logger.error(error);
            return "An error occurred while loading template";
        }
    }
    parseEmailTemplate(emailTemplate) {
        let template = this.getEmailTemplate(emailTemplate.name);
        if (!template)
            throw new error_handler_1.default("email template not found", 500);
        Object.keys(emailTemplate.data).forEach((key) => {
            const regex = new RegExp(`{{\.\*${key}\.\*}}`, "g");
            template = template?.replace(regex, emailTemplate.data[key]);
        });
        return template;
    }
    sendMail(mailData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsedTemplate = this.parseEmailTemplate(mailData.template);
                const message = {
                    from: `${mailData.title} <test.server.shadow@gmail.com>`,
                    to: mailData.email,
                    subject: 'Hobbyist',
                    html: parsedTemplate
                };
                const info = yield email_initialization_1.default.sendMail(message);
                return info;
            }
            catch (error) {
                throw new error_handler_1.default(error.toString(), 500);
            }
        });
    }
}
exports.default = Email;
//# sourceMappingURL=email.service.js.map