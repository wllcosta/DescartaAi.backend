const express = require("express");
const cors = require("cors");
const app = require("./src/app");

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://descarta-ai-frontend.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Servidor DescartAI rodando em http://localhost:${port}`);
});
