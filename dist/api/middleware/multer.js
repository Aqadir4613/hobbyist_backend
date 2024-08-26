"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads = void 0;
const multer_1 = __importDefault(require("multer"));
// export default multer({
//   storage: multer.diskStorage({}),
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       new Error("File type is not supported")
//       return;
//     }
//     cb(null, true);
//   },
// });
const storage = multer_1.default.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "uploads");
    // },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const uploads = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
exports.uploads = uploads;
//# sourceMappingURL=multer.js.map