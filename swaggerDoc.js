const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: "Receipt Tracker API",
      version: "1.0.0",
      description: `### Description of resquests and responses API endpoints. 
      Token expiration is currenly set to 6 hours. 
      The base url is https://lambda-receipt-tracker.herokuapp.com/api
      The Try It Out API Testing is not configured and therefore it is not working.`
    },

    basePath: "/api",
    server: {
      url: "https://lambda-receipt-tracker.herokuapp.com",
      description: "Sandbox server"
    },
    tags: {
      name: "authentication"
    },
    securityDefinitions: {
      BearerAuth: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    }
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ["./routes/auth.js", "./routes/mainCategory.js", "./routes/receipt.js"]
};

const specs = swaggerJsdoc(options);

module.exports = server => {
  server.use("/api-docs", swaggerUi.serve);
  server.get("/api-docs", swaggerUi.setup(specs, { explorer: true }));
};
