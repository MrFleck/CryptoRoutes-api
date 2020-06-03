const db = require('../config/db')
const bcrypt = require('bcrypt')
const token = require('../Auth/Auth')
const env = require('../env-config')

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

            const saltRounds = 10;

            console.log('chamado bcrypt')
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            console.log('hash: ', hash)
            console.log('chamando o if do password')
            if (hash) {
                const result = await db('tb_users').insert({
                    name: name,
                    email: email,
                    password: hash
                })
                const id = result[0]
                console.log('USUÁRIO',id)
                const resultado = await db('tb_users').where({ user_id: id }).first();
                console.log('RESULTADO',resultado)
                const user = resultado
                user.accessToken = token.createToken(user);
                console.log('MOSTRANDO USER QUANDO CHAMA A MUTATION DE CADASTRO: ', user)

                // const accessToken = token({ userId: user.user_id }, env.SECRET, { expiresIn: '15min' })
                
                return user

            } else {
                return null
            }
        },

        async login(_, { email, password }) {
            const result = await db('tb_users').where({ email: email })
            const user = result[0]
            if (!user) {
                return null
            }
            const valid = bcrypt.compareSync(password, user.password)
            if (valid == false) {
                return null
            }

            user.accessToken = token.createToken(user);

            return user
        }
    }
}