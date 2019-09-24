const router = require("express").Router();
const receiptController = require("../resources/receipt/receiptController");
const checkToken = require("../middleware/auth/checkToken");
const requiresLogin = require("../middleware/auth/requiresLogin");
const checkReceiptId = require("../middleware/receipt/checkReceiptId");
const upload = require("../middleware/receipt/uploadImage");

router.use(checkToken);
router.use(requiresLogin);

/**
 * @swagger
 * definitions:
 *  NewReceipt:
 *      type: object
 *      required:
 *      - purchaseDate
 *      - merchant
 *      - amount
 *      - categoryId
 *      properties:
 *          purchaseDate:
 *              type: string
 *              example: 2019-09-24
 *          merchant:
 *              type: string
 *              example: Walmart
 *          amount:
 *              type: string
 *              example: 23.65
 *          notes:
 *              type: string
 *              example: School supplies
 *          tagName:
 *              type: string
 *              example: September's budget
 *          tagDescription:
 *              type: string
 *              example: Managing budget
 *          categoryId:
 *              type: string
 *              example: 8
 *
 *  Receipt:
 *      type: object
 *      required:
 *      - purchaseDate
 *      - merchant
 *      - amount
 *      - categoryId
 *      properties:
 *          purchaseDate:
 *              type: string
 *              example: 2019-09-24
 *          merchant:
 *              type: string
 *              example: Target
 *          amount:
 *              type: string
 *              example: 52.00
 *          notes:
 *              type: string
 *              example: School supplies
 *          tagName:
 *              type: string
 *              example: September's budget
 *          tagDescription:
 *              type: string
 *              example: Managing budget
 *          categoryId:
 *              type: string
 *              example: 8
 *
 *  UploadResponse:
 *    type: object
 *    properties:
 *      error:
 *        type: boolean
 *        example: false
 *      message:
 *        type: string
 *        example: The receipt image recorded successfully.
 *      url:
 *        type: string
 *        example: http://res.cloudinary.com/df4klfgo3l/image/upload/v1569334612/receipts/y8lwcnlq9abcbontyi0z.jpg
 *
 */

/**
 * @swagger
 * /receipts:
 *    post:
 *      tags:
 *      - Receipt Handling
 *      summary: Record a new receipt
 *      description: notes, tagName, tagDescription are optional
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: body
 *        required: true
 *        in: body
 *        description: New receipt object
 *        schema:
 *          $ref: "#/definitions/NewReceipt"
 *
 *
 */
router.post("/", receiptController.createReceipt);

/**
 * @swagger
 * /receipts/{id}:
 *    put:
 *      tags:
 *      - Receipt Handling
 *      summary: Update a receipt
 *      description: notes, tagName, tagDescription are optional
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: receipt id
 *      - name: body
 *        required: true
 *        in: body
 *        description: Receipt object
 *        schema:
 *          $ref: "#/definitions/NewReceipt"
 *
 *
 */
router.put("/:id", checkReceiptId, receiptController.updateReceipt);
/**
 * @swagger
 * /receipts/{id}:
 *    delete:
 *      tags:
 *      - Receipt Handling
 *      summary: Delete a receipt
 *
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: receipt id
 *
 *
 */
router.delete("/:id", checkReceiptId, receiptController.deleteReceipt);
/**
 * @swagger
 * /receipts/users/{id}:
 *    get:
 *      tags:
 *      - Receipt Handling
 *      summary: Get all receipts via a user's id
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: user id
 *
 *
 *
 */
router.get("/users/:id", receiptController.getAllReceipts);
/**
 * @swagger
 * /receipts/{id}/upload:
 *    post:
 *      tags:
 *      - Receipt Handling
 *      summary: Upload a receipt image
 *      description: the file upload form must be in "multipart/form-data" and the name of the image input must be "receipt"
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: receipt id
 *      responses:
 *        200:
 *          description: Ok
 *          schema:
 *            $ref: "#/definitions/UploadResponse"
 *
 *
 *
 */
router.post(
  "/:id/upload",
  checkReceiptId,
  upload.single("receipt"),
  receiptController.processReceiptImage
);
module.exports = router;
