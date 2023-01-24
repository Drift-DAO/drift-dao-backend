"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVotedModel = exports.VotingModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const votingSchema = new mongoose_1.default.Schema({
    dao_id: {
        type: String,
        required: true,
    },
    electionId: {
        type: String,
        require: true,
    },
});
const userVotedSchema = new mongoose_1.default.Schema({
    electionId: {
        type: String,
        require: true,
    },
    userAddr: {
        type: String,
        required: true,
    },
    option: {
        type: Number,
        required: true,
    },
});
const VotingModel = mongoose_1.default.model('VotingModel', votingSchema);
exports.VotingModel = VotingModel;
const UserVotedModel = mongoose_1.default.model('UserVotedModel', userVotedSchema);
exports.UserVotedModel = UserVotedModel;
