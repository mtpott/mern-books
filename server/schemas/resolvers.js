const { User, Book } = require("../models");

const resolvers = {
    Query: {
        // me: async (parent, args) => {
        //     return User.find();
        // },
        users: async() => {
            return User.find();
        } 
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            return user;
        }
    }
};

module.exports = resolvers;