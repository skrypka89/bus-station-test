import { DriverDto } from '../services/dto/driver-dto';
import DriverService from '../services/driver-service';

const driverData1: DriverDto = {
  name: 'Serhii Petrenko',
  licenceId: 'BXX161565'
};
const driverData2: DriverDto = {
  name: 'Ivan Polishchuk',
  licenceId: 'BXT046142'
};

const driverService: DriverService = new DriverService();

try {
  (async () => {
    console.log(await driverService.getAll());
    const driver2 = await driverService.create(driverData2);
    const driver1 = await driverService.create(driverData1);
    console.log(await driverService.getAll());
    driverData1.name = 'Pavlo Khvist';
    await driverService.update(driver1.id, driverData1);
    console.log(await driverService.getById(driver1.id));
    await driverService.delete(driver2.id);
    console.log(await driverService.getAll());
  })();
} catch (e) {
  console.error(e);
}
