const { model, Schema } = require("mongoose");
const reviewSchema = require("./Review");
const issueSchema = require("./Issue");

const propertySchema = new Schema({
  address: { type: String, required: true },
  reviews: [reviewSchema],
  issues: [issueSchema],
});

module.exports = propertySchema;
