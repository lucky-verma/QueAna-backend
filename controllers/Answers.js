const AnswersModel = require("../models/Answers");

exports.getAnswers = async (req, res, next) => {
  const Answers = await AnswersModel.find();
  res.status(200).json({ sucess: true, Answers });
};

exports.createAnswers = async (req, res, next) => {
  let body = req.body;
  const behavoir = await AnswersModel.create(body);
  res.status(200).json({ sucess: true, behavoir });
};
