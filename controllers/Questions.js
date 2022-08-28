const QuestionsModel = require("../models/Questions");

exports.getQuestions = async (req, res, next) => {
  const question_bank = await QuestionsModel.find();
  res.status(200).json({ sucess: true, question_bank });
};

exports.createQuestions = async (req, res, next) => {
  let body = req.body;

  const question_bank = await QuestionsModel.create(body);
  res.status(200).json({ sucess: true, question_bank });
};
exports.updateImagesForQuestion = async (req, res, next) => {
  let body = req.body;
  if (body.question_id) {
    res.status(404).json({ success: false, message: "Question Id not found." });
  }
  let image = req.file;
  //Save the file

  //Update the url
  const updateQuestion = await QuestionsModel.updateOne(
    { _id: body.question_id },
    {
      //    images :
    }
  );
};
