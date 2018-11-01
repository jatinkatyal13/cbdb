import debug from 'debug'
import Sequelize from 'sequelize'
import { tokenDefinition, userDefinition } from './models'

const log = debug('cbdb:sequelize')
const sequelize = new Sequelize({
  database: 'cbdb',
  username: 'cbdbuser',
  password: 'cbdbpass',
  dialect: 'postgres',
  logging: log,
})

const User = sequelize.define('user', userDefinition)
const Token = sequelize.define('token', tokenDefinition)

Token.belongsTo(User)

export {
  sequelize,
  User,
  Token,
}
