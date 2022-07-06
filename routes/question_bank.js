var express = require("express");
const { getQuestionBank, createQuestionBank } = require("../controllers/QuestionBank");

var router = express.Router();

// Not needed
// POST '/auth/signup'
router.get("/list", getQuestionBank);
router.post("/create", createQuestionBank);
module.exports = router;
