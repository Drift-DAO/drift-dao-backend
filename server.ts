import 'dotenv/config';
import './database/conn.js';
import express, { Express, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Msgs from './database/models/MsgSchema.js';
import cors from 'cors';
import ContactFormRouter from './router/ContactFormRouter.js';
import DAORouter from './router/DAORouter.js';
import VotingRouter from './router/VotingRouter.js';

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());

app.use(
    cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data);
    });

    socket.on('send_message', async (data) => {
        socket.to(data.room).emit('receive_message', data);
        // console.log('got the data: ', data);
        try {
            const newData = new Msgs({
                room: data.room,
                msg: data.msg,
                sender: data.sender,
            });
            const result = await newData.save();
            // console.log(`Result: ${result}`);
        } catch (err) {
            console.log(`error: ${err}`);
        }
    });
});

app.get('/', (req, res) => {
    res.send('hello world');
});

app.use('/contactForm', ContactFormRouter);
app.use('/DAO', DAORouter);
app.use('/voting', VotingRouter);

app.get('/:room', async (req: Request, res: Response) => {
    const myroom = req.params.room;
    const msgs = await Msgs.find({ room: myroom });
    res.send(msgs);
});

httpServer.listen(PORT, () => {
    // console.log(`App started on http://localhost:${PORT}`);
});