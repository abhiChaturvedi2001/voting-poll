import Poll from "../model/pollSchema.js";
import Vote from "../model/voteModel.js";
import mongoose from "mongoose"

export const createPoll = async (req, res) => {
    try {
        const { question, options } = req.body;
        const formattedOptions = options.map((opt) => ({ text: opt, votes: 0 }));
        const newPoll = new Poll({ question, options: formattedOptions });
        await newPoll.save();
        res.status(201).json(newPoll);
    } catch (error) {
        res.status(500).json({ error: "Error creating poll" });
    }
};

// Fetch all polls
export const getPolls = async (req, res) => {
    try {
        const polls = await Poll.find();
        res.json(polls);
    } catch (error) {
        res.status(500).json({ error: "Error fetching polls" });
    }
}

// Vote on a poll (Anonymous + Fake Randomization)
export const votePoll = async (req, res) => {
    const { pollId, selectedOption } = req.body;

    if (!pollId || !selectedOption) {
        return res.status(400).json({ error: "Poll ID and selected option are required" });
    }

    try {
        // Save the vote anonymously
        const vote = new Vote({ pollId, selectedOption });
        await vote.save();

        // Update the vote count in the Poll model
        await Poll.updateOne(
            { _id: pollId, "options.text": selectedOption },
            { $inc: { "options.$.votes": 1 } }
        );

        res.status(200).json({ message: "Vote submitted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

export const getPollAnalysis = async (req, res) => {
    const { pollId } = req.params;
    console.log(pollId);

    try {
        const result = await Poll.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(pollId) } }, // Ensure valid ObjectId
            {
                $project: {
                    question: 1,
                    totalVotes: { $sum: { $ifNull: ["$options.votes", 0] } }, // Default votes to 0
                    options: {
                        $map: {
                            input: "$options",
                            as: "option",
                            in: {
                                text: "$$option.text",
                                votes: { $ifNull: ["$$option.votes", 0] }, // Ensure votes field exists
                                percentage: {
                                    $cond: {
                                        if: { $eq: [{ $sum: { $ifNull: ["$options.votes", 0] } }, 0] },
                                        then: 0,
                                        else: {
                                            $multiply: [
                                                { $divide: ["$$option.votes", { $sum: { $ifNull: ["$options.votes", 0] } }] },
                                                100,
                                            ],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            {
                $addFields: {
                    winningOption: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: "$options",
                                    as: "option",
                                    cond: { $eq: ["$$option.votes", { $max: "$options.votes" }] },
                                },
                            },
                            0,
                        ],
                    },
                },
            },
        ]);

        if (result.length === 0) return res.status(404).json({ error: "Poll not found" });

        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}