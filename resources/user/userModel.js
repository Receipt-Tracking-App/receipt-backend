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
}

module.exports = User;
