exports.up = function(knex) {
  console.log("creating articles table ...");
  return knex.schema.createTable("articles", table => {
    table.increments("article_id").primary();
    table.string("title");
    table.string("body");
    table.integer("votes").defaultTo(0);
    table.string("topic").references("topics.slug");
    table.string("author").references("users.username");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  console.log("removing articles table ...");
  return knex.schema.dropTable("articles");
};
