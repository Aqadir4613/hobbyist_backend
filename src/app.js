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
/* eslint-disable @typescript-eslint/no-var-requires */
var express_1 = require("express");
var cors_1 = require("cors");
var logger_1 = require("./api/config/logger");
var database_1 = require("./api/database");
var routes_1 = require("./api/routes");
// import cron from 'node-cron'
var index_1 = require("./api/helper/scrapping/index");
var morgan_1 = require("morgan");
var scrap = new index_1.Scrapping();
// var app = (0, express_1.default)();
var app = express_1();

(0, database_1.default)();
var port = process.env.PORT || 8080;

require('dotenv').config();
// app.use((0, cors_1.default)());
app.use( cors_1());

app.use(express_1.json({
    limit: "50mb",
    type: [
        "application/json",
        "text/plain", // AWS sends this content-type for its messages/notifications
    ],
}));
app.use(express_1.urlencoded({ extended: true }));
// app.use((0, morgan_1.default)(':date *** :method :: :url ** :response-time'));
app.use(morgan_1(':date *** :method :: :url ** :response-time'));

app.use(routes_1.default);
setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('running jobs');
                return [4 /*yield*/, scrap.saveDailyJobforCategory()];
            case 1:
                _a.sent();
                return [4 /*yield*/, scrap.saveDailyJobForItem()];
            case 2:
                _a.sent();
                console.log('cleaning');
                return [2 /*return*/];
        }
    });
}); }, 86400000);
// setInterval(async () => {
//   await scrap.saveDailyJobSameItem()
//   console.log('running same job')
// }, 92500000)
// setTimeout(async () => {
//   console.log('it begins')
//   await scrap.saveDailyJobSimilarItem()
//   console.log('running similar job')
// }, 1000)
// setTimeout(async () => {
// console.log('it begins 2.0')
//   await scrap.saveDailyJobSameItem()
//   console.log('running same job')
// }, 3600000)
app.get('/test-simi', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            // const x = await scrap.saveDailyJobSameItem()
            return [4 /*yield*/, scrap.saveDailyJobforCategory()];
            case 1:
                // const x = await scrap.saveDailyJobSameItem()
                _a.sent();
                res.json('running');
                return [2 /*return*/];
        }
    });
}); });
app.get('/test-same', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, scrap.saveDailyJobForItem()
                // const x = await scrap.saveDailyJobSimilarItem()
            ];
            case 1:
                _a.sent();
                // const x = await scrap.saveDailyJobSimilarItem()
                res.json('running');
                return [2 /*return*/];
        }
    });
}); });
app.listen(port, function () {
    logger_1.logger.info("server listening on http://localhost:".concat(port));
});
