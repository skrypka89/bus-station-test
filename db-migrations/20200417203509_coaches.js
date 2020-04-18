exports.up = knex => knex.raw(`
  CREATE TABLE coaches (
    id serial PRIMARY KEY,
    brand varchar(255) NOT NULL,
    model varchar(255) NOT NULL,
    gov_number varchar(255) NOT NULL,
    seats smallint NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
  );
`);

exports.down = knex => knex.raw(`
  DROP TABLE IF EXISTS coaches;
`);
