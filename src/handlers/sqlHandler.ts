import SqlStore from '@jagql/store-sequelize'
import { sequelize } from '../db'

export const getHandler = () => new SqlStore({
  sequelize,
})
