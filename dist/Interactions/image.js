"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDBInteractions = void 0;
const image_1 = require("../models/image");
exports.imageDBInteractions = {
    create: (image) => {
        return image_1.Image.create(image);
    },
    find: (imageId) => {
        return image_1.Image.findOne({ _id: imageId }).exec();
    },
    all: () => {
        return image_1.Image.find({}).sort({ createdAt: -1 }).exec();
    },
};
//# sourceMappingURL=image.js.map