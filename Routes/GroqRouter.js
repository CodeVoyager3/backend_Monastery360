const express = require("express");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,  // ✅ updated
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",  // ✅ Groq model
        messages: req.body.messages,
      }),
    });

    const data = await r.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error with Groq API:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
