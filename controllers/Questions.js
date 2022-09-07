const QuestionsModel = require("../models/Questions");
const fs = require("fs");
var base64ToImage = require("base64-to-image");
const { v4: uuidv4 } = require("uuid");
// c { nanoid } from "nanoid";
const QUESTION_FIELDS = ["question", "exam_id", "explain", "question_no"];

exports.getQuestions = async (req, res, next) => {
  const questions = await QuestionsModel.find();
  res.status(200).json({ sucess: true, questions });
};

exports.createQuestions = async (req, res, next) => {
  let body = req.body;
  keys = Object.keys(body);
  console.log(keys, "This is dflka");
  for (let index = 0; index < QUESTION_FIELDS.length; index++) {
    const key = QUESTION_FIELDS[index];

    // console.log(!body[key]);
    if (!keys.includes(key) || !body[key]) {
      console.log(key);
      return res
        .status(400)
        .json({ sucess: false, body: `${key} not found, please enter it ` });
    }
  }

  //Image upload herer
  let imagePath = "";

  if (req.body.image) {
    let buff = Buffer.from(req.body.image, "base64");
    console.log(buff, "his ");
    imagePath = uuidv4();
    base64ToImage(req.body.image, `public/images/`, {
      fileName: imagePath,
      type: "png",
    });
  }
  body.image = req.body.image ? `images/${imagePath}.png` : "";

  const question = await QuestionsModel.create(body);
  res.status(200).json({ sucess: true, question });
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
