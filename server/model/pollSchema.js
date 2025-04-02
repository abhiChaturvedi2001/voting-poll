import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [
        {
            text: String,
            votes: { type: Number, default: 0 },
        },
    ],
}, { timestamps: true });

const Poll = mongoose.model("Poll", pollSchema);
export default Poll;