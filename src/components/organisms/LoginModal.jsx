// src/components/organisms/LoginModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Importamos EyeOff para el estado de "oculto"
import { Mail, Lock, X, Eye, EyeOff, User } from 'lucide-react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const [isRegistering, setIsRegistering] = useState(false);
    // 2. Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/app/dashboard');
        onClose();
    };

    // 3. Función para alternar el estado
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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

                <form onSubmit={handleSubmit} className="space-y-5">
                    {isRegistering && (
                        <div className="space-y-2 animate-fadeIn">
                            <label className="text-xs font-bold text-CafeSecondary-300 uppercase ml-2 text-[10px]">Nombre completo</label>
                            <Input icon={User} type="text" placeholder="Alfonso Bautista" required />
                        </div>
                    )}

                    <div className="space-y-2 text-[14px]">
                        <label className="text-xs font-bold text-CafeSecondary-300 uppercase ml-2">Correo eléctronico</label>
                        <Input icon={Mail} type="email" placeholder="name@curator.com" required />
                    </div>

                    <div className="space-y-2 text-[14px]">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-xs font-bold text-CafeSecondary-300 uppercase">Contraseña</label>
                        </div>
                        <div className="relative">
                            {/* 4. El type ahora es dinámico: 'text' o 'password' */}
                            <Input
                                icon={Lock}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                required
                            />
                            {/* 5. Botón con icono dinámico y evento onClick */}
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

                    <Button variant="primary" type="submit" className="w-full py-4 rounded-2xl text-lg font-bold shadow-red-200 shadow-lg mt-4">
                        {isRegistering ? 'Crear cuenta' : 'Iniciar sesión en PintaBoard →'}
                    </Button>
                </form>

                <p className="text-center mt-10 text-sm text-CafeSecondary-300 font-lato">
                    {isRegistering ? '¿Ya te has registrado?' : '¿Eres nuevo en PintaBoard?'}
                    <button
                        type="button"
                        onClick={() => setIsRegistering(!isRegistering)}
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