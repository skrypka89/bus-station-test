import Driver from '../models/driver';
import { DriverDto } from './dto/driver-dto';

export default class DriverService {
  private model: typeof Driver = Driver;

  async create(dto: DriverDto): Promise<Driver> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(): Promise<Driver[]> {
    return this.model.query();
  }

  async getById(id: number): Promise<Driver> {
    return this.model.query().findById(id);
  }

  async update(id: number, dto: DriverDto): Promise<Driver> {
    return this.model.query().patchAndFetchById(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.model.query().deleteById(id);
  }
}
