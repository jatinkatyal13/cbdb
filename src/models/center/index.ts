import jagql, { BaseType } from '@jagql/framework'
import {getHandler} from '../../handlers/sqlHandler'
import {Batch} from '../batch'
import { Member } from '../member'
import validatePhoneHandler from './validatePhoneHandler'

const Joi = jagql.Joi
const handler = getHandler()

export interface Center {
  name: string
  id: string
  contactNo: string // validate via google-libphonenumber
  email: string // Joi email
  batches: Array<Batch | BaseType>
  googleMapLink: string // url
  incharge: Member | BaseType
}

jagql.define<Center>({
  resource: 'centers',
  primaryKey: 'string',
  handlers: new validatePhoneHandler().chain(handler),
  namespace: 'cb',
  attributes: {
    name: Joi.string(),
    id: Joi.string().required(),
    contactNo: Joi.string(),
    email: Joi.string().email(),
    batches: Joi.belongsToMany({ resource: 'batches', as: 'center' }),
    googleMapLink: Joi.string().uri(),
    incharge: Joi.belongsToMany({ resource: 'members', as: 'center' }),
  },
  examples: [
  ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
