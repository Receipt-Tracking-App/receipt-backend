
exports.up = function(knex) {
  return knex.schema.createTable("groups", table => {
      table.increments().primary();
      table.string("name").notNullable().defaultTo("individual");
      table.string("notes");
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("groups")
};
