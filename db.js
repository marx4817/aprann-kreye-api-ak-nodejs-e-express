const Pool = require('pg').Pool

const pool = new Pool({
  user: 'marxlordeus',
  host: 'localhost',
  database: 'blog_db',
  password: 'Marx4817',
  port: 5432,
})

module.exports = pool