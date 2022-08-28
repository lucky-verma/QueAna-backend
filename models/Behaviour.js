const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const behaviourSchema = new Schema(
  {
    // behaviour String,
    exam_id: {
      type: mongoose.Types.ObjectId,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
    },
    pre_reflection: {
      type: String,
    },
    pos_reflection: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const AnswersModel = mongoose.model("behaviour", behaviourSchema);

module.exports = AnswersModel;
