import { Request, Response } from "express";
import {imageDBInteractions} from "../Interactions/image";
import { statusCodes } from '../utils/statusCodes';
import { IImage } from "../interfaces/image";
import { Image, IImageModel } from "../models/image";
import {Tag} from "../interfaces/image";
import firebase from '../../firebase';

const validateTags = (tags: Array<string>) => {
    if (!tags) return true;
    return ((typeof tags === "string" || tags instanceof String) && tags.toString().toLowerCase() in Tag) || (tags.every(tag => tag.toLowerCase() in Tag));
}
const uploadImageToStorage = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject('No image file');
      }
      let newFileName = `${file.originalname}_${Date.now()}`;
  
      let fileUpload = firebase.bucket.file(newFileName);
  
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
        const url = `https://storage.googleapis.com/${firebase.bucket.name}/${fileUpload.name}`;
        resolve(url);
      });
  
      blobStream.end(file.buffer);
    });
}

export const imageController = {
    show: async (req: Request, res: Response) => {
        let imageId: string = req.params.imageId;
        if (imageId) {
            res.status(statusCodes.MISSING_PARAMS).json('Missing Image Id'); return;
        }
        try {
            const imageId: string = req.params.imageId;
            const image: IImageModel = await imageDBInteractions.find(imageId);
            image ? res.status(statusCodes.SUCCESS).send(image) : res.status(statusCodes.NOT_FOUND).send({ status: statusCodes.NOT_FOUND, message: "Image not found" });
        } catch (error) {
            res.status(statusCodes.SERVER_ERROR).send(error);
        }
    },
    getAll: async (req: Request, res: Response) => {
        try {
            res.status(statusCodes.SUCCESS).send(
                await imageDBInteractions.all()
            );
        } catch (err) {
            res.status(statusCodes.SERVER_ERROR).send(err);
        }
    },
    create: async (req: any, res: Response) => {
        let title = req.body.title;
        let description = req.body.description;
        let tags = req.body.tags;
        let error = undefined;
        // Error checking
        if(!req.file) {
            res.status(400).send("Error: No files found")
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
            res.status(statusCodes.MISSING_PARAMS).json({error}); return;
        }
        try {
            let url = await uploadImageToStorage(req.file);
            
            let imageData: IImage = {
                ...req.body,
                link: url,
            }
            let newImage: IImageModel = await imageDBInteractions.create(new Image(imageData));

            let image = newImage.toJSON();
            res.status(statusCodes.SUCCESS).send(image);

        } catch (error) {
            res.status(statusCodes.SERVER_ERROR).send(error);
        }
    }
}