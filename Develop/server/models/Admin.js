const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
  },
  todos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Todo",
  },
});
AdminSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

AdminSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
