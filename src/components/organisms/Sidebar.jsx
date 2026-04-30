// src/components/organisms/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, PlusCircle, LayoutGrid, LogOut } from 'lucide-react';
import NavItem from '../molecules/NavItem';
import UserSummary from '../molecules/UserSummary';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const { user, profile, logout } = useAuth();

    const menuItems = [
        { label: 'Dashboard', icon: Home, to: '/app/dashboard' },
        { label: 'Crear', icon: PlusCircle, to: '/app/crear' },
        { label: 'Categorías', icon: LayoutGrid, to: '/app/categorias' },
    ];

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const displayName = profile?.first_name || user?.email?.split('@')[0] || 'Usuario';
    const displayRole = profile?.role || user?.email || '';

    return (
        <aside className="w-64 h-screen bg-white border-r border-Neutral-200 flex flex-col justify-between p-6 fixed left-0 top-0">
            <div>
                {/* Sección superior: Logo */}
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-8 h-8 bg-redPrimary-300 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl font-kaushan">P</span>
                    </div>
                    <h1 className="text-xl font-kaushan font-bold text-redPrimary-300">PintBoard</h1>
                </div>

                {/* Navegación dinámica */}
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.label}
                            Icon={item.icon}
                            label={item.label}
                            to={item.to}
                        />
                    ))}
                </nav>
            </div>

            {/* Sección Inferior: Usuario y Logout */}
            <div className="flex flex-col gap-4 border-t border-Neutral-100 pt-6">
                <UserSummary
                    name={displayName}
                    role={displayRole}
                    avatarUrl={profile?.avatar_url}
                />
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 text-CafeSecondary-300 hover:text-redPrimary-300 transition-colors font-lato text-sm uppercase group"
                >
                    <LogOut size={18} className="group-hover:animate-pulse" />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;