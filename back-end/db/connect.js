const { connect } = require("mongoose");
const { options, dbConnectionURL, DB_PORT, DB_NAME } = require("./config");

const connectDB = () => {
  connect(dbConnectionURL, options, () => {
    console.log(`Connected to ${DB_NAME} (mongoDB) on port ${DB_PORT}...`);
  });
};

module.exports = connectDB;
