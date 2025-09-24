import express from 'express'
import eventData from '../data/events.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// GET /events - return all events as JSON
router.get('/', (req, res) => {
  res.status(200).json(eventData)
})

// GET /events/api/:eventId - return JSON for a specific event
router.get('/api/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId)
  const event = eventData.find(event => event.id === eventId)
  
  if (event) {
    res.status(200).json(event)
  } else {
    res.status(404).json({ error: 'Event not found' })
  }
})

// GET /events/:eventId - serve HTML page for individual events
router.get('/:eventId', (req, res) => {
  const eventId = parseInt(req.params.eventId)
  const event = eventData.find(event => event.id === eventId)
  
  if (event) {
    res.sendFile(path.join(__dirname, '../../client/public/event.html'))
  } else {
    // Serve 404 page if event not found
    res.sendFile(path.join(__dirname, '../../client/public/404.html'))
  }
})

export default router