const categories = require("../data/categories");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("receipt_categories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("receipt_categories").insert(categories);
    });
};
