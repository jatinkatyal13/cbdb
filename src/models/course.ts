import jagql from '@jagql/framework'
import {getHandler} from '../handlers/sqlHandler'
import {Batch} from './batch'

const Joi = jagql.Joi

export interface Course {
  name: string
  id: string
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
    batches: Joi.belongsToMany({resource: 'batches', as: 'course'}),
  },
  examples: [
    {type: 'courses', name: 'C++ for Beginners', id: 'CB'},
    {type: 'courses', name: 'Java for Beginners', id: 'JB'},
    {type: 'courses', name: 'LaunchPad', id: 'LP'},
    {type: 'courses', name: 'Crux', id: 'CX'},
    {type: 'courses', name: 'Algo++', id: 'AP'},
    {type: 'courses', name: 'Algo.Java', id: 'AJ'},
    {type: 'courses', name: 'Android', id: 'AD'},
    {type: 'courses', name: 'Web Development in NodeJS', id: 'WN'},
    {type: 'courses', name: 'Machine Learning', id: 'ML'},
    {type: 'courses', name: 'Python for Beginners', id: 'PY'},
    {type: 'courses', name: 'Web Development in Django', id: 'WD'},
    {type: 'courses', name: 'Python for Data Science', id: 'PD'},
    {type: 'courses', name: 'Complete Interview Prep C++', id: 'IC'},
    {type: 'courses', name: 'Complete Interview Prep Java', id: 'IJ'},
    {type: 'courses', name: 'Interview Prep', id: 'IP'},
    {type: 'courses', name: 'Competitive Coding', id: 'CC'},
    {type: 'courses', name: 'Advanced Java', id: 'JA'},
    {type: 'courses', name: 'Core Java', id: 'JC'},
  ],
})

handler.populate({force: true})
