import 'dotenv/config';
import mongoose from 'mongoose';

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;

const MONGODB_DEV_URL = "mongodb://localhost:27017/Drift-Backend-TS";
const MONGODB_PROD_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wys8pfj.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', true);

mongoose
    .connect(MONGODB_DEV_URL)
    .then(() => {
        console.log(`connected to mongodb`);
    })
    .catch((err) => {
        console.log(err);
    });
