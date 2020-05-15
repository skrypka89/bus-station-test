import express from 'express';
import DriverService from '../services/driver-service';

const router = express.Router();
const driverService = new DriverService();

router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const drivers = await driverService.getAll();
    res.json(drivers);
  } catch (e) {
    next(e);
  }
});

export default router;
