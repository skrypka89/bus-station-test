import Coach from '../models/coach';
import { CoachDto } from './dto/coach-dto';
import ApiError from '../common/api-error';

export default class CoachService {
  private model: typeof Coach = Coach;

  async create(dto: CoachDto): Promise<Coach> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(query?: {limit?: number; page?: number}): Promise<Coach[]> {
    if (!query || typeof query.limit !== 'number') {
      return this.model.query();
    }

    if (typeof query.page !== 'number') {
      return this.model.query().limit(query.limit);
    }

    return this.model.query().limit(query.limit).offset(query.limit * (query.page - 1));
  }

  async getById(id: number): Promise<Coach> {
    return this.model.query().findById(id);
  }

  async update(id: number, dto: CoachDto): Promise<Coach> {
    return this.model.query().patchAndFetchById(id, dto);
  }

  async delete(id: number): Promise<void> {
    const deleted = await this.model.query().deleteById(id);

    if (!deleted) throw ApiError.notFound('id не найден');
  }
}
