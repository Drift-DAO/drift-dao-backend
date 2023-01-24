import 'dotenv/config';
import mongoose from 'mongoose';

const USERNAME = process.env.MY_USERNAME;
const PASSWORD = process.env.PASSWORD;

mongoose.set('strictQuery', true);

const MONGODB_DEV_URL = "mongodb://localhost:27017/Drift-Backend-TS";
const MONGODB_PROD_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.eamg4vd.mongodb.net/?retryWrites=true&w=majority`

mongoose
    .connect(MONGODB_PROD_URL)
    .then(() => {
        console.log(`connected to mongodb`);
    })
    .catch((err) => {
        console.log("error is: ", err);
    });
