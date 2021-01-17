import express from 'express';
import { uploadHandler } from '../utils/uploader'
import { imageController } from '../controllers/image'

const imageRouter = express.Router();

imageRouter.get('/images/all', imageController.getAll);

imageRouter.post('/images', uploadHandler.single('image'), imageController.create);

imageRouter.get('/images', imageController.show);

export { imageRouter };