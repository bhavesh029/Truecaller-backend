// src/app.ts
import express from 'express'
import bodyParser from 'body-parser'

import { RegisterRoutes } from './routes'

import * as swaggerJson from './swagger.json'
import * as swaggerUI from 'swagger-ui-express'
import sequelize from './db'
export const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

RegisterRoutes(app)
app.use(
    ['/openapi', '/docs', '/swagger'],
    swaggerUI.serve,
    swaggerUI.setup(swaggerJson)
)

const port = process.env.PORT || 3000

;(async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
        app.listen(port, () =>
            console.log(`Example app listening at http://localhost:${port}`)
        )
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
})()
