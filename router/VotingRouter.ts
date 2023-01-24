import express from 'express';
import {
	VotingModel,
	UserVotedModel,
} from '../database/models/VotingSchema.js';

const VotingRouter = express.Router();

VotingRouter.get('/:dao_id', async (req, res) => {
	try {
		const dao_id = req.params.dao_id;
		const elections = await VotingModel.find({ dao_id });
		res.send(elections);
	} catch (e) {
		res.send(e);
	}
});

VotingRouter.post('/', async (req, res) => {
	try {
		const { dao_id, electionId } = req.body;
		const newElection = new VotingModel({
			dao_id,
			electionId,
		});

		await newElection.save();
		res.send('success');
	} catch (e) {
		res.send(e);
	}
});

VotingRouter.get('/:userAddr/:electionId', async (req, res) => {
	try {
		const { userAddr, electionId } = req.params;

		let result = {
			option: -1,
		};
		const userVoted = await UserVotedModel.findOne({
			userAddr,
			electionId,
		});

		if (userVoted) {
			result.option = userVoted.option;
		}
		// if (newVote) await newVote.save();
		res.send(result);
	} catch (e) {
		res.send(e);
	}
});

VotingRouter.post('/vote', async (req, res) => {
	try {
		const { userAddr, electionId, option } = req.body;
		const newVote = new UserVotedModel({
			userAddr,
			electionId,
			option,
		});

		await newVote.save();
		res.send('success');
	} catch (e) {
		res.send(e);
	}
});

export default VotingRouter;