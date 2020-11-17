const express = require("express");
const fs = require("fs");

const router = express.Router();
const path = require("path");
const { fork } = require("child_process");

router.post("/", async (req, res) => {
  const { repositories } = req.body;
  console.log(path.join(__dirname, "../files"));

  const forked = fork(path.join(__dirname, "../helpers/findRepository"));
  forked.on("message", (msg) => {
    console.log("Message from child process:", msg);
  });
  forked.send(repositories);

  fs.writeFile(`files/${Date.now()}.json`, JSON.stringify(repositories), (err) => res.status(err ? 400 : 200).send({ isSent: !!err }));
});

module.exports = router;
