// src/pages/Categorias.jsx
import React, { useState, useEffect } from 'react';
import { Plus, X, Tag, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { categoryService } from '../services/api';

const Categorias = () => {
  const [cats, setCats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDescription, setNewCatDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Estados para gestión de menús y edición
  const [activeMenu, setActiveMenu] = useState(null);

  // ── Cargar categorías del backend ────────────────────────────────────────────
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getAllCategories();
      setCats(data || []);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ── Crear categoría ──────────────────────────────────────────────────────────
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCatName.trim() === "") return;

    setSubmitting(true);
    try {
      const newCat = await categoryService.createCategory({
        name: newCatName.trim(),
        description: newCatDescription.trim() || undefined,
      });
      setCats(prev => [...prev, newCat]);
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewCatName("");
    setNewCatDescription("");
  };

  if (loading) {
    return (
      <div className="animate-fadeIn p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato">Categorías</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl border border-Neutral-200 animate-pulse">
              <div className="h-full flex items-center justify-center">
                <div className="h-4 bg-Neutral-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato">Categorías</h2>
        <Button onClick={() => setIsModalOpen(true)} variant="primary" className="flex items-center gap-2 rounded-full px-6">
          <Plus size={20} /> Nueva Categoría
        </Button>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center animate-fadeIn">
          {error}
          <button onClick={() => setError(null)} className="ml-2 font-bold hover:underline">✕</button>
        </div>
      )}

      {cats.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cats.map((cat) => (
            <div
              key={cat.id}
              className="group relative h-32 bg-white rounded-2xl flex flex-col items-center justify-center font-bold text-CafeSecondary-400 border border-Neutral-200 shadow-sm hover:shadow-md transition-all"
            >
              <span className="text-sm">{cat.name}</span>
              {cat.description && (
                <span className="text-xs text-CafeSecondary-200 mt-1 px-3 text-center truncate w-full">{cat.description}</span>
              )}

              {/* Botón de Menú (Solo visible al hacer hover o si está activo) */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setActiveMenu(activeMenu === cat.id ? null : cat.id)}
                  className="p-1 hover:bg-Neutral-100 rounded-full text-CafeSecondary-300"
                >
                  <MoreVertical size={18} />
                </button>
              </div>

              {/* Menú Desplegable (Dropdown) */}
              {activeMenu === cat.id && (
                <div className="absolute top-10 right-2 bg-white border border-Neutral-200 shadow-xl rounded-xl py-2 z-10 w-32 animate-fadeIn">
                  <button
                    onClick={() => setActiveMenu(null)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-CafeSecondary-400 hover:bg-Neutral-50 hover:text-redPrimary-300 transition-colors"
                  >
                    <Edit2 size={14} /> Editar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-Neutral-100 rounded-full flex items-center justify-center mb-6">
            <Tag size={32} className="text-CafeSecondary-200" />
          </div>
          <p className="text-CafeSecondary-300 text-lg font-lato font-bold mb-2">Sin categorías</p>
          <p className="text-CafeSecondary-200 text-sm">Crea tu primera categoría para organizar tus pines.</p>
        </div>
      )}

      {/* Modal para Crear Categoría */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-slideUp">
            <button onClick={closeModal} className="absolute top-6 right-6 text-CafeSecondary-200 hover:text-redPrimary-300">
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-CafeSecondary-500">
                Nueva Categoría
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
              <Input
                placeholder="Descripción (opcional)"
                value={newCatDescription}
                onChange={(e) => setNewCatDescription(e.target.value)}
              />
              <Button 
                variant="primary" 
                type="submit" 
                className={`w-full py-3 rounded-xl font-bold ${submitting ? 'opacity-70' : ''}`}
                disabled={submitting}
              >
                {submitting ? 'Creando...' : 'Crear Categoría'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categorias;