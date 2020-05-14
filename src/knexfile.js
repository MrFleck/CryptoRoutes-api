// Update with your config settings.
const env = require('./.env');
module.exports = {
  client: 'mysql',
  connection: {
    database: env.DB_DATABASE,
    user: env.DB_USER,
    password: env.DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
