const { User, Property, Review, Admin, Todo } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const { v4: uuidv4 } = require("uuid");

const resolvers = {
  Review: {
    id: (parent) => parent._id.toString(),
  },
  Query: {
    getCurrentAdmin: async (parent, args, context) => {
      if (context.admin) {
        return Admin.findOne({ _id: context.admin._id });
      }
      throw new AuthenticationError("Please log in as an admin!");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please log in!");
    },
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    property: async (_, { address }) => {
      const property = await Property.findOne({ address }).populate({
        path: "reviews",
        populate: { path: "author" },
      });
      console.log("Fetched property:", property);
      return property;
    },
    review: async (parent, { reviewId }) => {
      return Review.findOne({ _id: reviewId });
    },
  },
  Mutation: {
    addAdmin: async (parent, { username, email, password }) => {
      const admin = await Admin.create({ username, email, password });
      const token = signToken(admin);
      return { token, admin };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        const admin = await Admin.findOne({ email });
        if (!admin) {
          throw new AuthenticationError(
            "No user found with this email address"
          );
        }

        const correctPw = await admin.isCorrectPassword(password);
        if (!correctPw) {
          throw new AuthenticationError("Incorrect password");
        }

        const token = signToken({
          _id: admin._id,
          email: admin.email,
          role: "admin",
        });
        console.log("admin token", token);
        return { token, admin };
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password");
      }

      const token = signToken({
        _id: user._id,
        email: user.email,
        role: "user",
      });
      console.log("user token", token);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addProperty: async (_, { address }) => {
      const property = await Property.create({ address });
      console.log("created property", property);
      return property;
    },
    addReview: async (
      parent,
      { rating, reviewDescription, propertyId, title },
      context
    ) => {
      if (context.user) {
        const newReview = await Review.create({
          rating,
          title,
          reviewDescription,
          author: context.user._id,
          propertyId: propertyId,
        });

        await Property.findByIdAndUpdate(propertyId, {
          $addToSet: { reviews: newReview._id },
        });

        // Populate author information
        const populatedReview = await Review.findById(newReview._id).populate(
          "author"
        );

        // Convert ObjectId to string before returning the data
        return {
          ...populatedReview._doc,
          id: populatedReview._id.toString(),
          propertyId: populatedReview.propertyId.toString(),
          author: {
            ...populatedReview.author._doc,
            id: populatedReview.author._id.toString(),
          },
        };
      }
      throw new AuthenticationError("You need to be logged in to add a review");
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (!context.user) {
        throw new Error("you must be logged in to perform this action");
      }

      const review = await Review.findById(reviewId);

      if (!review) {
        throw new Error("Review not found.");
      }

      // Update the related Property document to remove the review
      await Property.findByIdAndUpdate(review.propertyId, {
        $pull: { reviews: review._id },
      });

      // Delete the review
      await Review.findByIdAndDelete(reviewId);

      // Convert the ObjectId to a string before returning it
      return {
        ...review.toObject(),
        id: review._id.toString(),
      };
    },

    editReview: async (
      parent,
      { reviewId, rating, title, reviewDescription },
      context
    ) => {
      // Check if user is logged in
      if (!context.user) {
        throw new Error("You must be logged in to perform this action.");
      }

      // Find the review and update it
      const review = await Review.findByIdAndUpdate(
        reviewId,
        { rating, title, reviewDescription },
        { new: true, omitUndefined: true }
      );

      if (!review) {
        throw new Error("Review not found.");
      }

      return review;
    },
    addAuthoriseQueue: async (
      parent,
      { fullName, email, phone, file, userId, propertyId },
      context
    ) => {
      try {
        let todo = await Todo.findOne({});
        if (!todo) {
          todo = new Todo({
            authoriseQueue: [],
          });
          await todo.save();
        }
        const newAuthoriseQueue = {
          id: uuidv4(),
          fullName,
          email,
          phone,
          file,
          userId,
          propertyId,
          dateOfSubmission: new Date(),
        };
        todo.authoriseQueue.push(newAuthoriseQueue);
        const updatedTodo = await todo.save();
        return newAuthoriseQueue;
      } catch (err) {
        console.log(err);
        throw new Error("Something went wrong");
      }
    },
  },
};

module.exports = resolvers;
