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
const express_1 = __importDefault(require("express"));
const VotingSchema_js_1 = require("../database/models/VotingSchema.js");
const VotingRouter = express_1.default.Router();
VotingRouter.get('/:dao_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dao_id = req.params.dao_id;
        const elections = yield VotingSchema_js_1.VotingModel.find({ dao_id });
        res.send(elections);
    }
    catch (e) {
        res.send(e);
    }
}));
VotingRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dao_id, electionId } = req.body;
        const newElection = new VotingSchema_js_1.VotingModel({
            dao_id,
            electionId,
        });
        yield newElection.save();
        res.send('success');
    }
    catch (e) {
        res.send(e);
    }
}));
VotingRouter.get('/:userAddr/:electionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userAddr, electionId } = req.params;
        let result = {
            option: -1,
        };
        const userVoted = yield VotingSchema_js_1.UserVotedModel.findOne({
            userAddr,
            electionId,
        });
        if (userVoted) {
            result.option = userVoted.option;
        }
        // if (newVote) await newVote.save();
        res.send(result);
    }
    catch (e) {
        res.send(e);
    }
}));
VotingRouter.post('/vote', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userAddr, electionId, option } = req.body;
        const newVote = new VotingSchema_js_1.UserVotedModel({
            userAddr,
            electionId,
            option,
        });
        yield newVote.save();
        res.send('success');
    }
    catch (e) {
        res.send(e);
    }
}));
exports.default = VotingRouter;
