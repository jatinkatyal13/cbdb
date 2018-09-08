import jagql from '@jagql/framework'
import {BaseType} from '../../node_modules/@jagql/framework/types/ResourceConfig'
import {getHandler} from '../handlers/sqlHandler'
import {Batch} from './batch'

const Joi = jagql.Joi
const handler = getHandler()

export interface Teacher {
  id: string
  name: string
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
    batches: Joi.belongsToMany({resource: 'batches', as: 'teachers'}),
  },
  examples: [
    {id: 'PN', name: 'Prateek Narang', type: 'teachers'},
    {id: 'GC', name: 'Garima Chhikara', type: 'teachers'},
    {id: 'RK', name: 'Rishab Kapoor', type: 'teachers'},
  ],
})

handler.populate({force: true})
