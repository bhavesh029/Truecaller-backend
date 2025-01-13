import { Sequelize } from 'sequelize-typescript'
import { User } from './schemas/User'
import { Directory } from './schemas/Directory'
import dotenv from 'dotenv'
import { Spam } from './schemas/Spam'
dotenv.config()

const sequelize = new Sequelize({
    dialect: 'postgres', // or your database dialect
    host: process.env.DB_HOST || 'localhost', // your database host
    username: process.env.DB_USER || 'postgres', // your database username
    password: process.env.DB_PASSWORD || 'postgres', // your database password
    database: process.env.DB_NAME || 'postgres', // your database name
    models: [User, Directory, Spam], // Add your models here
    logging: console.log, // Disable logging if unnecessary
})

export default sequelize
