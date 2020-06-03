const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./src/api/schema')
const token = require('./src/Auth/Auth')
const { addMiddleware } = require('graphql-add-middleware');


addMiddleware(schema, 'Query.getUsers', async function (root, args, context, info, next) {
    const validou = token.getTokenFromHeaders(context)
    if(!validou){
        return context.res.sendStatus(401)
    }
    const result = await next();

    return result
});

addMiddleware(schema, 'Query.getUser', async function (root, args, context, info, next) {
    const validou = token.getTokenFromHeaders(context)
    if(!validou){
        return context.res.sendStatus(401)
    }
    const result = await next();

    return result
});

const app = express()
app.use('/api', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => console.log('rodando na porta 4000'))
