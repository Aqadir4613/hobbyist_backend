"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { ACCESS_TOKEN_SECRET } = process.env;
const verify = (req, res, next) => {
    const auth = req.headers.authorization;
    !auth ? null : auth;
    const token = auth === null || auth === void 0 ? void 0 : auth.split(" ")[1];
    if (!token) {
        return res.status(403).send({
            status: "error",
            message: "No token provided!",
        });
    }
    jsonwebtoken_1.default.verify(token, "swsh23hjddnknoh788778aCHOssc", (err, decoded) => {
        if (err) {
            return res.status(401).send({
                status: "error",
                message: "Session expired, Login to continue!",
            });
        }
        req.userId = decoded._id;
        next();
    });
};
exports.verify = verify;
//# sourceMappingURL=verify.token.js.map