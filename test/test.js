const { expect } = require("chai");
const app = require("../app");
const post = require("request");
const get = require("request");
let server;

before((done) => {
  server = app.listen(3000, done);
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
});
