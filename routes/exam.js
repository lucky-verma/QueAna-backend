var express = require("express");
const { getExam, createExam, getExamDetails } = require("../controllers/Exam");

var router = express.Router();

// Not needed
// POST '/auth/signup'
router.get("/list", getExam);
router.get("/info/:exam_id", getExamDetails);
router.post("/create", createExam);
module.exports = router;
