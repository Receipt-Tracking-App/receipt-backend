const { Model } = require("objection");

const config = require("../../config");

Model.knex(config.db);

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const Receipt = require("../receipt/receiptModel");

    return {
      receipts: {
        relation: Model.HasManyRelation,
        modelClass: Receipt,
        join: {
          from: "users.id",
          to: "receipts.user_id"
        }
      }
    };
  }
}

module.exports = User;
