// Constantes de la aplicación
export const API_CONFIG = {
  TIMEOUT: 10000,
  MAX_RETRIES: 3,
};

export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'usuario',
};

// Función para validar email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para formatear errores de API
export const formatApiError = (error) => {
  if (error.response) {
    // El servidor respondió con un código de error
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data?.error;
    
    switch (status) {
      case 401:
        return 'Credenciales incorrectas';
      case 404:
        return 'Usuario no encontrado';
      case 403:
        return 'No tienes permisos para realizar esta acción';
      case 500:
        return 'Error interno del servidor';
      default:
        return message || `Error del servidor (${status})`;
    }
  } else if (error.request) {
    return 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
  } else {
    return 'Error inesperado. Intenta nuevamente.';
  }
};

// Función para truncar texto
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

// Función para formatear fechas
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Hoy';
  } else if (diffDays === 1) {
    return 'Ayer';
  } else if (diffDays < 7) {
    return `Hace ${diffDays} días`;
  } else {
    return date.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
};

// Función para generar colores aleatorios para avatares
export const generateAvatarColor = (name) => {
  if (!name) return '#0066CC';
  
  const colors = [
    '#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD',
    '#00D2D3', '#FF9F43', '#EE5A24', '#0DD3C5'
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

// Función para debounce
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Función para mostrar alertas de forma consistente
export const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  return new Promise((resolve) => {
    const updatedButtons = buttons.map(button => ({
      ...button,
      onPress: () => {
        if (button.onPress) button.onPress();
        resolve(button.text);
      }
    }));
    
    // Importar Alert dentro de la función para evitar problemas
    import('react-native').then(({ Alert }) => {
      Alert.alert(title, message, updatedButtons);
    });
  });
};
