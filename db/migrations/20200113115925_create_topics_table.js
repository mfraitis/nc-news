exports.up = function(knex) {
  console.log("creating topics table ...");
  return knex.schema.createTable("topics", table => {
    table
      .string("slug")
      .primary()
      .unique();
    table.string("description");
  });
};

exports.down = function(knex) {
  console.log("removing topics table ...");
  return knex.schema.dropTable("topics");
};
