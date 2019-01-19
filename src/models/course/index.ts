import jagql, { BaseType } from '@jagql/framework'
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
  slug: string
  tagline?: string
  description?: string
  logo?: string
  markedPrice?: number
  courseType: CourseType
  batches?: Array<Batch | BaseType>
  features?: Array<CourseFeature | BaseType>
  topics?: Array<CourseTopics | BaseType>
  mentors?: Array<Member | BaseType>
  faqs?: Array<CourseFAQ | BaseType>
  reviews?: Array<CourseReview | BaseType>
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
    slug: Joi.string(),
    tagline: Joi.string(),
    description: Joi.string().max(2048),
    logo: Joi.string().uri().allow(null),
    markedPrice: Joi.number().allow(null),
    courseType: Joi.string().allow('offline', 'online'),
    batches: Joi.belongsToMany({ resource: 'batches', as: 'course' }),
    features: Joi.belongsToMany({ resource: 'course_features', as: 'course' }),
    topics: Joi.belongsToMany({ resource: 'course_topics', as: 'course' }),
    faqs: Joi.belongsToMany({ resource: 'course_faqs', as: 'courses' }),
    reviews: Joi.belongsToMany({ resource: 'course_reviews', as: 'course' }),
    mentors: Joi.belongsToMany({ resource: 'members', as: 'courses'}),
  },
  examples: [
    {
      type: 'courses',
      name: 'C++ Launchpad',
      id: 'CB',
      slug: 'c-plus-plus-for-beginners',
      tagline: 'Master DS & Algorithms in C++',
      description: `This C++ training course is designed to provide you with a platform from where you can start your journey in the amazing world of programming and software. The beginner's course will include programming fundamentals using C++, Loops, Functions, Arrays, Stacks, Queues, Linked List.

      The advanced course is for all those who are looking forward to sit for internships and placements. The course will involve rigorous practice of questions based on Sorting, Searching, Greedy Algorithms, Divide and Conquer Algorithms, Dynamic Programming along with comprehensive revision of data structures like linked-lists, Trees, Graphs, Heaps, Hashing etc.

      The course will help you become smarter with solutions and ace your programming interviews. C++ is known to be a very powerful language. It allows you to have a lot of control as to how you use computer resources effectively and efficiently better than other languages. Thanks to C++'s performance, it is often used to develop game engines, games, and desktop apps. As a statically typed language, C++ generally does better than dynamically typed languages because the code is type-checked before it is executed. Companies like Google and Facebook, also need C++ developers to optimize their apps or work on their products.`,
      markedPrice: 12000,
      courseType: 'offline',
    },
    {
      type: 'courses',
      name: 'Java Crux',
      id: 'JC',
      slug: 'java-for-beginners',
      tagline: 'Data Structures & Algorithms In Java',
      description: `Begin your career in software development with the introduction to Data Structures and Algorithms in Java with the best Java institute in Delhi and learn from one of the most experienced mentors. Designed for beginners, this is a hands-on course where we focus on developing core programming concepts and equip you to code solutions for complex problems using Java at Coding Blocks, the best institute for programming in Delhi-NCR.

      The course content is firmly designed so as to suit the needs of the students and to help them combat as many obstacles as they’d encounter. The programme allows you to choose between Basic and Crux. You can also opt for Web Development using Java in one of the advanced Java courses.`,
      markedPrice: 12000,
      courseType: 'offline',
    },
    {
      type: 'courses',
      name: 'Java Crux Online',
      id: 'JO',
      slug: 'complete-java-course-online',
      tagline: 'Data Structures & Algorithms In Java',
      description: `Begin your career in software development with the introduction to Data Structures and Algorithms in Java with the best Java institute in Delhi and learn from one of the most experienced mentors. Designed for beginners, this is a hands-on course where we focus on developing core programming concepts and equip you to code solutions for complex problems using Java at Coding Blocks, the best institute for programming in Delhi-NCR.

      The course content is firmly designed so as to suit the needs of the students and to help them combat as many obstacles as they’d encounter. The programme allows you to choose between Basic and Crux. You can also opt for Web Development using Java in one of the advanced Java courses.`,
      markedPrice: 12000,
      courseType: 'online',
    },
  ],
})

if (process.env.DB_POPULATE) {
  handler.populate({
    force: (process.env.DB_POPULATE === 'force'),
    alter: (process.env.DB_POPULATE === 'alter'),
  })
}
