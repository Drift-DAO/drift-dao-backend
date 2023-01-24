import dotenv from 'dotenv';
import './database/conn.js';
import Msgs from './database/models/MsgSchema.js';
import express, { Express, Request, Response } from 'express';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 4000;

app.get('/', async (req: Request, res: Response) => {
    const result = await Msgs.find()
    res.send(result);
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});