// src/components/organisms/LandingNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';

const LandingNavbar = ({ onLoginClick }) => {
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center py-6 px-10 bg-white sticky top-0 z-50">
            <div className="text-redPrimary-300 font-bold text-2xl tracking-tighter cursor-pointer" onClick={() => navigate('/')}>
                PintaBoard
            </div>
            <div className="hidden md:flex gap-10 text-CafeSecondary-500 font-semibold text-sm">
                <a href="#explorar" className="hover:text-redPrimary-300 transition-colors">Explorar</a>
                <a href="#about" className="hover:text-redPrimary-300 transition-colors">Sobre nosotros</a>
            </div>
            <div className="flex items-center gap-6">
                <button
                    onClick={onLoginClick}
                    className="text-CafeSecondary-500 font-bold hover:text-redPrimary-300 transition-colors text-sm"
                >
                    Log In
                </button>
                <Button
                    variant="primary"
                    className="rounded-full px-6 py-2 text-sm shadow-md"
                    onClick={() => navigate('/register')}
                >
                    Sign Up
                </Button>
            </div>
        </nav>
    );
};

export default LandingNavbar;