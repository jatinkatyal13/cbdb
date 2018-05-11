import debug from 'debug'
import SqlStore from '@jagql/store-sequelize'

const log = debug('cbdb:sqlhandler')
export const getHandler = () => new SqlStore({
  database: 'cbdb',
  username: 'cbdbuser',
  password: 'cbdbpass',
  dialect: 'postgres',
  logging: log
})