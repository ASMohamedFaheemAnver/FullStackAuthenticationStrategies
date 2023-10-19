const dotenv = require("dotenv");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

// Read .env
dotenv.config();

// Allow json body
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers?.["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }
  try {
    const payload = jwt.verify(token, process.env?.ACCESS_TOKEN_SECRET);
    console.log({ payload });
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

const posts = [
  {
    username: "udev",
    title: "post1",
  },
  { username: "naf", title: "post2" },
];

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts?.filter((post) => post.username === req?.user?.username));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log({ msg: `SERVER IS RUNNING ON PORT : ${PORT}` });
});
