exports.up = knex => knex.raw(`
  CREATE TABLE users (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    age smallint NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
  );
`);

exports.down = knex => knex.raw(`
  DROP TABLE IF EXISTS users;
`);
