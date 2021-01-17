"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRouter = void 0;
const express_1 = __importDefault(require("express"));
const uploader_1 = require("../utils/uploader");
const image_1 = require("../controllers/image");
const imageRouter = express_1.default.Router();
exports.imageRouter = imageRouter;
imageRouter.get('/images/all', image_1.imageController.getAll);
imageRouter.post('/images', uploader_1.uploadHandler.single('image'), image_1.imageController.create);
imageRouter.get('/images', image_1.imageController.show);
//# sourceMappingURL=image.js.map