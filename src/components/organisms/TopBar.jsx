// src/components/organisms/TopBar.jsx
import React from 'react';
import SearchBar from '../molecules/SearchBar';

const TopBar = () => {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-Neutral-200 flex items-center justify-between px-8 sticky top-0 z-10">
            {/* Buscador */}
            <div className="flex-1 max-w-xl">
                <SearchBar />
            </div>
        </header>
    );
};

export default TopBar;