import knex from 'knex';
import { performance } from 'perf_hooks';
import { knexSnakeCaseMappers } from 'objection';
import knexConfig from '../../knexfile';

const queries: { [key: string]: { start: number; sql: string } } = {};

const db = knex({
  client: 'pg',
  connection: knexConfig.connection,
  ...knexSnakeCaseMappers(),
});

db.on('query', query => {
  queries[query.__knexQueryUid] = {
    start: performance.now(),
    sql: db.raw(query.sql, query.bindings).toString(),
  };
});

db.on('query-response', (res, query) => {
  const { start, sql } = queries[query.__knexQueryUid];

  const time = (performance.now() - start).toFixed(3);
  console.log(`${sql} - ${time} ms`);

  delete queries[query.__knexQueryUid];
});

db.on('query-error', (error, query) => {
  console.error(`Error running query: ${queries[query.__knexQueryUid].sql}`);
  delete queries[query.__knexQueryUid];
});

export default db;
