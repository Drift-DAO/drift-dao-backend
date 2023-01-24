import mongoose from 'mongoose';

const msgSchema = new mongoose.Schema({
    room: String,
    msg: String,
    sender: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

const Msgs = mongoose.model('Msgs', msgSchema);
export default Msgs;