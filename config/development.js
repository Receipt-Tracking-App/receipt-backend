const knex = require("knex");
const knexConfig = require("../knexfile");

const config = {
  env: "development",
  secrets: {
    jwt: "iloveLambdabuildWeek!"
  },
  db: knex(knexConfig.development)
};

module.exports = {
  config
};
