import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: 'admin',
  database: 'likeme',
  port: 5432,
  allowExitOnIdle: true
})

export default pool

// Requerimiento 1 & 3: Modificar registro (incrementar likes) con try/catch
export const modifyLike = async (id) => {
  try {
    const query = "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *";
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error al aumentar el like:", error.message);
    throw error;
  }
};

// Requerimiento 2 & 3: Eliminar registro con try/catch
export const removePost = async (id) => {
  try {
    const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    console.error("Error al eliminar el post:", error.message);
    throw error;
  }
}
