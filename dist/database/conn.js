"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const MONGODB_DEV_URL = "mongodb://localhost:27017/Drift-Backend-TS";
const MONGODB_PROD_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wys8pfj.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default.set('strictQuery', true);
mongoose_1.default
    .connect(MONGODB_DEV_URL)
    .then(() => {
    console.log(`connected to mongodb`);
})
    .catch((err) => {
    console.log(err);
});
