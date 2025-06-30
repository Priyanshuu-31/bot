// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";
import 'dotenv/config';

const app = express();
const PORT = 3000;

// 🔐 Use your real key
const genAI = new GoogleGenAI({
  apiKey: process.env.API_KEY,
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // Serve frontend

// ✅ Main API Route
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ error: "Gemini failed." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
