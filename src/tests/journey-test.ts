import { DriverDto } from '../services/dto/driver-dto';
import { CoachDto } from '../services/dto/coach-dto';
import { CityDto } from '../services/dto/city-dto';
import { JourneyDto } from '../services/dto/journey-dto';
import DriverService from '../services/driver-service';
import CoachService from '../services/coach-service';
import CityService from '../services/city-service';
import JourneyService from '../services/journey-service';

const driverData: DriverDto = {
  name: 'Serhii Petrenko',
  licenceId: 'BXX161565'
};
const coachData: CoachDto = {
  brand: 'Mercedes-Benz',
  model: 'Sprinter II Kombi 316 CDI Fensterbus Maxi',
  govNumber: 'СВ9702ВЕ',
  seats: 6
};
const cityData1: CityDto = {
  name: 'Chernihiv'
};
const cityData2: CityDto = {
  name: 'Kyiv'
};
const cityData3: CityDto = {
  name: 'Nizhyn'
};

const driverService: DriverService = new DriverService();
const coachService: CoachService = new CoachService();
const cityService: CityService = new CityService();
const journeyService: JourneyService = new JourneyService();

try {
  (async () => {
    console.log(await driverService.getAll());
    console.log(await coachService.getAll());
    console.log(await cityService.getAll());

    const driver = await driverService.create(driverData);
    const coach = await coachService.create(coachData);
    const city1 = await cityService.create(cityData1);
    const city2 = await cityService.create(cityData2);
    const city3 = await cityService.create(cityData3);
    const journeyData1: JourneyDto = {
      departure: new Date('2020-04-28T16:30:00'),
      arrival: new Date('2020-04-28T18:15:00'),
      fromId: city1.id,
      toId: city2.id,
      coachId: coach.id,
      driverId: driver.id
    };
    const journeyData2: JourneyDto = {
      departure: new Date('2020-04-29T18:45:00'),
      arrival: new Date('2020-04-29T20:15:00'),
      fromId: city3.id,
      toId: city1.id,
      coachId: coach.id,
      driverId: driver.id
    };

    console.log(await journeyService.getAll());

    const journey2 = await journeyService.create(journeyData2);
    const journey1 = await journeyService.create(journeyData1);

    console.log(await journeyService.getAll());
    journeyData1.departure = new Date('2020-04-28T16:00:00');
    journeyData1.arrival = new Date('2020-04-28T17:45:00');
    await journeyService.update(journey1.id, journeyData1);
    console.log(await journeyService.getById(journey1.id));
    await journeyService.delete(journey2.id);
    console.log(await journeyService.getAll());
  })();
} catch (error) {
  console.log(error.name + ': ' + error.message);
}
