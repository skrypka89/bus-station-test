import Journey from '../models/journey';
import { JourneyDto } from './dto/journey-dto';
import ApiError from '../common/api-error';

export default class JourneyService {
  private model: typeof Journey = Journey;

  async create(dto: JourneyDto): Promise<Journey> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(
    query?: {
      departure?: string;
      arrival?: string;
      fromId?: number;
      toId?: number;
      limit?: number;
      page?: number;
    }
  ): Promise<Journey[]> {
    const qb = this.model.query();
    const keys = ['departure', 'arrival', 'fromId', 'toId'];

    if (!query) return qb;

    keys.forEach(key => {
      if (query[key]) qb.where(key, query[key]);
    });

    if (query.limit && query.page) {
      qb.limit(query.limit).offset(query.limit * (query.page - 1));
    } else if (query.limit) {
      qb.limit(query.limit);
    }

    return qb;
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
