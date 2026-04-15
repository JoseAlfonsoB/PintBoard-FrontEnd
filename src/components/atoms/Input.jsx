// src/components/atoms/Input.jsx
import React from 'react';

const Input = ({ label, error, icon: Icon, className = '', ...props }) => {
    return (
        <div className="flex flex-col w-full gap-1.5">
            {label && (
                <label className="text-sm font-medium text-CafeSecondary-400 font-lato ml-1">
                    {label}
                </label>
            )}

            <div className="relative w-full">
                {/* Renderizado condicional del icono */}
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-CafeSecondary-200">
                        <Icon size={20} />
                    </div>
                )}

                <input
                    className={`
                        w-full rounded-[1rem] border bg-Neutral-50 text-CafeSecondary-500 font-lato
                        border-Neutral-300 focus:border-redPrimary-300 focus:ring-1 focus:ring-redPrimary-300
                        outline-none transition-all placeholder:text-Neutral-400 py-3
                        ${Icon ? 'pl-12' : 'px-4'} 
                        ${error ? 'border-red-500' : ''}
                        ${className}
                    `}
                    {...props}
                />
            </div>

            {error && <span className="text-xs text-red-500 mt-1 ml-1">{error}</span>}
        </div>
    );
};

export default Input;