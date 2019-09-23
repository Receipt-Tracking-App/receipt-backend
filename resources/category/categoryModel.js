const { Model } = require("objection");
const config = require("../../config");

Model.knex(config.db);

class Category extends Model {
  static get tableName() {
    return "receipt_categories";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = Category;
