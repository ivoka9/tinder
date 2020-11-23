const express = require("express");
const multer = require("multer");
const { reset } = require("nodemon");
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
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.get("/all", async (req, res) => {
  try {
    const allUsers = await db.User.find({});
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.post("/login", upload.none(), async (req, res) => {
  try {
    const user = await db.User.findOne({ username: req.body.username });

    if (user && user.password === req.body.password) {
      req.session.user = user;
      res.status(200).json(user);
    } else {
      res.status(401).json("Wrong Username or Password");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json("Logout Succesfull");
});

router.delete("/delete/:id", async (req, res) => {
  try {
    await db.User.findByIdAndDelete(req.params.id);
    res.status(200).json("user was deleted");
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.put("/edit/:id", upload.none(), async (req, res) => {
  try {
    const user = await db.User.findById(req.params.id);
    console.log(user.first);
    console.log(req.body.first);
    const oldUser = await db.User.findByIdAndUpdate(req.params.id, {
      first: req.body.first || user.first,
      last: req.body.last || user.last,
      username: req.body.username || user.username,
      password: req.body.password || user.password,
    });
    res.status(200).json("User was updated");
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const user = await db.User.findById(req.params.id);
    if (user === null) {
      res.status(200).json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

module.exports = router;
