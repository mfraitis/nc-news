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
        .get("/api/users/icellusedkars")
        .expect(200);
    });
    it("GET:200 /api/users/:username responds with data in an object ", () => {
      return request(server)
        .get("/api/users/icellusedkars")
        .then(response => {
          const user = response.body.user;
          expect(user.username).to.equal("icellusedkars");
          expect(user).be.be.an("object");
        });
    });
    it("GET:200 /api/users/:username responds with data with correct keys", () => {
      return request(server)
        .get("/api/users/icellusedkars")
        .then(response => {
          const user = response.body.user;
          expect(user).to.have.keys(["username", "name", "avatar_url"]);
        });
    });
    describe("/errors", () => {
      it("GET:404 /api/users/:username responds with an error message when passed a username that does not exist", () => {
        return request(server)
          .get("/api/users/none")
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("User Does Not Exist!");
          });
      });
    });
  });
  describe("/articles/:article_id", () => {
    it("GET:200 /api/articles/:article_id responds with status 200", () => {
      return request(server)
        .get("/api/articles/1")
        .expect(200);
    });
    it("GET:200 /api/articles/:article_id responds with article in an object", () => {
      return request(server)
        .get("/api/articles/1")
        .then(response => {
          const article = response.body.article;
          expect(article.article_id).to.equal(1);
          expect(article).to.be.an("object");
        });
    });
    it("GET:200 /api/articles/:article_id responds with article with correct keys", () => {
      return request(server)
        .get("/api/articles/1")
        .then(response => {
          const article = response.body.article;
          expect(article).to.have.keys([
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          ]);
        });
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
