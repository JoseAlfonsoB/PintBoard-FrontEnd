// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, profileService } from '../services/api';

const AuthContext = createContext(null);

// ─── Decodificar el payload del JWT (sin librerías) ────────────────────────────
const decodeToken = (token) => {
    try {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    } catch {
        return null;
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);       // { id, email } del JWT
    const [profile, setProfile] = useState(null);  // datos del profile_service
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    // ── Cerrar sesión ──────────────────────────────────────────────────────────
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setProfile(null);
    }, []);

    // ── Cargar perfil si hay token válido ──────────────────────────────────────
    useEffect(() => {
        const initAuth = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            const decoded = decodeToken(token);
            if (!decoded || !decoded.id) {
                logout();
                setLoading(false);
                return;
            }

            // Verificar expiración
            if (decoded.exp && decoded.exp * 1000 < Date.now()) {
                logout();
                setLoading(false);
                return;
            }

            setUser({ id: decoded.id, email: decoded.email });

            // Intentar cargar el perfil (puede no existir aún)
            try {
                const profileData = await profileService.getProfile(decoded.id);
                setProfile(profileData);
            } catch {
                // El usuario existe pero no tiene perfil creado todavía
                setProfile(null);
            }

            setLoading(false);
        };

        initAuth();
    }, [token, logout]);

    // ── Escuchar evento de token expirado ──────────────────────────────────────
    useEffect(() => {
        const handleExpired = () => logout();
        window.addEventListener('auth-expired', handleExpired);
        return () => window.removeEventListener('auth-expired', handleExpired);
    }, [logout]);

    // ── Login ──────────────────────────────────────────────────────────────────
    const login = async (email, password) => {
        const data = await authService.login(email, password);
        localStorage.setItem('token', data.token);
        setToken(data.token);

        const decoded = decodeToken(data.token);
        setUser({ id: decoded.id, email: decoded.email });

        // Intentar cargar perfil
        try {
            const profileData = await profileService.getProfile(decoded.id);
            setProfile(profileData);
        } catch {
            setProfile(null);
        }

        return decoded;
    };

    // ── Register ───────────────────────────────────────────────────────────────
    const register = async (name, email, password) => {
        const newUser = await authService.register(name, email, password);

        // Después de registrar, hacer login automático
        await login(email, password);

        // Crear perfil automáticamente
        try {
            const decoded = decodeToken(localStorage.getItem('token'));
            const profileData = await profileService.createProfile({
                user_id: decoded.id,
                first_name: name,
                username: email.split('@')[0],
            });
            setProfile(profileData);
        } catch (err) {
            console.warn('No se pudo crear el perfil automáticamente:', err.message);
        }

        return newUser;
    };

    // ── Actualizar perfil ──────────────────────────────────────────────────────
    const updateUserProfile = async (updates) => {
        if (!user) throw new Error('No hay usuario autenticado');
        const updated = await profileService.updateProfile(user.id, updates);
        setProfile(updated);
        return updated;
    };

    const value = {
        user,
        profile,
        token,
        loading,
        isAuthenticated: !!token && !!user,
        login,
        register,
        logout,
        updateUserProfile,
        setProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};

export default AuthContext;
