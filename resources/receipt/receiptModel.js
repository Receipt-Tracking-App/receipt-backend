const { Model } = require("objection");
const config = require("../../config");

Model.knex(config.db);

class Receipt extends Model {
  static get tableName() {
    return "receipts";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const User = require("../user/userModel");
    const Category = require("../category/categoryModel");
    const ReceiptMedia = require("../receiptMedia/receipMediaModel");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "receipts.user_id",
          to: "users.id"
        }
      },

      categories: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: "receipts.id",
          through: {
            from: "tags.receipt_id",
            to: "tags.receipt_category_id"
          },
          to: "receipt_categories.id"
        }
      },
      media: {
        relation: Model.HasManyRelation,
        modelClass: ReceiptMedia,
        join: {
          from: "receipts.id",
          to: "receipt_media.receipt_id"
        }
      }
    };
  }
}

module.exports = Receipt;
