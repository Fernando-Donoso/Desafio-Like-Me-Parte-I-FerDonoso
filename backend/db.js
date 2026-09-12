import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'likeme',
  port: 5432
})

export default pool