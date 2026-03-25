import pool from '../db/connection';

const seedRoles = async () => {
  try {
    console.log('🌱 Insertando roles...');

    await pool.query(`
      INSERT INTO roles (name)
      VALUES 
        ('admin'),
        ('doctor'),
        ('patient')
      ON CONFLICT (name) DO NOTHING;
    `);

    console.log('✅ Roles insertados');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error en seed roles:', error);
    process.exit(1);
  }
};

seedRoles();