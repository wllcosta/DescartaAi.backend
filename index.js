const express = require("express");
const cors = require("cors");
const app = require("./src/app");

const PORT = process.env.PORT || 10000;

app.use(
  cors({
    origin: "https://descarta-ai-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor DescartAI rodando na porta ${PORT}`);
});
