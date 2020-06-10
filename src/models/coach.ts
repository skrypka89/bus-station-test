import joi from '@hapi/joi';
import BaseModel from './base';

export default class Coach extends BaseModel {
  id: number;
  brand: string;
  model: string;
  govNumber: string;
  seats: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  static tableName = 'coaches';

  static timestamps = true;

  static patchSchema = joi.object({
    brand: joi.string().max(255),
    model: joi.string().max(255),
    govNumber: joi.string().max(255),
    seats: joi.number().integer().greater(-1)
  });

  static fullSchema = Coach.patchSchema.requiredKeys(
    'brand', 'model', 'govNumber', 'seats'
  );
}
