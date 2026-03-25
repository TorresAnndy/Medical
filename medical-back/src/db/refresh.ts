import pool from './connection';

const refreshDatabase = async () => {
  try {
    console.log('⚠️ Eliminando tablas...');

    // 🔥 Orden importante (por FK)
    await pool.query(`DROP TABLE IF EXISTS appointments CASCADE;`);
    await pool.query(`DROP TABLE IF EXISTS users CASCADE;`);
    await pool.query(`DROP TABLE IF EXISTS roles CASCADE;`);

    console.log('✅ Tablas eliminadas');

    console.log('🚀 Ejecutando migraciones...');

    // 🔥 Ejecutar migraciones manualmente
    await pool.query(`
      CREATE TABLE roles (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(150) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await pool.query(`
      CREATE TABLE appointments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        patient_name VARCHAR(150) NOT NULL,
        doctor_name VARCHAR(150) NOT NULL,
        appointment_date TIMESTAMP NOT NULL,
        reason TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'pendiente',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('✅ Migraciones ejecutadas');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error en refresh:', error);
    process.exit(1);
  }
};

refreshDatabase();