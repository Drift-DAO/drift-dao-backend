"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("./database/conn.js");
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const MsgSchema_js_1 = __importDefault(require("./database/models/MsgSchema.js"));
const cors_1 = __importDefault(require("cors"));
const ContactFormRouter_js_1 = __importDefault(require("./router/ContactFormRouter.js"));
const DAORouter_js_1 = __importDefault(require("./router/DAORouter.js"));
const VotingRouter_js_1 = __importDefault(require("./router/VotingRouter.js"));
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, { cors: { origin: '*' } });
io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
        socket.join(data);
    });
    socket.on('send_message', (data) => __awaiter(void 0, void 0, void 0, function* () {
        socket.to(data.room).emit('receive_message', data);
        // console.log('got the data: ', data);
        try {
            const newData = new MsgSchema_js_1.default({
                room: data.room,
                msg: data.msg,
                sender: data.sender,
            });
            const result = yield newData.save();
            // console.log(`Result: ${result}`);
        }
        catch (err) {
            console.log(`error: ${err}`);
        }
    }));
});
app.get('/', (req, res) => {
    res.send('hello world');
});
app.use('/contactForm', ContactFormRouter_js_1.default);
app.use('/DAO', DAORouter_js_1.default);
app.use('/voting', VotingRouter_js_1.default);
app.get('/:room', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myroom = req.params.room;
    const msgs = yield MsgSchema_js_1.default.find({ room: myroom });
    res.send(msgs);
}));
httpServer.listen(PORT, () => {
    // console.log(`App started on http://localhost:${PORT}`);
});
