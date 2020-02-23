# Northcoders News API

## About

A RESTful API for Northcoders News, a reddit style news site. The API is hosted [here](https://news-northcoders.herokuapp.com/api/).
<br/>
The frontend project is hosted [here](http://nc-news-mf.herokuapp.com/).
<br/>
The database is PSQL, and queried using [Knex](https://knexjs.org), the server is built using [Express.js](http://expressjs.com/). The whole project was built using TDD practices, testing was done using mocha, chai and supertest.

## Getting Started

This project was built using node version v13.8.0

### Clone this repo:

```
git clone https://github.com/mfraitis/nc-news

cd nc-news
```

### Install dependencies

```
npm install
```

### You will need a new file in the root directory called knexfile.js with the following:

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "nc_news",
      //username: "",
      //password: ""

    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      //username: "",
      //password: ""

    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };

```

ubuntu users will need to enter their psql username and password
<br/>
<br/>

### Setup the test and development databases

```
npm run setup-dbs
```

### Seed the databases 
```
npm run seed
```

### Host the API locally
```
npm start
```
Use http://localhost:9090 to to test the end points

---

### Routes

```http
GET /api/topics

GET /api/users/:username

GET /api/articles/:article_id
PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

GET /api/articles

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api
```

---

_**All of the endpoints send the below responses in an object, with a key name of what is being sent. E.g.**_

```json
{
  "topics": [
    {
      "description": "Code is love, code is life",
      "slug": "coding"
    },
    {
      "description": "FOOTIE!",
      "slug": "football"
    }
  ]
}
```

---

```http
GET /api/topics
```

#### Responds with

- an array of topic objects, each of which have the following properties:
  - `slug`
  - `description`

---

```http
GET /api/users/:username
```

#### Responds with

- a user object which has the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

```http
GET /api/articles/:article_id
```

#### Responds with

- an article object, which has the following properties:

  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `body`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` 

---

```http
PATCH /api/articles/:article_id
```

#### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` indicates how much the `votes` property in the database is updated by

  e.g.

  `{ inc_votes : 1 }` increments the current article's vote property by 1

  `{ inc_votes : -1 }` decreases the current article's vote property by 1

#### Responds with

- the updated article

---

```http
POST /api/articles/:article_id/comments
```

#### Request body accepts

- an object with the following properties:
  - `username`
  - `body`

#### Responds with

- the posted comment

---

```http
GET /api/articles/:article_id/comments
```

#### Responds with

- an array of comments for the given `article_id` of which each comment has the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author` 
  - `body`

#### Accepts queries

- `sort_by`, which sorts the comments by any valid column (defaults to created_at)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

---

```http
GET /api/articles
```

#### Responds with

- an `articles` array of article objects, each of which have the following properties:
  - `author` 
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count`

#### Should accept queries

- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `author`, which filters the articles by the username value specified in the query
- `topic`, which filters the articles by the topic value specified in the query

---

```http
PATCH /api/comments/:comment_id
```

#### Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` indicates how much the `votes` property in the database is updated by

  e.g.

  `{ inc_votes : 1 }` increments the current comment's vote property by 1

  `{ inc_votes : -1 }` decreases the current comment's vote property by 1

#### Responds with

- the updated comment

---

```http
DELETE /api/comments/:comment_id
```

#### Should

- deletes the given comment by `comment_id`

#### Responds with

- status 204 and no content

---


### Built with

- [Express.js](http://expressjs.com/)
- [Knex.js](http://knexjs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/) 
- [Supertest](https://www.npmjs.com/package/supertest)
- [Heroku](https://www.heroku.com/)


