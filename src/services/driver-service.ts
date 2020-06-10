import Driver from '../models/driver';
import { DriverDto } from './dto/driver-dto';
import ApiError from '../common/api-error';

export default class DriverService {
  private model: typeof Driver = Driver;

  async create(dto: DriverDto): Promise<Driver> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(limit?: number, page?: number): Promise<Driver[]> {
    if (typeof limit === 'number' && !Number.isNaN(limit)) {
      if (typeof page === 'number' && !Number.isNaN(page)) {
        return this.model.query().limit(limit).offset(limit * (page - 1));
      }

      return this.model.query().limit(limit);
    }

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
