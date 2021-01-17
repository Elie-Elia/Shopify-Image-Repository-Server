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
exports.imageController = void 0;
const image_1 = require("../interactions/image");
const statusCodes_1 = require("../utils/statusCodes");
const image_2 = require("../models/image");
const image_3 = require("../interfaces/image");
const firebase_1 = __importDefault(require("../../firebase"));
const validateTags = (tags) => {
    if (!tags)
        return true;
    return ((typeof tags === "string" || tags instanceof String) && tags.toString().toLowerCase() in image_3.Tag) || (tags.every(tag => tag.toLowerCase() in image_3.Tag));
};
const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('No image file');
        }
        let newFileName = `${file.originalname}_${Date.now()}`;
        let fileUpload = firebase_1.default.bucket.file(newFileName);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype
            }
        });
        blobStream.on('error', (error) => {
            reject('Something is wrong! Unable to upload at the moment.: ' + error.message);
        });
        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const url = `https://storage.googleapis.com/${firebase_1.default.bucket.name}/${fileUpload.name}`;
            resolve(url);
        });
        blobStream.end(file.buffer);
    });
};
exports.imageController = {
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let imageId = req.params.imageId;
        if (imageId) {
            res.status(statusCodes_1.statusCodes.MISSING_PARAMS).json('Missing Image Id');
            return;
        }
        try {
            const imageId = req.params.imageId;
            const image = yield image_1.imageDBInteractions.find(imageId);
            image ? res.status(statusCodes_1.statusCodes.SUCCESS).send(image) : res.status(statusCodes_1.statusCodes.NOT_FOUND).send({ status: statusCodes_1.statusCodes.NOT_FOUND, message: "Image not found" });
        }
        catch (error) {
            res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(error);
        }
    }),
    getAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            res.status(statusCodes_1.statusCodes.SUCCESS).send(yield image_1.imageDBInteractions.all());
        }
        catch (err) {
            res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(err);
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let title = req.body.title;
        let description = req.body.description;
        let tags = req.body.tags;
        let error = undefined;
        // Error checking
        if (!req.file) {
            res.status(400).send("Error: No files found");
        }
        if (title == undefined) {
            error = "No title provided";
        }
        if (description == undefined) {
            error = "No description provided";
        }
        if (!validateTags(tags)) {
            error = "Wrong tags";
        }
        if (error) {
            res.status(statusCodes_1.statusCodes.MISSING_PARAMS).json({ error });
            return;
        }
        try {
            let url = yield uploadImageToStorage(req.file);
            let imageData = Object.assign(Object.assign({}, req.body), { link: url });
            let newImage = yield image_1.imageDBInteractions.create(new image_2.Image(imageData));
            let image = newImage.toJSON();
            res.status(statusCodes_1.statusCodes.SUCCESS).send(image);
        }
        catch (error) {
            res.status(statusCodes_1.statusCodes.SERVER_ERROR).send(error);
        }
    })
};
//# sourceMappingURL=image.js.map