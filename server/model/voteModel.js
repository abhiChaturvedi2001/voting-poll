import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },
    selectedOption: String
}, { timestamps: true });

const Vote = mongoose.model("Vote", voteSchema);
export default Vote;
