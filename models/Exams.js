const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examSchema = new Schema(
  {
    // exam String,
    start_time: {
      type: Date,
    },
    end_time: {
      type: Date,
    },
    duration: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const AnswersModel = mongoose.model("exam", examSchema);

module.exports = AnswersModel;
