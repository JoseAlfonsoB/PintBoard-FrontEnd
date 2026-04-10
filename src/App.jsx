// src/App.jsx
import React from 'react';
import { Search, Plus } from 'lucide-react'; // Importamos iconos de lucide para probar
import Button from './components/atoms/Button';
import Input from './components/atoms/Input';
import IconButton from './components/atoms/IconButton';

const App = () => {
  return (
    <div className="p-10 flex flex-col gap-8 bg-Neutral-50 min-h-screen">
      <h1 className="text-redPrimary-300 text-3xl font-kaushan font-bold">
        PintaBoard-FrontEnd Básico
      </h1>

      <section className="flex flex-col gap-4 p-4 border border-Neutral-200 rounded-lg">
        <h2 className="font-lato font-bold text-CafeSecondary-400">Prueba de Botones</h2>
        <div className="flex gap-4">
          <Button variant="primary">Botón Primario</Button>
          <Button variant="secondary" Icon={Plus}>Con Icono</Button>
          <Button variant="outline">Contorno</Button>
          <Button variant="ghost">Fantasma</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4 p-4 border border-Neutral-200 rounded-lg">
        <h2 className="font-lato font-bold text-CafeSecondary-400">Prueba de Input</h2>
        <Input 
          label="Nombre del Tablero" 
          placeholder="Ej. Inspiración para recámara" 
        />
        <Input 
          label="Email" 
          error="Este campo es obligatorio" 
          placeholder="correo@ejemplo.com" 
        />
      </section>

      <section className="flex flex-col gap-4 p-4 border border-Neutral-200 rounded-lg">
        <h2 className="font-lato font-bold text-CafeSecondary-400">Prueba de IconButtons</h2>
        <div className="flex gap-4">
          <IconButton Icon={Search} variant="primary" />
          <IconButton Icon={Plus} variant="secondary" />
          <IconButton Icon={Search} variant="neutral" />
        </div>
      </section>
    </div>
  );
};

export default App;