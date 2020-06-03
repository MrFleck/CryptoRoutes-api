const jwt = require('jsonwebtoken');
const env = require('../env-config')


const JWT_OPT = {
    issuer: 'CryptoRoutes',
    expiresIn: '7d'
}



const createToken = (user) => {
    if (!user && !user.user_id) {
        return null;
    }

    return jwt.sign({ userId: user.user_id }, env.SECRET, JWT_OPT)
}

const verifyToken = (token) => {
    return jwt.verify(token, env.SECRET, JWT_OPT)
}

const getTokenFromHeaders = (req) => {
    const token = req.headers.authorization;
    console.log('É ISSO Q ELE PEGA DO HEADER DENTRO DO GET TOKEN:', token)
    if (token) {
        const arr = token.split(' ');
        console.log('ele fazendo 2 objetos: ', arr)

        if (arr[0] === 'Bearer' && arr[1]) {
            try {
                return verifyToken(arr[1])
            } catch (error) {
                return null
            }
        }
    }

    return null
}

module.exports = {
    createToken,
    verifyToken,
    getTokenFromHeaders
}