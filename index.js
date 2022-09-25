const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user");
require("dotenv/config");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO__DB__CONNECTION, () => {
  console.log("Connected to MongoDB");
});

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Duplicate Email" });
  }
});

app.get("/api/login", async (req, res) => {
  console.log(req.body);
  const user = await User.findOne({
    name: req.body.name,
    email: req.body.email,
  });

  if(user) res.json({status: "ok", user: true});
  res.json({status: "error"})
});

app.listen(PORT, () =>
  console.log(`Listening on Port http://localhost:${PORT}`)
);
