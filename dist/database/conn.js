"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const USERNAME = process.env.MY_USERNAME;
const PASSWORD = process.env.PASSWORD;
mongoose_1.default.set('strictQuery', true);
const MONGODB_DEV_URL = "mongodb://localhost:27017/Drift-Backend-TS";
const MONGODB_PROD_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.eamg4vd.mongodb.net/?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(MONGODB_PROD_URL)
    .then(() => {
    console.log(`connected to mongodb`);
})
    .catch((err) => {
    console.log("error is: ", err);
});
