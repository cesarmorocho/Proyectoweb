// Importamos axios - biblioteca para realizar peticiones HTTP
import axios from 'axios';
// Importamos Constants de Expo para acceder a constantes de la aplicación
import Constants from 'expo-constants';

// === CONFIGURACIÓN DE LA URL BASE DEL SERVIDOR ===
// La URL se puede configurar desde el archivo .env
// process.env.EXPO_PUBLIC_API_URL lee la variable de entorno si está definida
// Si no está definida, usa la IP local según el entorno:
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || (__DEV__ 
  ? 'http://172.29.48.239:8000'     // IP para desarrollo (__DEV__ = true en modo desarrollo)
  : 'http://172.29.48.239:8000');   // IP para producción (mismo valor por ahora)

// === CREACIÓN DE INSTANCIA DE AXIOS ===
// Crear instancia de axios con configuraciones por defecto
const apiClient = axios.create({
  baseURL: BASE_URL,                  // URL base para todas las peticiones
  timeout: 10000,                     // Timeout de 10 segundos (10000ms)
  headers: {
    'Content-Type': 'application/json', // Todas las peticiones envían JSON por defecto
  },
});

// === INTERCEPTOR DE PETICIONES ===
// Interceptor para incluir el token en todas las peticiones
apiClient.interceptors.request.use(
  // Función que se ejecuta antes de cada petición
  (config) => {
    // El token se establecerá dinámicamente con setAuthToken
    // Esta función no modifica nada, pero podría agregar headers adicionales
    return config;
  },
  // Función que maneja errores antes de enviar la petición
  (error) => {
    return Promise.reject(error);
  }
);

// === INTERCEPTOR DE RESPUESTAS ===
// Interceptor para manejar respuestas de error
apiClient.interceptors.response.use(
  // Función para respuestas exitosas - las retorna tal como llegan
  (response) => response,
  // Función para manejar errores en las respuestas
  (error) => {
    // Si el error es 401 (No autorizado), el token probablemente expiró
    if (error.response?.status === 401) {
      // Token expirado o inválido - manejar logout
      console.log('Token expirado');
      // Aquí se podría implementar logout automático
    }
    // Re-lanzar el error para que lo maneje quien hizo la petición
    return Promise.reject(error);
  }
);

// === FUNCIÓN PARA MANEJO DE TOKEN DE AUTENTICACIÓN ===
// Función para establecer el token de autenticación
export const setAuthToken = (token) => {
  if (token) {
    // Si hay token, lo agregamos al header Authorization de todas las peticiones
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    // Si no hay token, eliminamos el header Authorization
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// === SERVICIOS DE AUTENTICACIÓN ===
// Objeto que contiene todos los métodos relacionados con autenticación
export const authService = {
  // Método para iniciar sesión
  login: async (email, password) => {
    try {
      // Realiza petición POST al endpoint /users/login
      const response = await apiClient.post('/users/login', {
        email: email,     // Email del usuario
        pass: password    // Contraseña (nota: el servidor espera 'pass', no 'password')
      });
      // Retorna los datos de la respuesta (usuario + token)
      return response.data;
    } catch (error) {
      // Si hay error, lo lanza para que lo maneje el componente que llamó
      throw error;
    }
  },

  // Método para registrar un nuevo usuario
  register: async (userData) => {
    try {
      // Realiza petición POST al endpoint /users con los datos del usuario
      const response = await apiClient.post('/users', userData);
      // Retorna los datos de la respuesta
      return response.data;
    } catch (error) {
      // Si hay error, lo lanza para que lo maneje el componente que llamó
      throw error;
    }
  }
};

// === SERVICIOS DE USUARIOS ===
// Objeto que contiene métodos para gestionar usuarios
export const userService = {
  // Método para obtener todos los usuarios (solo para administradores)
  getAllUsers: async () => {
    try {
      // Realiza petición GET al endpoint /users
      const response = await apiClient.get('/users');
      // Retorna la lista de usuarios
      return response.data;
    } catch (error) {
      // Propaga el error para manejo en el componente
      throw error;
    }
  },

  // Método para obtener un usuario específico por su ID
  getUserById: async (id) => {
    try {
      // Realiza petición GET al endpoint /users/{id}
      const response = await apiClient.get(`/users/${id}`);
      // Retorna los datos del usuario
      return response.data;
    } catch (error) {
      // Propaga el error para manejo en el componente
      throw error;
    }
  },

  // Método para actualizar información de perfil de un usuario
  updateUser: async (id, userData) => {
    try {
      // Realiza petición PATCH al endpoint específico para actualizar perfil
      // PATCH se usa para actualizaciones parciales (solo campos modificados)
      const response = await apiClient.patch(`/users/${id}/infoPerfil`, userData);
      // Retorna los datos actualizados del usuario
      return response.data;
    } catch (error) {
      // Propaga el error para manejo en el componente
      throw error;
    }
  }
};

// === SERVICIOS DE REPORTES ===
// Objeto que contiene métodos para gestionar reportes de incidentes
export const reportService = {
  // Método para crear un nuevo reporte
  createReport: async (reportData) => {
    try {
      // Realiza petición POST al endpoint /reports con los datos del reporte
      const response = await apiClient.post('/reports', reportData);
      // Retorna los datos del reporte creado
      return response.data;
    } catch (error) {
      // Propaga el error para manejo en el componente
      throw error;
    }
  },

  // Método para obtener todos los reportes
  getAllReports: async () => {
    try {
      // Realiza petición GET al endpoint /reports
      const response = await apiClient.get('/reports');
      // Retorna la lista de todos los reportes
      return response.data;
    } catch (error) {
      // Propaga el error para manejo en el componente
      throw error;
    }
  }
};

// === EXPORTACIÓN POR DEFECTO ===
// Exportamos la instancia de axios configurada como exportación por defecto
// Esto permite usar import apiClient from './apiService' en otros archivos
// si necesitan hacer peticiones HTTP personalizadas
export default apiClient;
