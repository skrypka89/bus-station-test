import { Validator, ValidationError, ValidatorArgs, Pojo } from 'objection';
import { ValidationErrorItem } from '@hapi/joi';

export default class JoiValidator extends Validator {
  validate(args: ValidatorArgs): Pojo {
    const { model, json, options } = args;
    const keys = Object.keys(json);

    if (
      // @ts-ignore
      model.constructor.isTimestampSet('deletedAt') &&
      options.patch &&
      keys.includes('deletedAt') &&
      keys.length === 1
    ) {
      return json;
    }

    // @ts-ignore
    const schema = options.patch ? model.constructor.patchSchema : model.constructor.fullSchema;

    if (!schema) {
      throw new ValidationError({
        type: 'ModelValidation',
        message: `Missing declaration of ${options.patch ? 'patchSchema' : 'fullSchema'} in ${
          model.constructor.name
        } model`,
      });
    }

    const res = schema.validate(json);

    if (res.error) {
      const data = res.error.details.map((e: ValidationErrorItem) => ({ message: e.message, path: e.path[0] }));
      throw new ValidationError({
        type: 'ModelValidation',
        message: `Validation failed for instance of ${model.constructor.name}`,
        data,
      });
    }

    return res.value;
  }

  beforeValidate({ model, json, options }: ValidatorArgs): void {
    // @ts-ignore
    model.$beforeValidate(null, json, options);
  }
}
