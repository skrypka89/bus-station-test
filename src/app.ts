/* eslint-disable import/first */
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import morgan from 'morgan';
import { ValidationError, NotFoundError } from 'objection';
import db from './common/db';
import ApiError from './common/api-error';
import router from './controllers';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan(':remote-addr - :method :url :status :response-time ms'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/v1', router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(ApiError.notFound('API not found'));
});

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
  /* eslint-disable no-param-reassign */
  if (!(err instanceof ApiError)) {
    if (err instanceof ValidationError) {
      err = ApiError.badRequest(err.message || 'Ошибка Валидации', err.data);
    } else if (err instanceof NotFoundError) {
      err = ApiError.notFound('Данные не найдены');
    } else {
      console.error(err);
      err = ApiError.internal();
    }
  }
  /* eslint-enable no-param-reassign */

  res.format({
    'text/html': () => {
      res.sendStatus(err.statusCode);
    },
    'application/json': () => {
      res.status(err.statusCode).send(err);
    },
    default: () => {
      res.sendStatus(err.statusCode);
    },
  });
});

app.listen(port, async () => {
  try {
    await db.raw('select 1');
    console.log(`Server started on port ${port}`);
  } catch (e) {
    console.error(e);
  }
});
