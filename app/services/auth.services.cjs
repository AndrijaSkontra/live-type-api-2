const { hashString } = require("../utils/helpers.cjs");
const { prisma } = require("../utils/prisma.cjs");

async function checkCredentials(email, password) {
  const hashedPassword = hashString(password);
  const userCredentials = await prisma.userCredentials.findFirst({
    where: {
      email: email,
      password: hashedPassword,
    },
  });
  if (!userCredentials) {
    return false;
  }
  return true;
}

async function createUser(email, password) {
  const hashedPassword = hashString(password);
  const user = await prisma.userCredentials.findFirst({
    where: {
      email: email,
    },
  });
  if (!user) {
    return await prisma.userCredentials.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });
  } else {
    return false;
  }
}

module.exports = { checkCredentials, createUser };
