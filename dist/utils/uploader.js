"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
    }
    else if (file.size > 4000000) {
        req.fileValidationError = 'Image files must be below 4MB!';
    }
    cb(null, true);
};
const uploadHandler = multer_1.default({
    storage: multer_1.default.memoryStorage(),
    fileFilter: imageFilter
});
exports.uploadHandler = uploadHandler;
//# sourceMappingURL=uploader.js.map