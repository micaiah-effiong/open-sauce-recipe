const { expect } = require("chai");
const app = require("../app");
const db = require("../models/index");
const post = require("request");
const get = require("request");
let server;

before((done) => {
  db.sequelize
    .sync({ force: false })
    .then(() => {
      server = app.listen(3000, done);
    })
    .catch((err) => {
      console.log(err);
    });
});

describe("test", () => {
  const body = {};
  before((done) => {
    get("http://localhost:3000/test", (errorr, res) => {
      body.response = res.body;
      done();
    });
  });
  it("should return a string", () => {
    expect(body.response).to.equal("ci with travis");
  });
});

after((done) => {
  server.close(done);
  db.sequelize.close();
});
