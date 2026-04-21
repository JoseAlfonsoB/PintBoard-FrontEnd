// src/components/organisms/EditProfileModal.jsx
import React from 'react';
import { X } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

const EditProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Si no está abierto, no renderiza nada

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

                <form className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-4 mb-4">
                        <div className="w-24 h-24 rounded-full bg-Neutral-200 overflow-hidden">
                            {/* Aquí puedes poner la lógica para cambiar la foto */}
                            <div className="w-full h-full flex items-center justify-center text-xs text-center p-2 text-Neutral-400">
                                Cambiar foto
                            </div>
                        </div>
                    </div>

                    <Input label="Nombre público" placeholder="Tu nombre..." defaultValue="Jose Alfonso Bautista Arteaga" />
                    <Input label="Nombre de usuario" placeholder="@usuario" defaultValue="josealfonso_ba" />
                    
                    <div className="flex gap-4 mt-4">
                        <Button variant="neutral" className="px-6 py-2.5 bg-Neutral-100 text-CafeSecondary-500 rounded-full font-bold hover:bg-Neutral-200 transition-colors cursor-pointer" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button variant="primary" className="flex-1 rounded-full border-none cursor-pointer" type="submit">
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;