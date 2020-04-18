import joi from '@hapi/joi';
import BaseModel from './base';

export default class Driver extends BaseModel {
  id: number;
  name: string;
  licenceId: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  static tableName = 'drivers';

  static timestamps = true;

  static patchSchema = joi.object({
    name: joi.string().max(255),
    licenceId: joi.string().max(255),
  });

  static fullSchema = Driver.patchSchema.requiredKeys('name', 'licenceId');
}
