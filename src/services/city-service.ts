import City from '../models/city';
import { CityDto } from './dto/city-dto';
import ApiError from '../common/api-error';

export default class CityService {
  private model: typeof City = City;

  async create(dto: CityDto): Promise<City> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(query?: {limit?: number; page?: number}): Promise<City[]> {
    if (!query || typeof query.limit !== 'number') {
      return this.model.query();
    }

    if (typeof query.page !== 'number') {
      return this.model.query().limit(query.limit);
    }

    return this.model.query().limit(query.limit).offset(query.limit * (query.page - 1));
  }

  async getById(id: number): Promise<City> {
    return this.model.query().findById(id);
  }

  async update(id: number, dto: CityDto): Promise<City> {
    return this.model.query().patchAndFetchById(id, dto);
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.model.query().deleteById(id);
    if (!deleted) throw ApiError.notFound('id не найден');
  }
}
