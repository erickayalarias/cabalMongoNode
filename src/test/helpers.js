const app = require("../server");
const supertest = require("supertest");
const api = supertest(app);
const { connectDatabase, connection } = require("../db/connection.js");

beforeAll(async () => {
  await connectDatabase();
});

afterAll(async () => {
  await connection.close();
});

module.exports = {
  api,
  connectDatabase,
  connection,
};
