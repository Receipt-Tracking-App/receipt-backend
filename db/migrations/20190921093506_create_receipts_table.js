
exports.up = function(knex) {
  return knex.schema.createTable("receipts", table => {
      table.increments().primary();
      table.date("purchase_date").notNullable();
      table.string("merchant").notNullable();
      table.decimal("amount").notNullable().defaultTo(0);
      table.string("notes");
      table.timestamps(true, true);
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("users.id")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("receipts");
};
