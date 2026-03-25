import pool from '../db/connection';
import bcrypt from 'bcryptjs';

const seedUsers = async () => {
  try {
    console.log('🌱 Insertando usuarios...');

    const roles = await pool.query(`SELECT * FROM roles`);

    const adminRole = roles.rows.find(r => r.name === 'admin');
    const doctorRole = roles.rows.find(r => r.name === 'doctor');
    const patientRole = roles.rows.find(r => r.name === 'patient');

    const password = await bcrypt.hash('123456', 10);

    await pool.query(`
      INSERT INTO users (name, email, password, role_id)
      VALUES 
        ('Admin User', 'admin@test.com', $1, $2),
        ('Dr. House', 'doctor@test.com', $1, $3),
        ('Paciente Demo', 'patient@test.com', $1, $4)
      ON CONFLICT (email) DO NOTHING;
    `, [
      password,
      adminRole.id,
      doctorRole.id,
      patientRole.id
    ]);

    console.log('✅ Usuarios insertados');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error en seed users:', error);
    process.exit(1);
  }
};

seedUsers();