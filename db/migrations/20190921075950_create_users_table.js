
exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments().primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("username").unique().notNullable();
    table.string("password").notNullable();
    table.string("email").notNullable();
    table.timestamps(true, true);
    table.integer("group_id").unsigned();
    table.foreign("group_id").references("groups.id");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
