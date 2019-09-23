const MainCategory = require("../mainCategory/mainCategoryModel");

const controller = {
  getAllMainCategory: async (req, res) => {
    try {
      const mainCategories = await MainCategory.query()
        .eager("categories")
        .select("receipt_main_categories.id", "receipt_main_categories.name");

      res.json({ error: false, mainCategories });
    } catch (e) {
      res
        .status(500)
        .json({ error: true, message: "Unable to retrieve categories" });
    }
  }
};

module.exports = controller;
