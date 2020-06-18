process.env.NODE_ENV = "mocha_test";
const { expect } = require("chai");
const app = require("../app");
const db = require("../models/index");
const { post } = require("request");
const { get } = require("request");
let server;

before((done) => {
  db.sequelize
    .sync({ force: false })
    .then(() => {
      server = app.listen(3001, done);
    })
    .catch((err) => {
      console.log(err);
    });
});

describe("test", () => {
  describe("get", () => {
    it("should return a string", (done) => {
      get("http://localhost:3001/test", (error, res) => {
        expect(res.body).to.equal("ci with travis");
        done();
      });
    });
  });
  describe("post", () => {
    it("should responed with success as true", (done) => {
      post(
        "http://localhost:3001/users",
        {
          json: {
            firstname: "test",
            lastname: "test",
            country: "NG",
            gender: "M",
            email: "test@test.com",
            password: "testing123",
            role: "admin",
          },
        },
        (error, res) => {
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
  });
});

after((done) => {
  server.close(done);
  db.sequelize.close();
});
