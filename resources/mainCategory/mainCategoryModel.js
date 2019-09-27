const { Model } = require("objection");
const config = require("../../config");

Model.knex(config.db);

class MainCategory extends Model {
  static get tableName() {
    return "receipt_main_categories";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const Category = require("../category/categoryModel");

    return {
      categories: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: "receipt_main_categories.id",
          to: "receipt_categories.receipt_main_category_id"
        }
      }
    };
  }
}

module.exports = MainCategory;
