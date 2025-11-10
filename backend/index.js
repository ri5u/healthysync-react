const express = require('express')
const cors = require('cors')

const authRouter = require('./routes/auth')
const orgRouter = require('./routes/organizations')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json({ limit: '5mb' }))

app.use('/api/auth', authRouter)
app.use('/api/organizations', orgRouter)

app.get('/health', (req, res) => res.json({ ok: true }))

// Export the app for serverless wrappers (Vercel functions) and also allow
// starting a standalone server when run directly (node index.js)
module.exports = app

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`HealthSync backend listening on port ${PORT}`)
  })
}
