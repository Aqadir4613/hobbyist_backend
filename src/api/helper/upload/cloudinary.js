"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
var cloudinary = require("cloudinary");
exports.cloudinary = cloudinary;
require('dotenv').config();
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
