import React from 'react';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';

const Crear = () => {
    return (
        <div className="max-w-2xl animate-fadeIn">
            <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato mb-6">Crear Nuevo Tablero</h2>
            <div className="bg-white p-8 rounded-2xl border border-Neutral-200 shadow-sm flex flex-col gap-6">
                <Input label="Título del Tablero" placeholder="Ej. Diseño de Interiores" />
                <Input label="Descripción (Opcional)" placeholder="¿De qué trata este tablero?" />
                <Button variant="primary" className="w-fit">Crear Tablero</Button>
            </div>
        </div>
    );
};

export default Crear;