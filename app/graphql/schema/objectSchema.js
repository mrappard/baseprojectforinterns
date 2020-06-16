'use strict';

const objectSchema = `
    type Object {
        parameterA: String!
        parameterB: String!
        parameterC: String!
        _id: String!
    }

    input objInput {
        id: Int!
        parameterA: String!
        parameterB: String!
        parameterC: String!
    }

    input updateObjectInput {
        id: Int!
        parameterA: String
        parameterB: String
        parameterC: String
        _rev: String!
    }

    type Query {
        getObject(id: Int!): Object!
    }

    type Mutation {
        createObject(object: objInput!): Boolean!
        updateObject(object: updateObjectInput!): Boolean!
        deleteObject(id: Int!, _rev: String!): Boolean!
    }
`;

module.exports = objectSchema;