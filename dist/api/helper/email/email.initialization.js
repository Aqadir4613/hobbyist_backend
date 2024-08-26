"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
        user: 'AKIAVGFYWAOLF7FCKOWO',
        pass: 'BHGzegGkQcR1JXVgXa9ibdI2FG7ER5obPfZvmvExRdh3' // generated ethereal password
    }
});
exports.default = transporter;
//# sourceMappingURL=email.initialization.js.map