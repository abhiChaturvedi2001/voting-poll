import express from "express"
import { createPoll, getPollAnalysis, getPolls, votePoll, } from "../controller/votingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", createPoll);
router.get("/polls", getPolls);
router.post("/vote", votePoll);
router.get("/poll-analysis/:pollId", getPollAnalysis);

export default router