import type { Express } from 'express'
import UserRoutes from './UserRoutes'

export const loadRoutes = (app: Express): void => {
  app.use('/api/v1/user', [], UserRoutes)
}
