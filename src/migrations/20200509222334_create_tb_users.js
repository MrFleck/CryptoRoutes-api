
exports.up = function(knex) {
  return knex.schema.createTable('tb_users', table => {
      table.increments('user_id').primary()
      table.string('name', 80).notNullable()
      table.string('email', 80).notNullable().unique()
      table.string('password', 90).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tb_users')
};
