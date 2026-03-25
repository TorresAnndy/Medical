import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginRequest, registerRequest } from '../services/auth.service';
import image from '../assets/image.png';

const LoginPage = () => {
    const navigate = useNavigate();

    const [tab, setTab] = useState<'login' | 'register'>('login');

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setForm({ name: '', email: '', password: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error('Completa todos los campos');
            return;
        }

        setLoading(true);

        try {
            if (tab === 'login') {
                const data = await loginRequest(form.email, form.password);

                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));

                toast.success('Bienvenido 👋');

                window.location.href = '/';

            } else {
                await registerRequest(form.name, form.email, form.password);

                toast.success('Cuenta creada 🎉 Ahora inicia sesión');

                setForm({
                    name: '',
                    email: form.email,
                    password: '',
                });

                setTab('login');
            }

        } catch (error: any) {
            toast.error(
                error.response?.data?.message || 'Error'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#F9FAFB'
        }}>

            <div style={{
                flex: 1,
                background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                color: '#fff',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '16px' }}>
                    🏥 MedApp
                </h1>

                <p style={{ maxWidth: '400px', lineHeight: 1.6 }}>
                    Gestiona tus citas médicas de forma rápida y organizada.
                    Registra, edita y controla todo desde un solo lugar.
                </p>

                <div style={{
                    marginTop: '40px',
                    padding: '20px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.1)',
                    textAlign: 'center'
                }}>
                    <img
                        src={image}
                        alt="Doctor"
                        style={{
                            width: '150px',
                            height: '150px',
                            objectFit: 'cover',
                            borderRadius: '50%',
                            marginBottom: '16px',
                            border: '4px solid white',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }}
                    />
                </div>
            </div>

            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '400px',
                    background: '#fff',
                    padding: '32px',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                }}>

                    <div style={{
                        display: 'flex',
                        marginBottom: '24px',
                        borderBottom: '1px solid #E5E7EB'
                    }}>
                        <button
                            onClick={() => {
                                setTab('login');
                                resetForm();
                            }}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: 'none',
                                background: 'transparent',
                                borderBottom: tab === 'login' ? '2px solid #2563EB' : 'none',
                                color: tab === 'login' ? '#2563EB' : '#6B7280',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Iniciar sesión
                        </button>

                        <button
                            onClick={() => {
                                setTab('register');
                                resetForm();
                            }}
                            style={{
                                flex: 1,
                                padding: '10px',
                                border: 'none',
                                background: 'transparent',
                                borderBottom: tab === 'register' ? '2px solid #2563EB' : 'none',
                                color: tab === 'register' ? '#2563EB' : '#6B7280',
                                fontWeight: 600,
                                cursor: 'pointer'
                            }}
                        >
                            Registrarse
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>

                        {tab === 'register' && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ fontSize: '0.85rem' }}>Nombre</label>
                                <input
                                    value={form.name}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '6px',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB'
                                    }}
                                />
                            </div>
                        )}

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '0.85rem' }}>Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '6px',
                                    borderRadius: '8px',
                                    border: '1px solid #D1D5DB'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontSize: '0.85rem' }}>Contraseña</label>

                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => handleChange('password', e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        marginTop: '6px',
                                        borderRadius: '8px',
                                        border: '1px solid #D1D5DB'
                                    }}
                                />

                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        color: '#6B7280'
                                    }}
                                >
                                    {showPassword ? 'Ocultar' : 'Ver'}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: 'none',
                                background: '#2563EB',
                                color: '#fff',
                                fontWeight: 600,
                                cursor: 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading
                                ? 'Procesando...'
                                : tab === 'login'
                                    ? 'Ingresar'
                                    : 'Crear cuenta'}
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;