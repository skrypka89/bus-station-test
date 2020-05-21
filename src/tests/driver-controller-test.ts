import axios from 'axios';
import { DriverDto } from '../services/dto/driver-dto';

const driverData1: DriverDto = {
  name: 'Serhii Petrenko',
  licenceId: 'BXX161565'
};
const driverData2: DriverDto = {
  name: 'Ivan Polishchuk',
  licenceId: 'BXT046142'
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/v1/drivers'
});

try {
  (async () => {
    console.log(await axiosInstance.get('/'));
    let driver2 = (await axiosInstance.post('/', driverData2)).data;
    let driver1 = (await axiosInstance.post('/', driverData1)).data;
    console.log(await axiosInstance.get('/'));
    driverData1.name = 'Pavlo Khvist';
    driver1 = (await axiosInstance.patch('/' + driver1.id, driverData1)).data;
    console.log(await axiosInstance.get('/' + driver1.id));
    await axiosInstance.delete('/' + driver2.id);
    driver2 = {};
    console.log(await axiosInstance.get('/'));
  })();
} catch (e) {
  console.error(e);
}
