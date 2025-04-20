const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI(apiKey);

let lastQuestion = null;

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  // If the question is the same as the last one, return early
  if (question === lastQuestion) {
    console.log("Ignoring duplicate request for the same question");
    return res.status(200).json({ message: "Request ignored - same question" });
  }

  try {
    console.log("Request sent");
    lastQuestion = question; // Update the last question
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 30,
    });

    const answer = response.choices[0].message.content.trim();
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "GPT request failed" });
  }
});

app.listen(5000, () => console.log("GPT backend running on http://localhost:5000"));
