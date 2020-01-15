process.env.NODE_ENV = "test";
const chai = require("chai");
const expect = chai.expect;
chai.use(require("sams-chai-sorted"));
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
  describe("/articles/:article_id/comments", () => {
    it("POST: 201 /api/articles/:article:id/comments responds with status 201 and new comment posted to existing username", () => {
      return request(server)
        .post("/api/articles/1/comments")
        .send({ username: "icellusedkars", body: "new comment" })
        .expect(201)
        .then(response => {
          const comment = response.body;
          expect(comment).to.eql({ comment: "new comment" });
        });
    });
    it("POST: 201 /api/articles/:article:id/comments responds with comment in an object with key comment", () => {
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
    it("GET:200 /api/articles/:article_id/comments responds with status 200 ", () => {
      return request(server)
        .get("/api/articles/1/comments")
        .expect(200);
    });
    it("GET:200 /api/articles/:article_id/comments responds with an array of comment objects", () => {
      return request(server)
        .get("/api/articles/5/comments")
        .then(response => {
          const comments = response.body.comments;
          expect(comments[0]).to.be.an("object");
          expect(comments).to.be.an("array");
        });
    });
    it("GET:200 /api/articles/:article_id/comments responds with an array of comment objects with correct keys", () => {
      return request(server)
        .get("/api/articles/5/comments")
        .then(response => {
          const comments = response.body.comments;
          expect(comments[0]).to.have.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          );
        });
    });
    it("GET:200 /api/articles/:article_id/comments responds comments in descending order of created_at by default", () => {
      return request(server)
        .get("/api/articles/1/comments")
        .then(response => {
          const comments = response.body.comments;
          expect(comments).to.be.descendingBy("created_at");
        });
    });
    it("GET:200 /api/articles/:article_id/comments responds comments in ascending order of created_at", () => {
      return request(server)
        .get("/api/articles/1/comments?order=asc")
        .then(response => {
          const comments = response.body.comments;
          expect(comments).to.be.ascendingBy("created_at");
        });
    });
    describe("/errors", () => {
      it("POST:400 /api/articles/:article_id/comments responds with error message when passed an empty object", () => {
        return request(server)
          .post("/api/articles/1/comments")
          .send({})
          .expect(400)
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.eql("input data missing");
          });
      });
      it("POST:400 /api/articles/:article:id/comments responds with error message if username does not exist", () => {
        return request(server)
          .post("/api/articles/1/comments")
          .send({
            username: "new_user",
            body: "new comment"
          })
          .expect(400)
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.eql("no reference available to data provided");
          });
      });
      it("POST:400 /api/articles/:article:id/comments responds with error message if article does not exist", () => {
        return request(server)
          .post("/api/articles/10000/comments")
          .send({
            username: "icellusedkars",
            body: "new comment"
          })
          .expect(400)
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("no reference available to data provided");
          });
      });
      it("GET:404 /api/articles/:article_id/comments responds with error message if passed an article_id with no comments", () => {
        return request(server)
          .get("/api/articles/3/comments")
          .then(response => {
            const msg = response.body.msg;
            expect(msg).to.equal("no comments for this article");
          });
      });
    });
  });
});

//expect().to.contain.keys('','','')
