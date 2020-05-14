const knexfile = require('../knexfile');
const knex = require('knex')(knexfile)
module.exports = knex

// knex('tb_users').insert({
//     name: 'Felipe',
//     email: 'felipefleck@live.com',
//     password: '12345'
// }).then(data => console.log(data))


knex('tb_users').then(resultado => console.log(resultado))