const { prisma } = require("../utils/prisma.cjs");

async function addGameScore(username, wpm) {
  const result = await prisma.gameScore.create({
    data: {
      username: username,
      wpm: wpm,
    },
  });
  console.log(result);
}

async function getBestUserScores() {
  console.log("trying to get best user scores...");
  const gameScores = await prisma.gameScore.aggregateRaw({
    pipeline: [
      {
        $group: {
          _id: "$username",
          maxWpm: { $max: "$wpm" },
        },
      },
      {
        $sort: { maxWpm: -1 },
      },
      {
        $limit: 30,
      },
    ],
  });
  console.log(gameScores);
  return gameScores;
}

module.exports = {
  addGameScore,
  getBestUserScores,
};
