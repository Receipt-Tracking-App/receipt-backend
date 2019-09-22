
exports.up = function(knex) {
  return knex.schema.createTable("receipt_media", table => {
      table.increments().primary();
      table.string("url").notNullable();
      table.string("description").notNullable();
      table.timestamps(true, true);
      table.integer("receipt_id").unsigned();
      table.foreign("receipt_id").references("receipts.id")
  } )
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("receipt_media");
};
