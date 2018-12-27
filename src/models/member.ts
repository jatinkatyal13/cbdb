import jagql, { BaseType, Joi } from '@jagql/framework'
import { getHandler } from '../handlers/sqlHandler'
import { Center } from './center'
import { Course } from './course'

export type MemberType = 'employee' | 'admin' | 'intern'

export interface Member {
    id: string // size = 2 to create teacher code
    name: string
    bio?: string
    imageUrl?: string // url to image location
    designation?: string
    role: MemberType
    featured?: boolean
    order: number
    center?: Center | BaseType
    courses?: Array<Course | BaseType>
}

const handler = getHandler()

jagql.define<Member>({
    handlers: handler,
    resource: 'members',
    namespace: 'cb',
    primaryKey: 'string',
    attributes: {
        id: Joi.string().max(2),
        name: Joi.string(),
        bio: Joi.string().allow(null),
        imageUrl: Joi.string().uri().allow(null),
        designation: Joi.string().allow(null),
        role: Joi.string().allow(['employee', 'admin', 'intern']),
        featured: Joi.bool().allow(null),
        order: Joi.number(),
        center: Joi.one('centers').allow(null),
        courses: Joi.many('courses'),
    },
    examples: [
        {
            id: 'PN',
            name: 'Prateek Narang',
            type: 'members',
            role: 'admin',
            designation: 'Lead Instructor',
            order: 0,
        },
        {
            id: 'GC',
            name: 'Garima Chhikara',
            type: 'members',
            role: 'employee',
            designation: 'Senior Mentor',
            order: 1,
        },
    ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
