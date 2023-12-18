import type { Express } from 'express'
import ProductRoutes from './ProductRoutes'

export const loadRoutes = (app: Express): void => {
  app.use('/api/v1/product', [], ProductRoutes)
}
