// src/components/organisms/Sidebar.jsx
import React, { useState } from 'react';
import { Home, LayoutGrid, Settings, LogOut, Palette } from 'lucide-react';
import NavItem from '../molecules/NavItem';
import UserSummary from '../molecules/UserSummary';

const Sidebar = () => {
    // Por ahora manejamos el estado aquí para que sea funcional en la prueba
    const [activeTab, setActiveTab] = useState('Dashboard');

    const menuItems = [
        { id: 'Dashboard', label: 'Dashboard', icon: Home },
        { id: 'Tableros', label: 'Mis Tableros', icon: LayoutGrid },
        { id: 'Temas', label: 'Explorar Temas', icon: Palette },
        { id: 'Settings', label: 'Configuración', icon: Settings },
    ];

    return (
        <aside className="w-64 h-screen bg-white border-r border-Neutral-200 flex flex-col justify-between p-6 fixed left-0 top-0">
            {/* Sección Superior: Logo */}
            <div>
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-8 h-8 bg-redPrimary-300 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-xl font-kaushan">P</span>
                    </div>
                    <h1 className="text-xl font-kaushan font-bold text-redPrimary-300">PintaBoard</h1>
                </div>

                {/* Navegación Dinámica */}
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                        <NavItem
                            key={item.id}
                            Icon={item.icon}
                            label={item.label}
                            isActive={activeTab === item.id}
                            onClick={() => setActiveTab(item.id)}
                        />
                    ))}
                </nav>
            </div>

            {/* Sección Inferior: Usuario y Logout */}
            <div className="flex flex-col gap-4 border-t border-Neutral-100 pt-6">
                <UserSummary
                    name="Alfonso B."
                    role="Frontend Dev"
                />
                <button className="flex items-center gap-3 px-4 py-2 text-CafeSecondary-300 hover:text-redPrimary-300 transition-colors font-lato text-sm uppercase">
                    <LogOut size={18} />
                    <span>Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;