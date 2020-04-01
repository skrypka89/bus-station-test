import { Model, ModelOptions, QueryContext, Pojo, QueryBuilder } from 'objection';
import joi from '@hapi/joi';
import { v4 as uuidv4 } from 'uuid';
import JoiValidator from './joi-validator';
import SoftDeleteQueryBuilder from './soft-delete-query-builder';
import db from '../../common/db';

Model.knex(db);

export default abstract class BaseModel extends Model {
  _id?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  deletedAt?: Date | null;

  static useLimitInFirst = true;

  static uuid?: boolean;

  static timestamps?: boolean | { createdAt?: boolean; updatedAt?: boolean; deletedAt?: boolean };

  static restrictedKeys?: string[];

  static patchSchema?: joi.ObjectSchema;

  static fullSchema?: joi.ObjectSchema;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static get QueryBuilder(): any {
    if (this.isTimestampSet('deletedAt')) {
      return SoftDeleteQueryBuilder;
    }

    return QueryBuilder;
  }

  static createValidator(): JoiValidator {
    return new JoiValidator();
  }

  static isTimestampSet(key: 'createdAt' | 'updatedAt' | 'deletedAt'): boolean {
    return (typeof this.timestamps === 'object' && this.timestamps[key]) || this.timestamps === true;
  }

  async $beforeInsert(ctx: QueryContext): Promise<void> {
    await super.$beforeInsert(ctx);

    const ModelClass = this.constructor as typeof BaseModel;

    if (ModelClass.isTimestampSet('createdAt')) {
      this.createdAt = new Date();
    }

    if (ModelClass.uuid) {
      this._id = uuidv4();
    }
  }

  async $beforeUpdate(opts: ModelOptions, ctx: QueryContext): Promise<void> {
    await super.$beforeUpdate(opts, ctx);

    const ModelClass = this.constructor as typeof BaseModel;

    if (ModelClass.isTimestampSet('updatedAt') && typeof this.deletedAt === 'undefined') {
      this.updatedAt = new Date();
    }
  }

  $formatJson(json: Pojo): Pojo {
    // eslint-disable-next-line no-param-reassign
    json = super.$formatJson(json);

    const { restrictedKeys } = this.constructor as typeof BaseModel;

    if (restrictedKeys) {
      restrictedKeys.forEach((k) => {
        // eslint-disable-next-line no-param-reassign
        delete json[k];
      });
    }

    return json;
  }
}
