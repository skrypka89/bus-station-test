import joi from '@hapi/joi';
import BaseModel from './base';

export default class Admin extends BaseModel {
  id: number;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  static tableName = 'admins';

  static timestamps = true;

  static patchSchema = joi.object({
    name: joi.string().max(255)
  });

  static fullSchema = Admin.patchSchema.requiredKeys('name');
}
