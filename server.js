import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { logger } from './services/logger.service.js'
import { dbService } from './services/db.service.js'

import { authRoutes } from './api/auth/auth.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import { roleRoutes } from './api/role/role.routes.js'
import { categoryRoutes } from './api/category/category.routes.js'
import { cropRoutes } from './api/crop/crop.routes.js'
import { customerRoutes } from './api/customer/customer.routes.js'
import { customerorderRoutes } from './api/customer-order/customer-order.routes.js'
import { customerorderitemRoutes } from './api/customer-order-item/customer-order-item.routes.js'
import { deliveryRoutes } from './api/delivery/delivery.routes.js'
import { deliveryassignmentRoutes } from './api/delivery-assignment/delivery-assignment.routes.js'
import { employeesintasksRoutes } from './api/employees-in-tasks/employees-in-tasks.routes.js'
import { fieldRoutes } from './api/field/field.routes.js'
import { fieldoperationRoutes } from './api/field-operation/field-operation.routes.js'
import { inventoryalertRoutes } from './api/inventory-alert/inventory-alert.routes.js'
import { inventoryinwarehouseRoutes } from './api/inventory-in-warehouse/inventory-in-warehouse.routes.js'
import { itemsallowedinwarehouseRoutes } from './api/items-allowed-in-warehouse/items-allowed-in-warehouse.routes.js'
import { logRoutes } from './api/log/log.routes.js'
import { sampletypeRoutes } from './api/sample-type/sample-type.routes.js'
import { sowingandharvestRoutes } from './api/sowing-and-harvest/sowing-and-harvest.routes.js'
import { taskRoutes } from './api/task/task.routes.js'
import { truckRoutes } from './api/truck/truck.routes.js'
import { warehouseRoutes } from './api/warehouse/warehouse.routes.js'
import { weighingreportRoutes } from './api/weighing-report/weighing-report.routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

logger.info('server.js loaded...')

const app = express()

// Express App Config
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  }
  app.use(cors(corsOptions))
}

// Example route
app.get('/api/comments', async (req, res) => {
  try {
    const collection = await dbService.getCollection('comments')
    const comments = await collection.find().limit(20).toArray()
    res.json(comments)
  } catch (err) {
    logger.error('❌ Error fetching comments:', err)
    res.status(500).send('Error fetching comments')
  }
})

// routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/role', roleRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/crop', cropRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/customer-order', customerorderRoutes)
app.use('/api/customer-order-item', customerorderitemRoutes)
app.use('/api/delivery', deliveryRoutes)
app.use('/api/delivery-assignment', deliveryassignmentRoutes)
app.use('/api/employees-in-tasks', employeesintasksRoutes)
app.use('/api/field', fieldRoutes)
app.use('/api/field-operation', fieldoperationRoutes)
app.use('/api/inventory-alert', inventoryalertRoutes)
app.use('/api/inventory-in-warehouse', inventoryinwarehouseRoutes)
app.use('/api/items-allowed-in-warehouse', itemsallowedinwarehouseRoutes)
app.use('/api/log', logRoutes)
app.use('/api/sample-type', sampletypeRoutes)
app.use('/api/sowing-and-harvest', sowingandharvestRoutes)
app.use('/api/task', taskRoutes)
app.use('/api/truck', truckRoutes)
app.use('/api/warehouse', warehouseRoutes)
app.use('/api/weighing-report', weighingreportRoutes)

// SPA fallback
app.get('/*all', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

const port = process.env.PORT || 3030
app.listen(port, () => {
  logger.info('🚀 Server is running on: http://localhost:' + port)
})
