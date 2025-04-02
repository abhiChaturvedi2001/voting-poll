import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { apiBaseUrl } from "@/utils/constant";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [votes, setVotes] = useState({});
  const [pollAnalysis, setPollAnalysis] = useState({});

  const handleAddOption = () => {
    setOptions((prevOptions) => [...prevOptions, ""]);
  };

  const fetchPollAnalysis = async (pollId) => {
    if (!pollId) return;

    try {
      const response = await axios.get(`${apiBaseUrl}poll-analysis/${pollId}`);
      setPollAnalysis((prevAnalysis) => ({
        ...prevAnalysis,
        [pollId]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching poll analysis:", error);
    }
  };

  useEffect(() => {
    if (polls.length > 0) {
      polls.forEach((poll) => fetchPollAnalysis(poll._id));

      const interval = setInterval(() => {
        polls.forEach((poll) => fetchPollAnalysis(poll._id));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [polls]);

  const handleChangeOption = (index, value) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleCreatePoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) return;

    try {
      const response = await axios.post(
        `${apiBaseUrl}create`,
        { question, options },
        { withCredentials: true }
      );

      setPolls((prevPolls) => [...prevPolls, response.data]);
      setQuestion("");
      setOptions(["", ""]);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating poll");
      console.error("Error creating poll:", error);
    }
  };

  const handleVote = async (pollIndex, optionText) => {
    try {
      const pollId = polls[pollIndex]?._id;
      if (!pollId) return;

      const response = await axios.post(`${apiBaseUrl}vote`, {
        pollId,
        selectedOption: optionText,
      });

      setVotes((prevVotes) => ({ ...prevVotes, [pollIndex]: optionText }));
      fetchPollAnalysis(pollId);
      toast.success(response?.data?.message);
    } catch (error) {
      console.error("Error submitting vote:", error);
      toast.error(error?.response?.data?.message || "Failed to submit vote");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Poll</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Poll</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Poll</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            placeholder="Enter poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          {options.map((option, index) => (
            <Input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleChangeOption(index, e.target.value)}
            />
          ))}
          <Button onClick={handleAddOption} className="mt-2">
            Add Option
          </Button>
          <Button onClick={handleCreatePoll} className="mt-2">
            Create Poll
          </Button>
        </DialogContent>
      </Dialog>

      <div className="mt-6">
        <ul>
          {polls.length === 0 ? (
            <h1>No polls yet. Try to create one.</h1>
          ) : (
            polls.map((poll, pollIndex) => (
              <li key={pollIndex} className="mt-2 p-2 border rounded">
                <h3 className="font-bold">{poll.question}</h3>
                <ul>
                  {poll.options?.map((option, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`poll-${pollIndex}`}
                        value={option.text}
                        checked={votes[pollIndex] === option.text}
                        onChange={() => handleVote(pollIndex, option.text)}
                      />
                      {option.text}
                    </li>
                  ))}
                </ul>
                {/* Display Poll Analysis Below Each Poll */}
                {pollAnalysis[poll._id]?.options?.length > 0 && (
                  <div className="mt-2 p-2 border rounded bg-gray-100">
                    <h4 className="font-semibold">Poll Analysis:</h4>
                    <ul>
                      {pollAnalysis[poll._id].options.map((option, i) => (
                        <li key={i}>
                          {option.text} - {option.votes} votes (
                          {option.percentage}%)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
