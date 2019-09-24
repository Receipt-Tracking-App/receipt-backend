const { Model } = require("objection");
const config = require("../../config");

Model.knex(config.db);

class ReceiptMedia extends Model {
  static get tableName() {
    return "receipt_media";
  }

  static get idColumn() {
    return "id";
  }
}

module.exports = ReceiptMedia;
