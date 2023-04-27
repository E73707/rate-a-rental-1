const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const reviewSchema = require("./Review");
const propertySchema = require("./Property");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema],
  //   reviews: [
  //     {
  //       type: Schema.Types.ObjectId,
  //       ref: "Review",
  //     },
  //   ],
  properties: [propertySchema],
  //   properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
