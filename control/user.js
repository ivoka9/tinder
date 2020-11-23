const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();

const db = require("../model");

router.post("/create", upload.none(), async (req, res) => {
  try {
    const newUser = await db.User.create({
      username: req.body.username,
      password: req.body.password,
      first: req.body.first,
      last: req.body.last,
      like: [],
      dislike: [],
    });
    newUser.save();
    res.sendStatus(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).json("internal server error");
  }
});

router.get("/", (req, res) => {
  res.json({ ok: "ok" });
});
module.exports = router;
