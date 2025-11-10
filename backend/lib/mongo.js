const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI || process.env.MONGODB_URL || ''
const dbName = process.env.MONGODB_DB || 'healthsync'

/**
 * Cached client across hot reloads
 */
let cached = global.__HS_MONGO_CACHED

async function getDb() {
  if (!uri) return null
  if (cached) return cached.db

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(dbName)
  cached = { client, db }
  global.__HS_MONGO_CACHED = cached
  return db
}

module.exports = getDb
