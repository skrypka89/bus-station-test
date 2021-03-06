exports.up = knex => knex.raw(`
  CREATE TABLE drivers (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL,
    licence_id varchar(255) NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
  );
`);

exports.down = knex => knex.raw(`
  DROP TABLE IF EXISTS drivers;
`);
