"use strict";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { logger } from '../config/logger';
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
// dotenv.config({ path: __dirname + '/.env' });
// const connectDatabase = async () => {
//   try {
//     let uri = 'lincoln.smith.85@gmail.com';//process.env.DB_CONNECTION
//     let testDB = 'no'; //process.env.TEST_DB || 'no';
//     if (testDB == 'yes' && process.env.TEST_DB_CONNECTION) uri = process.env.TEST_DB_CONNECTION
//     mongoose.connect(uri, {
//         //useNewUrlParser: true,
//         //useUnifiedTopology: true,
//         //useCreateIndex: true,
//     });
//     const connection = mongoose.connection;
//     connection.once("open", (error, db) => {
//       if (error) {
//         logger.error(error.message);
//       } else {
//         logger.info("MongoDB database connection established successfully");
//       }
//     });
//   } catch (error) {
//     logger.error(error.message);
//     process.exit(1);
//   }
// };
// export default connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = require("../config/logger");
dotenv_1.default.config({ path: __dirname + '/.env' });
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uri = `mongodb+srv://lincolns765:KhuD79RPto7OdkEg!@cluster1.dgo5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
        let testDB = 'no'; //process.env.TEST_DB || 'no';
        // if (testDB == 'yes' && process.env.TEST_DB_CONNECTION) {
        //   uri = process.env.TEST_DB_CONNECTION;
        // }
        console.log('==== >> uri == >> ', uri);
        yield mongoose_1.default.connect(uri, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
        });
        const connection = mongoose_1.default.connection;
        connection.once("open", (error, db) => {
            if (error) {
                logger_1.logger.error(error.message);
            }
            else {
                logger_1.logger.info("MongoDB database connection established successfully");
            }
        });
    }
    catch (error) {
        logger_1.logger.error(error.message);
        process.exit(1);
    }
});
exports.default = connectDatabase;
//# sourceMappingURL=index.js.map