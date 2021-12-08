import express from 'express'

import customerAuthRoutes from './customersAuth'

const router = express.Router()

router.use('/customer', customerAuthRoutes)

export default router