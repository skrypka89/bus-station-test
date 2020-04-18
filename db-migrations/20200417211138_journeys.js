exports.up = knex => knex.raw(`
  CREATE TABLE journeys (
    id serial PRIMARY KEY,
    departure timestamp NOT NULL,
    arrival timestamp NOT NULL,
    from_id integer NOT NULL REFERENCES cities,
    to_id integer NOT NULL REFERENCES cities,
    coach_id integer NOT NULL REFERENCES coaches,
    driver_id integer NOT NULL REFERENCES drivers,
    created_at timestamp,
    updated_at timestamp,
    deleted_at timestamp
  );
`);

exports.down = knex => knex.raw(`
  DROP TABLE IF EXISTS journeys;
`);
