import joi from '@hapi/joi';
import express from 'express';
import ApiError from '../api-error';

export default function validateReqBody(paramSchema: joi.SchemaMap): express.Handler {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const schema: joi.ObjectSchema = joi.object().keys(paramSchema);
    const paramSchemaKeys: string[] = Object.keys(paramSchema);
    const requestParamObj: object = {};

    paramSchemaKeys.forEach((key: string): void => {
      requestParamObj[key] = req.body[key];
    });

    const result = joi.validate(requestParamObj, schema);

    if (result.error) {
      next(ApiError.badRequest(result.error.details[0].message));
    } else {
      req.body = requestParamObj;
    }

    next();
  };
}
