const { gql } = require('apollo-server-express');
const { User, Book } = require('../models');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        authors: String
        description: String
        title: String
    }

    type Query {
        me: [User]
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
    }
`;

// query type: me (returns a User type)

// mutation type: login (accepts email/pw as params; returns an Auth type)
    // addUser: accepts a username, email, pw as params; returns Auth type
    // saveBook: accepts book author's array, description, title, bookId, img, and link as params; returns a User type
    // removeBook: accepts book's bookId as a param, returns a User type

module.exports = typeDefs;