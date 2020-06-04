import Journey from '../models/journey';
import { JourneyDto } from './dto/journey-dto';

export default class JourneyService {
  private model: typeof Journey = Journey;

  async create(dto: JourneyDto): Promise<Journey> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(limit?: number, page?: number): Promise<Journey[]> {
    if (typeof limit === 'number') {
      if (limit < 0) return this.model.query();
      if (typeof page !== 'number' || page <= 0) return this.model.query().limit(limit);

      return this.model.query().limit(limit).offset(limit * (page - 1));
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
    await this.model.query().deleteById(id);
  }
}
