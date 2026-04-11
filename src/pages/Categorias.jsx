import React from 'react';

const Categorias = () => {
  const cats = ["Arquitectura", "Diseño UI", "Fotografía", "Ilustración", "Moda"];
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato mb-6">Categorías</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cats.map(cat => (
          <div key={cat} className="h-32 bg-Neutral-200 rounded-xl flex items-center justify-center font-bold text-CafeSecondary-400 hover:bg-redPrimary-100 hover:text-redPrimary-300 transition-all cursor-pointer border border-Neutral-300">
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categorias;