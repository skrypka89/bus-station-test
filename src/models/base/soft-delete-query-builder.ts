/* eslint-disable @typescript-eslint/ban-ts-ignore,@typescript-eslint/no-explicit-any */
import { Model, QueryBuilder } from 'objection';

export default class SoftDeleteQueryBuilder<M extends Model, R = M[]> extends QueryBuilder<M, R> {
  // @ts-ignore
  constructor(modelClass) {
    super(modelClass);

    this.onBuild((builder) => {
      const ctx = builder.context();

      if (!ctx.includeDeleted) {
        // @ts-ignore
        builder.whereNull(`${modelClass.tableName}.deleted_at`);
      }
    });
  }

  all(): any {
    return this.context({ includeDeleted: true });
  }

  deleted(): any {
    return this.all().whereNotNull('deleted_at');
  }

  restore(): any {
    return this.all().patch({ deletedAt: null });
  }

  delete(): any {
    // @ts-ignore
    return this.patch({ deletedAt: new Date() });
  }

  hardDelete(): any {
    return super.delete().context({ includeDeleted: true });
  }
}
