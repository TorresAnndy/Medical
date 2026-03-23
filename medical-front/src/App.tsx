import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';

const App = () => {
  return (
    <BrowserRouter>
      {/* Notificaciones toast globales */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            fontSize: '0.875rem',
          },
        }}
      />

      {/* Navbar simple */}
      <nav style={{
        background: '#1D4ED8', padding: '0 24px',
        height: '56px', display: 'flex', alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
          🏥 MedApp
        </span>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appointments/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;