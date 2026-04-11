// src/components/molecules/NavItem.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ Icon, label, to }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `
        w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-lato
        ${isActive
                    ? 'bg-redPrimary-100 text-redPrimary-300 font-bold shadow-sm'
                    : 'text-CafeSecondary-300 hover:bg-Neutral-100 hover:text-CafeSecondary-500'}
        `}
        >
            {({ isActive }) => (
                <>
                    <Icon size={20} className={isActive ? 'text-redPrimary-300' : 'text-CafeSecondary-200'} />
                    <span className="text-sm uppercase tracking-wider">{label}</span>
                </>
            )}
        </NavLink>
    );
};

export default NavItem;