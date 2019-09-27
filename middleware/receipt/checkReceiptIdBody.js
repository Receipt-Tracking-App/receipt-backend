const Receipt = require("../../resources/receipt/receiptModel");
const multer = require("multer");

const upload = multer();

const checkReceiptIdBody = async (req, res, next) => {
  const { receiptId } = req.body;

  console.log(req.body);

  if (receiptId) {
    const receipt = Receipt.query().findById(receiptId);

    if (receipt) {
      next();
    } else {
      res.status(400).json({
        error: true,
        message: "No receipt found with the receipt id."
      });
    }
  } else {
    res.status(400).json({
      error: true,
      message: "Receipt id is not found in the request."
    });
  }
};

module.exports = checkReceiptIdBody;
