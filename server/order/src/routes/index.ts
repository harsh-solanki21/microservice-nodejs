import type { Express } from 'express'
import OrderRoutes from './OrderRoutes'

export const loadRoutes = (app: Express): void => {
  app.use('/api/v1/order', [], OrderRoutes)
}
