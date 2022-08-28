const BehaviourModel = require("../models/Behaviour");

exports.getBehaviour = async (req, res, next) => {
  const Behaviour = await BehaviourModel.find();
  res.status(200).json({ sucess: true, Behaviour });
};

exports.createBehaviour = async (req, res, next) => {
  let body = req.body;
  const behavoir = await BehaviourModel.create(body);
  res.status(200).json({ sucess: true, behavoir });
};
