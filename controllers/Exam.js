const ExamModel = require("../models/Exams");

exports.getExam = async (req, res, next) => {
  const exam = await ExamModel.find();
  res.status(200).json({ sucess: true, exam });
};

exports.createExam = async (req, res, next) => {
  let body = req.body;

  const exam = await ExamModel.create(body);
  res.status(200).json({ sucess: true, exam });
};
