const User = require("../user/userModel");
const Receipt = require("../receipt/receiptModel");
const Tag = require("../tag/tagModel");

const controller = {
  createReceipt: async (req, res) => {
    const {
      purchaseDate,
      merchant,
      amount,
      notes,
      tagName,
      tagDescription,
      categoryId,
      userId
    } = req.body;

    try {
      const user = await User.query().findById(userId);

      const receipt = await user.$relatedQuery("receipts").insert({
        purchase_date: purchaseDate,
        merchant,
        amount,
        notes: notes || ""
      });

      await Tag.query().insert({
        name: tagName || "",
        description: tagDescription || "",
        receipt_id: receipt.id,
        receipt_category_id: categoryId
      });

      res.status(201).json({
        error: false,
        message: "Receipt recorded successfully.",
        receiptId: receipt.id
      });
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ error: true, message: "Unable to record the receipt." });
    }
  },

  getAllReceipts: async (req, res) => {
    const { id } = req.params;
    try {
      const receipts = await User.query()
        .findById(id)
        .eager("receipts")
        .select("users.id");
      res.json({ error: false, receipts });
    } catch (e) {
      res
        .status(500)
        .json({ error: true, message: "Unable to retrieve the user receipt." });
    }
  },
  updateReceipt: async (req, res) => {
    const { id } = req.params; // receipt id

    const { purchaseDate, merchant, amount, notes, categoryId } = req.body;

    try {
      await Receipt.query()
        .findById(id)
        .patch({
          purchase_date: purchaseDate,
          merchant,
          amount,
          notes
        });

      const tag = await Tag.query()
        .where("receipt_id", id)
        .first();

      await Tag.query()
        .findById(tag.id)
        .patch({ receipt_category_id: categoryId });

      res.json({ error: false, message: "Receipt updated successfully." });
    } catch (e) {
      res
        .status(500)
        .json({ error: true, message: "Unable to update the receipt." });
    }
  },
  deleteReceipt: async (req, res) => {
    const { id } = req.params;
    try {
      await Receipt.query().deleteById(id);
      res.json({ error: false, message: "Receipt deleted successfully." });
    } catch (e) {
      res
        .status(500)
        .json({ error: true, message: "Unable to delete the receipt" });
    }
  }
};

module.exports = controller;
