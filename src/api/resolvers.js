const db = require('../config/db')

module.exports = {
    Query: {
        async getUser(_, { user_id }) {
            return await db('tb_users').where({ user_id: user_id })
        },

        async getUsers() {
            return await db('tb_users')
        }
    },

    Mutation: {
        async createUser(_, { name, email, password }) {
            const result = await db('tb_users').insert({
                name: name,
                email: email,
                password: password
            })

            const id = result[0]
            return await db('tb_users').where({ user_id : id }).first()
        }
    }
}