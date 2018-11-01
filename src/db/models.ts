import Sequelize, { DefineModelAttributes } from 'sequelize'

export interface UserAttributes {
  id: number
  username: string
  role: 'admin' | 'employee' | 'intern' | 'student' | null
}

export interface TokenAttributes {
  id: string
  oneauthToken: string
  type: 'user' | 'client'
  userId?: number
  user?: UserAttributes
}

export const userDefinition: DefineModelAttributes<UserAttributes> = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.ENUM('admin', 'employee', 'intern', 'student'),
  },
}

export const tokenDefinition: DefineModelAttributes<TokenAttributes> = {
  id: {
    type: Sequelize.STRING(32),
    primaryKey: true,
  },
  oneauthToken: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.ENUM('client', 'user'),
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
}
