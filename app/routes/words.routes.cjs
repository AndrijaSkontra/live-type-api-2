const express = require("express");
const { getWords } = require("../utils/get-words.cjs");

const wordsRouter = express.Router();

wordsRouter.get("/", async (req, res) => {
  const amount = req.body.amount;
  res.send({ wordText: await getWords(amount) });
});

module.exports = wordsRouter;
