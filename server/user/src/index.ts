import express from 'express'
import type { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import NotFoundRoute from './middlewares/NotFoundHandler'
import ErrorHandlerMiddleware from './middlewares/ErrorHandler'
import { loadRoutes } from './routes'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(helmet())

const port: number = Number(process.env.PORT) ?? 3000

// Routes
loadRoutes(app)

app.use(NotFoundRoute)
app.use(ErrorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
