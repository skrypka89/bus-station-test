import Driver from '../models/driver';
import { DriverDto } from './dto/driver-dto';
import ApiError from '../common/api-error';

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
    const deleted = await this.model.query().deleteById(id);
    if (!deleted) throw ApiError.notFound('id не найден');
  }
}
