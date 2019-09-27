
exports.up = function(knex) {
    return knex.schema.createTable("receipt_main_categories", table => {
        table.increments().primary();
        table.string("name").unique().notNullable();
        table.string("description");
        table.timestamps(true, true)

    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("receipt_main_categories")
};
