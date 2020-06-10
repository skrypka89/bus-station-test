import joi from '@hapi/joi';
import express from 'express';
import ApiError from '../api-error';

export default function validate(schema: joi.ObjectSchema): express.Handler {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = req.method === 'GET' ? 'query' : 'body';
    const result = joi.validate(req[key], schema, { stripUnknown: true, abortEarly: false });

    if (result.error) {
      next(ApiError.badRequest('Ошибка валидации HTTP-запроса', result.error.details));
    } else {
      req[key] = result.value;
    }

    next();
  };
}
