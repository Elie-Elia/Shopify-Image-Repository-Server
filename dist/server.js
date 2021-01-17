"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_1 = require("./routes/image");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.static('public'));
app.use('/', image_1.imageRouter);
mongoose_1.default.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/shopify-image-repository', { useNewUrlParser: true });
const db = mongoose_1.default.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));
let port = process.env.PORT || 5000;
app.listen(port);
console.log('listening on port', port);
//# sourceMappingURL=server.js.map