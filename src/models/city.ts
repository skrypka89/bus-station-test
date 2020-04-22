import joi from '@hapi/joi';
import BaseModel from './base';

export default class City extends BaseModel {
  id: number;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  static tableName = 'cities';

  static timestamps = true;

  static patchSchema = joi.object({
    name: joi.string().max(255),
  });

  static fullSchema = City.patchSchema.requiredKeys('name');
}
