// src/components/organisms/LoginModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, X, Eye } from 'lucide-react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const LoginModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulamos autenticación y redirigimos al dashboard real
        navigate('/app/dashboard');
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
            {/* Fondo con desenfoque (Backdrop) */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Tarjeta de Login */}
            <div className="relative bg-white w-full max-w-md rounded-[3rem] p-10 shadow-2xl overflow-hidden animate-slideUp">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-CafeSecondary-200 hover:text-redPrimary-300 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center mb-10">
                    <h2 className="text-redPrimary-300 text-3xl font-bold tracking-tighter mb-2">PintaBoard</h2>
                    <p className="text-CafeSecondary-300 font-medium">Curate the extraordinary.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-CafeSecondary-300 uppercase ml-2">Email Address</label>
                        <Input icon={Mail} type="email" placeholder="name@curator.com" required />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center px-2">
                            <label className="text-xs font-bold text-CafeSecondary-300 uppercase">Password</label>
                            <button type="button" className="text-[10px] font-bold text-redPrimary-300 uppercase hover:underline">Forgot?</button>
                        </div>
                        <div className="relative">
                            <Input icon={Lock} type="password" placeholder="••••••••" required />
                            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-CafeSecondary-200">
                                <Eye size={18} />
                            </button>
                        </div>
                    </div>

                    <Button variant="primary" type="submit" className="w-full py-4 rounded-2xl text-lg font-bold shadow-red-200 shadow-lg">
                        Sign In to PintaBoard →
                    </Button>
                </form>

                <div className="mt-8">
                    <div className="relative flex items-center justify-center mb-8">
                        <div className="border-t border-Neutral-200 w-full"></div>
                        <span className="bg-white px-4 text-xs font-bold text-CafeSecondary-200 uppercase absolute">Or connect with</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 border border-Neutral-200 rounded-2xl hover:bg-Neutral-50 transition-colors font-bold text-sm text-CafeSecondary-500">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5" alt="Google" /> Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3 border border-Neutral-200 rounded-2xl hover:bg-Neutral-50 transition-colors font-bold text-sm text-CafeSecondary-500">
                            <img src="https://www.svgrepo.com/show/448204/apple.svg" className="w-5" alt="Apple" /> Apple
                        </button>
                    </div>
                </div>

                <p className="text-center mt-10 text-sm text-CafeSecondary-300">
                    New to the collection? <button type="button" className="text-redPrimary-300 font-bold hover:underline">Create an account</button>
                </p>
            </div>
        </div>
    );
};

export default LoginModal;