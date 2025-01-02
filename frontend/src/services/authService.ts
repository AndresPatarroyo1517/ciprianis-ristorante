const AUTH_BASE_URL = 'http://localhost:3000/auth';

export const login = async (usuario: string, clave: string, stayLoggedIn: boolean) => {
  const body = {
    username: usuario,
    password: clave,
    stayLoggedIn: stayLoggedIn
  };
  const response = await fetch(`${AUTH_BASE_URL}/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: { 'Content-type': 'application/json' }
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  const data = await response.json();
  window.location.href = '/';
  return data;
};

export const register = async (usuario: string, clave: string, nombre: string, email: string) => {
  const body = {
    username: usuario,
    password: clave,
    name: nombre,
    email: email
  };
  const response = await fetch(`${AUTH_BASE_URL}/signup`, {
    method: 'POST',
    body: JSON.stringify(body),
    credentials: 'include',
    headers: { 'Content-type': 'application/json' }
  });

  if (!response.ok) {
    const data = await response.json();
    throw data.errors;
  }
  const data = await response.json();
  window.location.href = '/';
  return data;
};

export const logout = async () => {
  const response = await fetch(`${AUTH_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }
};
