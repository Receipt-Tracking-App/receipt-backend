const mainCategories = require("../data/main-categories");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("receipt_main_categories")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("receipt_main_categories").insert(mainCategories);
    });
};
