// const checkIfQueryExists = (table, column, query) => {
//   connection(table)
//     .select("*")
//     .where(column, query)
//     .then(arr => {
//       console.log(arr);
//       return arr.length;
//     });
// };
// const checkIfTopicExists = topic
//     ? checkIfQueryExists("topics", "slug", topic)
//     : 1;
//   const checkIfAuthorExists = author
//     ? (checkIfQueryExists("users", "username", author))
//     : 1;

//-

// exports.selectAllArticles = ({ sort_by, order, author, topic }) => {
//   const checkIfQueryExists = (table, column, query) => {
//     connection(table)
//       .select("*")
//       .where(column, query)
//       .then(arr => {
//         console.log(arr);
//         if (arr.length !== 0) return true;
//         else return false;
//       });
//   };

//   if (order && order !== "asc" && order !== "desc") {
//     return Promise.reject({
//       status: 400,
//       msg: "order input invalid"
//     });
//   } else {
//     return connection("articles")
//       .select(
//         "articles.author",
//         "title",
//         "articles.article_id",
//         "topic",
//         "articles.created_at",
//         "articles.votes"
//       )
//       .leftJoin("comments", "articles.article_id", "comments.article_id")
//       .groupBy("articles.article_id")
//       .count({ comment_count: "articles.article_id" })
//       .orderBy(sort_by || "created_at", order || "desc")
//       .modify(query => {
//         if (author) return query.where("articles.author", author);
//         if (topic) return query.where("topic", topic);
//       })
//       .returning("*")
//       .then(articles => {
//         if (articles.length === 0) {
//           const checkIfTopicExists = topic
//             ? checkIfQueryExists("topics", "slug", topic)
//             : null;
//           const checkIfAuthorExists = author
//             ? checkIfQueryExists("users", "username", author)
//             : null;

//           return Promise.all([checkIfTopicExists, checkIfAuthorExists]).then(
//             ([checkIfTopicExists, checkIfAuthorExists]) => {
//               console.log([checkIfTopicExists, checkIfAuthorExists]);
//             }
//           );
//         }
//       });
//   }
//   // return Promise.reject({
//   //             status: 404,
//   //             msg: "no articles found"
//   //           });
//   // const checkIfTopicExists = topic
//   //   ? checkIfQueryExists("topics", "slug", topic)
//   //   : null;
//   // const checkIfAuthorExists = author
//   //   ? checkIfQueryExists("users", "username", author)
//   //   : null;
//   // console.log(author, topic);
//   // return Promise.all([checkIfTopicExists, checkIfAuthorExists]).then(
//   //   ([checkIfTopicExists, checkIfAuthorExists]) => {
//   //     console.log([checkIfTopicExists, checkIfAuthorExists]);
//   //     return resultArr;
//   //   }
//   // );

//   // if (order && order !== "asc" && order !== "desc") {
//   //   return Promise.reject({
//   //     status: 400,
//   //     msg: "order input invalid"
//   //   });
//   // } else {
//   //   return Promise.all([checkIfTopicExists, checkIfAuthorExists]).then(
//   //     resultArr => {
//   //       console.log(resultArr);
//   //       return resultArr;

//   //       getArticles;
//   //     }
//   //   );
//   // }
// };

//   if (topic) {
//     return connection("topics")
//       .select("*")
//       .where("slug", topic)
//       .then(topic => {
//         if (topic.length === 0) {
//           return Promise.reject({ status: 400, msg: "topic does not exist" });
//         } else {
//           return connection("articles")
//             .select(
//               "articles.author",
//               "title",
//               "articles.article_id",
//               "topic",
//               "articles.created_at",
//               "articles.votes"
//             )
//             .leftJoin("comments", "articles.article_id", "comments.article_id")
//             .groupBy("articles.article_id")
//             .count({ comment_count: "articles.article_id" })
//             .orderBy(sort_by || "created_at", order || "desc")
//             .modify(query => {
//               if (author) return query.where("articles.author", author);
//               if (topic) return query.where("topic", topic);
//             })
//             .returning("*")
//             .then(articles => {
//               if (articles.length === 0) {
//                 return Promise.reject({
//                   status: 404,
//                   msg: "no articles found"
//                 });
//               } else return articles;
//             });
//         }
//       });
//   } else if (author) {
//     return connection("users")
//       .select("*")
//       .where("username", author)
//       .then(user => {
//         if (user.length === 0) {
//           return Promise.reject({
//             status: 404,
//             msg: "author does not exist"
//           });
//         } else {
//           return connection("articles")
//             .select(
//               "articles.author",
//               "title",
//               "articles.article_id",
//               "topic",
//               "articles.created_at",
//               "articles.votes"
//             )
//             .leftJoin("comments", "articles.article_id", "comments.article_id")
//             .groupBy("articles.article_id")
//             .count({ comment_count: "articles.article_id" })
//             .orderBy(sort_by || "created_at", order || "desc")
//             .modify(query => {
//               if (author) return query.where("articles.author", author);
//               if (topic) return query.where("topic", topic);
//             })
//             .returning("*")
//             .then(articles => {
//               if (articles.length === 0) {
//                 return Promise.reject({
//                   status: 404,
//                   msg: "no articles found"
//                 });
//               } else return articles;
//             });
//         }
//       });
//   } else {
//     return connection("articles")
//       .select(
//         "articles.author",
//         "title",
//         "articles.article_id",
//         "topic",
//         "articles.created_at",
//         "articles.votes"
//       )
//       .leftJoin("comments", "articles.article_id", "comments.article_id")
//       .groupBy("articles.article_id")
//       .count({ comment_count: "articles.article_id" })
//       .orderBy(sort_by || "created_at", order || "desc")
//       .modify(query => {
//         if (author) return query.where("articles.author", author);
//         if (topic) return query.where("topic", topic);
//       })
//       .returning("*")
//       .then(articles => {
//         if (articles.length === 0) {
//           return Promise.reject({ status: 404, msg: "no articles found" });
//         } else return articles;
//       });
//   }
// };

// -

// if (author) {
//   return connection("users")
//     .select("*")
//     .where("username", author)
//     .then(user => {
//       if (user.length === 0) {
//         return Promise.reject({
//           status: 404,
//           msg: "author does not exist"
//         });
//       } else {
//         sortArticles({ sort_by, order, author, topic });
//       }
//     });
// } else if (topic) {
//   return connection("topics")
//     .select("*")
//     .where("slug", topic)
//     .then(slug => {
//       console.log(slug);
//       if (slug.length === 0) {
//         return Promise.reject({
//           status: 404,
//           msg: "topic does not exist"
//         });
//       } else {
//         sortArticles({ sort_by, order, author, topic });
//       }
//     });
// } else sortArticles({ sort_by, order, author, topic });
