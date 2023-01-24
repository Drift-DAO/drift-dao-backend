"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAOmemberModel = exports.DAOModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DAOSchema = new mongoose_1.default.Schema({
    dao_name: {
        type: String,
        required: true,
    },
    dao_short_desc: {
        type: String,
    },
    dao_desc: {
        type: String,
    },
    dao_logo: {
        type: String,
    },
    dao_chain: {
        type: [],
        required: true,
    },
    dao_creator_address: {
        type: String,
        required: true,
    },
});
const DAOmemberSchema = new mongoose_1.default.Schema({
    userAddr: {
        type: String,
        required: true
    },
    daoId: {
        type: String,
        required: true
    }
});
const DAOModel = mongoose_1.default.model('DAOModel', DAOSchema);
exports.DAOModel = DAOModel;
const DAOmemberModel = mongoose_1.default.model('DAOmemberModel', DAOmemberSchema);
exports.DAOmemberModel = DAOmemberModel;
