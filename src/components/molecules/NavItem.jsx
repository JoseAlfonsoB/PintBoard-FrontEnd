// src/components/molecules/NavItem.jsx
import React from 'react';

const NavItem = ({ Icon, label, isActive = false, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-lato
        ${isActive
                    ? 'bg-redPrimary-100 text-redPrimary-300 font-bold'
                    : 'text-CafeSecondary-300 hover:bg-Neutral-100 hover:text-CafeSecondary-500'}
      `}
        >
            <Icon size={20} className={isActive ? 'text-redPrimary-300' : 'text-CafeSecondary-200'} />
            <span className="text-sm uppercase tracking-wider">{label}</span>
        </button>
    );
};

export default NavItem;