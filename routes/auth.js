const router = require("express").Router();
const authController = require("../resources/auth/authController");
const validateRegistrationBody = require("../middleware/auth/validateRegistrationBody");
const validateExixtingUser = require("../middleware/auth/validateExistingUser");

/**
 * @swagger
 * definitions:
 *
 *  NewUser:
 *    type: object
 *    required:
 *    - firstName
 *    - lastName
 *    - email
 *    - username
 *    - password
 *    properties:
 *      firstName:
 *        type: string
 *        minLength: 2
 *        example: Annie
 *      lastName:
 *        type: string
 *        minLength: 2
 *        example: Le
 *      email:
 *        type: string
 *        example: ale10@email.com
 *      username:
 *        type: string
 *        minLength: 4
 *        maxLength: 6
 *        example: ale01
 *      password:
 *        type: string
 *        minLength: 4
 *        maxLength: 12
 *        example: powerbudgetting
 *  User:
 *    type: object
 *    required:
 *    - userId
 *    - password
 *    properties:
 *      userId:
 *        type: string
 *        example: ale01
 *      password:
 *        type: string
 *        example: powerbudgetting
 *
 */

/**
 * @swagger
 *
 * /auth/register:
 *    post:
 *      tags:
 *      - authentication
 *      summary: Register a new user
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: body
 *        required: true
 *        in: body
 *        description: New user object
 *        schema:
 *          $ref: "#/definitions/NewUser"
 *
 *      responses:
 *        200:
 *          description: successfully created a user
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: boolean
 *                example: false
 *              message:
 *                type: string
 *                example: User registered
 *              token:
 *                type: string
 *                example: ey124
 *
 */
router.post(
  "/register",
  [validateRegistrationBody, validateExixtingUser],
  authController.registerUser
);

/**
 * @swagger
 *
 * /auth/login:
 *    post:
 *      tags:
 *      - authentication
 *      summary: Login a user
 *      description: userId must be the user's username or the user's email
 *      consumes:
 *      - application/json
 *      produces:
 *      - application/json
 *      parameters:
 *      - name: body
 *        required: true
 *        in: body
 *        description: User object
 *        schema:
 *          $ref: "#/definitions/User"
 *      responses:
 *        200:
 *          description: successfully login a user
 *          schema:
 *            type: object
 *            properties:
 *              error:
 *                type: boolean
 *                example: false
 *              message:
 *                type: string
 *                example: User authenticated
 *              token:
 *                type: string
 *                example: ey124
 */

router.post("/login", authController.loginUser);
module.exports = router;
