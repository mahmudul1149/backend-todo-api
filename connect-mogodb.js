const { MongoClient } = require("mongodb");
require("dotenv/config");
const url =
  "mongodb+srv://imdmahmudul237:m71svKZZk0T3Ba5D@cluster0.shyrc23.mongodb.net/?retryWrites=true&w=majority";
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const client = new MongoClient(url, mongoOptions);

module.exports = client;
