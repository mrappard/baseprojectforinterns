'use strict';

const userSchema = `
    type User {
        email: String!
        password: String!
        ticketsGenerated : Int!
        _id: String!
    }

    type Query {
        getUser(email: String!): User!
    }

    type Mutation {
        signupUser(email: String!, password: String!): Boolean!
        updateUser(email: String!, password: String, ticketsGenerated: Int): Boolean!
        deleteUser(email: String!): Boolean!
    }
`;

module.exports = userSchema;