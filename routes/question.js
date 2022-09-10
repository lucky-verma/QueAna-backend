var express = require("express");
const {
  getQuestions,
  createQuestions,
  getQuestionById,
} = require("../controllers/Questions");

var router = express.Router();

// Not needed
// POST '/auth/signup'
router.get("/list", getQuestions);
router.post("/create", createQuestions);
router.get("/question", getQuestionById);
module.exports = router;
