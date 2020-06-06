exports.up = knex => knex.raw(`
  CREATE TABLE tickets (
    id serial PRIMARY KEY,
    seat smallint NOT NULL,
    type varchar(255) NOT NULL,
    user_id integer NOT NULL REFERENCES users,
    journey_id integer NOT NULL REFERENCES journeys,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
  );
`);

exports.down = knex => knex.raw(`
  DROP TABLE IF EXISTS tickets;
`);
