
const TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'userData';

/**
 * Guarda el token de acceso y los datos del usuario en el localStorage.
 */
export const saveUser = (token, refreshToken, userData) => { // Agregamos refreshToken
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken); // Guardamos
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
};

export const getRefreshToken = () => { // Nueva función
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Obtiene el token de acceso del localStorage.
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Obtiene los datos del usuario del localStorage.
 */
export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

/**
 * Elimina el token y los datos del usuario del localStorage.
 */
export const removeUser = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY); // Limpiamos
    localStorage.removeItem(USER_KEY);
};