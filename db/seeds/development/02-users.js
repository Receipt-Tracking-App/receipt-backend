const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Bob",
          last_name: "Smith",
          email: "bsmith@email.dev",
          username: "bsmith",
          password: bcrypt.hashSync("password", 10),
          group_id: 1
        },
        {
          first_name: "Mary",
          last_name: "Smith",
          email: "msmith@email.com",
          username: "msmith1",
          password: bcrypt.hashSync("password", 10),
          group_id: 2
        }
      ]);
    });
};
