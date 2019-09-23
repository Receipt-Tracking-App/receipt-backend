exports.up = function(knex) {
  return knex.schema.createTable("tags", table => {
    table.increments().primary();
    table.string("name");
    table.string("description");
    table
      .integer("receipt_id")
      .unsigned()
      .notNullable();
    table
      .foreign("receipt_id")
      .references("id")
      .inTable("receipts");
    table
      .integer("receipt_category_id")
      .unsigned()
      .notNullable();
    table
      .foreign("receipt_category_id")
      .references("id")
      .inTable("receipt_categories");
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tags");
};
