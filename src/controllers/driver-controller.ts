import express from 'express';
import joi from '@hapi/joi';
import DriverService from '../services/driver-service';
import validateReqBody from '../common/middlewares/validate-req-body';

const router = express.Router();
const driverService = new DriverService();

router.post('/',
  validateReqBody({
    name: joi.string().max(255).required(),
    licenceId: joi.string().max(255).required(),
  }),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const driver = await driverService.create(req.body);
      res.json(driver);
    } catch (e) {
      next(e);
    }
  });

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const drivers = await driverService.getAll();
    res.json(drivers);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const driver = await driverService.getById(+req.params.id);
    res.json(driver);
  } catch (e) {
    next(e);
  }
});

router.patch('/:id',
  validateReqBody({
    name: joi.string().max(255),
    licenceId: joi.string().max(255),
  }),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const driver = await driverService.update(+req.params.id, req.body);
      res.json(driver);
    } catch (e) {
      next(e);
    }
  });

router.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    await driverService.delete(+req.params.id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

export default router;
