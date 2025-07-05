const { Sequelize } = require("sequelize");
require("dotenv/config");

const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? process.env.DB_NAME
    : process.env.PGDATABASE,
  process.env.NODE_ENV === "development"
    ? process.env.DB_USER
    : process.env.PGUSER, 
  process.env.NODE_ENV === "development"
    ? process.env.DB_PASSWORD
    : process.env.PGPASSWORD, 
  {
    host:
      process.env.NODE_ENV === "development"
        ? process.env.DB_HOST
        : process.env.PGHOST,
    port: process.env.DB_PORT || 5432, 
    dialect: process.env.DB_DIALECT,
    logging:
      process.env.NODE_ENV !== "production"
        ? (...msg) => console.log(msg)
        : false,
    dialectOptions: {
      requestTimeout: 30000, 
      encrypt: true,
    },
  }
);

module.exports = sequelize;
