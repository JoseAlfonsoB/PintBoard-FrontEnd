// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/organisms/Sidebar';
import TopBar from '../components/organisms/TopBar';

const MainLayout = () => {
    return (
        <div className="flex min-h-screen bg-Neutral-50">
            {/* 1. Sidebar Fijo a la izquierda */}
            <Sidebar />

            {/* 2. Contenedor de la derecha */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Header Superior */}
                <TopBar />

                {/* 3. Zona de Contenido Dinámico */}
                <main className="p-8">
                    {/* Aquí es donde aparecerán Dashboard, Tableros, etc. */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;