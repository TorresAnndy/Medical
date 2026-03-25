import pool from './connection';

const createTable = async (): Promise<void> => {
  const query = `
    CREATE TABLE IF NOT EXISTS appointments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      patient_name VARCHAR(150) NOT NULL,
      doctor_name  VARCHAR(150) NOT NULL,
      appointment_date TIMESTAMP NOT NULL,
      reason TEXT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pendiente'
        CHECK (status IN ('pendiente', 'confirmada', 'cancelada')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

  try {
    await pool.query(query);
    console.log('✅ Tabla "appointments" creada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear la tabla:', error);
    process.exit(1);
  }
};

createTable();