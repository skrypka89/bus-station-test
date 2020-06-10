import joi from '@hapi/joi';
import { Model } from 'objection';
import BaseModel from './base/index';
import User from './user';
import Journey from './journey';

export default class Ticket extends BaseModel {
  id: number;
  seat: number;
  type: string;
  userId: number;
  journeyId: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;

  static tableName = 'tickets';

  static timestamps = true;

  static patchSchema = joi.object({
    seat: joi.number().integer().positive(),
    type: joi.string().max(255),
    userId: joi.number().integer().positive(),
    journeyId: joi.number().integer().positive()
  });

  static fullSchema = Ticket.patchSchema.requiredKeys(
    'seat', 'type', 'userId', 'journeyId'
  );

  static relationMappings = {
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'tickets.userId',
        to: 'users.id'
      }
    },

    journey: {
      relation: Model.BelongsToOneRelation,
      modelClass: Journey,
      join: {
        from: 'tickets.journeyId',
        to: 'journeys.id'
      }
    }
  };
}
