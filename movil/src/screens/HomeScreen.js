// Importamos React para crear el componente
import React from 'react';
// Importamos componentes de React Native necesarios:
import {
  View,                    // Contenedor básico para agrupar elementos
  Text,                    // Para mostrar texto
  TouchableOpacity,        // Botón táctil con feedback visual
  StyleSheet,             // Para crear hojas de estilo optimizadas
  SafeAreaView,           // Contenedor que evita áreas del sistema (notch, status bar)
  Image,                  // Para mostrar imágenes (aunque no se use en este código)
  ScrollView              // Contenedor scrolleable para contenido largo
} from 'react-native';

// Componente funcional HomeScreen que recibe navigation como prop
// navigation es proporcionado automáticamente por React Navigation
export default function HomeScreen({ navigation }) {
  // Función que maneja la navegación hacia la pantalla de login
  const handleLogin = () => {
    navigation.navigate('Login');    // Navega a la pantalla llamada 'Login'
  };

  // Renderizado del componente
  return (
    // SafeAreaView evita que el contenido se superponga con areas del sistema
    <SafeAreaView style={styles.container}>
      {/* ScrollView permite hacer scroll si el contenido es más alto que la pantalla */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* === SECCIÓN HEADER === */}
        {/* Contiene el logo, título y subtítulo de la aplicación */}
        <View style={styles.header}>
          {/* Contenedor del logo */}
          <View style={styles.logoContainer}>
            {/* Placeholder circular para el logo (usando solo texto por ahora) */}
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>Ponte Pilas</Text>
            </View>
          </View>
          {/* Título principal de la aplicación */}
          <Text style={styles.title}>Bienvenido a Ponte Pilas</Text>
          {/* Subtítulo descriptivo */}
          <Text style={styles.subtitle}>
            Tu aplicación de seguridad ciudadana para Quito
          </Text>
        </View>

        {/* === SECCIÓN PRINCIPAL DE CONTENIDO === */}
        {/* Contiene las características principales de la aplicación */}
        <View style={styles.content}>
          {/* Contenedor para las tarjetas de características */}
          <View style={styles.featureContainer}>
            
            {/* PRIMERA CARACTERÍSTICA: Alertas Rápidas */}
            <View style={styles.feature}>
              {/* Icono de la característica */}
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>🚨</Text>
              </View>
              {/* Título de la característica */}
              <Text style={styles.featureTitle}>Alertas Rápidas</Text>
              {/* Descripción de la característica */}
              <Text style={styles.featureDescription}>
                Reporta incidentes de seguridad de manera inmediata
              </Text>
            </View>

            {/* SEGUNDA CARACTERÍSTICA: Geolocalización */}
            <View style={styles.feature}>
              {/* Icono de geolocalización */}
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>📍</Text>
              </View>
              {/* Título de la característica */}
              <Text style={styles.featureTitle}>Geolocalización</Text>
              {/* Descripción de la característica */}
              <Text style={styles.featureDescription}>
                Reportes con ubicación precisa en tiempo real
              </Text>
            </View>

            {/* TERCERA CARACTERÍSTICA: Comunidad Segura */}
            <View style={styles.feature}>
              {/* Icono de comunidad */}
              <View style={styles.featureIcon}>
                <Text style={styles.featureIconText}>👥</Text>
              </View>
              {/* Título de la característica */}
              <Text style={styles.featureTitle}>Comunidad Segura</Text>
              {/* Descripción de la característica */}
              <Text style={styles.featureDescription}>
                Trabaja junto a tu comunidad por un Quito más seguro
              </Text>
            </View>
          </View>
        </View>

        {/* === SECCIÓN FOOTER === */}
        {/* Contiene el botón de login y logos de organizaciones colaboradoras */}
        <View style={styles.footer}>
          {/* Botón principal para iniciar sesión */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          {/* Sección de logos de organizaciones colaboradoras */}
          <View style={styles.partnerLogos}>
            {/* Texto explicativo */}
            <Text style={styles.partnerText}>En colaboración con:</Text>
            {/* Fila de logos */}
            <View style={styles.logoRow}>
              {/* Logo/placeholder de Policía Nacional */}
              <View style={styles.partnerLogo}>
                <Text style={styles.partnerLogoText}>Policía Nacional</Text>
              </View>
              {/* Logo/placeholder de Municipio de Quito */}
              <View style={styles.partnerLogo}>
                <Text style={styles.partnerLogoText}>Municipio Quito</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Hoja de estilos creada con StyleSheet.create para optimización
const styles = StyleSheet.create({
  // === ESTILOS DE CONTENEDORES PRINCIPALES ===
  
  // Contenedor principal de toda la pantalla
  container: {
    flex: 1,                          // Ocupa todo el espacio disponible
    backgroundColor: '#F5F5F5',       // Fondo gris claro
  },
  
  // Contenedor del ScrollView
  scrollContainer: {
    flexGrow: 1,                      // Permite que el contenido crezca más allá de la pantalla
  },
  
  // === ESTILOS DEL HEADER ===
  
  // Sección superior azul con logo y títulos
  header: {
    backgroundColor: '#0066CC',       // Fondo azul corporativo
    paddingVertical: 60,              // 60px padding arriba y abajo
    paddingHorizontal: 20,            // 20px padding izquierda y derecha
    alignItems: 'center',             // Centra elementos horizontalmente
  },
  
  // Contenedor del logo
  logoContainer: {
    marginBottom: 20,                 // 20px de margen inferior
  },
  
  // Círculo placeholder para el logo
  logoPlaceholder: {
    width: 100,                       // 100px de ancho
    height: 100,                      // 100px de alto (círculo perfecto)
    backgroundColor: 'rgba(255, 255, 255, 0.2)',  // Blanco semitransparente
    borderRadius: 50,                 // Radio de 50px para hacer círculo
    justifyContent: 'center',         // Centra contenido verticalmente
    alignItems: 'center',             // Centra contenido horizontalmente
    borderWidth: 2,                   // Borde de 2px
    borderColor: 'rgba(255, 255, 255, 0.3)',      // Borde blanco semitransparente
  },
  
  // Texto dentro del logo placeholder
  logoText: {
    color: 'white',                   // Color blanco
    fontSize: 14,                     // Tamaño de fuente 14px
    fontWeight: 'bold',               // Texto en negrita
    textAlign: 'center',              // Texto centrado
  },
  
  // Título principal de la aplicación
  title: {
    fontSize: 28,                     // Tamaño grande para el título principal
    fontWeight: 'bold',               // Texto en negrita
    color: 'white',                   // Color blanco
    textAlign: 'center',              // Texto centrado
    marginBottom: 10,                 // 10px de margen inferior
  },
  
  // Subtítulo descriptivo
  subtitle: {
    fontSize: 16,                     // Tamaño mediano
    color: 'rgba(255, 255, 255, 0.9)', // Blanco casi opaco (90% opacidad)
    textAlign: 'center',              // Texto centrado
    lineHeight: 22,                   // Altura de línea para mejor legibilidad
  },
  
  // === ESTILOS DE CONTENIDO PRINCIPAL ===
  
  // Contenedor principal del contenido
  content: {
    flex: 1,                          // Ocupa el espacio restante
    padding: 20,                      // 20px de padding en todos los lados
  },
  
  // Contenedor de las tarjetas de características
  featureContainer: {
    marginTop: 20,                    // 20px de margen superior
  },
  
  // Cada tarjeta individual de característica
  feature: {
    backgroundColor: 'white',         // Fondo blanco
    padding: 20,                      // 20px de padding interno
    borderRadius: 12,                 // Bordes redondeados de 12px
    marginBottom: 16,                 // 16px de separación entre tarjetas
    // Propiedades de sombra para iOS:
    shadowColor: '#000',              // Color de sombra negro
    shadowOffset: {
      width: 0,                       // Sin desplazamiento horizontal
      height: 2,                      // 2px hacia abajo
    },
    shadowOpacity: 0.1,               // 10% de opacidad de sombra
    shadowRadius: 3.84,               // Radio de difuminado
    elevation: 5,                     // Elevación para Android
    alignItems: 'center',             // Centra elementos horizontalmente
  },
  
  // Contenedor circular del icono de cada característica
  featureIcon: {
    width: 60,                        // 60px de ancho
    height: 60,                       // 60px de alto (círculo perfecto)
    backgroundColor: '#E6F3FF',       // Fondo azul muy claro
    borderRadius: 30,                 // Radio de 30px para hacer círculo
    justifyContent: 'center',         // Centra contenido verticalmente
    alignItems: 'center',             // Centra contenido horizontalmente
    marginBottom: 16,                 // 16px de margen inferior
  },
  
  // Emoji/icono dentro del círculo de característica
  featureIconText: {
    fontSize: 24,                     // Tamaño grande para el emoji
  },
  
  // Título de cada característica
  featureTitle: {
    fontSize: 18,                     // Tamaño mediano-grande
    fontWeight: 'bold',               // Texto en negrita
    color: '#333333',                 // Color gris oscuro
    marginBottom: 8,                  // 8px de margen inferior
    textAlign: 'center',              // Texto centrado
  },
  
  // Descripción de cada característica
  featureDescription: {
    fontSize: 14,                     // Tamaño pequeño-mediano
    color: '#666666',                 // Color gris medio
    textAlign: 'center',              // Texto centrado
    lineHeight: 20,                   // Altura de línea para mejor legibilidad
  },
  
  // === ESTILOS DEL FOOTER ===
  
  // Sección inferior con botón y logos
  footer: {
    padding: 20,                      // 20px de padding en todos los lados
  },
  
  // Botón principal de "Iniciar Sesión"
  loginButton: {
    backgroundColor: '#0066CC',       // Fondo azul corporativo
    paddingVertical: 16,              // 16px padding arriba y abajo
    paddingHorizontal: 40,            // 40px padding izquierda y derecha
    borderRadius: 25,                 // Bordes muy redondeados (botón tipo píldora)
    alignItems: 'center',             // Centra texto horizontalmente
    marginBottom: 30,                 // 30px de margen inferior
    // Sombra más pronunciada para el botón principal:
    shadowColor: '#000',              // Color de sombra negro
    shadowOffset: {
      width: 0,                       // Sin desplazamiento horizontal
      height: 2,                      // 2px hacia abajo
    },
    shadowOpacity: 0.25,              // 25% de opacidad (más visible)
    shadowRadius: 3.84,               // Radio de difuminado
    elevation: 5,                     // Elevación para Android
  },
  
  // Texto del botón de login
  loginButtonText: {
    color: 'white',                   // Color blanco
    fontSize: 18,                     // Tamaño grande
    fontWeight: 'bold',               // Texto en negrita
  },
  
  // === ESTILOS DE LOGOS DE COLABORADORES ===
  
  // Contenedor de la sección de logos de colaboradores
  partnerLogos: {
    alignItems: 'center',             // Centra elementos horizontalmente
  },
  
  // Texto explicativo de los logos
  partnerText: {
    fontSize: 14,                     // Tamaño pequeño-mediano
    color: '#666666',                 // Color gris medio
    marginBottom: 16,                 // 16px de margen inferior
  },
  
  // Fila que contiene los logos de colaboradores
  logoRow: {
    flexDirection: 'row',             // Organiza logos horizontalmente
    justifyContent: 'space-around',   // Distribuye espacio uniformemente
    width: '100%',                    // Ocupa todo el ancho disponible
  },
  
  // Cada logo individual de colaborador
  partnerLogo: {
    backgroundColor: 'white',         // Fondo blanco
    paddingVertical: 12,              // 12px padding arriba y abajo
    paddingHorizontal: 16,            // 16px padding izquierda y derecha
    borderRadius: 8,                  // Bordes ligeramente redondeados
    flex: 0.45,                       // Ocupa 45% del ancho disponible cada uno
    alignItems: 'center',             // Centra contenido horizontalmente
    // Sombra sutil para los logos:
    shadowColor: '#000',              // Color de sombra negro
    shadowOffset: {
      width: 0,                       // Sin desplazamiento horizontal
      height: 1,                      // 1px hacia abajo (sombra sutil)
    },
    shadowOpacity: 0.1,               // 10% de opacidad (muy sutil)
    shadowRadius: 2,                  // Radio pequeño de difuminado
    elevation: 2,                     // Elevación menor para Android
  },
  
  // Texto dentro de cada logo colaborador
  partnerLogoText: {
    fontSize: 12,                     // Tamaño pequeño
    color: '#333333',                 // Color gris oscuro
    fontWeight: '600',                // Texto semi-bold
    textAlign: 'center',              // Texto centrado
  },
});
