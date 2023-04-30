const { Schema, model } = require("mongoose");
const userSchema = require("./User");
const propertySchema = require("./Property");
const dateFormat = require("../utils/dateFormat");

const issueSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  reportedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  status: {
    type: String,
    enum: ["open", "in_progress", "resolved"],
    default: "open",
  },
  issueImg: {
    type: String,
  },
  landLordResponse: {
    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
    },
    images: [String],
    message: String,
  },
});

issueSchema.pre("save", function (next) {
  if (this.landLordResponse && !this.landLordResponse.status) {
    this.landLordResponse.status = this.status;
  }
  next();
});

module.exports = issueSchema;
