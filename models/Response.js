const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    // response String,
    question_id: {
      type: mongoose.Types.ObjectId,
    },
    answer_id: {
      type: mongoose.Types.ObjectId,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
    },
    duration: {
      type: Number,
    },
    confidence: {
      type: Number,
    },
    comment: {
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

const AnswersModel = mongoose.model("response", responseSchema);

module.exports = AnswersModel;
