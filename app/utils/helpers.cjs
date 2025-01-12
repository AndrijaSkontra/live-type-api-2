const { createHmac } = require("node:crypto");

function hashString(string) {
  const secret = process.env.HASH_SECRET;
  const hash = createHmac("sha256", secret).update(string).digest("hex");
  return hash;
}

module.exports = { hashString };
