const { buildSchema } = require('graphql');
const objectSchema = require('./objectSchema');
const userSchema = require('./userSchema');
const { mergeTypes } = require('merge-graphql-schemas');

const types = [
    objectSchema,
    userSchema
];

const merged = mergeTypes(types, { all: true });

var schema = buildSchema(`
   ${merged}
`);

module.exports = schema;