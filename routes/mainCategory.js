const router = require("express").Router();
const mainCategoryController = require("../resources/mainCategory/mainCategoryController");
const checkToken = require("../middleware/auth/checkToken");
const requiresLogin = require("../middleware/auth/requiresLogin");

router.use(checkToken);
router.use(requiresLogin);

/**
 * @swagger
 *
 * /main-categories:
 *    get:
 *      security:
 *      - BearerAuth: []
 *      tags:
 *      - Receipt Categories
 *      summary: Retrieve all main receipt categories and their  sub-categories
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      responses:
 *          200:
 *              description: Ok
 *
 *
 */
router.get("/", mainCategoryController.getAllMainCategory);

module.exports = router;
