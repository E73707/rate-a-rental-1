const mongoose = require("mongoose");

const AuthoriseQueueSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  dateOfSubmission: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const TodoSchema = new mongoose.Schema({
  authoriseQueue: [
    {
      type: AuthoriseQueueSchema,
    },
  ],
  todoList: [
    {
      type: String,
    },
  ],
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
