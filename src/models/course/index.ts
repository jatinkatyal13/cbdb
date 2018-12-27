import jagql from '@jagql/framework'
import { getHandler } from '../../handlers/sqlHandler'
import { Batch } from '../batch'
import { Member } from '../member'
import { CourseFAQ } from './course_faq'
import { CourseFeature } from './course_feature'
import { CourseReview } from './course_review'
import { CourseTopics } from './course_topics'

const Joi = jagql.Joi

export type CourseType = 'offline' | 'online'

export interface Course {
  name: string
  id: string
  tagline?: string
  description?: string
  courseType: CourseType
  batches: Batch[]
  features: CourseFeature[]
  topics: CourseTopics[]
  mentors: Member[]
  faq: CourseFAQ[]
  reviews: CourseReview[]
}

const handler = getHandler()

jagql.define<Course>({
  handlers: handler,
  resource: 'courses',
  namespace: 'cb',
  primaryKey: 'string',
  attributes: {
    name: Joi.string().max(30).required(),
    id: Joi.string().length(2),
    tagline: Joi.string(),
    description: Joi.string(),
    courseType: Joi.string().allow('offline', 'online'),
    batches: Joi.belongsToMany({ resource: 'batches', as: 'course' }),
    features: Joi.belongsToMany({ resource: 'course_features', as: 'course' }),
    topics: Joi.belongsToMany({ resource: 'course_topics', as: 'course' }),
    faq: Joi.belongsToMany({ resource: 'course_faq', as: 'course' }),
    reviews: Joi.belongsToMany({ resource: 'course_review', as: 'course' }),
    mentors: Joi.belongsToMany({ resource: 'members', as: 'courses'}),
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
