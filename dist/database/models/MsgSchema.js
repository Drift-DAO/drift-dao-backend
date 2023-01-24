"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const msgSchema = new mongoose_1.default.Schema({
    room: String,
    msg: String,
    sender: String,
    date: {
        type: Date,
        default: Date.now,
    },
});
const Msgs = mongoose_1.default.model('Msgs', msgSchema);
exports.default = Msgs;
