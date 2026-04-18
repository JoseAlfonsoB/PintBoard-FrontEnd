// src/components/organisms/Sidebar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook de navegación
import { Home, PlusCircle, LayoutGrid, LogOut } from 'lucide-react';
import NavItem from '../molecules/NavItem';
import UserSummary from '../molecules/UserSummary';

const Sidebar = () => {
    const navigate = useNavigate(); // 2. Inicializamos navigate

    const menuItems = [
        { label: 'Dashboard', icon: Home, to: '/app/dashboard' },
        { label: 'Crear', icon: PlusCircle, to: '/app/crear' },
        { label: 'Categorías', icon: LayoutGrid, to: '/app/categorias' },
    ];

    // 3. Función para manejar el cierre de sesión
    const handleLogout = () => {
        // Aquí podrías agregar lógica para limpiar el localStorage si fuera necesario
        // localStorage.removeItem('user_session'); 

        navigate('/'); // Redirige a la Landing Page
    };

    return (
        <aside className="w-64 h-screen bg-white border-r border-Neutral-200 flex flex-col justify-between p-6 fixed left-0 top-0">
            <div>
                {/* Sección superior: Logo */}
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-8 h-8 bg-redPrimary-300 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl font-kaushan">P</span>
                    </div>
                    <h1 className="text-xl font-kaushan font-bold text-redPrimary-300">PintaBoard</h1>
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
                    name="Alfonso"
                    role="FrontEnd Dev"
                />
                {/* 4. Conectamos la función al evento onClick */}
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