const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const reviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
});

module.exports = model("Review", reviewSchema);
