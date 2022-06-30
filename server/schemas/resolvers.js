// const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // me: async (parent, args, context) => {
        //     if (context.user) {
        //         const userData = await User.findOne({});

        //         return userData;
        //     }
        //     throw new AuthenticationError("you're not logged in.");
        // },
        users: async() => {
            return User.find();
        } 
    },

    Mutation: {
        //LOGIN_USER
        //ADD_USER
        //SAVE_BOOK
        //REMOVE_BOOK
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
        }
    }
};

module.exports = resolvers;