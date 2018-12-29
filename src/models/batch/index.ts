import jagql, {BaseType} from '@jagql/framework'
import {getHandler} from '../../handlers/sqlHandler'
import {Center} from '../center'
import {Course} from '../course'
import { Member } from '../member'
import ValidateIdHandler from './validateIdHandler'

const Joi = jagql.Joi

export interface Batch {
  id: string
  name: string
  markedPrice: number
  sellPrice: number
  center?: Center | BaseType
  course?: Course | BaseType
  startDate?: Date
  endDate?: Date
  lectureStartTime?: string
  lectureEndTime?: string,
  teachers?: Array<Member | BaseType>
}

const handler = getHandler()

jagql.define<Batch>({
  handlers: new ValidateIdHandler().chain(handler),
  resource: 'batches',
  namespace: 'cb',
  primaryKey: 'string',
  attributes: {
    id: Joi.string().max(8).required(),
    name: Joi.string().required(),
    markedPrice: Joi.number(),
    sellPrice: Joi.number(),
    center: Joi.one('centers'),
    course: Joi.one('courses'),
    teachers: Joi.many('members'),
    startDate: Joi.date(),
    endDate: Joi.date(),
    lectureStartTime: Joi.string().length(4).regex(/([01]?[0-9]|2[0-3])[0-5][0-9]/),
    lectureEndTime: Joi.string().length(4).regex(/([01]?[0-9]|2[0-3])[0-5][0-9]/),
  },
  examples: [
    {
      id: 'CBPP18S1', type: 'batches',
      name: 'C++ Beginners Pitampura 2018 Summer',
      markedPrice: 599900, sellPrice: 399900,
      lectureStartTime: '1000', lectureEndTime: '1400',
      startDate: new Date('2018-03-18'),
      endDate: new Date('2018-04-15'),
      teachers: [
        {type: 'members', id: 'PN'},
      ],
      course: { type: 'courses', id: 'CB' },
      center: { type: 'centers', id: 'PP' },
    },
    {
      id: 'JBPP18S1', type: 'batches',
      name: 'Java Beginners Pitampura 2018 Summer',
      markedPrice: 599900, sellPrice: 399900,
      lectureStartTime: '0800', lectureEndTime: '1200',
      startDate: new Date('2018-03-18'),
      endDate: new Date('2018-04-15'),
      teachers: [
        {type: 'members', id: 'GC' },
      ],
      course: { type: 'courses', id: 'JC'},
      center: { type: 'centers', id: 'ND' },
    },
  ],
})

handler.populate({force: true})
