const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hola, estoy en /About/");
});

router.get("/federico", (req, res) => {
  res.send("Federico");
});

router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

module.exports = router;
