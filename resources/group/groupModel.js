const { Model } = require("objection");

const config = require("../../config");

Model.knex(config.db);

class Group extends Model {
  static get tableName() {
    return "groups";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const User = require("../user/userModel");

    return {
      groups: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "groups.id",
          to: "users.group_id"
        }
      }
    };
  }
}

module.exports = Group;
