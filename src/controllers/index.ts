import express from 'express';
import driverController from './driver-controller';
import journeyController from './journey-controller';

const router = express.Router();

router.get('/check', (req: express.Request, res: express.Response) => {
  res.sendStatus(204);
});

router.use('/drivers', driverController);
router.use('/journeys', journeyController);

export default router;
