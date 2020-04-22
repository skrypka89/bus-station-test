import joi from '@hapi/joi';
import { Model } from 'objection';
import BaseModel from './base/index';
import City from './city';
import Coach from './coach';
import Driver from './driver';

export default class Journey extends BaseModel {
  id: number;
  departure: Date;
  arrival: Date;
  fromId: number;
  toId: number;
  coachId: number;
  driverId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  static tableName = 'journeys';

  static timestamps = true;

  static patchSchema = joi.object({
    departure: joi.date().timestamp(),
    arrival: joi.date().timestamp(),
    fromId: joi.number(),
    toId: joi.number(),
    coachId: joi.number(),
    driverId: joi.number()
  });

  static fullSchema = Journey.patchSchema.requiredKeys(
    'departure', 'arrival', 'fromId', 'toId', 'coachId', 'driverId'
  );

  static relationMappings = {
    cityFrom: {
      relation: Model.BelongsToOneRelation,
      modelClass: City,
      join: {
        from: 'journeys.fromId',
        to: 'cities.id'
      }
    },

    cityTo: {
      relation: Model.BelongsToOneRelation,
      modelClass: City,
      join: {
        from: 'journeys.toId',
        to: 'cities.id'
      }
    },

    coach: {
      relation: Model.BelongsToOneRelation,
      modelClass: Coach,
      join: {
        from: 'journeys.coachId',
        to: 'coaches.id'
      }
    },

    driver: {
      relation: Model.BelongsToOneRelation,
      modelClass: Driver,
      join: {
        from: 'journeys.driverId',
        to: 'drivers.id'
      }
    }
  };
}
