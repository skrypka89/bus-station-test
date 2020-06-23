exports.up = knex => knex.raw(`
  CREATE TABLE users (
    id serial PRIMARY KEY,
    username text NOT NULL,
    password text NOT NULL,
    age smallint NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
  );
`);

exports.down = knex => knex.raw(`
  DROP TABLE IF EXISTS users;
`);
