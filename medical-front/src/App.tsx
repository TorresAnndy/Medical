import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>

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

      <nav style={{
        background: '#1D4ED8',
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <span style={{ color: '#fff', fontWeight: 700 }}>
          🏥 MedApp
        </span>

        {localStorage.getItem('token') && (
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            style={{
              background: 'transparent',
              border: '1px solid #fff',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Cerrar sesión
          </button>
        )}
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/appointments/:id"
          element={
            <PrivateRoute>
              <DetailPage />
            </PrivateRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
};

export default App;