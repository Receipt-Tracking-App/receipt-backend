exports.up = function(knex) {
  return knex.schema.createTable("receipt_categories", table => {
    table.increments().primary();
    table
      .string("name")
      .unique()
      .notNullable();
    table.timestamps(true, true);
    table
      .integer("receipt_main_category_id")
      .unsigned()
      .notNullable();
    table
      .foreign("receipt_main_category_id")
      .references("id")
      .inTable("receipt_main_categories");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("receipt_categories");
};
