exports.up = function(knex) {
  // console.log("creating users table ...");
  return knex.schema.createTable("users", table => {
    table
      .string("username")
      .primary()
      .unique();
    table.string("name");
    table.string("avatar_url");
  });
};

exports.down = function(knex) {
  // console.log("removing users table ...");
  return knex.schema.dropTable("users");
};
