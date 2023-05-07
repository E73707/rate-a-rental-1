const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const issueSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  title: {
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
  propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  issueImage: {
    type: String,
    required: true,
  },
  landLordResponse: {
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

module.exports = model("Issue", issueSchema);
