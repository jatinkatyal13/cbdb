import jagql, { BaseType, Joi } from '@jagql/framework'
import { Course } from '.'
import { getHandler } from '../../handlers/sqlHandler'

export interface CourseTopics {
    title: string
    description: string
    maxLectures: number
    minLectures: number
    maxDuration: number
    minDuration: number
    subtopics: string[]
    course: Course | BaseType
}

const handler = getHandler()

jagql.define<CourseTopics>({
    handlers: handler,
    resource: 'course_topics',
    namespace: 'cb',
    primaryKey: 'autoincrement',
    attributes: {
        title: Joi.string().max(30).required(),
        description: Joi.string(),
        maxLectures: Joi.number(),
        minLectures: Joi.number(),
        maxDuration: Joi.number(),
        minDuration: Joi.number(),
        subtopics: Joi.belongsToMany({ resource: 'course_subtopics', as: 'course_topic' }),
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
