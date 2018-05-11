import jagql from '@jagql/framework'
import {getHandler} from '../handlers/sqlHandler'
import {Batch} from './batch'

const Joi = jagql.Joi

export interface Course {
  name: string
  code: string
  batches?: Batch[]
}

const handler = getHandler()

jagql.define<Course>({
  handlers: handler,
  resource: 'courses',
  namespace: 'cb',
  primaryKey: 'autoincrement',
  attributes: {
    name: Joi.string().max(30),
    code: Joi.string().length(3),
    batches: Joi.belongsToMany({resource: 'batches', as: 'course'})
  },
  examples: [
    {id: "1", type: "courses", name: "C++ for Beginners", code: "CPB"},
    {id: "2", type: "courses", name: "Java for Beginners", code: "JVB"},
    {id: "3", type: "courses", name: "LaunchPad", code: "CPP"},
    {id: "4", type: "courses", name: "Crux", code: "CRX"},
    {id: "5", type: "courses", name: "Algo++", code: "APP"},
    {id: "6", type: "courses", name: "Algo.Java", code: "AJV"},
    {id: "7", type: "courses", name: "Android", code: "AND"},
    {id: "8", type: "courses", name: "Web Dev", code: "WEB"},
    {id: "9", type: "courses", name: "Machine Learning", code: "MAL"},
    {id: "10", type: "courses", name: "Python Beg", code: "PYB"},
    {id: "11", type: "courses", name: "Python-Django", code: "PYD"},
    {id: "12", type: "courses", name: "Python for ML", code: "PYM"},
    {id: "13", type: "courses", name: "Interview Prep Bootcamp", code: "IPB"},
    {id: "14", type: "courses", name: "Interview Prep Course", code: "IPC"},
    {id: "15", type: "courses", name: "Competitive Coding", code: "CPC"},
    {id: "16", type: "courses", name: "Advanced Java", code: "JVA"},
    {id: "17", type: "courses", name: "Core Java", code: "JVC"}
  ]
})

handler.populate({force: true})