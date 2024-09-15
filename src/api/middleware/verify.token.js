"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
var verify = function (req, res, next) {
    var auth = req.headers.authorization;
    !auth ? null : auth;
    var token = auth === null || auth === void 0 ? void 0 : auth.split(" ")[1];
    if (!token) {
        return res.status(403).send({
            status: "error",
            message: "No token provided!",
        });
    }
    jsonwebtoken_1.verify(token, "swsh23hjddnknoh788778aCHOssc", function (err, decoded) {
        console.log(err,'sskshgdhjgaf', decoded);
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
