var express = require("express");
const { getQuestions, createQuestions } = require("../controllers/Questions");

var router = express.Router();

// Not needed
// POST '/auth/signup'
router.get("/list", getQuestions);
router.post("/create", createQuestions);
module.exports = router;
