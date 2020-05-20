import express from 'express';
import DriverService from '../services/driver-service';
import { DriverDto } from '../services/dto/driver-dto';

const router = express.Router();
const driverService = new DriverService();

router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const driver = await driverService.create(req.body as DriverDto);
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

router.patch('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const driver = await driverService.update(+req.params.id, req.body as DriverDto);
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
