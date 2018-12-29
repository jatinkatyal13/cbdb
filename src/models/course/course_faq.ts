import jagql, { BaseType, Joi } from '@jagql/framework'
import { Course } from '.'
import { getHandler } from '../../handlers/sqlHandler'

export interface CourseFAQ {
    id: string
    question: string
    answer: string
    courses?: Array<Course | BaseType>
}

const handler = getHandler()

jagql.define<CourseFAQ>({
    handlers: handler,
    resource: 'course_faqs',
    namespace: 'cb',
    primaryKey: 'autoincrement',
    attributes: {
        id: Joi.string(),
        question: Joi.string(),
        answer: Joi.string(),
        courses: Joi.many('courses'),
    },
    examples: [
        {
            id: '1',
            question: 'What is JS?',
            answer: 'JS is a sweet hell !',
            courses: [
                { type: 'courses', id: 'CB' },
            ],
            type: 'course_faqs',
        },
        {
            id: '2',
            question: 'What is TS?',
            answer: 'Life saver maybe !',
            courses: [
                { type: 'courses', id: 'CB' },
            ],
            type: 'course_faqs',
        },
    ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
