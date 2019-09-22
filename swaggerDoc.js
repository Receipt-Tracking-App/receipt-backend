const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: "Receipt Tracker API",
      version: "1.0.0",
      description: "Description of resquests and responses API endpoints"
    },
    basePath: "https://lambda-receipt-tracker.herokuapp.com/api",
    tags: {
      name: "authentication"
    }
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ["./routes/auth.js"]
};

const specs = swaggerJsdoc(options);

module.exports = server => {
  server.use("/api-docs", swaggerUi.serve);
  server.get("/api-docs", swaggerUi.setup(specs, { explorer: true }));
};
