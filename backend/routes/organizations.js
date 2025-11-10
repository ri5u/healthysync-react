const express = require('express')
const getDb = require('../lib/mongo')

const router = express.Router()

const seedOrgs = [
  { name: 'Community Clinic A', slug: 'community-clinic-a' },
  { name: 'General Hospital B', slug: 'general-hospital-b' },
  { name: 'Independent Practice C', slug: 'independent-practice-c' },
]

router.get('/', async (req, res) => {
  try {
    const db = await getDb()
    if (!db) return res.json({ organizations: seedOrgs.map((o, i) => ({ id: `org-${i + 1}`, name: o.name })) })

    const col = db.collection('organizations')
    const count = await col.countDocuments()
    if (count === 0) {
      await col.insertMany(seedOrgs.map(o => ({ name: o.name, slug: o.slug, createdAt: new Date() })))
    }

    const docs = await col.find().toArray()
    const organizations = docs.map(d => ({ id: String(d._id), name: d.name }))
    return res.json({ organizations })
  } catch (err) {
    console.error('organizations GET error', err)
    return res.json({ organizations: seedOrgs.map((o, i) => ({ id: `org-${i + 1}`, name: o.name })) })
  }
})

module.exports = router
