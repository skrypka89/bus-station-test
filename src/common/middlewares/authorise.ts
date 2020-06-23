import express from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../token-payload';
import ApiError from '../api-error';

export default function authorise(): express.Handler {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      try {
        const decoded = jwt.decode(authHeader.split(' ')[1]) as TokenPayload;

        if (decoded.admin && req.baseUrl === '/tickets' && req.method === 'POST') {
          next(ApiError.forbidden());
        }

        if (!decoded.admin && req.baseUrl === '/journeys' && req.method === 'POST') {
          next(ApiError.forbidden());
        }
      } catch {
        next(ApiError.badRequest('Ошибка декодировки JWT'));
      }

      next();
    }

    next(ApiError.badRequest('Токен доступа не обнаружен'));
  };
}
