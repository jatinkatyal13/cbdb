import jagql, { BaseType, Joi } from '@jagql/framework'
import { Course } from '.'
import { getHandler } from '../../handlers/sqlHandler'

export interface CourseFAQ {
    question: string
    answer: string
    course: Array<Course | BaseType>
}

const handler = getHandler()

jagql.define<CourseFAQ>({
    handlers: handler,
    resource: 'course_faq',
    namespace: 'cb',
    primaryKey: 'autoincrement',
    attributes: {
        question: Joi.string(),
        answer: Joi.string(),
        course: Joi.many('courses'),
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
