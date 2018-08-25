import jagql from '@jagql/framework'
import {getHandler} from '../handlers/sqlHandler'
import {Batch} from './batch'

const Joi = jagql.Joi
const handler = getHandler()

export interface Center {
  name: string
  id: string
  contactNo?: string
  email?: string
  batches?: Batch[]
}

jagql.define<Center>({
  resource: 'centers',
  primaryKey: 'string',
  handlers: handler,
  namespace: 'cb',
  attributes: {
    name: Joi.string().required(),
    id: Joi.string().length(2).required(),
    contactNo: Joi.string().allow(null),
    email: Joi.string().email().allow(null),
    batches: Joi.belongsToMany({resource: 'batches', as: 'center'}),
  },
  examples: [
    {id: 'PP', name: 'Pitampura', type: 'centers'},
    {id: 'DW', name: 'Dwarka', type: 'centers'},
    {id: 'ND', name: 'Noida', type: 'centers'},
    {id: 'GN', name: 'Greater Noida', type: 'centers'},
    {id: 'JP', name: 'Jaipur', type: 'centers'},
    {id: 'JB', name: 'Jabalpur', type: 'centers'},
    {id: 'LD', name: 'Ludhiana', type: 'centers'},
    {id: 'OL', name: 'Online', type: 'centers'},
  ],
})

handler.populate({force: true})
