import Coach from '../models/coach';
import { CoachDto } from './dto/coach-dto';

export default class CoachService {
  private model: typeof Coach = Coach;

  async create(dto: CoachDto): Promise<Coach> {
    return this.model.query().insert(dto).returning('*');
  }

  async getAll(): Promise<Coach[]> {
    return this.model.query();
  }

  async getById(id: number): Promise<Coach> {
    return this.model.query().findById(id);
  }

  async update(id: number, dto: CoachDto): Promise<Coach> {
    return this.model.query().patchAndFetchById(id, dto);
  }

  async delete(id: number): Promise<void> {
    await this.model.query().deleteById(id);
  }
}
