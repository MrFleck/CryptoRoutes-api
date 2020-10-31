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
    type Crypto {
        id: String!
        currency: String!
        symbol: String!
        name: String!
        logo_url: String!
        status: String!
        price: String!
        price_date: String!
        price_timestamp: String!
        circulating_supply: String!
        max_supply: String!
        market_cap: String!
        num_exchanges: String!
        num_pairs: String!
        first_candle: String!
        first_trade: String!
        first_order_book: String!
        rank: String!
        rank_delta: String!
        high: String!
        high_timestamp: String!
    }

    type Query{
        getUser(id: ID!): [User]!
        getUsers:[User]!
        getAllCryptos:[Crypto]!
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