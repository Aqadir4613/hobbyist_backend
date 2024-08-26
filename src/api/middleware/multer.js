"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploads = void 0;
var multer_1 = require("multer");
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
var storage = multer_1.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "uploads");
    // },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var uploads = (0, multer_1)({ storage: storage, fileFilter: fileFilter });
exports.uploads = uploads;
