import { prisma } from "../utils/prisma.js";

export async function addGameScore(username, wpm) {
  const result = await prisma.gameScore.create({
    data: {
      username: username,
      wpm: wpm,
    },
  });
  console.log(result);
}

export async function getBestUserScores() {
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
  return gameScores;
}
