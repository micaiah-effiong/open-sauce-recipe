process.env.NODE_ENV = "mocha_test";
const { expect } = require("chai");
const app = require("../app");
const db = require("../models/index");
const { post } = require("request");
const { get } = require("request");
let server;

before((done) => {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      server = app.listen(3001, done);
    })
    .catch((err) => {
      console.log(err);
    });
});

describe("test", () => {
  var cookie;
  describe("Travis ci", () => {
    it("Test travis ci route", (done) => {
      get("http://localhost:3001/test", (error, res) => {
        expect(res.body).to.equal("ci with travis");
        done();
      });
    });
  });
  describe("Recipe app", () => {
    it("should responed with success as true", (done) => {
      post(
        "http://localhost:3001/users/auth/register",
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
    it("Login user", (done) => {
      post(
        "http://localhost:3001/users/auth/login",
        {
          json: {
            email: "test@test.com",
            password: "testing123",
          },
        },
        (error, res) => {
          cookie = res.headers["set-cookie"];
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
    it("Create a recipes", (done) => {
      post(
        "http://localhost:3001/recipes",
        {
          headers: {
            Cookie: cookie,
          },
          json: {
            name: "Fried rice and Chicken",
            description: "Simlpe fried rice",
            items: ["salt", "rice", "water"],
            instructions: "step 1, step 2, step 3",
            origin: "Nigeria",
          },
        },
        (error, res) => {
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
    it("Create a variation", (done) => {
      post(
        "http://localhost:3001/recipes/1/variations",
        {
          headers: {
            Cookie: cookie,
          },
          json: {
            name: "Fried rice and stew",
            description: "Simlpe fried rice",
            items: ["salt", "rice", "water"],
            instructions: "step 1, step 2, step 3",
            origin: "Nigeria",
          },
        },
        (error, res) => {
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
    it("Create a variation review", (done) => {
      post(
        "http://localhost:3001/reviews/variation/1",
        {
          headers: {
            Cookie: cookie,
          },
          json: {
            words: "this recipes great, thanks to open-sauce",
            rating: 1,
          },
        },
        (error, res) => {
          expect(res.body.success).to.equal(true);
          done();
        }
      );
    });
    it("Get All users", (done) => {
      get(
        "http://localhost:3001/users",
        {
          headers: {
            Cookie: cookie,
          },
        },
        (error, res) => {
          expect(JSON.parse(res.body).success).to.equal(true);
          done();
        }
      );
    });
    it("Get a single user", (done) => {
      get(
        "http://localhost:3001/users/1",
        {
          headers: {
            Cookie: cookie,
          },
        },
        (error, res) => {
          expect(JSON.parse(res.body).success).to.equal(true);
          expect(res).to.be.ok;
          done();
        }
      );
    });
    it("Get all reviews for a variation", (done) => {
      get(
        "http://localhost:3001/reviews/variation/1",
        {
          headers: {
            Cookie: cookie,
          },
        },
        (error, res) => {
          expect(JSON.parse(res.body).success).to.equal(true);
          done();
        }
      );
    });
    it("Get all reviews for a recipe", (done) => {
      get(
        "http://localhost:3001/reviews/recipe/1",
        {
          headers: {
            Cookie: cookie,
          },
        },
        (error, res) => {
          expect(JSON.parse(res.body).success).to.equal(true);
          done();
        }
      );
    });
    it("Report a forgotten password", (done) => {
      post(
        "http://localhost:3001/users/auth/forgot-password",
        {
          json: {
            email: "test@test.com",
          },
        },
        (error, res) => {
          expect(res.body.success).to.equal(true);
          expect(!!res.body.token).to.equal(true);
          done();
        }
      );
    });
    it("Confirm reset password request");
    it("Reset password");
  });
});

after((done) => {
  server.close(done);
  db.sequelize.close();
});
