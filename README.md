# 🏥 Medical Appointments — WoowTechnology

Sistema de gestión de citas médicas desarrollado con Node.js + TypeScript en el backend y React + Vite + TypeScript en el frontend.

## Cuentas 👤 

---
admin@gmail.com
123456
doctor@gmail.com
123456
patient@gmail.com
123456
---

---

## 🧰 Tecnologías utilizadas

**Backend**
- Node.js + Express
- TypeScript
- PostgreSQL (Docker local)
- express-validator

**Frontend**
- React 18 + Vite
- TypeScript
- React Router v6
- Axios
- react-hot-toast
- date-fns

---

## 📁 Estructura del proyecto
```
medical-appointments/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Lógica de cada endpoint
│   │   ├── db/              # Conexión y migración de base de datos
│   │   ├── middlewares/     # Validación y manejo de errores
│   │   ├── models/          # Interfaces TypeScript
│   │   ├── routes/          # Definición de rutas
│   │   ├── utils/           # Helpers reutilizables
│   │   └── index.ts         # Entry point del servidor
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Páginas principales
│   │   ├── services/        # Consumo de la API
│   │   ├── types/           # Interfaces TypeScript
│   │   ├── utils/           # Utilidades (fechas, etc.)
│   │   └── App.tsx
│   └── package.json
└── docker-compose.yml
```

---

## ⚙️ Variables de entorno

**Backend** — crea `backend/.env` basándote en `backend/.env.example`:
```env
DATABASE_URL=postgresql://admin:admin123@localhost:5433/medical_appointments
PORT=4000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

JWT_SECRET=supersecreto
JWT_EXPIRES_IN=24h
```

**Frontend** — crea `frontend/.env` basándote en `frontend/.env.example`:
```env
VITE_API_URL=http://localhost:4000
```

---

## 🚀 Cómo correr el proyecto localmente

### 1. Clonar el repositorio
```bash
git https://github.com/TorresAnndy/Medical.git
cd medical
```

### 2. Levantar la base de datos con Docker
```bash
docker-compose up -d
```

### 3. Instalar dependencias y configurar el backend
```bash
cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

El servidor estará disponible en `http://localhost:4000`

### 4. Instalar dependencias y configurar el frontend

Abre una nueva terminal:
```bash
cd frontend
npm install
npm run dev
```

La app estará disponible en `http://localhost:5173`

---

## 📡 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/appointments` | Listar todas las citas |
| GET | `/appointments/:id` | Obtener una cita por ID |
| POST | `/appointments` | Crear una nueva cita |
| PUT | `/appointments/:id` | Actualizar una cita |
| DELETE | `/appointments/:id` | Eliminar una cita |
| PATCH | `/appointments/:id/status` | Cambiar estado de una cita |
| GET | `/health` | Health check del servidor |

### Ejemplo de cuerpo para crear una cita
```json
{
  "patient_name": "Juan Pérez",
  "doctor_name": "Dra. María López",
  "appointment_date": "2025-05-10T14:30:00",
  "reason": "Consulta general"
}
```

### Estados disponibles

| Estado | Descripción |
|--------|-------------|
| `pendiente` | Cita registrada, sin confirmar |
| `confirmada` | Cita confirmada por el médico |
| `cancelada` | Cita cancelada |

---

## ✅ Funcionalidades implementadas

- [x] Listar todas las citas
- [x] Ver detalle de una cita
- [x] Crear nueva cita con formulario validado
- [x] Editar cita existente
- [x] Eliminar cita
- [x] Cambiar estado de una cita
- [x] Notificaciones de feedback (toast)
- [x] Loading states
- [x] Manejo de errores en frontend y backend
- [x] TypeScript en todo el proyecto
- [x] Código modularizado y comentado

---

## 👤 Autor

Desarrollado por **Andy Javier Gonzales Torres**  
Prueba técnica — WoowTechnology