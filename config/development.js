const dotenv = require("dotenv");
dotenv.config();
const knex = require("knex");
const knexConfig = require("../knexfile");

const config = {
  env: "development",
  secrets: {
    jwt: "iloveLambdabuildWeek!"
  },
  db: knex(knexConfig.development),
  services: {
    cloudinary: {
      cloudName: process.env.CLOUD_NAME,
      apiKey: process.env.CLOUD_API_KEY,
      apiSecret: process.env.CLOUD_API_SECRET
    }
  }
};

module.exports = {
  config
};
