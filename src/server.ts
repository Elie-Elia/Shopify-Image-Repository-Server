import express from "express";
import { Application, Request, Response } from "express";
import { imageRouter } from './routes/image';
import mongoose from 'mongoose';
import cors from 'cors';

const app: Application = express();

app.use(cors())
app.use(express.static('public'));
app.use('/', imageRouter)

mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/shopify-image-repository', {useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
let port = process.env.PORT || 5000;
app.listen(port);
console.log('listening on port', port);