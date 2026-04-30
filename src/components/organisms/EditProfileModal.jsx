// src/components/organisms/EditProfileModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { X, Camera } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { useAuth } from '../../context/AuthContext';
import { imageService } from '../../services/api';

const EditProfileModal = ({ isOpen, onClose }) => {
    const { profile, user, updateUserProfile } = useAuth();
    const fileInputRef = useRef(null);
    
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    // Cargar datos del perfil al abrir
    useEffect(() => {
        if (isOpen && profile) {
            setFirstName(profile.first_name || '');
            setUsername(profile.username || '');
            setRole(profile.role || '');
            setAvatarPreview(profile.avatar_url || null);
            setAvatarFile(null);
            setError('');
        }
    }, [isOpen, profile]);

    if (!isOpen) return null;

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validar tipo
            const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
            if (!allowed.includes(file.type)) {
                setError('Solo se permiten imágenes PNG, JPG o WebP');
                return;
            }
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onload = (ev) => setAvatarPreview(ev.target.result);
            reader.readAsDataURL(file);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const updates = {
                first_name: firstName.trim(),
                username: username.trim(),
                role: role.trim() || undefined,
            };

            // Si hay una nueva imagen, subirla primero
            if (avatarFile) {
                const imgData = await imageService.upload(avatarFile);
                const imageUrl = imgData.url || `/uploads/${imgData.filename}`;
                // Construir URL completa accesible desde el frontend
                updates.avatar_url = `/api/image${imageUrl}`;
            }

            await updateUserProfile(updates);
            onClose();
        } catch (err) {
            setError(err.message || 'Error al actualizar perfil');
        } finally {
            setSubmitting(false);
        }
    };

    // Avatar display
    const currentInitial = firstName ? firstName.charAt(0).toUpperCase() : '?';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative animate-slideUp">
                {/* Botón de cerrar */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 hover:bg-Neutral-100 rounded-full transition-colors"
                >
                    <X size={24} className="text-CafeSecondary-300" />
                </button>

                <h2 className="text-2xl font-bold text-CafeSecondary-500 font-lato mb-2">Editar Perfil</h2>
                <p className="text-CafeSecondary-300 mb-8">Actualiza tu información pública y cómo te ven los demás.</p>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center animate-fadeIn">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Avatar con opción de cambiar */}
                    <div className="flex flex-col items-center gap-3 mb-2">
                        <div 
                            className="relative w-28 h-28 rounded-full overflow-hidden cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {avatarPreview ? (
                                <img 
                                    src={avatarPreview} 
                                    alt="Avatar" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-tertiary-300 text-white text-3xl font-bold">
                                    {currentInitial}
                                </div>
                            )}
                            {/* Overlay al hover */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} className="text-white" />
                            </div>
                        </div>
                        <button 
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-bold text-redPrimary-300 hover:underline"
                        >
                            Cambiar foto
                        </button>
                        <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/png,image/jpeg,image/jpg,image/webp" 
                            className="hidden" 
                            onChange={handleAvatarChange}
                        />
                    </div>

                    <Input 
                        label="Nombre público" 
                        placeholder="Tu nombre..." 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input 
                        label="Nombre de usuario" 
                        placeholder="@usuario" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input 
                        label="Rol (Opcional)" 
                        placeholder="Ej. Diseñador UI" 
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    
                    <div className="flex gap-4 mt-4">
                        <Button 
                            variant="neutral" 
                            className="px-6 py-2.5 bg-Neutral-100 text-CafeSecondary-500 rounded-full font-bold hover:bg-Neutral-200 transition-colors cursor-pointer" 
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>
                        <Button 
                            variant="primary" 
                            className={`flex-1 rounded-full border-none cursor-pointer ${submitting ? 'opacity-70' : ''}`} 
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Guardando...
                                </span>
                            ) : (
                                'Guardar cambios'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;