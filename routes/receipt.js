const router = require("express").Router();
const receiptController = require("../resources/receipt/receiptController");
const checkToken = require("../middleware/auth/checkToken");
const requiresLogin = require("../middleware/auth/requiresLogin");
const checkReceiptId = require("../middleware/receipt/checkReceiptId");

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
 
 */

/**
 * @swagger
 * /receipts:
 *    post:
 *      tags:
 *      - receipt
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
 *      - receipt
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
 *      - receipt
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
 *      - receipt
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
module.exports = router;
