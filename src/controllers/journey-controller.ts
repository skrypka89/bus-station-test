import express from 'express';
import joi from '@hapi/joi';
import JourneyService from '../services/journey-service';
import validate from '../common/middlewares/validate';
import regex from '../common/regex';

const router = express.Router();
const journeyService = new JourneyService();

router.post('/',
  validate(joi.object({
    departure: joi.string().regex(regex).required(),
    arrival: joi.string().regex(regex).required(),
    fromId: joi.number().integer().positive().required(),
    toId: joi.number().integer().positive().required(),
    coachId: joi.number().integer().positive().required(),
    driverId: joi.number().integer().positive().required()
  })),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const journey = await journeyService.create(req.body);
      res.json(journey);
    } catch (e) {
      next(e);
    }
  });

router.get('/',
  validate(joi.object({
    departure: joi.string().regex(regex),
    arrival: joi.string().regex(regex),
    fromId: joi.number().integer().positive(),
    toId: joi.number().integer().positive(),
    limit: joi.number().integer().greater(-1),
    page: joi.number().integer().positive()
  })),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const journeys = await journeyService.getAll(req.query);
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
  validate(joi.object({
    departure: joi.string().regex(regex),
    arrival: joi.string().regex(regex),
    fromId: joi.number().integer().positive(),
    toId: joi.number().integer().positive(),
    coachId: joi.number().integer().positive(),
    driverId: joi.number().integer().positive()
  })),
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
