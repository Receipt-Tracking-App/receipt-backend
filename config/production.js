const knex = require("knex");
const knexConfig = require("../knexfile");

const config = {
  env: "production",
  port: process.env.PORT,
  seedPassword: process.env.SEED_PASSWORD,
  db: knex(knexConfig.production),
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
