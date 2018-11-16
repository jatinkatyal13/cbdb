import jagql from '@jagql/framework'
import { BaseType } from '../../node_modules/@jagql/framework/types/ResourceConfig'
import { getHandler } from '../handlers/sqlHandler'
import { Batch } from './batch'

const Joi = jagql.Joi
const handler = getHandler()

export interface Teacher {
  id: string
  name: string
  designation?: string
  email: string
  batches?: Array<Batch | BaseType>
}

jagql.define<Teacher>({
  handlers: handler,
  namespace: 'cb',
  resource: 'teachers',
  primaryKey: 'string',
  attributes: {
    name: Joi.string().required(),
    id: Joi.string().length(2),
    email: Joi.string().email().required(),
    designation: Joi.string(),
    batches: Joi.belongsToMany({ resource: 'batches', as: 'teachers' }),
  },
  examples: [
    {
      id: 'PN',
      name: 'Prateek Narang',
      type: 'teachers',
      email: 'prateek@codingblocks.com',
      designation: 'Lead Instructor',
    },
    {
      id: 'GC',
      name: 'Garima Chhikara',
      type: 'teachers',
      email: 'garima.chhikara@codingblocks.com',
      designation: 'Senior Mentor',
    },
    {
      id: 'RK',
      name: 'Rishab Kapoor',
      type: 'teachers',
      email: 'rishab.kapoor@codingblocks.com',
      designation: 'Senior Mentor',
    },
    {
      id: 'PA',
      name: 'Piyush Ajmani',
      type: 'teachers',
      email: 'piyush.ajmani@codingblocks.com',
      designation: 'Mentor',
    },
  ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
