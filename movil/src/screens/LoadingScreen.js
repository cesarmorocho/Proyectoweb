// Importamos React para crear el componente
import React from 'react';
// Importamos componentes específicos de React Native:
import {
  View,                    // Contenedor básico para layout
  Text,                    // Para mostrar texto
  ActivityIndicator,       // Spinner/indicador de carga animado
  StyleSheet,             // Para crear hojas de estilo optimizadas
  Image                   // Para mostrar imágenes (no utilizado en este código)
} from 'react-native';

// Componente funcional LoadingScreen - pantalla que se muestra durante la carga
// No recibe props, es una pantalla estática que muestra un estado de carga
export default function LoadingScreen() {
  return (
    // Contenedor principal que ocupa toda la pantalla
    <View style={styles.container}>
      
      {/* === SECCIÓN DEL LOGO === */}
      {/* Contenedor para el logo de la aplicación */}
      <View style={styles.logoContainer}>
        {/* Círculo placeholder para el logo (temporal, sin imagen real) */}
        <View style={styles.logoPlaceholder}>
          {/* Texto temporal que representa el logo */}
          <Text style={styles.logoText}>Ponte Pilas</Text>
        </View>
      </View>
      
      {/* === INDICADOR DE CARGA === */}
      {/* Spinner animado que indica que la aplicación está cargando */}
      <ActivityIndicator 
        size="large"                    // Tamaño grande del spinner
        color="#0066CC"                 // Color azul corporativo
        style={styles.loader}           // Estilos adicionales (margen inferior)
      />
      
      {/* === TEXTO DE CARGA === */}
      {/* Texto informativo para el usuario */}
      <Text style={styles.loadingText}>Cargando...</Text>
      
    </View>
  );
}

// Hoja de estilos para la pantalla de carga
const styles = StyleSheet.create({
  // === CONTENEDOR PRINCIPAL ===
  
  // Estilo del contenedor principal de la pantalla
  container: {
    flex: 1,                          // Ocupa todo el espacio disponible de la pantalla
    backgroundColor: '#FFFFFF',       // Fondo blanco limpio
    justifyContent: 'center',         // Centra contenido verticalmente
    alignItems: 'center',             // Centra contenido horizontalmente
    padding: 20,                      // 20px de padding en todos los lados
  },
  
  // === SECCIÓN DEL LOGO ===
  
  // Contenedor del logo con margen inferior
  logoContainer: {
    marginBottom: 50,                 // 50px de separación hacia abajo
  },
  
  // Círculo que actúa como placeholder del logo
  logoPlaceholder: {
    width: 120,                       // 120px de ancho
    height: 120,                      // 120px de alto (círculo perfecto)
    backgroundColor: '#0066CC',       // Fondo azul corporativo (sólido, no transparente)
    borderRadius: 60,                 // Radio de 60px para hacer círculo perfecto
    justifyContent: 'center',         // Centra contenido verticalmente
    alignItems: 'center',             // Centra contenido horizontalmente
  },
  
  // Texto dentro del placeholder del logo
  logoText: {
    color: 'white',                   // Color blanco (contrasta con fondo azul)
    fontSize: 16,                     // Tamaño de fuente mediano
    fontWeight: 'bold',               // Texto en negrita
    textAlign: 'center',              // Texto centrado
  },
  
  // === ELEMENTOS DE CARGA ===
  
  // Estilo del spinner de carga
  loader: {
    marginBottom: 20,                 // 20px de separación hacia abajo
  },
  
  // Texto informativo de carga
  loadingText: {
    fontSize: 16,                     // Tamaño de fuente mediano
    color: '#666666',                 // Color gris medio (menos prominente que el logo)
    fontWeight: '500',                // Peso de fuente medio (más que normal, menos que bold)
  },
});
