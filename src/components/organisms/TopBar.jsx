// src/components/organisms/TopBar.jsx
import React from 'react';
import { Bell, Plus } from 'lucide-react';
import SearchBar from '../molecules/SearchBar';
import IconButton from '../atoms/IconButton';
import Button from '../atoms/Button';

const TopBar = () => {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-Neutral-200 flex items-center justify-between px-8 sticky top-0 z-10">
            {/* Buscador */}
            <div className="flex-1 max-w-xl">
                <SearchBar />
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-4">
                <IconButton Icon={Bell} variant="neutral" className="relative">
                    {/* Punto de notificación (opcional) */}
                    <span className="absolute top-2 right-2 w-2 h-2 bg-redPrimary-300 rounded-full"></span>
                </IconButton>

                <Button variant="primary" Icon={Plus}>
                    Nuevo Tablero
                </Button>
            </div>
        </header>
    );
};

export default TopBar;