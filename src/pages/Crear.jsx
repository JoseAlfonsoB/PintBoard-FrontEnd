// src/pages/Crear.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import { pinService, categoryService, imageService } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Crear = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [externalLink, setExternalLink] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Cargar categorías
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getAllCategories();
                setCategories(data || []);
            } catch (err) {
                console.error('Error al cargar categorías:', err);
            }
        };
        fetchCategories();
    }, []);

    // Preview de imagen
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (ev) => setImagePreview(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim()) { setError('El título es obligatorio'); return; }
        if (!imageFile) { setError('Selecciona una imagen'); return; }
        if (!categoryId) { setError('Selecciona una categoría'); return; }

        setSubmitting(true);
        try {
            // 1. Subir la imagen al image_service
            const imgData = await imageService.upload(imageFile);
            const imageUrl = imgData.filename || imgData.url || imgData.image_url;

            // 2. Crear el pin con la URL de la imagen
            const newPin = await pinService.createPin({
                title: title.trim(),
                description: description.trim() || undefined,
                image_url: imageUrl,
                external_link: externalLink.trim() || undefined,
                user_id: user.id,
                category_id: parseInt(categoryId),
            });

            // Redirigir al detalle del pin creado
            navigate(`/app/pin/${newPin.id}`);
        } catch (err) {
            setError(err.message || 'Error al crear el pin');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl animate-fadeIn">
            <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato mb-6">Crear Nuevo Pin</h2>
            <div className="bg-white p-8 rounded-2xl border border-Neutral-200 shadow-sm flex flex-col gap-6">
                
                {/* Error */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center animate-fadeIn">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Zona de imagen */}
                    <div className="relative">
                        <label className="text-sm font-medium text-CafeSecondary-400 font-lato ml-1 mb-1.5 block">
                            Imagen del Pin *
                        </label>
                        {imagePreview ? (
                            <div className="relative rounded-2xl overflow-hidden border border-Neutral-200 group cursor-pointer">
                                <img src={imagePreview} alt="Preview" className="w-full max-h-72 object-cover" />
                                <div 
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    onClick={() => { setImageFile(null); setImagePreview(null); }}
                                >
                                    <span className="text-white font-bold">Cambiar imagen</span>
                                </div>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-Neutral-300 rounded-2xl cursor-pointer hover:border-redPrimary-300 hover:bg-redPrimary-100/10 transition-all">
                                <Upload size={32} className="text-CafeSecondary-200 mb-3" />
                                <span className="text-CafeSecondary-300 font-lato text-sm">
                                    Arrastra o haz clic para subir
                                </span>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>

                    <Input 
                        label="Título del Pin *" 
                        placeholder="Ej. Diseño Minimalista" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <Input 
                        label="Descripción (Opcional)" 
                        placeholder="¿De qué trata este pin?" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Input 
                        label="Enlace externo (Opcional)" 
                        placeholder="https://ejemplo.com" 
                        type="url"
                        value={externalLink}
                        onChange={(e) => setExternalLink(e.target.value)}
                    />

                    {/* Selector de categoría */}
                    <div className="flex flex-col w-full gap-1.5">
                        <label className="text-sm font-medium text-CafeSecondary-400 font-lato ml-1">
                            Categoría *
                        </label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full rounded-[1rem] border bg-Neutral-50 text-CafeSecondary-500 font-lato
                                border-Neutral-300 focus:border-redPrimary-300 focus:ring-1 focus:ring-redPrimary-300
                                outline-none transition-all py-3 px-4"
                            required
                        >
                            <option value="">Selecciona una categoría</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <Button 
                        variant="primary" 
                        type="submit"
                        className={`w-fit px-8 py-3 rounded-xl font-bold ${submitting ? 'opacity-70' : ''}`}
                        disabled={submitting}
                    >
                        {submitting ? (
                            <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Creando...
                            </span>
                        ) : (
                            'Crear Pin'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Crear;