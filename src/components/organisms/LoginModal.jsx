// src/components/organisms/LoginModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, X, Eye, EyeOff, User } from 'lucide-react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { useAuth } from '../../context/AuthContext';

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleChange = (field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
        setError(''); // Limpiar errores al escribir
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            if (isRegistering) {
                if (!formData.name.trim()) {
                    setError('El nombre es obligatorio');
                    setIsSubmitting(false);
                    return;
                }
                await register(formData.name, formData.email, formData.password);
            } else {
                await login(formData.email, formData.password);
            }
            
            onClose();
            navigate('/app/dashboard');
        } catch (err) {
            setError(err.message || 'Error de autenticación');
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const switchMode = () => {
        setIsRegistering(!isRegistering);
        setError('');
        setFormData({ name: '', email: '', password: '' });
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl overflow-hidden animate-slideUp">
                <button onClick={onClose} className="absolute top-6 right-6 text-CafeSecondary-200 hover:text-redPrimary-300 transition-colors">
                    <X size={24} />
                </button>

                <div className="text-center mb-10">
                    <h2 className="text-redPrimary-300 text-3xl font-bold tracking-tighter mb-2">PintaBoard</h2>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center animate-fadeIn">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegistering && (
                        <div className="space-y-2 animate-fadeIn">
                            <label className="text-xs font-bold text-CafeSecondary-300 uppercase ml-2 text-[10px]">Nombre completo</label>
                            <Input 
                                icon={User} 
                                type="text" 
                                placeholder="Alfonso Bautista" 
                                value={formData.name}
                                onChange={handleChange('name')}
                                required 
                            />
                        </div>
                    )}

                    <div className="space-y-2 text-[14px]">
                        <label className="text-xs font-bold text-CafeSecondary-300 uppercase ml-2">Correo eléctronico</label>
                        <Input 
                            icon={Mail} 
                            type="email" 
                            placeholder="name@curator.com" 
                            value={formData.email}
                            onChange={handleChange('email')}
                            required 
                        />
                    </div>

                    <div className="space-y-2 text-[14px]">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-xs font-bold text-CafeSecondary-300 uppercase">Contraseña</label>
                        </div>
                        <div className="relative">
                            <Input
                                icon={Lock}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange('password')}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-CafeSecondary-200 hover:text-CafeSecondary-400 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} className='cursor-pointer' />
                                ) : (
                                    <Eye size={18} className='cursor-pointer' />
                                )}
                            </button>
                        </div>
                    </div>

                    <Button 
                        variant="primary" 
                        type="submit" 
                        className={`w-full py-4 rounded-2xl text-lg font-bold shadow-red-200 shadow-lg mt-4 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Procesando...
                            </span>
                        ) : (
                            isRegistering ? 'Crear cuenta' : 'Iniciar sesión en PintaBoard →'
                        )}
                    </Button>
                </form>

                <p className="text-center mt-10 text-sm text-CafeSecondary-300 font-lato">
                    {isRegistering ? '¿Ya te has registrado?' : '¿Eres nuevo en PintaBoard?'}
                    <button
                        type="button"
                        onClick={switchMode}
                        className="text-redPrimary-300 font-bold hover:underline ml-1"
                    >
                        {isRegistering ? 'Iniciar sesión' : 'Crea una cuenta'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;