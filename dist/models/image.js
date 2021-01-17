"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const mongoose_1 = require("mongoose");
let mongoose = require('mongoose');
const imageSchema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    tags: [String],
}, { timestamps: true });
const Image = mongoose_1.model('Image', imageSchema);
exports.Image = Image;
//# sourceMappingURL=image.js.map