import jagql, { BaseType, Joi } from '@jagql/framework'
import { Course } from '../'
import { getHandler } from '../../../handlers/sqlHandler'
import validateLectureAndDurationHandler from './validateLectureAndDurationHandler'

export interface CourseTopics {
    id: string
    title: string
    description: string
    maxLectures: number
    minLectures: number
    maxDuration: number
    minDuration: number
    subtopics?: string[]
    course?: Course | BaseType
}

const handler = getHandler()

jagql.define<CourseTopics>({
    handlers: new validateLectureAndDurationHandler().chain(handler),
    resource: 'course_topics',
    namespace: 'cb',
    primaryKey: 'autoincrement',
    attributes: {
        id: Joi.string(),
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
        {
            id: '1',
            title: 'Getting started',
            description: 'You will get started with python',
            maxLectures: 10,
            minLectures: 5,
            maxDuration: 100,
            minDuration: 50,
            course: {type: 'courses', id: 'CB'},
            type: 'course_topics',
        },
    ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
