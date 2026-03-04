import { Router } from 'express'
import { getWebsites, getWebsite, submitWebsite } from '../controllers/websiteController.js'

export const websiteRoutes = Router()

websiteRoutes.get('/', getWebsites)
websiteRoutes.get('/:id', getWebsite)
websiteRoutes.post('/submit', submitWebsite)
