const { errResponse } = require("../middleware/ErrorResponse");
const ExamModel = require("../models/Exams");

const EXAM_FIELDS = [
  "name",
  "start_time",
  "end_time",
  "problem_context",
  "data_summary",
  "difficulty",
  "total_questions",
];
exports.getExam = async (req, res, next) => {
  const exam = await ExamModel.find();
  return res.status(200).json({ sucess: true, exam });
};

exports.createExam = async (req, res, next) => {
  console.log(req.body);

  let body = req.body;
  keys = Object.keys(body);
  console.log(keys, "This is dflka");
  for (let index = 0; index < EXAM_FIELDS.length; index++) {
    const key = EXAM_FIELDS[index];
    // console.log(!body[key]);
    if (!keys.includes(key) || !body[key]) {
      console.log(key);
      return res
        .status(400)
        .json({ sucess: false, body: `${key} not found, please enter it ` });
    }
  }
  const question_bank = await ExamModel.create(body);

  res.status(200).json({ success: true, body: question_bank });
};
