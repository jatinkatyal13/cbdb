import jagql, { BaseType, Joi } from '@jagql/framework'
import { Course } from '.'
import { getHandler } from '../../handlers/sqlHandler'

export interface CourseFeature {
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
        title: Joi.string().max(40).required(),
        icon: Joi.string(),
        description: Joi.string(),
        course: Joi.one('courses'),
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
