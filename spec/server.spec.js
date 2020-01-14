process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const server = require("../server");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/topics", () => {
    it("GET:200 /api/topics responds with status 200", () => {
      return request(server)
        .get("/api/topics")
        .expect(200);
    });
    it("GET:200 /api/topics responds with all topics in an array with with the correct keys", () => {
      return request(server)
        .get("/api/topics")
        .expect(200)
        .then(response => {
          const topics = response.body.topics;
          expect(topics).be.be.an("array");
          expect(topics[0]).to.have.keys(["slug", "description"]);
        });
    });
  });
  describe("/users/:username", () => {
    it("GET:200 /api/users/:username responds with status 200", () => {
      return request(server)
        .get("/api/users/:jonny")
        .expect(200);
    });
  });
});

// describe("errors", () => {
//   it("GET:404 /api/topics responds with an error message when no topics exist", () => {
//     return request(server)
//       .get("/api/topics")
//       .expect(404)
//       .then(response => {
//         const msg = response.body.msg;
//         expect(msg).to.equal("No Topics!");
//       });
//   });
// });
