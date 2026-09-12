import express from 'express'
import cors from 'cors'
import pool from './db.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// GET - devuelve todos los posts
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// POST - agrega un nuevo post
app.post('/posts', async (req, res) => {
  const { titulo, img, descripcion } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *',
      [titulo, img, descripcion]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

