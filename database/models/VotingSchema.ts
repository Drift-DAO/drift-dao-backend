import mongoose from 'mongoose';

const votingSchema = new mongoose.Schema({
	dao_id: {
		type: String,
		required: true,
	},
	electionId: {
		type: String,
		require: true,
	},
});

const userVotedSchema = new mongoose.Schema({
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

const VotingModel = mongoose.model('VotingModel', votingSchema);
const UserVotedModel = mongoose.model('UserVotedModel', userVotedSchema);

export { VotingModel, UserVotedModel };