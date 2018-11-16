import jagql from '@jagql/framework'
import { getHandler } from '../handlers/sqlHandler'
import { Batch } from './batch'

const Joi = jagql.Joi

export interface Course {
  name: string
  id: string
  tagline?: string
  description?: string
  hasOnline: boolean
  hasOffline: boolean
  batches?: Batch[]
}

const handler = getHandler()

jagql.define<Course>({
  handlers: handler,
  resource: 'courses',
  namespace: 'cb',
  primaryKey: 'string',
  attributes: {
    name: Joi.string().max(30).required(),
    id: Joi.string().length(2),
    batches: Joi.belongsToMany({ resource: 'batches', as: 'course' }),
    hasOnline: Joi.boolean().default(false),
    hasOffline: Joi.boolean().default(false),
  },
  examples: [
    { type: 'courses', name: 'C++ for Beginners', id: 'CB', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Java for Beginners', id: 'JB', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'LaunchPad', id: 'LP', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Crux', id: 'CX', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Algo++', id: 'AP', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Algo.Java', id: 'AJ', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Android', id: 'AD', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Web Development in NodeJS', id: 'WN', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Machine Learning', id: 'ML', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Python for Beginners', id: 'PY', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Web Development in Django', id: 'WD', hasOffline: true, hasOnline: false },
    { type: 'courses', name: 'Python for Data Science', id: 'PD', hasOffline: false, hasOnline: false },
    { type: 'courses', name: 'Complete Interview Prep C++', id: 'IC', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Complete Interview Prep Java', id: 'IJ', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Interview Prep', id: 'IP', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Competitive Coding', id: 'CC', hasOffline: true, hasOnline: true },
    { type: 'courses', name: 'Advanced Java', id: 'JA', hasOffline: true, hasOnline: false },
    { type: 'courses', name: 'Core Java', id: 'JC', hasOffline: true, hasOnline: false },
  ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
