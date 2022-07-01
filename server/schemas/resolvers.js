const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id })
                .select('-__v -password')
                .populate('books');

                return userData;
            }
            throw new AuthenticationError("you're not logged in.");
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('wrong email or password.');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('wrong email or password.');
            }

            const token = signToken(user);
            return { token, user };
        },
        addBook: async (parent, { bookData }, context) => {
            if (context.user) {
                const updatedBookList = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return updatedBookList;
            }
            throw new AuthenticationError("you're not logged in.");
        },
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedBookList = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: bookId } },
                    { new: true }
                );
                return updatedBookList;
            }
            throw new AuthenticationError("you're not logged in.");
        }
    }
};

module.exports = resolvers;