const { merge } = require("lodash");
const env = process.NODE_ENV || "development";

const baseConfig = {
  env,
  port: 4000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: "1h"
  }
};

let envConfig = {};

switch (env) {
  case "development":
    envConfig = require("./development").config;
    break;
  case "testing":
    envConfig = require("./test").config;
    break;
  case "production":
    envConfig = require("./production").config;
    break;
  default:
    envConfig = require("./development").config;
}

module.exports = merge(baseConfig, envConfig);
