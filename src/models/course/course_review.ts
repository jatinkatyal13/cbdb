import jagql, { BaseType, Joi } from '@jagql/framework'
import { Course } from '.'
import { getHandler } from '../../handlers/sqlHandler'

export interface CourseReview {
    id: string
    reviewer: string
    imageUrl: string // url of image of reviewer
    body: string
    course?: Course | BaseType
    rating: number // [1-10 value, 4.5 stars == 9/10]
    link: string // link to original review location
}

const handler = getHandler()

jagql.define<CourseReview>({
    handlers: handler,
    resource: 'course_reviews',
    namespace: 'cb',
    primaryKey: 'autoincrement',
    attributes: {
        id: Joi.string(),
        reviewer: Joi.string(),
        imageUrl: Joi.string().uri(),
        body: Joi.string(),
        course: Joi.one('courses'),
        rating: Joi.number().min(0).max(10),
        link: Joi.string().uri(),
    },
    examples: [
        {
            id: '1',
            type: 'course_reviews',
            reviewer: 'Jatin Katyal',
            imageUrl: 'https://www.google.com',
            body: 'Android course is LIT AF',
            course: { type: 'courses', id: 'CB' },
            rating: 10,
            link: 'https://www.google.com',
        },
    ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
