var express = require("express");
const { getExam, createExam } = require("../controllers/Exam");

var router = express.Router();

// Not needed
// POST '/auth/signup'
router.get("/list", getExam);
router.post("/create", createExam);
module.exports = router;
