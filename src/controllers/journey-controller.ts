import express from 'express';
import joi from '@hapi/joi';
import JourneyService from '../services/journey-service';
import validateReqBody from '../common/middlewares/validate-req-body';
import definePaginationParams from '../common/middlewares/define-pagination-params';

const router = express.Router();
const journeyService = new JourneyService();

router.post('/',
  validateReqBody({
    departure: joi.date().timestamp().required(),
    arrival: joi.date().timestamp().required(),
    fromId: joi.number().required(),
    toId: joi.number().required(),
    coachId: joi.number().required(),
    driverId: joi.number().required()
  }),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const journey = await journeyService.create(req.body);
      res.json(journey);
    } catch (e) {
      next(e);
    }
  });

router.get('/',
  definePaginationParams(),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const journeys = await journeyService.getAll(
        req.body.limit as number, req.body.page as number
      );
      res.json(journeys);
    } catch (e) {
      next(e);
    }
  });

router.get('/:id',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const journey = await journeyService.getById(+req.params.id);
      res.json(journey);
    } catch (e) {
      next(e);
    }
  });

router.patch('/:id',
  validateReqBody({
    departure: joi.date().timestamp(),
    arrival: joi.date().timestamp(),
    fromId: joi.number(),
    toId: joi.number(),
    coachId: joi.number(),
    driverId: joi.number()
  }),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const journey = await journeyService.update(+req.params.id, req.body);
      res.json(journey);
    } catch (e) {
      next(e);
    }
  });

router.delete('/:id',
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      await journeyService.delete(+req.params.id);
      res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  });

export default router;
