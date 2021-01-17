import { Document, Model, model, Schema } from "mongoose";
import { IImage } from "../interfaces/image"
let mongoose = require('mongoose');

export interface IImageModel extends IImage, Document {}

const imageSchema: Schema = new mongoose.Schema({
    title: String,
    description: String,
    link: String,
    tags: [String],
}, { timestamps: true });

const Image: Model<IImageModel> =  model('Image', imageSchema);

export { Image }