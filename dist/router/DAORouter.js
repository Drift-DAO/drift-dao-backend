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
const DAOSchema_js_1 = require("../database/models/DAOSchema.js");
const express_1 = __importDefault(require("express"));
const DAORouter = express_1.default.Router();
DAORouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.id;
        const result = yield DAOSchema_js_1.DAOModel.findOne({ _id });
        res.send(result);
    }
    catch (e) {
        res.send(e);
    }
}));
DAORouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dao_name = req.query.name;
        const userAddr = req.query.userAddr;
        // console.log('dao name:', dao_name);
        // console.log('useraddr: ', userAddr);
        const result = yield DAOSchema_js_1.DAOModel.findOne({ dao_name });
        if (!result) {
            res.send('no dao found');
            return;
        }
        console.log('result-1 is: ', result);
        let newResult = {
            result,
            isMember: false,
        };
        const ifAlreadyMember = yield DAOSchema_js_1.DAOmemberModel.findOne({
            userAddr,
            daoId: result._id,
        });
        if (ifAlreadyMember) {
            newResult.isMember = true;
        }
        res.send(newResult);
    }
    catch (e) {
        console.log('error occurred: ', e);
        res.send(e);
    }
}));
DAORouter.get('/memberOf/:userAddr', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAddr = req.params.userAddr;
        const daoList = yield DAOSchema_js_1.DAOmemberModel.find({ userAddr });
        let result = [];
        for (let i = 0; i < daoList.length; i++) {
            try {
                const daoDetails = yield DAOSchema_js_1.DAOModel.findOne({ _id: daoList[i].daoId });
                result.push(daoDetails);
            }
            catch (e) { }
        }
        res.send(result);
    }
    catch (e) {
        res.send(e);
    }
}));
DAORouter.get('/allMembers/:daoId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const daoId = req.params.daoId;
        const result = yield DAOSchema_js_1.DAOmemberModel.find({ daoId });
        res.send(result);
    }
    catch (e) {
        res.send(e);
    }
}));
DAORouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dao_name, dao_short_desc, dao_desc, dao_logo, dao_chain, dao_creator_address, } = req.body;
        const newDao = new DAOSchema_js_1.DAOModel({
            dao_name,
            dao_short_desc,
            dao_desc,
            dao_logo,
            dao_chain,
            dao_creator_address,
        });
        const savedDAO = yield newDao.save();
        res.send(savedDAO);
    }
    catch (e) {
        res.send(e);
    }
}));
DAORouter.post('/join', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userAddr, daoId } = req.body;
        const ifAlreadyMember = yield DAOSchema_js_1.DAOmemberModel.findOne({ userAddr, daoId });
        if (ifAlreadyMember) {
            res.send('you already are member of the dao');
            return;
        }
        const result = new DAOSchema_js_1.DAOmemberModel({
            userAddr,
            daoId,
        });
        yield result.save();
        res.send('success');
    }
    catch (e) {
        res.send(e);
    }
}));
DAORouter.post('/leave', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userAddr, daoId } = req.body;
        const result = yield DAOSchema_js_1.DAOmemberModel.findOneAndDelete({ userAddr, daoId });
        // console.log('result is: ', result);
        res.send('success');
    }
    catch (e) {
        res.send(e);
    }
}));
exports.default = DAORouter;
