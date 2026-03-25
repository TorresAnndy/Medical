import pool from './connection';

const createUsersTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(150) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Tabla "users" creada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear la tabla:', error);
    process.exit(1);
  }
};

createUsersTable();