import express from 'express'
import eventsRouter from './routes/events.js'

const app = express()

// servers files from public
app.use('/public', express.static('./public'))

// serves files from public/scripts
app.use('/scripts', express.static('./public/scripts'))

// handles rout for the route url 
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Listicle</h1>')
})

app.use('/events', eventsRouter)

// Port declaration
const PORT = process.env.PORT || 3001
    
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`)
})
