import City from '../models/city';
import { CityDto } from './dto/city-dto';

export default class CityService {
  private model: typeof City = City;

  async create(dto: CityDto): Promise<City> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(): Promise<City[]> {
    return this.model.query();
  }

  async getById(id: number): Promise<City> {
    return this.model.query().findById(id);
  }

  async update(id: number, dto: CityDto): Promise<City> {
    return this.model.query().patchAndFetchById(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.model.query().deleteById(id);
  }
}
