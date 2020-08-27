
exports.up = function(knex) {
  return knex.schema.createTable('users',tbl => {
      tbl.increments('id')
      tbl.string('username')
        .notNullable()
        .unique()
      tbl.string('password')
        .notNullable()
  })
  .createTable('recommendations', tbl => {
      tbl.increments('id')
      tbl.integer('userid')
      tbl.string('name')
  })
};

exports.down = function(knex) {
  return knex.schema
    // .dropTableIfExists('users')
    .dropTableIfExists('recommendations')
};


