import jagql, { BaseType, Joi } from '@jagql/framework'
import { getHandler } from '../../handlers/sqlHandler'
import { CourseTopics } from './course_topics'

const handler = getHandler()

export interface CourseSubtopic {
    id: string
    content: string
    course_topic: CourseTopics | BaseType
}

jagql.define<CourseSubtopic>({
    handlers: handler,
    resource: 'course_subtopics',
    namespace: 'cb',
    primaryKey: 'autoincrement',
    attributes: {
        id: Joi.string(),
        content: Joi.string(),
        course_topic: Joi.one('course_topics'),
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
