import express from 'express'
import cors from 'cors'
import pool from './db.js'
import { modifyLike, removePost } from './db.js';

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

// Requerimiento 1: Ruta PUT para modificar registro (aumentar likes)
app.put('/posts/like/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await modifyLike(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Error interno al actualizar el post");
  }
});

// Requerimiento 2: Ruta DELETE para eliminar registro
app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removePost(id);
    res.status(200).send("Post eliminado con éxito");
  } catch (error) {
    res.status(500).send("Error interno al eliminar el post");
  }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

