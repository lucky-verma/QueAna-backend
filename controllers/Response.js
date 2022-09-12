const ResponseModel = require("../models/Response");
const RESPONSE_FIELD = [
  "exam_id",
  "question_id",
  "answer_id",
  "user_id",
  "confidence",
  "comment",
];
const { fetchUserIdFromToken } = require("../middleware/auth_validate");

exports.getRespose = async (req, res, next) => {
  const response = await ResposeModel.find();
  res.status(200).json({ sucess: true, response });
};

exports.createRespose = async (req, res, next) => {
  const userId = await fetchUserIdFromToken(
    req.headers.authorization.split(" ")[1]
  );

  console.log(userId, "Du");
  let body = req.body;
  body.user_id = userId;

  console.log(body, "Body");
  keys = Object.keys(body);
  for (let index = 0; index < RESPONSE_FIELD.length; index++) {
    const key = RESPONSE_FIELD[index];

    // console.log(!body[key]);
    if (!keys.includes(key) || !body[key]) {
      console.log(key);
      return res
        .status(400)
        .json({ sucess: false, body: `${key} not found, please enter it ` });
    }
  }

  //Check if response already donefor that question

  const responseCheck = await ResponseModel.findOne({
    user_id: userId,
    question_id: body.question_id,
  });

  if (!(responseCheck == null)) {
    return res.status(400).json({
      success: false,
      body: "Already submitted response for this question",
    });
  }

  const response = await ResponseModel.create(body);
  res.status(200).json({ sucess: true, response });
};
