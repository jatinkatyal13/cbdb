import SqlStore from '@jagql/store-sequelize'
import debug from 'debug'

const log = debug('cbdb:sqlhandler')
export const getHandler = () => new SqlStore({
  database: 'cbdb',
  username: 'cbdbuser',
  password: 'cbdbpass',
  dialect: 'postgres',
  logging: log,
})
