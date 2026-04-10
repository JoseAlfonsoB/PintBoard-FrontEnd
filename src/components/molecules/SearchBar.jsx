// src/components/molecules/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';
import Input from '../atoms/Input';
import IconButton from '../atoms/IconButton';

const SearchBar = ({ placeholder = "Buscar en PintBoard...", onSearch, ...props }) => {
    return (
        <div className="relative flex items-center w-full max-w-md">
            <Input
                placeholder={placeholder}
                className="pr-12" // Espacio extra a la derecha para el botón
                {...props}
            />
            <div className="absolute right-1">
                <IconButton
                    Icon={Search}
                    variant="transparent"
                    onClick={onSearch}
                    className="hover:bg-Neutral-200"
                />
            </div>
        </div>
    );
};

export default SearchBar;