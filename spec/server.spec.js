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
          expect(topics[0]).to.have.keys("slug", "description");
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
          expect(user).to.have.keys("username", "name", "avatar_url");
        });
    });
    describe("/errors", () => {
      it("GET:404 /api/users/:username responds with an error message when passed a username that does not exist", () => {
        return request(server)
          .get("/api/users/none")
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("user does not exist!");
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
          expect(article).to.have.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at",
            "comment_count"
          );
        });
    });
    it("GET:200 /api/articles/:article_id responds with comment_count as INT", () => {
      return request(server)
        .get("/api/articles/1")
        .then(response => {
          const article = response.body.article;
          expect(article.comment_count).to.equal(13);
        });
    });
    it("PATCH:200 /api/articles/:article_id responds with article with votes updated", () => {
      return request(server)
        .patch("/api/articles/1")
        .expect(200)
        .send({ inc_votes: 1 })
        .then(response => {
          const article = response.body.article;
          expect(article.votes).to.equal(101);
        });
    });
    describe("/errors", () => {
      it("GET:404 /api/articles/:article_id responds with an error message when passed a none existent article_id", () => {
        return request(server)
          .get("/api/articles/9000")
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("article does not exist!");
          });
      });
      it("GET:400 /api/articles/:article_id responds with an error message when passed invalid data type for article_id", () => {
        return request(server)
          .get("/api/articles/none")
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("invalid data type");
          });
      });
      it("PATCH:400 /api/articles/:article_id responds with status 400 when not provided a body", () => {
        return request(server)
          .patch("/api/articles/1")
          .expect(400)
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("invalid body provided");
          });
      });
      it("PATCH:404 /api/articles/:article_id responds with status 404 when provided an id that does not exist", () => {
        return request(server)
          .patch("/api/articles/1000")
          .expect(404)
          .send({ inc_votes: 1 })
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("article does not exist");
          });
      });
      it("PATCH:400 /api/articles/:article_id responds with status 400 when provided invalid data", () => {
        return request(server)
          .patch("/api/articles/1")
          .expect(400)
          .send({ inc_votes: "cat" })
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("invalid data type");
          });
      });
      it("PATCH:400 /api/articles/:article_id responds with error message when passed another property", () => {
        return request(server)
          .patch("/api/articles/1")
          .expect(400)
          .send({ inc_votes: "1", name: "Mitch" })
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("invalid body provided");
          });
      });
    });
  });
  describe.only("/articles/:article_id/comments", () => {
    it("GET: 201 /api/articles/:article:id/comments responds with status 201 and new comment posted to existing username", () => {
      return request(server)
        .post("/api/articles/1/comments")
        .send({ username: "icellusedkars", body: "new comment" })
        .expect(201)
        .then(response => {
          const comment = response.body;
          expect(comment).to.eql({ comment: "new comment" });
        });
    });
    it("GET: 201 /api/articles/:article:id/comments responds with comment in an object with key comment", () => {
      return request(server)
        .post("/api/articles/1/comments")
        .send({ username: "icellusedkars", body: "new comment" })
        .expect(201)
        .then(response => {
          const comment = response.body;
          expect(comment).to.be.an("object");
          expect(comment).to.have.keys("comment");
        });
    });
    describe("/errors", () => {
      it("GET: 400 /api/articles/:article:id/comments responds with error message if username does not exist", () => {
        return request(server)
          .post("/api/articles/1/comments")
          .send({ username: "new_user", body: "new comment" })
          .expect(400)
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.eql("no reference available to data provided");
          });
      });
      it("GET: 400 /api/articles/:article:id/comments responds with error message if article does not exist", () => {
        return request(server)
          .post("/api/articles/10000/comments")
          .send({ username: "icellusedkars", body: "new comment" })
          .expect(400)
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("no reference available to data provided");
          });
      });
    });
  });
});

//expect().to.contain.keys('','','')

// it("GET: 400 /api/articles/:article:id/comments responds with error message if post body contains extra data", () => {
//   return request(server)
//     .post("/api/articles/10/comments")
//     .send({ username: "icellusedkars", body: "new comment", cats: 5 })
//     .expect(400)
//     .then(response => {
//       const msg = response.body.msg;
//       expect(msg).to.equal("");
//     });
// });
