const Receipt = require("../../resources/receipt/receiptModel");

const checkReceiveId = async (req, res, next) => {
  const { id } = req.params;

  if (id) {
    const receipt = await Receipt.query().findById(id);
    if (receipt) {
      next();
    } else {
      res
        .status(400)
        .json({ error: true, message: "The receipt does not exist." });
    }
  } else {
    res.status(500).json({ error: true, message: "Missing receipt id." });
  }
};

module.exports = checkReceiveId;
