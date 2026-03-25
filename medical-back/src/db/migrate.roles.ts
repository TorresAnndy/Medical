import pool from './connection';

const createRolesTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS roles (
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL
    );
  `;

  try {
    await pool.query(query);

    console.log('✅ Tabla "roles" creada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear la tabla roles:', error);
    process.exit(1);
  }
};

createRolesTable();