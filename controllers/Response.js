const ResposeModel = require("../models/Respose");

exports.getRespose = async (req, res, next) => {
  const response = await ResposeModel.find();
  res.status(200).json({ sucess: true, response });
};

exports.createRespose = async (req, res, next) => {
  let body = req.body;

  const response = await ResposeModel.create(body);
  res.status(200).json({ sucess: true, response });
};
