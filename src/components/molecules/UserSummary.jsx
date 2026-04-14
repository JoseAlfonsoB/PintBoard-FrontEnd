// src/components/molecules/UserSummary.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserSummary = ({ name, role, avatarUrl }) => {
    const navigate = useNavigate();
    return (
        <div
        onClick={() => navigate('/perfil')} 
        className="flex items-center gap-3 p-2 cursor-pointer hover:bg-Neutral-100 rounded-xl transition-all"
        >
            <div className="w-10 h-10 rounded-full bg-tertiary-300 flex items-center justify-center text-white font-bold overflow-hidden">
                {avatarUrl ? <img src={avatarUrl} alt={name} /> : name.charAt(0)}
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-CafeSecondary-500 font-lato leading-none">{name}</span>
                <span className="text-xs text-CafeSecondary-300 font-lato mt-1">{role}</span>
            </div>
        </div>
    );
};

export default UserSummary;