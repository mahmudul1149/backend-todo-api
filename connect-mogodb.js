const { MongoClient } = require("mongodb");
require("dotenv/config");
const url = process.env.DB_CONNECTION;
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(url, mongoOptions);

module.exports = client;
