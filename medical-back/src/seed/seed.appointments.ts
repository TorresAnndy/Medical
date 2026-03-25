import pool from '../db/connection';

const seedAppointments = async () => {
  try {
    console.log('🌱 Insertando citas...');

    const users = await pool.query(`SELECT * FROM users`);

    const patient = users.rows.find(u => u.email === 'patient@test.com');
    const doctor = users.rows.find(u => u.email === 'doctor@test.com');

    await pool.query(`
      INSERT INTO appointments (
        patient_name,
        doctor_name,
        appointment_date,
        reason,
        status
      )
      VALUES 
        ('Paciente Demo', 'Dr. House', NOW() + INTERVAL '1 day', 'Chequeo general', 'pendiente'),
        ('Paciente Demo', 'Dr. House', NOW() + INTERVAL '2 days', 'Dolor de cabeza', 'confirmada')
    `);

    console.log('✅ Citas insertadas');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error en seed appointments:', error);
    process.exit(1);
  }
};

seedAppointments();