// Importamos React y hooks necesarios
import React, { useState, useEffect } from 'react';
// Importamos componentes de React Navigation para navegación entre pantallas
import { NavigationContainer } from '@react-navigation/native';   // Contenedor principal de navegación
import { createStackNavigator } from '@react-navigation/stack';   // Navegador tipo stack (pila)
// Importamos AsyncStorage para almacenamiento persistente local
import AsyncStorage from '@react-native-async-storage/async-storage';
// Importamos StatusBar de Expo para controlar la barra de estado
import { StatusBar } from 'expo-status-bar';

// === IMPORTACIÓN DE PANTALLAS ===
// Importar pantallas de la aplicación
import LoginScreen from './src/screens/LoginScreen';           // Pantalla de inicio de sesión
import MenuUsuarioScreen from './src/screens/MenuUsuarioScreen'; // Menú para usuarios normales
import MenuAdminScreen from './src/screens/MenuAdminScreen';   // Menú para administradores
import HomeScreen from './src/screens/HomeScreen';             // Pantalla de bienvenida/inicio
import LoadingScreen from './src/screens/LoadingScreen';       // Pantalla de carga inicial

// === IMPORTACIÓN DE SERVICIOS ===
// Importar servicio de API para manejo de tokens de autenticación
import { setAuthToken } from './src/services/apiService';

// === CREACIÓN DEL NAVEGADOR ===
// Crear instancia del Stack Navigator
const Stack = createStackNavigator();

// === COMPONENTE PRINCIPAL DE LA APP ===
export default function App() {
  // === ESTADOS LOCALES ===
  // Estado para controlar si la app está cargando inicialmente
  const [isLoading, setIsLoading] = useState(true);
  // Estado para almacenar los datos del usuario autenticado (null si no hay usuario)
  const [user, setUser] = useState(null);

  // === EFECTO DE INICIALIZACIÓN ===
  // Verificar si hay un usuario logueado al iniciar la app
  useEffect(() => {
    checkUserAuth();  // Llamar función para verificar autenticación
  }, []);             // Array vacío = solo se ejecuta una vez al montar el componente

  // === FUNCIÓN DE VERIFICACIÓN DE AUTENTICACIÓN ===
  const checkUserAuth = async () => {
    try {
      // Intentar obtener el token almacenado localmente
      const token = await AsyncStorage.getItem('token');
      // Intentar obtener los datos del usuario almacenados localmente
      const userData = await AsyncStorage.getItem('usuario');
      
      // Si tanto el token como los datos del usuario existen
      if (token && userData) {
        // Parsear los datos del usuario de JSON string a objeto
        const user = JSON.parse(userData);
        // Establecer el usuario en el estado (esto cambiará la navegación)
        setUser(user);
        // Configurar el token en axios para futuras peticiones HTTP
        setAuthToken(token);
      }
    } catch (error) {
      // Si hay error al verificar autenticación, lo registramos en consola
      console.error('Error checking auth:', error);
    } finally {
      // Independientemente del resultado, terminamos el estado de carga
      setIsLoading(false);
    }
  };

  // === FUNCIÓN PARA MANEJAR LOGIN EXITOSO ===
  const handleLogin = (userData, token) => {
    // Establecer los datos del usuario en el estado
    // Esto causará que la navegación cambie automáticamente
    setUser(userData);
  };

  // === FUNCIÓN PARA MANEJAR LOGOUT ===
  const handleLogout = async () => {
    try {
      // Remover el token del almacenamiento local
      await AsyncStorage.removeItem('token');
      // Remover los datos del usuario del almacenamiento local
      await AsyncStorage.removeItem('usuario');
      // Limpiar el estado del usuario (volver a null)
      setUser(null);
      // Remover el token de las peticiones HTTP futuras
      setAuthToken(null);
    } catch (error) {
      // Si hay error durante el logout, lo registramos
      console.error('Error logging out:', error);
    }
  };

  // === RENDERIZADO CONDICIONAL DURANTE LA CARGA ===
  // Si la aplicación está cargando (verificando autenticación)
  if (isLoading) {
    return <LoadingScreen />;  // Mostrar pantalla de carga
  }

  // === RENDERIZADO PRINCIPAL DE LA APP ===
  return (
    <>
      {/* Configurar la barra de estado del dispositivo */}
      <StatusBar style="auto" />
      
      {/* Contenedor principal de navegación */}
      <NavigationContainer>
        {/* Navigator tipo Stack con configuración global */}
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* === NAVEGACIÓN CONDICIONAL BASADA EN AUTENTICACIÓN === */}
          {!user ? (
            // === STACK PARA USUARIOS NO AUTENTICADOS ===
            <>
              {/* Pantalla de inicio/bienvenida */}
              <Stack.Screen name="Home">
                {/* Render props para pasar props personalizadas */}
                {props => <HomeScreen {...props} />}
              </Stack.Screen>
              
              {/* Pantalla de inicio de sesión */}
              <Stack.Screen name="Login">
                {/* Pasar la función handleLogin como prop */}
                {props => <LoginScreen {...props} onLogin={handleLogin} />}
              </Stack.Screen>
            </>
          ) : (
            // === STACK PARA USUARIOS AUTENTICADOS ===
            <>
              {/* Navegación condicional basada en el rol del usuario */}
              {user.role === 'admin' ? (
                // Si es administrador, mostrar menú de admin
                <Stack.Screen name="MenuAdmin">
                  {/* Pasar datos del usuario y función de logout */}
                  {props => <MenuAdminScreen {...props} user={user} onLogout={handleLogout} />}
                </Stack.Screen>
              ) : (
                // Si es usuario normal, mostrar menú de usuario
                <Stack.Screen name="MenuUsuario">
                  {/* Pasar datos del usuario y función de logout */}
                  {props => <MenuUsuarioScreen {...props} user={user} onLogout={handleLogout} />}
                </Stack.Screen>
              )}
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
