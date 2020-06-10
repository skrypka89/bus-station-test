import Journey from '../models/journey';
import { JourneyDto } from './dto/journey-dto';
import ApiError from '../common/api-error';

export default class JourneyService {
  private model: typeof Journey = Journey;

  async create(dto: JourneyDto): Promise<Journey> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(limit?: number, page?: number): Promise<Journey[]> {
    if (typeof limit === 'number' && !Number.isNaN(limit)) {
      if (typeof page === 'number' && !Number.isNaN(page)) {
        return this.model.query().limit(limit).offset(limit * (page - 1));
      }

      return this.model.query().limit(limit);
    }

    return this.model.query();
  }

  async getById(id: number): Promise<Journey> {
    return this.model.query().findById(id);
  }

  async update(id: number, dto: JourneyDto): Promise<Journey> {
    return this.model.query().patchAndFetchById(id, dto);
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.model.query().deleteById(id);
    if (!deleted) throw ApiError.notFound('id не найден');
  }
}
