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
  describe("get", () => {
    it("should return a string", (done) => {
      get("http://localhost:3001/test", (error, res) => {
        expect(res.body).to.equal("ci with travis");
        done();
      });
    });
  });
  describe("Regester user", () => {
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
  });
  describe("Login user", () => {
    it("should responed with success as true", (done) => {
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
  });
  describe("Create a recipes", () => {
    it("should responed with success as true", (done) => {
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
  });
  describe("Create a variation", () => {
    it("should responed with success as true", (done) => {
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
  });
  describe("Create a review", () => {
    it("should responed with success as true", (done) => {
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
  });
  describe("Get All users", () => {
    it("should responed with success as true", (done) => {
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
  });
  describe("Get a single user", () => {
    it("should responed with success as true", (done) => {
      get(
        "http://localhost:3001/users/1",
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
  });
});

after((done) => {
  server.close(done);
  db.sequelize.close();
});
