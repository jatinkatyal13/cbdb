import jagql, {BaseType} from '@jagql/framework'
import {getHandler} from '../../handlers/sqlHandler'
import {Center} from '../center'
import {Course} from '../course'
import ValidateIdHandler from './validateIdHandler'

const Joi = jagql.Joi

export interface Batch {
  id: string
  center: Center | BaseType
  course: Course | BaseType
  startDate?: Date
  endDate?: Date
  lectureStartTime?: string
  lectureEndTime?: string
}

const handler = getHandler()

jagql.define<Batch>({
  handlers: new ValidateIdHandler().chain(handler),
  resource: 'batches',
  namespace: 'cb',
  primaryKey: 'string',
  attributes: {
    id: Joi.string().max(8),
    center: Joi.one('centers'),
    course: Joi.one('courses'),
    startDate: Joi.date(),
    endDate: Joi.date(),
    lectureStartTime: Joi.string().length(4).regex(/([01]?[0-9]|2[0-3])[0-5][0-9]/),
    lectureEndTime: Joi.string().length(4).regex(/([01]?[0-9]|2[0-3])[0-5][0-9]/),
  },
  examples: [
    {
      id: 'CBPP18A', type: 'batches',
      course: {type: 'courses', id: 'CB'},
      center: {type: 'centers', id: 'PP'},
      lectureStartTime: '1000', lectureEndTime: '1400',
      startDate: new Date('2018-03-18'),
      endDate: new Date('2018-04-15'),
    },
  ],
})

handler.populate({force: true})
