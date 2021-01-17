import { IImage } from "../interfaces/image";
import { Image , IImageModel } from "../models/image"



export const imageDBInteractions = {

    create: (image: IImage): Promise<IImageModel> => {
        return Image.create(image);
    },

    find: (imageId: string): Promise<IImageModel> => {
        return Image.findOne({ _id: imageId }).exec();
    },

    all: (): Promise<IImageModel[]> => {
        return Image.find({}).sort({createdAt: -1}).exec();
    },
};