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
      console.log(db.sequelize.options);
      console.log(process.env.NODE_ENV);
      server = app.listen(3001, done);
    })
    .catch((err) => {
      console.log(err);
    });
});

describe("test", () => {
  describe("get", () => {
    const body = {};
    before((done) => {
      get("http://localhost:3001/test", (error, res) => {
        body.response = res.body;
        done();
      });
    });
    it("should return a string", () => {
      expect(body.response).to.equal("ci with travis");
    });
  });
  describe("post", () => {
    const body = {};
    before((done) => {
      post(
        "http://localhost:3001/users",
        {
          json: {
            firstname: "Micaiah",
            lastname: "Effiong",
            country: "NG",
            gender: "M",
            email: "micaiah.effiong@gmail.com",
            password: "nnnnnnnn",
            role: "admin",
          },
        },
        (error, res) => {
          body.response = res.body;
          done();
        }
      );
    });
    it("should return an object", () => {
      console.log(typeof body.response, body.response);
      expect(body.response.success).to.equal(true);
    });
  });
});

after((done) => {
  server.close(done);
  db.sequelize.close();
});
