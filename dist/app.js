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
/* eslint-disable @typescript-eslint/no-var-requires */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = require("./api/config/logger");
const database_1 = __importDefault(require("./api/database"));
const routes_1 = __importDefault(require("./api/routes"));
// import cron from 'node-cron'
const index_1 = require("./api/helper/scrapping/index");
const morgan_1 = __importDefault(require("morgan"));
const scrap = new index_1.Scrapping();
const app = (0, express_1.default)();
(0, database_1.default)();
const port = process.env.PORT || 8080;
require('dotenv').config();
app.use((0, cors_1.default)());
app.use(express_1.default.json({
    limit: "50mb",
    type: [
        "application/json",
        "text/plain", // AWS sends this content-type for its messages/notifications
    ],
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)(':date *** :method :: :url ** :response-time'));
app.use(routes_1.default);
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('running jobs');
    yield scrap.saveDailyJobforCategory();
    yield scrap.saveDailyJobForItem();
    console.log('cleaning');
    // await scrap.cleanDailyJobsCategories()
    // await scrap.cleanDailyJobsItems()
}), 86400000);
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
app.get('/test-simi', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const x = await scrap.saveDailyJobSameItem()
    yield scrap.saveDailyJobforCategory();
    res.json('running');
}));
app.get('/test-same', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield scrap.saveDailyJobForItem();
    // const x = await scrap.saveDailyJobSimilarItem()
    res.json('running');
}));
console.log('object');
app.listen(port, () => {
    logger_1.logger.info(`server listening on http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map