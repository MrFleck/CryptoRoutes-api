const resolvers = require('./resolvers')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
    type User {
        user_id: ID!
        name: String!
        email: String!
        password: String!
        accessToken: String!
    }

    type Query{
        getUser(id: ID!): [User]!
        getUsers:[User]!
    }

    input UserInput {
            name: String!
            email: String!
            password: String!
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User
        
        login(email: String!, password: String!): User
    }


`
module.exports = makeExecutableSchema({ typeDefs, resolvers })