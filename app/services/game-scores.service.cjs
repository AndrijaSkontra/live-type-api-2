const { prisma } = require("../utils/prisma.cjs");

async function addGameScore(username, wpm) {
  const result = await prisma.gameScore.create({
    data: {
      username: username,
      wpm: wpm,
      date: new Date(),
    },
  });
}

async function getBestUserScores() {
  const gameScores = await prisma.gameScore.aggregateRaw({
    pipeline: [
      {
        $sort: { date: -1 }, // Sort by date in descending order to get the latest scores first
      },
      {
        $group: {
          _id: "$username",
          wpm: { $max: "$wpm" },
          date: { $first: "$date" }, // Get the date of the latest score
        },
      },
      {
        $sort: { maxWpm: -1 }, // Sort by max WPM in descending order
      },
      {
        $limit: 30, // Limit to top 30 users
      },
    ],
  });
  return gameScores;
}

module.exports = {
  addGameScore,
  getBestUserScores,
};
