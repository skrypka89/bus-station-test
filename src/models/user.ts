import joi from '@hapi/joi';
import BaseModel from './base';

export default class User extends BaseModel {
  id: number;
  name: string;
  age: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  static tableName = 'users';

  static timestamps = true;

  static patchSchema = joi.object({
    name: joi.string().max(255),
    age: joi.number().max(130)
  });

  static fullSchema = User.patchSchema.requiredKeys('name', 'age');
}
