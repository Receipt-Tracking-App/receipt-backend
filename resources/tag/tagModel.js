const { Model } = require("objection");
const config = require("../../config");

Model.knex(config.db);

class Tag extends Model {
  static get tableName() {
    return "tags";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = Tag;
