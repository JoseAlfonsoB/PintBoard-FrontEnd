// src/services/api.js
// Capa centralizada de comunicación con el backend (Nginx API Gateway)

const API_BASE = '/api';

// ─── Helper para headers con JWT ───────────────────────────────────────────────
const authHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

// ─── Helper genérico para fetch ────────────────────────────────────────────────
const request = async (url, options = {}) => {
    const res = await fetch(url, {
        headers: authHeaders(),
        ...options,
    });

    // Si el servidor responde 401, limpiar sesión
    if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Disparar evento para que AuthContext lo detecte
        window.dispatchEvent(new Event('auth-expired'));
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
        const errorMsg = data?.message || data?.error || `Error ${res.status}`;
        throw new Error(errorMsg);
    }

    return data;
};

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH SERVICE  (/auth/users/...)
// ═══════════════════════════════════════════════════════════════════════════════
export const authService = {
    register: (name, email, password) =>
        request(`${API_BASE}/auth/users/register`, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        }),

    login: (email, password) =>
        request(`${API_BASE}/auth/users/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),
};

// ═══════════════════════════════════════════════════════════════════════════════
// PROFILE SERVICE  (/profile/profiles/...)
// ═══════════════════════════════════════════════════════════════════════════════
export const profileService = {
    getProfile: (userId) =>
        request(`${API_BASE}/profile/profiles/${userId}`),

    createProfile: (data) =>
        request(`${API_BASE}/profile/profiles`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    updateProfile: (userId, data) =>
        request(`${API_BASE}/profile/profiles/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    deleteProfile: (userId) =>
        request(`${API_BASE}/profile/profiles/${userId}`, {
            method: 'DELETE',
        }),
};

// ═══════════════════════════════════════════════════════════════════════════════
// PIN SERVICE  (/pin/pins/...)
// ═══════════════════════════════════════════════════════════════════════════════
export const pinService = {
    getAllPins: () =>
        request(`${API_BASE}/pin/pins`),

    getPinById: (id) =>
        request(`${API_BASE}/pin/pins/${id}`),

    getPinsByCategory: (categoryId) =>
        request(`${API_BASE}/pin/pins/category/${categoryId}`),

    getPinsByUser: (userId) =>
        request(`${API_BASE}/pin/pins/user/${userId}`),

    createPin: (data) =>
        request(`${API_BASE}/pin/pins`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    deletePin: (id) =>
        request(`${API_BASE}/pin/pins/${id}`, {
            method: 'DELETE',
        }),
};

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY SERVICE  (/category/categories/...)
// ═══════════════════════════════════════════════════════════════════════════════
export const categoryService = {
    getAllCategories: () =>
        request(`${API_BASE}/category/categories`),

    getCategoryById: (id) =>
        request(`${API_BASE}/category/categories/${id}`),

    createCategory: (data) =>
        request(`${API_BASE}/category/categories`, {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// ═══════════════════════════════════════════════════════════════════════════════
// IMAGE SERVICE  (/image/...)
// ═══════════════════════════════════════════════════════════════════════════════
export const imageService = {
    upload: (file) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('image', file);

        return fetch(`${API_BASE}/image/upload`, {
            method: 'POST',
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                // No incluir Content-Type, fetch lo pone automáticamente con boundary para FormData
            },
            body: formData,
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || 'Error al subir imagen');
            return data;
        });
    },

    // Generar URL pública para una imagen
    getImageUrl: (filename) => `${API_BASE}/image/uploads/${filename}`,

    getMetadata: (imageId) =>
        request(`${API_BASE}/image/images/${imageId}`),

    deleteImage: (imageId) =>
        request(`${API_BASE}/image/images/${imageId}`, {
            method: 'DELETE',
        }),
};
