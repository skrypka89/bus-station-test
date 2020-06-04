import express from 'express';

export default function definePaginationParams(): express.Handler {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { limit, page } = req.query;

    if (typeof limit !== 'string') {
      req.body.limit = -1;
    } else if (!parseInt(limit, 10)) {
      req.body.limit = -1;
    } else {
      req.body.limit = parseInt(limit, 10);
    }

    if (typeof page !== 'string') {
      req.body.page = 1;
    } else if (!parseInt(page, 10) || parseInt(page, 10) <= 0) {
      req.body.page = 1;
    } else {
      req.body.page = parseInt(page, 10);
    }

    next();
  };
}
