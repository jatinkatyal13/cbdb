import jagql, { BaseType, Joi } from '@jagql/framework'
import { type } from 'os'
import { Course } from '.'
import { getHandler } from '../../handlers/sqlHandler'

export interface CourseFeature {
    id: string
    title: string
    icon: string
    description: string
    course: Course | BaseType
}

const handler = getHandler()

jagql.define<CourseFeature>({
    handlers: handler,
    resource: 'course_features',
    namespace: 'cb',
    primaryKey: 'autoincrement',
    attributes: {
        id: Joi.string(),
        title: Joi.string().max(40).required(),
        icon: Joi.string(),
        description: Joi.string(),
        course: Joi.one('courses'),
    },
    examples: [
        {
            id: '1',
            title: 'Fundamentals',
            icon: 'code',
            description: `We have designed our course keeping in mind the requirements of beginners.Course starts with fundamentals of logic building and problem solving.`,
            course: {type: 'courses', id: 'CB'},
            type: 'course_features',
        },
        {
            id: '2',
            title: 'Fundamentals',
            icon: 'code',
            description: `We have designed our course keeping in mind the requirements of beginners.Course starts with fundamentals of logic building and problem solving.`,
            course: {type: 'courses', id: 'CB'},
            type: 'course_features',
        },
        {
            id: '3',
            title: 'Fundamentals',
            icon: 'code',
            description: `We have designed our course keeping in mind the requirements of beginners.Course starts with fundamentals of logic building and problem solving.`,
            course: {type: 'courses', id: 'CB'},
            type: 'course_features',
        },
        {
            id: '4',
            title: 'Fundamentals',
            icon: 'code',
            description: `We have designed our course keeping in mind the requirements of beginners.Course starts with fundamentals of logic building and problem solving.`,
            course: {type: 'courses', id: 'CB'},
            type: 'course_features',
        },
    ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
