import jagql, {BaseType} from '@jagql/framework'
import {getHandler} from '../handlers/sqlHandler'
import {Course} from './course'

const Joi = jagql.Joi

export interface Batch {
  course: Course | BaseType,
  startDate?: Date
  endDate?: Date
  lectureStartTime?: string
  lectureEndTime?: string
}

const handler = getHandler()

jagql.define<Batch>({
  handlers: handler,
  resource: 'batches',
  namespace: 'cb',
  primaryKey: 'autoincrement',
  attributes: {
    course: Joi.one('courses'),
    startDate: Joi.date(),
    endDate: Joi.date(),
    lectureStartTime: Joi.string(),
    lectureEndTime: Joi.string()
  },
  examples: [
    {
      id: "1", type: "batches",
      course: {type: "courses", id: "3"},
      lectureStartTime: "1000", lectureEndTime: "1400",
      startDate: new Date("2018-03-18"),
      endDate: new Date("2018-04-15")
    }
  ]
})

handler.populate({force: true})