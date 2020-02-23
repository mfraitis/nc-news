exports.endpoints = {
  "GET /api": {
    description:
      "serves up a json representation of all the available endpoints of the api"
  },
  "GET /api/topics": {
    description: "serves an array of all topics",
    queries: [],
    exampleResponse: {
      topics: [
        {
          slug: "coding",
          description: "Code is love, code is life"
        }
      ]
    }
  },
  "GET /api/articles": {
    description: "serves an array of all articles",
    queries: ["author", "topic", "sort_by", "order"],
    exampleResponse: {
      articles: [
        {
          author: "happyamy2016",
          title: "High Altitude Cooking",
          article_id: 28,
          topic: "cooking",
          created_at: "2018-05-27T03:32:28.514Z",
          votes: 3,
          comment_count: "7"
        }
      ]
    }
  },
  "GET /api/articles/:article_id": {
    description: "serves an object of article for the specified article_id",
    queries: ["article_id"],
    exampleResponse: {
      article: {
        article_id: 5,
        title: "Please stop worrying about Angular 3",
        body:
          "Another Angular version planned already? Whaaaat? Didn’t Angular 2 just ship? Why Angular 3? What? Why? First off, there is no massive rewrite, and won’t be for Angular 3. Secondly, let me explain the future of Angular 2 and what Angular 3, Angular 4 will mean for you.",
        votes: 0,
        topic: "coding",
        author: "jessjelly",
        created_at: "2016-10-24T04:13:02.648Z",
        comment_count: "6"
      }
    }
  },
  "PATCH /api/articles/:article_id": {
    description:
      "serves an object of article for the specified article_id with votes property updated",
    queries: [],
    body: {
      inc_votes: 1
    },
    exampleResponse: {
      article: {
        article_id: 5,
        title: "Please stop worrying about Angular 3",
        body:
          "Another Angular version planned already? Whaaaat? Didn’t Angular 2 just ship? Why Angular 3? What? Why? First off, there is no massive rewrite, and won’t be for Angular 3. Secondly, let me explain the future of Angular 2 and what Angular 3, Angular 4 will mean for you.",
        votes: 1,
        topic: "coding",
        author: "jessjelly",
        created_at: "2016-10-24T04:13:02.648Z",
        comment_count: "6"
      }
    }
  },
  "GET /api/users": {
    description: "serves an array of all users",
    queries: [],
    exampleResponse: {
      users: [
        {
          username: "tickle122",
          name: "Tom Tickle",
          avatar_url:
            "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg"
        }
      ]
    }
  },
  "GET /api/users/:username": {
    description: "serves an object of user for the specified username",
    queries: [],
    exampleResponse: {
      user: {
        username: "tickle122",
        name: "Tom Tickle",
        avatar_url:
          "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg"
      }
    }
  },
  "GET /api/articles/:article_id/comments": {
    description: "serves an array of comments for the specified article_id",
    queries: ["sort_by", "order"],
    exampleResponse: {
      comments: [
        {
          comment_id: 116,
          votes: 3,
          created_at: "2017-10-18T13:06:42.375Z",
          author: "weegembump",
          body:
            "Praesentium dolor doloribus sint. Quisquam molestiae dolorum asperiores animi omnis."
        }
      ]
    }
  },
  "POST /api/articles/:article_id/comments": {
    description:
      "serves an object of comment for the posted comment on the specified article_id",
    queries: [],
    body: {
      username: "tickle122",
      body: "Another Angular?!?1??"
    },
    exampleResponse: {
      comment: {
        comment_id: 302,
        author: "tickle122",
        article_id: 5,
        votes: 0,
        created_at: "2020-02-23T22:23:27.769Z",
        body: "Another Angular?!?1??"
      }
    }
  },
  "PATCH /api/comments/:comment_id": {
    description:
      "serves an object of comment for the specified comment_id with votes property updated",
    queries: [],
    body: {
      inc_votes: 1
    },
    exampleResponse: {
      comment: {
        comment_id: 5,
        author: "weegembump",
        article_id: 17,
        votes: -4,
        created_at: "2017-05-31T11:59:44.183Z",
        body:
          "Quod qui quia dignissimos sit tempore vel reprehenderit. Ipsa ipsa veritatis architecto corporis et et non. Sed alias occaecati eum dignissimos sint eius. Ad ea iste quas quia velit libero voluptatem voluptatem. Animi illo nisi nulla quia sapiente omnis dolorem nulla. Sunt dolor similique."
      }
    }
  },
  "DELETE /api/comments/:comment_id": {
    description:
      "nothing served with comment deleted for the specified comment_id"
  }
};
