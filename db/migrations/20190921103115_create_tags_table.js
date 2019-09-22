
exports.up = function(knex) {
  return knex.schema.createTable("tags", table => {
      table.increments().primary();
      table.string("name");
      table.string("description");
      table.integer("receipt_id").unsigned();
      table.foreign("receipt_id").references("receipts.id");
      table.integer("receipt_category_id").unsigned();
      table.foreign("receipt_category_id").references("receipt_categories.id");
      table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("tags");
};
