const { model, Schema } = require("mongoose");

const propertySchema = new Schema({
  address: { type: String, required: true },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  issues: [
    {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
});

module.exports = model("Property", propertySchema);
