import joi from '@hapi/joi';
import BaseModel from './base';

export default class User extends BaseModel {
  id: number;
  username: string;
  password: string;
  age: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  static tableName = 'users';

  static timestamps = true;

  static patchSchema = joi.object({
    username: joi.string(),
    password: joi.string(),
    age: joi.number().integer().positive()
  });

  static fullSchema = User.patchSchema.requiredKeys(
    'username', 'password', 'age'
  );
}
