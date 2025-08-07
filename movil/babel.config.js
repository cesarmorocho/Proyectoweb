// === CONFIGURACIÓN DE BABEL ===
// Babel es un transpilador de JavaScript que convierte código moderno a versiones compatibles
// Este archivo exporta una función que recibe la API de Babel y retorna la configuración

module.exports = function(api) {
  // Habilitar el caché de Babel para mejorar la velocidad de compilación
  // Esto significa que Babel reutilizará resultados previos si los archivos no han cambiado
  api.cache(true);
  
  // Retornar objeto de configuración de Babel
  return {
    // === PRESETS ===
    // Los presets son conjuntos predefinidos de plugins y configuraciones
    presets: [
      'babel-preset-expo'  // Preset específico de Expo que incluye todas las transformaciones
                          // necesarias para React Native y JavaScript moderno
                          // Incluye: JSX, async/await, clases ES6, módulos ES6, etc.
    ],
    // Nota: Se podrían agregar más configuraciones aquí como:
    // - plugins: [] para plugins adicionales
    // - env: {} para configuraciones específicas del entorno
  };
};
