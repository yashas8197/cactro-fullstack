import express from "express";
import Poll from "./models/poll.model.js";
import cors from "cors";
import initializeDatabase from "./connections/db.connect.js";
const app = express();
app.use(express.json());
app.use(cors());

initializeDatabase();

const PORT = 3000;

app.post("/post", async (req, res) => {
  const { question, options } = req.body;

  try {
    const newPoll = new Poll({ question, options });
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/polls/:pollId/vote", async (req, res) => {
  const { pollId } = req.params;
  const { optionIndex } = req.body;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();
    res.status(200).json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/polls/:pollId", async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await Poll.findById(pollId);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }
    res.status(200).json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/polls", async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await Poll.find();
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }
    res.status(200).json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("server is running in PORT 3000");
});
