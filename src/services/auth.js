const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export class AuthService {
  static async login(email, password) {
    try {
      const response = await fetch(`${VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login');
      }

      // Guardar token en localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        // El backend retorna 'usuario' no 'user'
        const userData = data.usuario || data.user;
        if (userData) {
          // Agregar el email al objeto usuario
          const completeUser = {
            ...userData,
            email: email
          };
          localStorage.setItem('user', JSON.stringify(completeUser));
        }
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      return data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  static async getUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/usuario`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getToken()}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener usuarios');
      }

      return data;
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  }

  static logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  static getToken() {
    return localStorage.getItem('authToken');
  }

  static getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static isOwner() {
    const user = this.getUser();
    return user && user.rol === 'owen';
  }
}
