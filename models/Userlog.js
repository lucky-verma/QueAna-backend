const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userLogSchema = new Schema(
  {
    // behaviour String,
    exam_id: {
      type: mongoose.Types.ObjectId,
    },
    question_id: {
      type: mongoose.Types.ObjectId,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
    },
    type: {
      type: String,
      enum: [
        "Search",
        "Click",
        "Next",
        "Back",
        "Submit",
        "Start",
        "Stop",
        "Login",
      ],
    },
    action: {
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

const UserlogModel = mongoose.model("behaviour", userLogSchema);

module.exports = UserlogModel;
