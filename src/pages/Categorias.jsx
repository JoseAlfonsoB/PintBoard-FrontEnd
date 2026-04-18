// src/pages/Categorias.jsx
import React, { useState } from 'react';
import { Plus, X, Tag, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import IconButton from '../components/atoms/IconButton'; // Reutilizando tu átomo

const Categorias = () => {
  const [cats, setCats] = useState(["Arquitectura", "Diseño UI", "Fotografía", "Ilustración", "Moda"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  // Estados para gestión de menús y edición
  const [activeMenu, setActiveMenu] = useState(null); // Guarda el índice de la categoría con el menú abierto
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCatName.trim() !== "") {
      if (editingIndex !== null) {
        // Lógica de Edición
        const updatedCats = [...cats];
        updatedCats[editingIndex] = newCatName;
        setCats(updatedCats);
      } else {
        // Lógica de Creación
        setCats([...cats, newCatName]);
      }
      closeModal();
    }
  };

  const handleDelete = (index) => {
    const filteredCats = cats.filter((_, i) => i !== index);
    setCats(filteredCats);
    setActiveMenu(null);
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setNewCatName(cats[index]);
    setIsModalOpen(true);
    setActiveMenu(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCatName("");
    setEditingIndex(null);
  };

  return (
    <div className="animate-fadeIn p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato">Categorías</h2>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" className="flex items-center gap-2 rounded-full px-6">
          <Plus size={20} /> Nueva Categoría
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {cats.map((cat, index) => (
          <div
            key={index}
            className="group relative h-32 bg-white rounded-2xl flex items-center justify-center font-bold text-CafeSecondary-400 border border-Neutral-200 shadow-sm hover:shadow-md transition-all"
          >
            {cat}

            {/* Botón de Menú (Solo visible al hacer hover o si está activo) */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setActiveMenu(activeMenu === index ? null : index)}
                className="p-1 hover:bg-Neutral-100 rounded-full text-CafeSecondary-300"
              >
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Menú Desplegable (Dropdown) */}
            {activeMenu === index && (
              <div className="absolute top-10 right-2 bg-white border border-Neutral-200 shadow-xl rounded-xl py-2 z-10 w-32 animate-fadeIn">
                <button
                  onClick={() => openEditModal(index)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-CafeSecondary-400 hover:bg-Neutral-50 hover:text-redPrimary-300 transition-colors"
                >
                  <Edit2 size={14} /> Editar
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} /> Eliminar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Reutilizable para Crear/Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-slideUp">
            <button onClick={closeModal} className="absolute top-6 right-6 text-CafeSecondary-200 hover:text-redPrimary-300">
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-CafeSecondary-500">
                {editingIndex !== null ? 'Editar Categoría' : 'Nueva Categoría'}
              </h3>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <Input
                icon={Tag}
                placeholder="Nombre de la categoría"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                required
              />
              <Button variant="primary" type="submit" className="w-full py-3 rounded-xl font-bold">
                {editingIndex !== null ? 'Guardar cambios' : 'Crear Categoría'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;