import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "Определи, является ли текст сленгом или формальным. Перепиши его в противоположный стиль"
    },
    {
      role: "user",
      content: text
    }
  ]
})
    });

    const data = await response.json();

res.json({
result:
  data.choices?.[0]?.message?.content ||
  "Ошибка генерации"
});

  } catch (err) {
    console.error(err);
    res.status(500).json({ result: "Ошибка сервера" });
  }
});

app.listen(3000, () => console.log("server running"));
console.log("NEW VERSION");